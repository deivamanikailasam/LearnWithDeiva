/**
 * Topic seeder for the Docker subject.
 *
 * Writes `src/content/subjects/docker/topics/<id>/topic.json` for every node
 * described in the supplied stage tree. Mirrors the layout used by the
 * Agentic AI seeder under `scripts/agentic/`.
 *
 *   stages: array of stages
 *     {
 *       id:    matches a `stages[].id` from roadmap.json (used as the topic tag),
 *       level: default difficulty for every node in the stage,
 *       roots: [{ id, title, summary?, level?, children: [...] }],
 *     }
 *
 * Each root's nested id is `${parent.id}--${child.id}` (depth > 0). Sibling
 * `order` starts at 1; root `order` is taken from a global counter so the
 * ordering remains consistent when stages are added in separate passes.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TOPICS_DIR = resolve(__dirname, '../../src/content/subjects/docker/topics')

function rootOrderState() {
  let max = 0
  if (existsSync(TOPICS_DIR)) {
    for (const d of readdirSync(TOPICS_DIR, { withFileTypes: true })) {
      if (!d.isDirectory()) continue
      const file = resolve(TOPICS_DIR, d.name, 'topic.json')
      if (!existsSync(file)) continue
      const meta = JSON.parse(readFileSync(file, 'utf8'))
      if (!meta.parentId && typeof meta.order === 'number') {
        if (meta.order > max) max = meta.order
      }
    }
  }
  return { next: () => ++max }
}

function writeTopic(meta) {
  const dir = resolve(TOPICS_DIR, meta.id)
  const file = resolve(dir, 'topic.json')
  if (existsSync(file)) {
    console.log(`SKIP existing: ${meta.id}`)
    return false
  }
  mkdirSync(dir, { recursive: true })
  writeFileSync(file, JSON.stringify(meta, null, 2) + '\n')
  return true
}

export function seedStages(stages) {
  let written = 0
  const orders = rootOrderState()

  for (const stage of stages) {
    const tag = stage.id
    const stageLevel = stage.level ?? 'beginner'

    stage.roots.forEach((root) => {
      const rootOrder = orders.next()
      const rootLevel = root.level ?? stageLevel
      const rootMeta = {
        id: root.id,
        title: root.title,
        summary: root.summary ?? root.title,
        order: rootOrder,
        level: rootLevel,
        tags: [tag],
      }
      if (writeTopic(rootMeta)) written += 1

      const walk = (node, parentId, parentLevel, depth = 0) => {
        ;(node.children ?? []).forEach((child, idx) => {
          const childId = `${node.id}--${child.id}`
          const childLevel = child.level ?? parentLevel
          const childMeta = {
            id: childId,
            title: child.title,
            ...(depth < 1 ? { summary: child.summary ?? child.title } : {}),
            order: idx + 1,
            level: childLevel,
            tags: [tag],
            parentId: node.id,
          }
          if (writeTopic(childMeta)) written += 1
          walk({ id: childId, children: child.children }, childId, childLevel, depth + 1)
        })
      }
      walk(root, null, rootLevel)
    })
  }

  console.log(`Wrote ${written} new topic files`)
  return written
}
