import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Append "Enterprise Development & Enablement" and "Production-Grade
 * Application Lifecycle" stages (or any custom stages) to a subject's roadmap
 * and create matching topic files on disk.
 *
 * Each stage entry must have the shape:
 *   { id, title, summary, tag, nodes: [{ id, title, summary?, level?, children?: [...] }] }
 *
 * Top-level (root) nodes are written with no `parentId`, the stage tag, and an
 * order high enough to follow existing roots. Children get
 * `${root.id}--${child.id}` ids and order 1..n. Topics whose folders already
 * exist are skipped (the user explicitly asked to ignore duplicates).
 *
 * @param {object} opts
 * @param {string} opts.subjectId           Subject directory name (e.g. "angular").
 * @param {Array} opts.stages               New stages to append.
 * @param {number} [opts.startOrder=1000]   Starting order for new root topics.
 */
export function addEnterpriseStages({ subjectId, stages, startOrder = 1000 }) {
  const subjectDir = resolve(__dirname, '../../src/content/subjects', subjectId)
  const topicsDir = resolve(subjectDir, 'topics')
  const roadmapFile = resolve(subjectDir, 'roadmap.json')

  const existing = new Set()
  for (const d of readdirSync(topicsDir, { withFileTypes: true })) {
    if (d.isDirectory()) existing.add(d.name)
  }

  let written = 0
  let skipped = 0
  let rootOrder = startOrder

  const writeTopic = (meta) => {
    const dir = resolve(topicsDir, meta.id)
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'topic.json'), JSON.stringify(meta, null, 2) + '\n')
    existing.add(meta.id)
    written += 1
  }

  for (const stage of stages) {
    for (const root of stage.nodes) {
      const tag = stage.tag
      const rootLevel = root.level ?? 'intermediate'
      if (existing.has(root.id)) {
        skipped += 1
      } else {
        writeTopic({
          id: root.id,
          title: root.title,
          summary: root.summary ?? root.title,
          order: rootOrder,
          level: rootLevel,
          tags: [tag],
        })
      }
      rootOrder += 1

      ;(root.children ?? []).forEach((child, idx) => {
        const childId = `${root.id}--${child.id}`
        if (existing.has(childId)) {
          skipped += 1
          return
        }
        writeTopic({
          id: childId,
          title: child.title,
          order: idx + 1,
          level: child.level ?? rootLevel,
          tags: [tag],
          parentId: root.id,
        })
      })
    }
  }

  const roadmap = JSON.parse(readFileSync(roadmapFile, 'utf8'))
  const existingStageIds = new Set(roadmap.stages.map((s) => s.id))
  for (const stage of stages) {
    if (existingStageIds.has(stage.id)) continue
    roadmap.stages.push({
      id: stage.id,
      title: stage.title,
      summary: stage.summary,
      nodes: stage.nodes.map((root) => ({
        id: root.id,
        title: root.title,
        topicId: root.id,
        status: 'core',
        description: root.summary ?? root.title,
      })),
    })
  }
  writeFileSync(roadmapFile, JSON.stringify(roadmap, null, 2) + '\n')

  console.log(`[${subjectId}] enterprise/production additions: wrote ${written}, skipped ${skipped}.`)
  return { written, skipped }
}
