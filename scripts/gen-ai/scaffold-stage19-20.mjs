/**
 * Scaffold sub-subtopics for GenAI stages 19 and 20.
 *
 * Stage 19: Enterprise Development & Enablement
 * Stage 20: Production-Grade Application Lifecycle
 *
 * Run: node scripts/gen-ai/scaffold-stage19-20.mjs
 */
import { attachSubSubtopics } from './addTopics.mjs'
import {
  STAGE19_ENTERPRISE,
  STAGE20_LIFECYCLE,
} from './data/stage19-20-subsubtopics.mjs'

const result = attachSubSubtopics([
  ...STAGE19_ENTERPRISE,
  ...STAGE20_LIFECYCLE,
])

console.log(
  `[gen-ai] scaffold complete: ${result.written} written, ${result.skipped} skipped`,
)
