/**
 * Build the Perplexity Space input bundle for one subject.
 *
 * Reads the canonical repo content under `src/content/subjects/<subject>/`
 * and produces a self-contained folder at `space/<subject>/` that you upload
 * (once, then refresh as needed) into a Perplexity Space:
 *
 *   space/<subject>/
 *     RULES.md                 (copied from docs/perplexity/space-files/)
 *     SECTION-SCHEMAS.md       (copied)
 *     OUTPUT-CONTRACT.md       (copied)
 *     IMAGE-POLICY.md          (copied)
 *     scheduled-query-prompt.md (copied — verbose, with rationale)
 *     scheduled-query-prompt-compact.md (copied — leaner equivalent)
 *     ROADMAP-<subject>.md     (Stage → Topic → Subtopic → Sub-subtopic tree)
 *     GLOBAL-GLOSSARY.json     (deduped union of every sections/synonyms.json
 *                               term + optional subject-level glossary.json)
 *     QUEUE.md                 (sub-subtopics, status: pending; filtered by --stage)
 *     EXAMPLES.md              (full JSON of 2–3 gold-standard sub-subtopics)
 *
 * Run after any edit to the roadmap, topics, or glossary so the Space stays
 * in sync with the repo.
 *
 * Usage:
 *   node scripts/build-perplexity-space.mjs --subject gen-ai
 *   node scripts/build-perplexity-space.mjs --subject gen-ai --stage computing-foundations
 *   node scripts/build-perplexity-space.mjs --subject gen-ai --examples programming-basics--operators-and-expressions,python-syntax-idioms--decorators
 *   node scripts/build-perplexity-space.mjs --subject gen-ai --out custom/space/dir
 */
import { readFile, readdir, mkdir, writeFile, copyFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SUBJECTS_DIR = path.join(ROOT, 'src', 'content', 'subjects')
const DOCS_DIR = path.join(ROOT, 'docs', 'perplexity')
const STATIC_DOCS = [
  { src: path.join(DOCS_DIR, 'space-files', 'RULES.md'), name: 'RULES.md' },
  { src: path.join(DOCS_DIR, 'space-files', 'SECTION-SCHEMAS.md'), name: 'SECTION-SCHEMAS.md' },
  { src: path.join(DOCS_DIR, 'space-files', 'OUTPUT-CONTRACT.md'), name: 'OUTPUT-CONTRACT.md' },
  { src: path.join(DOCS_DIR, 'space-files', 'IMAGE-POLICY.md'), name: 'IMAGE-POLICY.md' },
  { src: path.join(DOCS_DIR, 'scheduled-query-prompt.md'), name: 'scheduled-query-prompt.md' },
  { src: path.join(DOCS_DIR, 'scheduled-query-prompt-compact.md'), name: 'scheduled-query-prompt-compact.md' },
]

/** Parse `--flag value` style arguments; returns a plain object. */
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

async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'))
  } catch {
    return undefined
  }
}

async function listDirs(dir) {
  if (!existsSync(dir)) return []
  const entries = await readdir(dir, { withFileTypes: true })
  return entries.filter((e) => e.isDirectory()).map((e) => e.name)
}

/** Read every topic.json under a subject; return a map keyed by topic id. */
async function loadAllTopics(subjectDir) {
  const topicsDir = path.join(subjectDir, 'topics')
  const ids = await listDirs(topicsDir)
  const byId = new Map()
  await Promise.all(
    ids.map(async (id) => {
      const meta = await readJson(path.join(topicsDir, id, 'topic.json'))
      if (meta && meta.id) byId.set(meta.id, meta)
    }),
  )
  return byId
}

/** Build a parent → children adjacency map from the flat topics list. */
function buildChildren(topics) {
  const children = new Map()
  for (const t of topics.values()) {
    const parent = t.parentId
    if (!parent) continue
    if (!children.has(parent)) children.set(parent, [])
    children.get(parent).push(t)
  }
  for (const list of children.values()) {
    list.sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  }
  return children
}

/**
 * For the chosen subject + stage, walk the roadmap and emit a tree of
 *   stage → topic → subtopic → sub-subtopic
 * rows. We treat depth-3 nodes (parent's parent is a roadmap topic) as
 * sub-subtopics, which matches existing repo conventions.
 */
