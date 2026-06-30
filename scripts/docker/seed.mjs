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
 * Hierarchy written to disk:
 *   Topic (root) → Subtopic (`${root.id}--${sub.id}`) → Sub-subtopic (`${sub.id}--${leaf.id}`)
 *
 * Only sub-subtopics are content leaves. Flat root children (no nested
 * `children`) are wrapped in a `${root.id}--core` subtopic automatically.
 * Prefer `node scripts/docker/rebuild-tree.mjs` when restructuring an existing stage.
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

      const flat = []
      const nested = []
      for (const child of root.children ?? []) {
        if (child.children?.length) nested.push(child)
        else flat.push(child)
      }

      const writeSubtopicTree = (sub, order, parentId, parentLevel) => {
        const subId = `${parentId}--${sub.id}`
        const subLevel = sub.level ?? parentLevel
        if (
          writeTopic({
            id: subId,
            title: sub.title,
            summary: sub.summary ?? sub.title,
            order,
            level: subLevel,
            tags: [tag],
            parentId,
          })
        ) {
          written += 1
        }
        ;(sub.children ?? []).forEach((leaf, leafIdx) => {
          const leafId = `${subId}--${leaf.id}`
          if (
            writeTopic({
              id: leafId,
              title: leaf.title,
              order: leafIdx + 1,
              level: leaf.level ?? subLevel,
              tags: [tag],
              parentId: subId,
            })
          ) {
            written += 1
          }
        })
      }

      nested.forEach((sub, idx) => writeSubtopicTree(sub, idx + 1, root.id, rootLevel))

      if (flat.length > 0) {
        writeSubtopicTree(
          {
            id: 'core',
            title: `${root.title} Core`,
            children: flat,
          },
          nested.length + 1,
          root.id,
          rootLevel,
        )
      }
    })
  }

  console.log(`Wrote ${written} new topic files`)
  return written
}
