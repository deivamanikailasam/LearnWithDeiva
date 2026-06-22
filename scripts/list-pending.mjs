/**
 * List sub-subtopics that still need content for a subject.
 *
 * Walks the same Stage -> Topic -> Subtopic -> Sub-subtopic tree that
 * scripts/build-perplexity-space.mjs builds, and reports every sub-subtopic
 * that has no renderable content document yet. "Renderable" matches what
 * scripts/gen-content.mjs (loadTopic) actually reads: `topics/<id>/document.json`
 * (TipTap) or `topics/<id>/explanation.json` (legacy blocks). A sub-subtopic is
 * pending when neither exists.
 *
 * Used by the Claude Code `/gen-next` workflow to pick a deterministic target
 * without depending on the gitignored `space/<subject>/QUEUE.md`.
 *
 * Output: a ready-to-use `scope` object (the same shape OUTPUT-CONTRACT.md
 * expects) for the FIRST pending sub-subtopic, or — with --all — a JSON array
 * of every pending scope.
 *
 * Usage:
 *   node scripts/list-pending.mjs --subject claude
 *   node scripts/list-pending.mjs --subject gen-ai --stage computing-foundations
 *   node scripts/list-pending.mjs --subject claude --all
 *   node scripts/list-pending.mjs --subject claude --all --count
 */
import { readFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SUBJECTS_DIR = path.join(ROOT, 'src', 'content', 'subjects')

function parseArgs(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith('--')) continue
    const key = a.slice(2)
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) {
      out[key] = true
    } else {
      out[key] = next
      i++
    }
  }
  return out
}

async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'))
  } catch {
    return undefined
  }
}

async function listDirs(dir) {
  if (!existsSync(dir)) return []
  const entries = await readdir(dir, { withFileTypes: true })
  return entries.filter((e) => e.isDirectory()).map((e) => e.name)
}

/** Read every topic.json under a subject; return a map keyed by topic id. */
async function loadAllTopics(subjectDir) {
  const topicsDir = path.join(subjectDir, 'topics')
  const ids = await listDirs(topicsDir)
  const byId = new Map()
  await Promise.all(
    ids.map(async (id) => {
      const meta = await readJson(path.join(topicsDir, id, 'topic.json'))
      if (meta && meta.id) byId.set(meta.id, meta)
    }),
  )
  return byId
}

/** Build a parent -> children adjacency map from the flat topics list. */
function buildChildren(topics) {
  const children = new Map()
  for (const t of topics.values()) {
    const parent = t.parentId
    if (!parent) continue
    if (!children.has(parent)) children.set(parent, [])
    children.get(parent).push(t)
  }
  for (const list of children.values()) {
    list.sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  }
  return children
}

/**
 * Flatten the roadmap into an ordered list of sub-subtopic scope objects.
 * Mirrors buildRoadmapTree() in build-perplexity-space.mjs: depth-3 nodes
 * (a roadmap node -> subtopic -> sub-subtopic) are the leaves we author.
 */
function flattenSubsubtopics({ roadmap, topics, children, stageFilter }) {
  const stages = stageFilter
    ? roadmap.stages.filter((s) => s.id === stageFilter)
    : roadmap.stages
  if (stageFilter && stages.length === 0) {
    throw new Error(
      `--stage "${stageFilter}" not found in roadmap. Available: ${roadmap.stages
        .map((s) => s.id)
        .join(', ')}`,
    )
  }
  const out = []
  for (const stage of stages) {
    for (const node of stage.nodes) {
      const topicId = node.topicId ?? node.id
      const subtopicMetas = children.get(topicId) ?? []
      for (const sub of subtopicMetas) {
        const subsubs = children.get(sub.id) ?? []
        for (const leaf of subsubs) {
          out.push({
            scope: {
              subject: roadmap.__subject,
              stageId: stage.id,
              topicId,
              subtopicId: sub.id,
              subsubtopicId: leaf.id,
            },
            title: leaf.title,
            level: leaf.level,
            path: `${stage.title} -> ${topics.get(topicId)?.title ?? topicId} -> ${sub.title} -> ${leaf.title}`,
          })
        }
      }
    }
  }
  return out
}

/**
 * A sub-subtopic is "pending" when it has no renderable content document, i.e.
 * neither `document.json` nor `explanation.json` exists at the topic root —
 * the exact files scripts/gen-content.mjs reads.
 */
function isPending(subjectDir, subsubtopicId) {
  const topicDir = path.join(subjectDir, 'topics', subsubtopicId)
  if (existsSync(path.join(topicDir, 'document.json'))) return false
  if (existsSync(path.join(topicDir, 'explanation.json'))) return false
  return true
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const subjectId = args.subject
  if (!subjectId) {
    console.error(
      'Usage: node scripts/list-pending.mjs --subject <id> [--stage <stageId>] [--all] [--count]',
    )
    process.exit(2)
  }

  const subjectDir = path.join(SUBJECTS_DIR, subjectId)
  if (!existsSync(subjectDir)) {
    console.error(`Subject not found: ${path.relative(ROOT, subjectDir)}`)
    process.exit(1)
  }

  const roadmap = await readJson(path.join(subjectDir, 'roadmap.json'))
  if (!roadmap) {
    console.error(`No roadmap.json found for subject ${subjectId}`)
    process.exit(1)
  }
  roadmap.__subject = subjectId

  const topics = await loadAllTopics(subjectDir)
  const children = buildChildren(topics)
  const stageFilter = typeof args.stage === 'string' ? args.stage : undefined
  const leaves = flattenSubsubtopics({ roadmap, topics, children, stageFilter })

  const pending = leaves.filter((leaf) =>
    isPending(subjectDir, leaf.scope.subsubtopicId),
  )

  if (args.count) {
    console.log(
      `${pending.length} pending of ${leaves.length} sub-subtopics in "${subjectId}"${
        stageFilter ? ` (stage ${stageFilter})` : ''
      }.`,
    )
    return
  }

  if (pending.length === 0) {
    console.error(
      `No pending sub-subtopics in "${subjectId}"${stageFilter ? ` (stage ${stageFilter})` : ''} — every leaf already has section files.`,
    )
    process.exit(3)
  }

  if (args.all) {
    console.log(JSON.stringify(pending, null, 2))
    return
  }

  const first = pending[0]
  console.log(`# Next pending: ${first.path}`)
  console.log(`# (${pending.length} pending of ${leaves.length} total)`)
  console.log(JSON.stringify(first.scope, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