function buildRoadmapTree({ roadmap, topics, children, stageFilter }) {
  const stages = stageFilter
    ? roadmap.stages.filter((s) => s.id === stageFilter)
    : roadmap.stages
  if (stageFilter && stages.length === 0) {
    throw new Error(
      `--stage "${stageFilter}" not found in roadmap. Available: ${roadmap.stages
        .map((s) => s.id)
        .join(', ')}`,
    )
  }
  return stages.map((stage) => ({
    id: stage.id,
    title: stage.title,
    summary: stage.summary,
    topics: stage.nodes.map((node) => {
      const topic = topics.get(node.topicId ?? node.id)
      const subtopicMetas = children.get(node.topicId ?? node.id) ?? []
      return {
        id: node.id,
        title: topic?.title ?? node.title,
        description: node.description ?? topic?.summary,
        subtopics: subtopicMetas.map((sub) => {
          const subsubs = children.get(sub.id) ?? []
          return {
            id: sub.id,
            title: sub.title,
            summary: sub.summary,
            subsubtopics: subsubs.map((leaf) => ({
              id: leaf.id,
              title: leaf.title,
              summary: leaf.summary,
              level: leaf.level,
            })),
          }
        }),
      }
    }),
  }))
}

/** Render the flattened roadmap as Markdown. */
function renderRoadmapMarkdown(subject, tree) {
  const lines = [
    `# Roadmap — ${subject.title}`,
    '',
    'Canonical Stage → Topic → Subtopic → Sub-subtopic tree for this subject.',
    'Every sub-subtopic listed below is a valid `scope.subsubtopicId` value.',
    '',
  ]
  for (const stage of tree) {
    lines.push(`## Stage: ${stage.title}`)
    lines.push(`- **stageId:** \`${stage.id}\``)
    if (stage.summary) lines.push(`- ${stage.summary}`)
    lines.push('')
    for (const topic of stage.topics) {
      lines.push(`### Topic: ${topic.title}`)
      lines.push(`- **topicId:** \`${topic.id}\``)
      if (topic.description) lines.push(`- ${topic.description}`)
      lines.push('')
      if (topic.subtopics.length === 0) {
        lines.push('_(no subtopics)_')
        lines.push('')
        continue
      }
      for (const sub of topic.subtopics) {
        lines.push(`#### Subtopic: ${sub.title}`)
        lines.push(`- **subtopicId:** \`${sub.id}\``)
        if (sub.summary && sub.summary !== sub.title) lines.push(`- ${sub.summary}`)
        if (sub.subsubtopics.length === 0) {
          lines.push('- _(no sub-subtopics)_')
          lines.push('')
          continue
        }
        lines.push('')
        lines.push('| Sub-subtopic | subsubtopicId | level |')
        lines.push('| --- | --- | --- |')
        for (const leaf of sub.subsubtopics) {
          lines.push(`| ${leaf.title} | \`${leaf.id}\` | ${leaf.level ?? '-'} |`)
        }
        lines.push('')
      }
    }
  }
  return lines.join('\n') + '\n'
}

/**
 * Aggregate every glossary-style entry from the subject:
 *   - subject-level glossary.json (if present)
 *   - every topics/<id>/sections/synonyms.json
 *
 * Dedupe on `term` (case-insensitive). When the same term appears with
 * different definitions, keep the longest definition and record the conflict.
 */
async function buildGlobalGlossary(subjectDir, topics) {
  const conflicts = []
  const byKey = new Map() // lowercase term → { term, definition, sources: [...] }

  const ingest = (term, definition, sourceLabel) => {
    if (!term || !definition) return
    const key = String(term).trim().toLowerCase()
    if (!key) return
    const existing = byKey.get(key)
    if (!existing) {
      byKey.set(key, { term: String(term).trim(), definition: String(definition).trim(), sources: [sourceLabel] })
      return
    }
    existing.sources.push(sourceLabel)
    const sameDef =
      existing.definition.replace(/\s+/g, ' ').trim() ===
      String(definition).replace(/\s+/g, ' ').trim()
    if (sameDef) return
    conflicts.push({
      term: existing.term,
      definitions: [
        { from: existing.sources[0], text: existing.definition },
        { from: sourceLabel, text: String(definition).trim() },
      ],
    })
    if (String(definition).length > existing.definition.length) {
      existing.definition = String(definition).trim()
    }
  }

  const subjectGlossary = await readJson(path.join(subjectDir, 'glossary.json'))
  if (subjectGlossary?.items?.length) {
    for (const it of subjectGlossary.items) {
      ingest(it.term, it.definition, 'glossary.json')
    }
  }

  for (const topic of topics.values()) {
    const synFile = path.join(subjectDir, 'topics', topic.id, 'sections', 'synonyms.json')
    const syn = await readJson(synFile)
    if (!syn?.terms?.length) continue
    for (const t of syn.terms) {
      ingest(t.term, t.definition, `topics/${topic.id}/sections/synonyms.json`)
    }
  }

  const items = [...byKey.values()]
    .sort((a, b) => a.term.toLowerCase().localeCompare(b.term.toLowerCase()))
    .map(({ term, definition }) => ({ term, definition }))

  return { items, conflicts }
}

