/**
 * Apply a Perplexity-generated content manifest into the repo.
 *
 * Reads a single manifest (from stdin, --file, or pasted as a Perplexity
 * response with one ```json fence) and:
 *
 *   1. Strips fences/smart quotes/trailing commas, then strict-parses JSON.
 *   2. Validates the manifest envelope (schemaVersion, scope).
 *   3. Resolves the scope against the repo (topic.json must exist for the
 *      sub-subtopic, unless --allow-new is set).
 *   4. For each `files[i]`, enforces the path shape, sectionKey whitelist,
 *      per-section JSON schema, AND an allow-list of fields drawn from
 *      `src/types/content.ts` — so a section like `references` cannot
 *      silently emit invented fields (e.g. `difficulty`, `requirements`)
 *      that the UI would ignore. See scripts/lib/section-validators.mjs.
 *   5. Cross-checks `imageTasks` count against any `images.json` items.
 *   6. Cross-checks every `connections.json` item's `topicId` against the
 *      list of real topic.json directories in the subject; unknown ids
 *      fail the run so we never write broken deep-links.
 *   7. Scans every string in the manifest for Perplexity-style citation
 *      artifacts ([file:N], [doc:N], [source:N], [citation:N]) and fails
 *      the run if any leak in. They render as literal junk in the UI.
 *   8. Merges `glossaryAdditions` into space/<subject>/GLOBAL-GLOSSARY.json
 *      (case-insensitive dedupe; conflicts require --force).
 *   9. With --dry-run, prints planned writes and exits without touching
 *      disk. Otherwise writes every section file, updates the queue, and
 *      prints the next-step checklist.
 *
 * Usage:
 *   node scripts/apply-content.mjs --file /tmp/manifest.json
 *   pbpaste | node scripts/apply-content.mjs
 *   node scripts/apply-content.mjs --file manifest.json --dry-run
 *   node scripts/apply-content.mjs --file manifest.json --force      # accept glossary conflicts
 *   node scripts/apply-content.mjs --file manifest.json --allow-new  # accept a brand-new sub-subtopic
 */
import { readFile, writeFile, mkdir, stat, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { SECTION_KEYS, validateSection } from './lib/section-validators.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SUBJECTS_DIR = path.join(ROOT, 'src', 'content', 'subjects')

function parseArgs(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith('--')) continue
    const key = a.slice(2)
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) {
      out[key] = true
    } else {
      out[key] = next
      i++
    }
  }
  return out
}

async function readStdin() {
  return await new Promise((resolve, reject) => {
    let data = ''
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (chunk) => (data += chunk))
    process.stdin.on('end', () => resolve(data))
    process.stdin.on('error', reject)
  })
}

/**
 * Try strict JSON.parse first; if that fails, apply minimal cleanup
 * (strip ```json fence, smart quotes, trailing commas) and retry. This is
 * intentionally conservative — we never silently rewrite the manifest's
 * actual values, only its surrounding noise.
 */
function tolerantJsonParse(raw) {
  const tryParse = (s) => {
    try {
      return { ok: true, value: JSON.parse(s) }
    } catch (err) {
      return { ok: false, error: err }
    }
  }
  const strict = tryParse(raw)
  if (strict.ok) return strict

  let cleaned = raw.trim()
  // Strip one or more leading ```json (or ```) fences and trailing ``` fences.
  cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '')
  // If the manifest is embedded inside other prose, pull the first/last braces.
  const firstBrace = cleaned.indexOf('{')
  const lastBrace = cleaned.lastIndexOf('}')
  if (firstBrace > 0 || lastBrace !== cleaned.length - 1) {
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.slice(firstBrace, lastBrace + 1)
    }
  }
  // Replace common smart-quote variants with ASCII; only safe outside JSON
  // string values, but JSON.parse will reject smart quotes there too, so this
  // is the lesser of two evils.
  cleaned = cleaned
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
  // Strip JS-style trailing commas.
  cleaned = cleaned.replace(/,\s*([}\]])/g, '$1')

  const recovered = tryParse(cleaned)
  if (recovered.ok) {
    return { ok: true, value: recovered.value, recovered: true }
  }
  return { ok: false, error: recovered.error, cleaned }
}

