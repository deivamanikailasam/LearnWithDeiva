import { readdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/system-design')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')

const topics = readdirSync(TOPICS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => ({ dir: d.name, ...JSON.parse(readFileSync(resolve(TOPICS_DIR, d.name, 'topic.json'))) }))

const ids = new Set()
const dupes = []
for (const t of topics) {
  if (ids.has(t.id)) dupes.push(t.id)
  ids.add(t.id)
  if (t.id !== t.dir) console.log(`MISMATCH dir/id: ${t.dir} vs ${t.id}`)
}

const roots = topics.filter((t) => !t.parentId)
const orphans = topics.filter((t) => t.parentId && !ids.has(t.parentId))

const roadmap = JSON.parse(readFileSync(resolve(SUBJECT_DIR, 'roadmap.json')))
const nodeTopicIds = roadmap.stages.flatMap((s) => s.nodes.map((n) => n.topicId))
const missingRootForNode = nodeTopicIds.filter((tid) => !ids.has(tid))
const rootsNotInRoadmap = roots.map((r) => r.id).filter((id) => !nodeTopicIds.includes(id))

const byLevel = topics.reduce((acc, t) => {
  acc[t.level] = (acc[t.level] ?? 0) + 1
  return acc
}, {})

console.log('--- System Design validation ---')
console.log('total topic files :', topics.length)
console.log('root topics       :', roots.length)
console.log('roadmap nodes     :', nodeTopicIds.length)
console.log('by level          :', byLevel)
console.log('duplicate ids     :', dupes.length ? dupes : 'none')
console.log('orphan parentIds  :', orphans.length ? orphans.map((o) => `${o.id} -> ${o.parentId}`) : 'none')
console.log('nodes w/o root    :', missingRootForNode.length ? missingRootForNode : 'none')
console.log('roots not in nodes:', rootsNotInRoadmap.length ? rootsNotInRoadmap : 'none')
