/**
 * Scaffold sub-subtopics for Agentic AI stages 19 and 20.
 *
 * Stage 19: Enterprise Development & Enablement
 * Stage 20: Production-Grade Application Lifecycle
 *
 * Run: node scripts/agentic/scaffold-stage19-20.mjs
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { attachSubSubtopics } from './addTopics.mjs'
import { ALL_ATTACHMENTS } from './data/stage19-20-subsubtopics.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TOPICS_DIR = resolve(__dirname, '../../src/content/subjects/agentic-ai/topics')

function loadExistingIds() {
  const ids = new Set()
  for (const d of readdirSync(TOPICS_DIR, { withFileTypes: true })) {
    if (!d.isDirectory()) continue
    const file = resolve(TOPICS_DIR, d.name, 'topic.json')
    if (!existsSync(file)) continue
    ids.add(JSON.parse(readFileSync(file, 'utf8')).id)
  }
  return ids
}

const existing = loadExistingIds()
const attachments = ALL_ATTACHMENTS.filter(({ parentId }) => existing.has(parentId))
const skippedParents = ALL_ATTACHMENTS.length - attachments.length

if (skippedParents > 0) {
  console.log(`[agentic-ai] skipping ${skippedParents} attachment groups with no matching subtopic parent`)
}

const result = attachSubSubtopics(attachments)

console.log(
  `[agentic-ai] scaffold complete: ${result.written} written, ${result.skipped} skipped (${attachments.length} parent groups)`,
)
