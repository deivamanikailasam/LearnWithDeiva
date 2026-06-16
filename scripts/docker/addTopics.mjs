/**
 * Targeted topic adder for the Docker subject.
 *
 * Unlike `seed.mjs` (which seeds entire stages), this helper appends new
 * topics into already-existing parents without renumbering siblings:
 *
 *   - For each addition, it picks the next available `order` for that parent
 *     based on what's already on disk.
 *   - Duplicate ids are skipped (so this script is safe to re-run).
 *   - Tags and level inherit from the parent unless overridden.
 *   - Nesting is recursive: each item can carry `children`, which become
 *     `${item.id}--${child.id}`, and so on.
 *   - Roots (no `parentId`) get a global root-order continuing after any
 *     existing root topics.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TOPICS_DIR = resolve(__dirname, '../../src/content/subjects/docker/topics')

function loadIndex() {
  const byId = new Map()
  const maxOrderByParent = new Map()
  for (const d of readdirSync(TOPICS_DIR, { withFileTypes: true })) {
    if (!d.isDirectory()) continue
    const file = resolve(TOPICS_DIR, d.name, 'topic.json')
    if (!existsSync(file)) continue
    const meta = JSON.parse(readFileSync(file, 'utf8'))
    byId.set(meta.id, meta)
    const key = meta.parentId ?? '__root__'
    maxOrderByParent.set(key, Math.max(maxOrderByParent.get(key) ?? 0, meta.order ?? 0))
  }
  return { byId, maxOrderByParent }
}

export function addTopics(additions) {
  const { byId, maxOrderByParent } = loadIndex()
  const runningOrder = new Map()
  let count = 0

  const nextOrder = (parentKey) => {
    if (!runningOrder.has(parentKey)) {
      runningOrder.set(parentKey, maxOrderByParent.get(parentKey) ?? 0)
    }
    const next = runningOrder.get(parentKey) + 1
    runningOrder.set(parentKey, next)
    return next
  }

  const write = (meta) => {
    const dir = resolve(TOPICS_DIR, meta.id)
    const file = resolve(dir, 'topic.json')
    if (existsSync(file)) {
      console.log(`SKIP existing: ${meta.id}`)
      return false
    }
    mkdirSync(dir, { recursive: true })
    writeFileSync(file, JSON.stringify(meta, null, 2) + '\n')
    byId.set(meta.id, meta)
    count += 1
    return true
  }

  const walk = (item, parentId, inheritedTag, inheritedLevel) => {
    const tag = item.tag ?? inheritedTag
    const level = item.level ?? inheritedLevel
    const order = nextOrder(parentId ?? '__root__')
    const meta = {
      id: item.id,
      title: item.title,
      summary: item.summary ?? item.title,
      order,
      level,
      tags: [tag],
    }
    if (parentId) meta.parentId = parentId
    write(meta)
    ;(item.children ?? []).forEach((child) => {
      const childId = `${item.id}--${child.id}`
      walk({ ...child, id: childId }, item.id, tag, level)
    })
  }

  for (const item of additions) {
    if (byId.has(item.id)) {
      console.log(`SKIP duplicate id: ${item.id}`)
      continue
    }
    const parentId = item.parentId ?? null
    let tag
    let level
    if (parentId) {
      const parent = byId.get(parentId)
      if (!parent) throw new Error(`Missing parent "${parentId}" for "${item.id}"`)
      tag = item.tag ?? (parent.tags ?? [])[0]
      level = item.level ?? parent.level
    } else {
      tag = item.tag
      level = item.level ?? 'intermediate'
      if (!tag) throw new Error(`Root addition "${item.id}" must specify a tag (stage id)`)
    }
    walk(item, parentId, tag, level)
  }

  console.log(`Added ${count} topic files.`)
  return count
}
