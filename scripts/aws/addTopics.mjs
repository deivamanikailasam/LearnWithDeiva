import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/aws')

/**
 * Append individual topics WITHOUT renumbering existing siblings.
 *
 * Each entry: { id, title, summary?, parentId, level, tag, order }
 * - `order` defaults to 90 + index so new items sort after existing siblings.
 * - Skips writing if the file already exists (so duplicates are ignored).
 */
export function addTopics(entries) {
  let written = 0
  let skipped = 0

  entries.forEach((e, i) => {
    const dir = resolve(SUBJECT_DIR, 'topics', e.id)
    const file = resolve(dir, 'topic.json')
    if (existsSync(file)) {
      skipped += 1
      return
    }
    mkdirSync(dir, { recursive: true })
    const meta = {
      id: e.id,
      title: e.title,
      summary: e.summary ?? e.title,
      order: e.order ?? 90 + i,
      level: e.level ?? 'intermediate',
      tags: [e.tag],
    }
    if (e.parentId) meta.parentId = e.parentId
    writeFileSync(file, JSON.stringify(meta, null, 2) + '\n')
    written += 1
  })

  console.log(`addTopics: wrote ${written}, skipped ${skipped} existing.`)
  return written
}