/** Render the QUEUE.md file for one stage of the subject. */
function renderQueueMarkdown(subject, tree) {
  const lines = [
    `# QUEUE — ${subject.title}`,
    '',
    'The scheduled query processes the FIRST entry with `status: pending` on each run.',
    'After applying a manifest locally, the apply script will rewrite this file with',
    '`status: done` for the completed entry. Re-upload it to the Space before the next run.',
    '',
    '> Schema (per row): `[ status ] subsubtopicId   |   parent path`',
    '',
  ]
  let count = 0
  for (const stage of tree) {
    lines.push(`## Stage: ${stage.title} (\`${stage.id}\`)`)
    lines.push('')
    for (const topic of stage.topics) {
      for (const sub of topic.subtopics) {
        if (sub.subsubtopics.length === 0) continue
        for (const leaf of sub.subsubtopics) {
          count++
          lines.push(
            `- [ ] \`${leaf.id}\`   |   ${stage.title} → ${topic.title} → ${sub.title} → ${leaf.title}`,
          )
        }
      }
    }
    lines.push('')
  }
  lines.push(`_Total pending sub-subtopics: ${count}_`)
  lines.push('')
  return lines.join('\n')
}

/**
 * Pick which sub-subtopics to inline in EXAMPLES.md.
 *
 * Strategy when --examples is not provided: score each sub-subtopic by the
 * number of section files present, then pick the top 3 distinct topic
 * folders. Bias toward variety (different parent topics).
 */
