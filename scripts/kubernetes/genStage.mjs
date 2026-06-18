import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/kubernetes')

/**
 * Generate topic.json files for one roadmap stage.
 *
 * tree: array of root nodes. Each node:
 *   { id, title, summary?, level?, children?: [...] }
 * - Root nodes use a global `order` starting at rootStartOrder.
 * - Subtopics keep their plain id, parentId = root id, order = 1..n.
 * - Sub-subtopics get id `${parentId}--${id}`, order = 1..n.
 * Existing topic.json files are preserved (skipped) so this is safe to re-run.
 */
export function generateStage({ stageTag, rootStartOrder, tree }) {
  let written = 0
  let skipped = 0

  const writeTopic = (meta) => {
    const dir = resolve(SUBJECT_DIR, 'topics', meta.id)
    const file = resolve(dir, 'topic.json')
    if (existsSync(file)) {
      skipped += 1
      return
    }
    mkdirSync(dir, { recursive: true })
    writeFileSync(file, JSON.stringify(meta, null, 2) + '\n')
    written += 1
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

  console.log(`Stage "${stageTag}": wrote ${written}, skipped ${skipped} existing.`)
  return written
}
