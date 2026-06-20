import { readFile, writeFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
export const GLOBAL_GLOSSARY_PATH = path.join(ROOT, 'src', 'content', 'glossary.json')
const SUBJECTS_DIR = path.join(ROOT, 'src', 'content', 'subjects')

/** @typedef {{ id: string, term: string, definition: string, createdAt?: string, updatedAt?: string }} GlobalGlossaryItem */
/** @typedef {{ updatedAt?: string, items: GlobalGlossaryItem[] }} GlobalGlossaryFile */

export function normalizeGlossaryTerm(term) {
  return term.trim().toLowerCase()
}

export function normalizeGlossaryDefinition(definition) {
  return definition.trim().replace(/\s+/g, ' ')
}

function slugifyTerm(term) {
  const slug = term
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  return slug || 'term'
}

function uniqueId(items, term) {
  const base = slugifyTerm(term)
  if (!items.some((it) => it.id === base)) return base
  let n = 2
  while (items.some((it) => it.id === `${base}-${n}`)) n += 1
  return `${base}-${n}`
}

export async function readGlobalGlossary() {
  if (!existsSync(GLOBAL_GLOSSARY_PATH)) {
    return { updatedAt: new Date().toISOString(), items: [] }
  }
  const raw = JSON.parse(await readFile(GLOBAL_GLOSSARY_PATH, 'utf8'))
  const items = Array.isArray(raw.items) ? raw.items : []
  return {
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : undefined,
    items: items
      .filter((it) => typeof it?.term === 'string' && typeof it?.definition === 'string')
      .map((it) => ({
        id: String(it.id ?? slugifyTerm(it.term)),
        term: String(it.term).trim(),
        definition: String(it.definition).trim(),
        createdAt: typeof it.createdAt === 'string' ? it.createdAt : undefined,
        updatedAt: typeof it.updatedAt === 'string' ? it.updatedAt : undefined,
      })),
  }
}

export async function writeGlobalGlossary(data) {
  const payload = {
    updatedAt: new Date().toISOString(),
    items: data.items,
  }
  await writeFile(GLOBAL_GLOSSARY_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  return payload
}

export function findGlobalEntryByTerm(items, term) {
  const key = normalizeGlossaryTerm(term)
  return items.find((it) => normalizeGlossaryTerm(it.term) === key) ?? null
}

export function definitionsMatch(a, b) {
  return normalizeGlossaryDefinition(a) === normalizeGlossaryDefinition(b)
}

/**
 * @param {GlobalGlossaryItem[]} items
 * @param {{ term: string, definition: string }} entry
 */
export function upsertGlobalEntry(items, entry) {
  const term = entry.term.trim()
  const definition = entry.definition.trim()
  if (!term || !definition) {
    return { ok: false, error: 'Term and definition are required.' }
  }

  const existing = findGlobalEntryByTerm(items, term)
  if (existing) {
    if (definitionsMatch(existing.definition, definition)) {
      return { ok: true, action: 'reused', item: existing, items }
    }
    return {
      ok: false,
      conflict: true,
      existing,
    }
  }

  const now = new Date().toISOString()
  const next = [...items]
  next.push({
    id: uniqueId(next, term),
    term,
    definition,
    createdAt: now,
    updatedAt: now,
  })
  return { ok: true, action: 'added', item: next[next.length - 1], items: next }
}

/** Walk a TipTap JSON doc and collect glossary term usages. */
export function extractGlossaryTermsFromTiptap(doc) {
  /** @type {{ term: string, definition: string }[]} */
  const out = []
  if (!doc || typeof doc !== 'object') return out

  /** @param {unknown} node */
  function walk(node) {
    if (!node || typeof node !== 'object') return
    const n = /** @type {{ type?: string, text?: string, marks?: { type?: string, attrs?: { definition?: string } }[], content?: unknown[] }} */ (node)
    if (n.type === 'text' && typeof n.text === 'string' && Array.isArray(n.marks)) {
      const mark = n.marks.find((m) => m.type === 'glossaryTerm')
      const definition = mark?.attrs?.definition
      if (typeof definition === 'string' && definition.trim()) {
        out.push({ term: n.text.trim(), definition: definition.trim() })
      }
    }
    if (Array.isArray(n.content)) {
      for (const child of n.content) walk(child)
    }
  }

  walk(doc)
  return out
}

function usageKey(term, definition) {
  return `${normalizeGlossaryTerm(term)}|${normalizeGlossaryDefinition(definition)}`
}

/** Count how many times a term+definition pair appears across all topic documents. */
export async function countGlossaryUsage(term, definition, options = {}) {
  const { subjectId, topicId, pendingDocument } = options
  const targetKey = usageKey(term, definition)
  let count = 0

  if (!existsSync(SUBJECTS_DIR)) return 0

  const subjects = await readdir(SUBJECTS_DIR, { withFileTypes: true })
  for (const subject of subjects) {
    if (!subject.isDirectory()) continue
    const topicsDir = path.join(SUBJECTS_DIR, subject.name, 'topics')
    if (!existsSync(topicsDir)) continue
    const topics = await readdir(topicsDir, { withFileTypes: true })
    for (const topic of topics) {
      if (!topic.isDirectory()) continue
      const docPath = path.join(topicsDir, topic.name, 'document.json')
      let docJson = null

      if (
        pendingDocument &&
        subject.name === subjectId &&
        topic.name === topicId
      ) {
        docJson = pendingDocument
      } else if (existsSync(docPath)) {
        try {
          const raw = JSON.parse(await readFile(docPath, 'utf8'))
          docJson = raw.doc ?? raw
        } catch {
          continue
        }
      } else {
        continue
      }

      for (const entry of extractGlossaryTermsFromTiptap(docJson)) {
        if (usageKey(entry.term, entry.definition) === targetKey) count += 1
      }
    }
  }

  return count
}

/**
 * Remove a global glossary entry when it is no longer used in any document.
 * @param {GlobalGlossaryItem[]} items
 */
export async function removeGlobalEntryIfUnused(items, term, definition, options = {}) {
  const usage = await countGlossaryUsage(term, definition, options)
  if (usage > 0) {
    return { ok: true, removed: false, usage, items }
  }

  const key = normalizeGlossaryTerm(term)
  const next = items.filter((it) => normalizeGlossaryTerm(it.term) !== key)
  const removed = next.length < items.length
  return { ok: true, removed, usage: 0, items: next }
}