async function pickExampleIds(subjectDir, tree, explicit) {
  if (explicit) {
    return explicit
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  const candidates = []
  for (const stage of tree) {
    for (const topic of stage.topics) {
      for (const sub of topic.subtopics) {
        for (const leaf of sub.subsubtopics) {
          const dir = path.join(subjectDir, 'topics', leaf.id, 'sections')
          if (!existsSync(dir)) continue
          const files = (await readdir(dir)).filter((f) => f.endsWith('.json'))
          candidates.push({
            id: leaf.id,
            parent: sub.id,
            count: files.length,
          })
        }
      }
    }
  }
  candidates.sort((a, b) => b.count - a.count)
  const picked = []
  const seenParents = new Set()
  for (const c of candidates) {
    if (picked.length >= 3) break
    if (seenParents.has(c.parent)) continue
    picked.push(c.id)
    seenParents.add(c.parent)
  }
  // Fill remaining slots if we couldn't find 3 distinct parents.
  for (const c of candidates) {
    if (picked.length >= 3) break
    if (picked.includes(c.id)) continue
    picked.push(c.id)
  }
  return picked
}

/** Read every section file for one sub-subtopic. */
async function loadSubsubtopicSections(subjectDir, id) {
  const dir = path.join(subjectDir, 'topics', id, 'sections')
  if (!existsSync(dir)) return {}
  const out = {}
  const files = (await readdir(dir)).filter((f) => f.endsWith('.json'))
  for (const f of files) {
    const data = await readJson(path.join(dir, f))
    if (data) out[f.replace(/\.json$/, '')] = data
  }
  return out
}

/** Render EXAMPLES.md by inlining the full JSON of each example sub-subtopic. */
async function renderExamplesMarkdown(subject, subjectDir, exampleIds, topics) {
  const lines = [
    `# EXAMPLES — gold-standard sub-subtopics for ${subject.title}`,
    '',
    'These are real, validated outputs from this repo. Match this depth, tone',
    'and structural discipline in your own output. Do NOT copy the content',
    'verbatim into other sub-subtopics; use them as a quality benchmark only.',
    '',
  ]
  for (const id of exampleIds) {
    const meta = topics.get(id)
    if (!meta) {
      lines.push(`## ${id}`)
      lines.push('')
      lines.push(`_(topic not found in subject; check the --examples flag)_`)
      lines.push('')
      continue
    }
    const sections = await loadSubsubtopicSections(subjectDir, id)
    const keys = Object.keys(sections)
    lines.push(`## ${meta.title}`)
    lines.push('')
    lines.push(`- **subsubtopicId:** \`${id}\``)
    lines.push(`- **sections used:** ${keys.length} (${keys.join(', ') || '_none_'})`)
    lines.push('')
    for (const key of keys) {
      lines.push(`### \`sections/${key}.json\``)
      lines.push('')
      lines.push('```json')
      lines.push(JSON.stringify(sections[key], null, 2))
      lines.push('```')
      lines.push('')
    }
  }
  return lines.join('\n')
}

/** Ensure `space/` is in .gitignore (idempotent). */
async function ensureGitignore() {
  const file = path.join(ROOT, '.gitignore')
  let text = ''
  try {
    text = await readFile(file, 'utf8')
  } catch {
    // missing .gitignore is unusual; just create it
  }
  if (/^space\/?\s*$/m.test(text) || /^\/space\/?\s*$/m.test(text)) return
  const addition =
    (text.endsWith('\n') || text === '' ? '' : '\n') +
    '\n# Perplexity Space input bundle (rebuilt by scripts/build-perplexity-space.mjs)\nspace/\n'
  await writeFile(file, text + addition, 'utf8')
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const subjectId = args.subject
  if (!subjectId) {
    console.error('Usage: node scripts/build-perplexity-space.mjs --subject <id> [--stage <stageId>] [--examples a,b,c] [--out <dir>]')
    process.exit(2)
  }
  const subjectDir = path.join(SUBJECTS_DIR, subjectId)
  if (!existsSync(subjectDir)) {
    console.error(`Subject not found: ${subjectDir}`)
    process.exit(1)
  }

  const subjectMeta = (await readJson(path.join(subjectDir, 'subject.json'))) ?? {
    id: subjectId,
    title: subjectId,
  }
  const roadmap = await readJson(path.join(subjectDir, 'roadmap.json'))
  if (!roadmap) {
    console.error(`No roadmap.json found for subject ${subjectId}`)
    process.exit(1)
  }

  const topics = await loadAllTopics(subjectDir)
  const children = buildChildren(topics)
  const stageFilter = typeof args.stage === 'string' ? args.stage : undefined
  const tree = buildRoadmapTree({ roadmap, topics, children, stageFilter })

  const outDir = path.resolve(
    typeof args.out === 'string' ? args.out : path.join(ROOT, 'space', subjectId),
  )
  await rm(outDir, { recursive: true, force: true })
  await ensureDir(outDir)

  for (const doc of STATIC_DOCS) {
    if (!existsSync(doc.src)) {
      console.warn(`! Missing static doc: ${doc.src}`)
      continue
    }
    await copyFile(doc.src, path.join(outDir, doc.name))
  }

  const roadmapFile = path.join(outDir, `ROADMAP-${subjectId}.md`)
  await writeFile(roadmapFile, renderRoadmapMarkdown(subjectMeta, tree), 'utf8')

  const { items: glossaryItems, conflicts } = await buildGlobalGlossary(subjectDir, topics)
  await writeFile(
    path.join(outDir, 'GLOBAL-GLOSSARY.json'),
    JSON.stringify({ subject: subjectId, count: glossaryItems.length, items: glossaryItems }, null, 2) + '\n',
    'utf8',
  )
  if (conflicts.length) {
    await writeFile(
      path.join(outDir, 'GLOSSARY-CONFLICTS.md'),
      [
        `# Glossary conflicts in ${subjectId}`,
        '',
        'These terms appear with different definitions across the subject. The longest',
        'definition was kept; review and reconcile in the source files.',
        '',
        ...conflicts.flatMap((c) => [
          `## ${c.term}`,
          '',
          ...c.definitions.map((d) => `- **${d.from}**: ${d.text}`),
          '',
        ]),
      ].join('\n'),
      'utf8',
    )
  }

  await writeFile(path.join(outDir, 'QUEUE.md'), renderQueueMarkdown(subjectMeta, tree), 'utf8')

  const exampleIds = await pickExampleIds(subjectDir, tree, typeof args.examples === 'string' ? args.examples : undefined)
  await writeFile(
    path.join(outDir, 'EXAMPLES.md'),
    await renderExamplesMarkdown(subjectMeta, subjectDir, exampleIds, topics),
    'utf8',
  )

  await ensureGitignore()

  const queuedCount = tree
    .flatMap((s) => s.topics)
    .flatMap((t) => t.subtopics)
    .reduce((sum, sub) => sum + sub.subsubtopics.length, 0)

  console.log(`Built Perplexity Space bundle for "${subjectId}" at ${path.relative(ROOT, outDir)}/`)
  console.log(`  - Stages included: ${tree.length}${stageFilter ? ` (filtered to ${stageFilter})` : ''}`)
  console.log(`  - Sub-subtopics queued: ${queuedCount}`)
  console.log(`  - Glossary terms: ${glossaryItems.length}${conflicts.length ? `  (conflicts: ${conflicts.length})` : ''}`)
  console.log(`  - Example sub-subtopics inlined: ${exampleIds.length} (${exampleIds.join(', ') || '_none_'})`)
  console.log('')
  console.log('Next: upload every file in that folder to your Perplexity Space.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
