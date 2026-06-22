/**
 * Scaffold sub-subtopics for Claude stages 17, 24, and 25.
 *
 * Stage 17: Android Native Integration (Kotlin/Jetpack)
 * Stage 24: Enterprise Development & Enablement
 * Stage 25: Production-Grade Application Lifecycle
 *
 * Run: node scripts/claude/scaffold-stage17-24-25.mjs
 */
import { attachSubSubtopics } from './addTopics.mjs'
import {
  STAGE17_ANDROID,
  STAGE24_ENTERPRISE,
  STAGE25_LIFECYCLE,
} from './data/stage24-25-subsubtopics.mjs'

const result = attachSubSubtopics([
  ...STAGE17_ANDROID,
  ...STAGE24_ENTERPRISE,
  ...STAGE25_LIFECYCLE,
])

console.log(
  `[claude] scaffold complete: ${result.written} written, ${result.skipped} skipped`,
)