function describeParseError(raw, err) {
  const msg = String(err?.message ?? err)
  const m = /position (\d+)/.exec(msg) ?? /at position (\d+)/.exec(msg)
  if (!m) return msg
  const pos = Number(m[1])
  const start = Math.max(0, pos - 80)
  const end = Math.min(raw.length, pos + 80)
  return `${msg}\n\nContext (...around char ${pos}):\n${raw.slice(start, end)}\n${' '.repeat(Math.min(80, pos - start))}^`
}

/** Validate the manifest envelope (everything outside `files`). */
function validateEnvelope(manifest, errors) {
  if (manifest === null || typeof manifest !== 'object' || Array.isArray(manifest)) {
    errors.push('Manifest must be a JSON object.')
    return
  }
  if (manifest.schemaVersion !== 1) {
    errors.push(`Manifest.schemaVersion must be 1; got ${JSON.stringify(manifest.schemaVersion)}.`)
  }
  if (!manifest.scope || typeof manifest.scope !== 'object') {
    errors.push('Manifest.scope is required (object).')
  } else {
    for (const k of ['subject', 'stageId', 'topicId', 'subtopicId', 'subsubtopicId']) {
      if (typeof manifest.scope[k] !== 'string' || !manifest.scope[k].trim()) {
        errors.push(`Manifest.scope.${k} must be a non-empty string.`)
      }
    }
  }
  if (!Array.isArray(manifest.files)) {
    errors.push('Manifest.files must be an array (may be empty).')
  }
  if (manifest.glossaryAdditions !== undefined && !Array.isArray(manifest.glossaryAdditions)) {
    errors.push('Manifest.glossaryAdditions must be an array when present.')
  }
  if (manifest.imageTasks !== undefined && !Array.isArray(manifest.imageTasks)) {
    errors.push('Manifest.imageTasks must be an array when present.')
  }
  if (manifest.queueCompletedIds !== undefined && !Array.isArray(manifest.queueCompletedIds)) {
    errors.push('Manifest.queueCompletedIds must be an array when present.')
  }
  if (manifest.notes !== undefined && typeof manifest.notes !== 'string') {
    errors.push('Manifest.notes must be a string when present.')
  }
}

/** Build the expected path for one section file under a sub-subtopic. */
function expectedPath(subject, subsubtopicId, sectionKey) {
  return `src/content/subjects/${subject}/topics/${subsubtopicId}/sections/${sectionKey}.json`
}

/**
 * Validate one file entry: path shape, sectionKey, content schema.
 * Returns `{ ok, errors, sectionKey, absPath }`.
 */
function validateFileEntry(file, scope, index) {
  const errors = []
  const prefix = `files[${index}]`
  if (!file || typeof file !== 'object') {
    return { ok: false, errors: [`${prefix}: must be an object.`], sectionKey: null, absPath: null }
  }
  if (typeof file.path !== 'string' || !file.path.trim()) {
    errors.push(`${prefix}.path: required non-empty string.`)
    return { ok: false, errors, sectionKey: null, absPath: null }
  }
  if (!file.content || typeof file.content !== 'object' || Array.isArray(file.content)) {
    errors.push(`${prefix}.content: required object matching the section schema.`)
  }

  const expectedPrefix = `src/content/subjects/${scope.subject}/topics/${scope.subsubtopicId}/sections/`
  let sectionKey = null
  if (!file.path.startsWith(expectedPrefix)) {
    errors.push(
      `${prefix}.path must start with "${expectedPrefix}" (got "${file.path}"). One manifest = one sub-subtopic; do not write outside its sections folder.`,
    )
  } else {
    const sectionFile = file.path.slice(expectedPrefix.length)
    if (!sectionFile.endsWith('.json') || sectionFile.includes('/')) {
      errors.push(`${prefix}.path: must end with "<sectionKey>.json" with no extra path segments (got "${sectionFile}").`)
    } else {
      sectionKey = sectionFile.replace(/\.json$/, '')
      if (!SECTION_KEYS.includes(sectionKey)) {
        errors.push(
          `${prefix}.path: sectionKey "${sectionKey}" is not a canonical section key. Valid: ${SECTION_KEYS.join(', ')}.`,
        )
        sectionKey = null
      }
    }
  }

  if (errors.length === 0 && sectionKey && file.content) {
    const result = validateSection(sectionKey, file.content)
    errors.push(...result.errors.map((e) => `${prefix}: ${e}`))
  }

  const absPath = path.join(ROOT, file.path)
  return { ok: errors.length === 0, errors, sectionKey, absPath }
}

