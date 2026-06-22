import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/agentic-ai')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')

function loadTopics() {
  const byId = new Map()
  const maxOrderByParent = new Map()
  for (const d of readdirSync(TOPICS_DIR, { withFileTypes: true })) {
    if (!d.isDirectory()) continue
    const meta = JSON.parse(readFileSync(resolve(TOPICS_DIR, d.name, 'topic.json')))
    byId.set(meta.id, meta)
    const key = meta.parentId ?? '__root__'
    maxOrderByParent.set(key, Math.max(maxOrderByParent.get(key) ?? 0, meta.order ?? 0))
  }
  return { byId, maxOrderByParent }
}

/**
 * additions: array of { id, title, summary?, parentId, level?, children?: [...] }
 * - `id` must be the full topic id (use `parent--child` for sub-subtopics).
 * - children get id `${parent.id}--${child.id}` and order 1..n.
 * - tags inherit the parent topic's tags; level inherits the parent's level.
 * - order for new top-level additions continues after existing siblings.
 */
export function addTopics(additions) {
  const { byId, maxOrderByParent } = loadTopics()
  let count = 0

  const write = (meta) => {
    const dir = resolve(TOPICS_DIR, meta.id)
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'topic.json'), JSON.stringify(meta, null, 2) + '\n')
    byId.set(meta.id, meta)
    count += 1
  }

  const runningOrder = new Map()
  const nextOrder = (parentId) => {
    if (!runningOrder.has(parentId)) {
      runningOrder.set(parentId, maxOrderByParent.get(parentId) ?? 0)
    }
    const next = runningOrder.get(parentId) + 1
    runningOrder.set(parentId, next)
    return next
  }

  for (const item of additions) {
    const parent = byId.get(item.parentId)
    if (!parent) throw new Error(`Missing parent "${item.parentId}" for "${item.id}"`)
    if (byId.has(item.id)) {
      console.log(`SKIP duplicate id: ${item.id}`)
      continue
    }
    const tags = parent.tags
    const level = item.level ?? parent.level
    write({
      id: item.id,
      title: item.title,
      summary: item.summary ?? item.title,
      order: nextOrder(item.parentId),
      level,
      tags,
      parentId: item.parentId,
    })

    ;(item.children ?? []).forEach((child, k) => {
      const childId = `${item.id}--${child.id}`
      if (byId.has(childId)) {
        console.log(`SKIP duplicate id: ${childId}`)
        return
      }
      write({
        id: childId,
        title: child.title,
        order: k + 1,
        level: child.level ?? level,
        tags,
        parentId: item.id,
      })
    })
  }

  console.log(`Added ${count} topic files.`)
  return count
}

/**
 * Attach sub-subtopics under existing subtopics (depth-2 leaves).
 *
 * @param {Array<{ parentId: string, children: Array<{ id: string, title: string, level?: string }> }>} attachments
 */
export function attachSubSubtopics(attachments) {
  const { byId } = loadTopics()
  let written = 0
  let skipped = 0

  for (const { parentId, children } of attachments) {
    const parent = byId.get(parentId)
    if (!parent) throw new Error(`Missing parent "${parentId}"`)

    children.forEach((child, idx) => {
      const id = `${parentId}--${child.id}`
      if (byId.has(id)) {
        skipped += 1
        return
      }
      const meta = {
        id,
        title: child.title,
        summary: child.summary ?? child.title,
        order: idx + 1,
        level: child.level ?? parent.level ?? 'intermediate',
        tags: parent.tags ?? [],
        parentId,
      }
      const dir = resolve(TOPICS_DIR, id)
      mkdirSync(dir, { recursive: true })
      writeFileSync(resolve(dir, 'topic.json'), JSON.stringify(meta, null, 2) + '\n')
      byId.set(id, meta)
      written += 1
    })
  }

  console.log(`[agentic-ai] attachSubSubtopics: wrote ${written}, skipped ${skipped}`)
  return { written, skipped }
}
