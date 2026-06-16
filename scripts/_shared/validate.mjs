import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Validate the consistency of a subject's roadmap + topic tree. Reports
 * duplicates, orphan parents and mismatches between roadmap nodes and the
 * actual root topics on disk. Exits with a non-zero status if any problem is
 * found so the call can be used as a CI guard.
 */
export function validateSubject(subjectId) {
  const subjectDir = resolve(__dirname, '../../src/content/subjects', subjectId)
  const topicsDir = resolve(subjectDir, 'topics')

  const missingMeta = []
  const topics = readdirSync(topicsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((d) => {
      const file = resolve(topicsDir, d.name, 'topic.json')
      if (!existsSync(file)) {
        missingMeta.push(d.name)
        return []
      }
      return [{ dir: d.name, ...JSON.parse(readFileSync(file)) }]
    })

  const ids = new Set()
  const dupes = []
  const mismatches = []
  for (const t of topics) {
    if (ids.has(t.id)) dupes.push(t.id)
    ids.add(t.id)
    if (t.id !== t.dir) mismatches.push(`${t.dir} vs ${t.id}`)
  }

  const roots = topics.filter((t) => !t.parentId)
  const orphans = topics.filter((t) => t.parentId && !ids.has(t.parentId))
  const roadmap = JSON.parse(readFileSync(resolve(subjectDir, 'roadmap.json')))
  const nodeTopicIds = roadmap.stages.flatMap((s) => s.nodes.map((n) => n.topicId))
  const missingRootForNode = nodeTopicIds.filter((tid) => !ids.has(tid))
  const rootsNotInRoadmap = roots.map((r) => r.id).filter((id) => !nodeTopicIds.includes(id))

  const byLevel = topics.reduce((acc, t) => {
    acc[t.level] = (acc[t.level] ?? 0) + 1
    return acc
  }, {})

  const ok =
    dupes.length === 0 &&
    mismatches.length === 0 &&
    orphans.length === 0 &&
    missingRootForNode.length === 0

  console.log(`--- ${subjectId} validation ---`)
  console.log('total topic files :', topics.length)
  console.log('root topics       :', roots.length)
  console.log('roadmap nodes     :', nodeTopicIds.length)
  console.log('by level          :', byLevel)
  console.log('missing topic.json:', missingMeta.length ? missingMeta : 'none')
  console.log('duplicate ids     :', dupes.length ? dupes : 'none')
  console.log('dir/id mismatches :', mismatches.length ? mismatches : 'none')
  console.log('orphan parentIds  :', orphans.length ? orphans.map((o) => `${o.id} -> ${o.parentId}`) : 'none')
  console.log('nodes w/o root    :', missingRootForNode.length ? missingRootForNode : 'none')
  console.log('roots not in nodes:', rootsNotInRoadmap.length ? rootsNotInRoadmap : `none (${roots.length === nodeTopicIds.length ? 'aligned' : 'mismatch'})`)

  return { ok, total: topics.length, roots: roots.length, nodes: nodeTopicIds.length }
}

const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (invokedDirectly) {
  const subjectId = process.argv[2]
  if (!subjectId) {
    console.error('Usage: node scripts/_shared/validate.mjs <subjectId>')
    process.exit(2)
  }
  const { ok } = validateSubject(subjectId)
  process.exit(ok ? 0 : 1)
}