/** Cross-check images.json and imageTasks line up by `src`/`alt`. */
function validateImageTasks(manifest, errors) {
  const imagesFile = (manifest.files ?? []).find(
    (f) => typeof f?.path === 'string' && f.path.endsWith('/sections/images.json'),
  )
  const imagesItems = imagesFile?.content?.items ?? []
  const tasks = Array.isArray(manifest.imageTasks) ? manifest.imageTasks : []
  if (imagesItems.length !== tasks.length) {
    errors.push(
      `images.json items (${imagesItems.length}) and imageTasks (${tasks.length}) must have the same length.`,
    )
  }
  for (let i = 0; i < imagesItems.length; i++) {
    const img = imagesItems[i]
    const task = tasks[i]
    if (!task) continue
    if (typeof task.src !== 'string' || !task.src.trim())
      errors.push(`imageTasks[${i}].src: required non-empty string.`)
    if (typeof task.alt !== 'string' || !task.alt.trim())
      errors.push(`imageTasks[${i}].alt: required non-empty string.`)
    if (typeof task.prompt !== 'string' || !task.prompt.trim())
      errors.push(`imageTasks[${i}].prompt: required non-empty string.`)
    if (task.src && img?.src && task.src !== img.src)
      errors.push(`imageTasks[${i}].src must match images.json items[${i}].src (got "${task.src}" vs "${img.src}").`)
    if (task.alt && img?.alt && task.alt !== img.alt)
      errors.push(`imageTasks[${i}].alt must match images.json items[${i}].alt.`)
    if (task.suggestedSources !== undefined && !Array.isArray(task.suggestedSources))
      errors.push(`imageTasks[${i}].suggestedSources: must be an array when present.`)
  }
}

/**
 * Discover every topicId that currently has a `topic.json` under
 * `src/content/subjects/<subject>/topics/`. Used to cross-check
 * `connections.json` items so we never write deep-links that 404.
 */
async function loadValidTopicIds(subject) {
  const topicsDir = path.join(SUBJECTS_DIR, subject, 'topics')
  if (!existsSync(topicsDir)) return new Set()
  let entries
  try {
    entries = await readdir(topicsDir, { withFileTypes: true })
  } catch {
    return new Set()
  }
  const ids = new Set()
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (existsSync(path.join(topicsDir, entry.name, 'topic.json'))) {
      ids.add(entry.name)
    }
  }
  return ids
}

/**
 * Recognise Perplexity-style inline citation markers. These look like
 * `[file:1]`, `[doc:3]`, `[source:12]`, `[citation:7]` and tend to leak
 * into the manifest when Perplexity quotes a Space file but forgets to
 * strip its own footnote syntax. We reject them outright because they
 * render as literal noise in the UI.
 */
const CITATION_ARTIFACT_RE = /\[(file|doc|source|citation):\s*\d+\]/i

/**
 * Walk every string value in `node` and push an error for every occurrence
 * of a Perplexity citation marker. `pathParts` tracks the JSON pointer so
 * the operator sees exactly which field needs cleaning.
 */
function scanForCitationArtifacts(node, pathParts, errors) {
  if (typeof node === 'string') {
    const match = node.match(CITATION_ARTIFACT_RE)
    if (match) {
      const where = pathParts.length === 0 ? '<root>' : pathParts.join('')
      errors.push(
        `${where}: contains Perplexity citation artifact "${match[0]}". Remove it (and any similar "[file:N]" / "[doc:N]" / "[source:N]" / "[citation:N]" markers) before submitting the manifest.`,
      )
    }
    return
  }
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      scanForCitationArtifacts(node[i], [...pathParts, `[${i}]`], errors)
    }
    return
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      const safeKey = /^[A-Za-z_][\w-]*$/.test(k) ? `.${k}` : `[${JSON.stringify(k)}]`
      scanForCitationArtifacts(v, [...pathParts, safeKey], errors)
    }
  }
}

/**
 * For each `connections.json` file in the manifest, ensure every item's
 * `topicId` (when present) resolves to a real topic in the same subject.
 * Pushes human-readable errors into `errors` so the caller can fail fast.
 */
