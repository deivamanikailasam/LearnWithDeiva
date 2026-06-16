import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/devops')
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
 * additions: array of { id, title, summary?, parentId?, level?, tags?, children?: [...] }
 * - `id` must be the full topic id (use `parent--child` for sub-subtopics).
 * - if `parentId` is omitted, the topic is a top-level (roadmap-anchor) topic.
 * - children get id `${parent.id}--${child.id}` and order 1..n.
 * - tags inherit the parent topic's tags when a parent exists; level inherits the parent's level.
 * - order for new additions continues after existing siblings at that level.
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
  const nextOrder = (parentKey) => {
    if (!runningOrder.has(parentKey)) {
      runningOrder.set(parentKey, maxOrderByParent.get(parentKey) ?? 0)
    }
    const next = runningOrder.get(parentKey) + 1
    runningOrder.set(parentKey, next)
    return next
  }

  for (const item of additions) {
    const hasParent = Boolean(item.parentId)
    const parent = hasParent ? byId.get(item.parentId) : undefined
    if (hasParent && !parent) {
      throw new Error(`Missing parent "${item.parentId}" for "${item.id}"`)
    }
    if (byId.has(item.id)) {
      console.log(`SKIP duplicate id: ${item.id}`)
      continue
    }
    const tags = item.tags ?? parent?.tags ?? []
    const level = item.level ?? parent?.level ?? 'beginner'
    const parentKey = item.parentId ?? '__root__'
    const meta = {
      id: item.id,
      title: item.title,
      summary: item.summary ?? item.title,
      order: nextOrder(parentKey),
      level,
      tags,
    }
    if (hasParent) meta.parentId = item.parentId
    write(meta)

    ;(item.children ?? []).forEach((child, k) => {
      const childId = `${item.id}--${child.id}`
      if (byId.has(childId)) {
        console.log(`SKIP duplicate id: ${childId}`)
        return
      }
      write({
        id: childId,
        title: child.title,
        summary: child.summary ?? child.title,
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
