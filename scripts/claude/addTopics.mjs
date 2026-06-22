import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/claude')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')

function loadTopics() {
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

  console.log(`[claude] attachSubSubtopics: wrote ${written}, skipped ${skipped}`)
  return { written, skipped }
}