function validateConnectionsCrossRefs(fileEntries, scope, validTopicIds, errors) {
  fileEntries.forEach((entry, i) => {
    if (entry.sectionKey !== 'connections') return
    const items = entry.file?.content?.items
    if (!Array.isArray(items)) return
    items.forEach((item, j) => {
      if (!item || typeof item !== 'object') return
      const rawId = item.topicId
      if (rawId === undefined || rawId === null) return
      if (typeof rawId !== 'string') {
        errors.push(`files[${i}].content.items[${j}].topicId: must be a string when present.`)
        return
      }
      const id = rawId.trim()
      if (!id) return
      if (id === scope.subsubtopicId) {
        errors.push(
          `files[${i}].content.items[${j}].topicId references the current sub-subtopic "${id}" — drop the self-reference.`,
        )
        return
      }
      if (!validTopicIds.has(id)) {
        errors.push(
          `files[${i}].content.items[${j}].topicId "${id}" has no topic.json under src/content/subjects/${scope.subject}/topics/. ` +
            `Drop the topicId field (keep the item text) or replace with an existing id from ROADMAP-${scope.subject}.md.`,
        )
      }
    })
  })
}

/** Read existing glossary from space/<subject>/GLOBAL-GLOSSARY.json if any. */
async function loadExistingGlossary(subject) {
  const file = path.join(ROOT, 'space', subject, 'GLOBAL-GLOSSARY.json')
  if (!existsSync(file)) return { file, items: [], byKey: new Map() }
  try {
    const json = JSON.parse(await readFile(file, 'utf8'))
    const items = Array.isArray(json?.items) ? json.items : []
    const byKey = new Map()
    for (const it of items) {
      if (typeof it?.term === 'string') byKey.set(it.term.toLowerCase().trim(), it)
    }
    return { file, items, byKey }
  } catch (err) {
    return { file, items: [], byKey: new Map(), readError: err }
  }
}

/**
 * Merge `additions` into the loaded glossary. Returns `{ added, skipped,
 * conflicts, merged }` so the caller can report and optionally bail when
 * conflicts exist without --force.
 */
function mergeGlossary(existing, additions, { force }) {
  const added = []
  const skipped = []
  const conflicts = []
  const items = [...existing.items]
  const byKey = new Map(existing.byKey)

  for (const t of additions ?? []) {
    if (!t || typeof t.term !== 'string' || typeof t.definition !== 'string') continue
    const term = t.term.trim()
    const definition = t.definition.trim()
    if (!term || !definition) continue
    const key = term.toLowerCase()
    const existingItem = byKey.get(key)
    if (!existingItem) {
      const entry = { term, definition }
      items.push(entry)
      byKey.set(key, entry)
      added.push(entry)
      continue
    }
    const same =
      existingItem.definition.replace(/\s+/g, ' ').trim() ===
      definition.replace(/\s+/g, ' ').trim()
    if (same) {
      skipped.push({ term, reason: 'already present with the same definition' })
      continue
    }
    conflicts.push({
      term,
      existing: existingItem.definition,
      incoming: definition,
    })
    if (force) {
      existingItem.definition = definition
    }
  }

  items.sort((a, b) => a.term.toLowerCase().localeCompare(b.term.toLowerCase()))
  return { added, skipped, conflicts, merged: items }
}

/**
 * Update QUEUE.md in space/<subject>/: turn `- [ ] subsubtopicId ...` rows
 * into `- [x] subsubtopicId ...` for each id in `completedIds`.
 */
async function updateQueueFile(subject, completedIds) {
  const file = path.join(ROOT, 'space', subject, 'QUEUE.md')
  if (!existsSync(file)) {
    return { file, updated: 0, notFound: [...completedIds], missing: true }
  }
  const text = await readFile(file, 'utf8')
  let updated = 0
  const notFound = []
  let next = text
  for (const id of completedIds) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`^- \\[ \\](\\s+\`${escaped}\`.*)$`, 'm')
    if (re.test(next)) {
      next = next.replace(re, `- [x]$1`)
      updated++
    } else {
      const reAlreadyDone = new RegExp(`^- \\[x\\](\\s+\`${escaped}\`.*)$`, 'm')
      if (!reAlreadyDone.test(next)) notFound.push(id)
    }
  }
  if (next !== text) {
    await writeFile(file, next, 'utf8')
  }
  return { file, updated, notFound, missing: false }
}

