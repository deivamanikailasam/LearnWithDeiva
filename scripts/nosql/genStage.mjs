import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/nosql')

/**
 * Generate topic.json files for one roadmap stage.
 *
 * tree: array of root nodes. Each node:
 *   { id, title, summary?, level?, children?: [...] }
 * - Root nodes (level 1) use a global `order` starting at rootStartOrder.
 * - Subtopics (level 2) keep their plain id, parentId = root id, order = 1..n.
 * - Sub-subtopics (level 3) get id `${parentId}--${id}`, order = 1..n.
 * Summary defaults to title when not provided.
 */
export function generateStage({ stageTag, rootStartOrder, tree }) {
  let count = 0

  const writeTopic = (meta) => {
    const dir = resolve(SUBJECT_DIR, 'topics', meta.id)
    mkdirSync(dir, { recursive: true })
    writeFileSync(
      resolve(dir, 'topic.json'),
      JSON.stringify(meta, null, 2) + '\n',
    )
    count += 1
  }

  tree.forEach((root, i) => {
    const rootLevel = root.level ?? 'beginner'
    writeTopic({
      id: root.id,
      title: root.title,
      summary: root.summary ?? root.title,
      order: rootStartOrder + i,
      level: rootLevel,
      tags: [stageTag],
    })

    ;(root.children ?? []).forEach((sub, j) => {
      const subLevel = sub.level ?? rootLevel
      writeTopic({
        id: sub.id,
        title: sub.title,
        summary: sub.summary ?? sub.title,
        order: j + 1,
        level: subLevel,
        tags: [stageTag],
        parentId: root.id,
      })

      ;(sub.children ?? []).forEach((leaf, k) => {
        const leafId = `${sub.id}--${leaf.id}`
        writeTopic({
          id: leafId,
          title: leaf.title,
          order: k + 1,
          level: leaf.level ?? subLevel,
          tags: [stageTag],
          parentId: sub.id,
        })
      })
    })
  })

  console.log(`Stage "${stageTag}": wrote ${count} topic files.`)
  return count
}