/** Resolve scope against the repo: subject and topic.json must exist. */
async function resolveScope(scope, { allowNew }) {
  const errors = []
  const subjectDir = path.join(SUBJECTS_DIR, scope.subject)
  if (!existsSync(subjectDir)) {
    errors.push(`scope.subject "${scope.subject}" not found at src/content/subjects/${scope.subject}/.`)
    return { ok: false, errors }
  }
  const topicJsonPath = path.join(subjectDir, 'topics', scope.subsubtopicId, 'topic.json')
  const topicExists = existsSync(topicJsonPath)
  if (!topicExists && !allowNew) {
    errors.push(
      `scope.subsubtopicId "${scope.subsubtopicId}" has no topic.json at ${path.relative(ROOT, topicJsonPath)}. Pass --allow-new if this is a brand-new sub-subtopic.`,
    )
  }
  return { ok: errors.length === 0, errors, subjectDir, topicJsonPath, topicExists }
}

function header(title) {
  return `\n=== ${title} ===\n`
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const dryRun = !!args['dry-run']
  const force = !!args.force
  const allowNew = !!args['allow-new']

  let raw
  if (typeof args.file === 'string') {
    raw = await readFile(path.resolve(args.file), 'utf8')
  } else if (!process.stdin.isTTY) {
    raw = await readStdin()
  } else {
    console.error('Usage: node scripts/apply-content.mjs [--file path] [--dry-run] [--force] [--allow-new]')
    console.error('   or: pbpaste | node scripts/apply-content.mjs')
    process.exit(2)
  }

  const parsed = tolerantJsonParse(raw)
  if (!parsed.ok) {
    console.error('Manifest is not valid JSON.')
    console.error(describeParseError(parsed.cleaned ?? raw, parsed.error))
    process.exit(1)
  }
  if (parsed.recovered) {
    console.warn('Note: manifest had non-strict input (fences / smart quotes / trailing commas). Recovered automatically.')
  }
  const manifest = parsed.value

  const envelopeErrors = []
  validateEnvelope(manifest, envelopeErrors)
  if (envelopeErrors.length) {
    console.error(header('Envelope errors'))
    for (const e of envelopeErrors) console.error(' - ' + e)
    process.exit(1)
  }

  const scopeResult = await resolveScope(manifest.scope, { allowNew })
  if (!scopeResult.ok) {
    console.error(header('Scope errors'))
    for (const e of scopeResult.errors) console.error(' - ' + e)
    process.exit(1)
  }

  const fileErrors = []
  const fileEntries = []
  manifest.files.forEach((file, i) => {
    const result = validateFileEntry(file, manifest.scope, i)
    if (!result.ok) fileErrors.push(...result.errors)
    fileEntries.push({ ...result, file })
  })

  const imageErrors = []
  validateImageTasks(manifest, imageErrors)

  const crossRefErrors = []
  const validTopicIds = await loadValidTopicIds(manifest.scope.subject)
  validateConnectionsCrossRefs(fileEntries, manifest.scope, validTopicIds, crossRefErrors)

  const citationErrors = []
  scanForCitationArtifacts(manifest, [], citationErrors)

  const queueCompletedIds = Array.isArray(manifest.queueCompletedIds) ? manifest.queueCompletedIds : []
  const queueIdErrors = []
  if (manifest.files.length > 0 && queueCompletedIds.length === 0) {
    queueIdErrors.push('queueCompletedIds: must include at least the sub-subtopic being generated when files is non-empty.')
  }
  for (const id of queueCompletedIds) {
    if (id !== manifest.scope.subsubtopicId) {
      queueIdErrors.push(
        `queueCompletedIds includes "${id}" which is not the scoped sub-subtopic "${manifest.scope.subsubtopicId}". One manifest = one sub-subtopic.`,
      )
    }
  }

  const allErrors = [...fileErrors, ...imageErrors, ...crossRefErrors, ...citationErrors, ...queueIdErrors]
  if (allErrors.length) {
    console.error(header('Validation errors'))
    for (const e of allErrors) console.error(' - ' + e)
    process.exit(1)
  }

  const existing = await loadExistingGlossary(manifest.scope.subject)
  if (existing.readError) {
    console.warn(`Warning: failed to read ${path.relative(ROOT, existing.file)} (${existing.readError.message}). Proceeding with empty existing glossary.`)
  }
  const merge = mergeGlossary(existing, manifest.glossaryAdditions ?? [], { force })

  console.log(header('Summary'))
  console.log(` Subject:        ${manifest.scope.subject}`)
  console.log(` Stage:          ${manifest.scope.stageId}`)
  console.log(` Topic:          ${manifest.scope.topicId}`)
  console.log(` Subtopic:       ${manifest.scope.subtopicId}`)
  console.log(` Sub-subtopic:   ${manifest.scope.subsubtopicId}`)
  console.log(` Section files:  ${fileEntries.length} (${fileEntries.map((f) => f.sectionKey).join(', ') || '_none_'})`)
  console.log(` Image tasks:    ${(manifest.imageTasks ?? []).length}`)
  console.log(` New glossary:   ${merge.added.length} added, ${merge.skipped.length} duplicate-skipped, ${merge.conflicts.length} conflict(s)`)
  if (typeof manifest.notes === 'string' && manifest.notes.trim()) {
    console.log(` Notes:          ${manifest.notes.trim()}`)
  }

  if (merge.conflicts.length && !force) {
    console.error(header('Glossary conflicts (refusing to merge without --force)'))
    for (const c of merge.conflicts) {
      console.error(` - ${c.term}`)
      console.error(`     existing: ${c.existing}`)
      console.error(`     incoming: ${c.incoming}`)
    }
    console.error('\nRe-run with --force to overwrite, or edit the source and rebuild the Space.')
    process.exit(1)
  }

  if (dryRun) {
    console.log(header('Dry run — no files written'))
    for (const f of fileEntries) {
      console.log(` would write  ${path.relative(ROOT, f.absPath)}`)
    }
    if (merge.added.length) {
      console.log(` would merge  ${path.relative(ROOT, existing.file)}  (+${merge.added.length} terms)`)
    }
    if (queueCompletedIds.length) {
      console.log(` would mark   ${queueCompletedIds.join(', ')}  as done in space/${manifest.scope.subject}/QUEUE.md`)
    }
    if ((manifest.imageTasks ?? []).length) {
      console.log(header('Pending image tasks (fulfil after apply)'))
      for (const t of manifest.imageTasks) {
        console.log(` - ${t.src}`)
        console.log(`     alt:    ${t.alt}`)
        console.log(`     prompt: ${t.prompt}`)
        if (Array.isArray(t.suggestedSources) && t.suggestedSources.length) {
          for (const s of t.suggestedSources) console.log(`     source: ${s}`)
        }
      }
    }
    return
  }

  // Real apply.
  for (const f of fileEntries) {
    await mkdir(path.dirname(f.absPath), { recursive: true })
    await writeFile(f.absPath, JSON.stringify(f.file.content, null, 2) + '\n', 'utf8')
    console.log(` wrote  ${path.relative(ROOT, f.absPath)}`)
  }

  if (merge.added.length || merge.conflicts.length) {
    if (existsSync(existing.file) || merge.merged.length) {
      await mkdir(path.dirname(existing.file), { recursive: true })
      await writeFile(
        existing.file,
        JSON.stringify({ subject: manifest.scope.subject, count: merge.merged.length, items: merge.merged }, null, 2) + '\n',
        'utf8',
      )
      console.log(` merged ${path.relative(ROOT, existing.file)}  (+${merge.added.length} new, ${merge.conflicts.length} updated)`)
    }
  }

  const queueResult = await updateQueueFile(manifest.scope.subject, queueCompletedIds)
  if (queueResult.missing) {
    console.warn(` no QUEUE.md at ${path.relative(ROOT, queueResult.file)} — skipped queue update.`)
  } else {
    console.log(` queue  ${path.relative(ROOT, queueResult.file)}  (marked ${queueResult.updated} done)`)
    if (queueResult.notFound.length) {
      console.warn(` ! queue entries not found for: ${queueResult.notFound.join(', ')}`)
    }
  }

  console.log(header('Next steps'))
  console.log(' 1. Re-upload the following files to your Perplexity Space:')
  console.log(`      space/${manifest.scope.subject}/QUEUE.md`)
  if (merge.added.length || merge.conflicts.length) {
    console.log(`      space/${manifest.scope.subject}/GLOBAL-GLOSSARY.json`)
  }
  console.log(' 2. Run `npm run gen:content` (or `npm run build`) to refresh public/data.')
  if ((manifest.imageTasks ?? []).length) {
    console.log(' 3. Fulfil image tasks listed below. Save each file at the declared src path under public/.')
    console.log(header('Pending image tasks'))
    for (const t of manifest.imageTasks) {
      console.log(` - ${t.src}`)
      console.log(`     alt:    ${t.alt}`)
      console.log(`     prompt: ${t.prompt}`)
      if (Array.isArray(t.suggestedSources) && t.suggestedSources.length) {
        for (const s of t.suggestedSources) console.log(`     source: ${s}`)
      }
    }
  }
  console.log(' 4. Trigger (or wait for) the next scheduled Perplexity run.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
