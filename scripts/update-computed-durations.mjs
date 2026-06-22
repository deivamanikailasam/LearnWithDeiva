#!/usr/bin/env node
/**
 * Compute study hours from document.json and write to topic.json.
 * Uses the same logic as the dev-server save endpoint (vite.config.ts).
 *
 * Usage:
 *   node scripts/update-computed-durations.mjs --subject agentic-ai [--topic <id>] [--stage <stageId>]
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { estimateDurationFromTiptap } from './lib/estimate-duration-from-tiptap.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SUBJECTS_DIR = path.join(__dirname, '../src/content/subjects')

function parseArgs(argv) {
  const args = { subject: null, topic: null, stage: null }
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--subject' && argv[i + 1]) args.subject = argv[++i]
    else if (argv[i] === '--topic' && argv[i + 1]) args.topic = argv[++i]
    else if (argv[i] === '--stage' && argv[i + 1]) args.stage = argv[++i]
  }
  return args
}

function loadStageTopicIds(subjectDir, stageId) {
  const roadmap = JSON.parse(readFileSync(path.join(subjectDir, 'roadmap.json'), 'utf8'))
  const stage = roadmap.stages?.find((s) => s.id === stageId)
  if (!stage) return null
  return new Set(stage.nodes.map((n) => n.topicId))
}

function isLeaf(metas, id) {
  return !metas.some((m) => m.parentId === id)
}

function main() {
  const { subject, topic: singleTopic, stage } = parseArgs(process.argv)
  if (!subject) {
    console.error('Usage: node scripts/update-computed-durations.mjs --subject <id> [--topic <id>] [--stage <stageId>]')
    process.exit(1)
  }

  const subjectDir = path.join(SUBJECTS_DIR, subject)
  const topicsDir = path.join(subjectDir, 'topics')
  const stageTopicIds = stage ? loadStageTopicIds(subjectDir, stage) : null
  if (stage && !stageTopicIds) {
    console.error(`Stage not found: ${stage}`)
    process.exit(1)
  }

  const topicIds = singleTopic
    ? [singleTopic]
    : readdirSync(topicsDir).filter((d) => existsSync(path.join(topicsDir, d, 'topic.json')))

  const metas = topicIds.map((id) => {
    const p = path.join(topicsDir, id, 'topic.json')
    return JSON.parse(readFileSync(p, 'utf8'))
  })

  let updated = 0
  for (const meta of metas) {
    if (singleTopic && meta.id !== singleTopic) continue
    if (stageTopicIds) {
      let cur = meta
      let inStage = false
      while (cur) {
        if (stageTopicIds.has(cur.id)) {
          inStage = true
          break
        }
        cur = cur.parentId ? metas.find((m) => m.id === cur.parentId) : null
      }
      if (!inStage) continue
    }
    if (!isLeaf(metas, meta.id)) continue
    if (meta.hoursSource === 'manual') continue

    const docPath = path.join(topicsDir, meta.id, 'document.json')
    if (!existsSync(docPath)) continue

    const doc = JSON.parse(readFileSync(docPath, 'utf8'))
    if (doc.format !== 'tiptap/v1' || !doc.doc) continue

    const level = meta.level ?? 'beginner'
    const hours = estimateDurationFromTiptap(doc.doc, level)
    meta.hours = hours
    meta.hoursSource = 'computed'
    writeFileSync(
      path.join(topicsDir, meta.id, 'topic.json'),
      `${JSON.stringify(meta, null, 2)}\n`,
      'utf8',
    )
    console.log(`${meta.id}: ${hours}h (${level})`)
    updated++
  }

  console.log(`Updated ${updated} topic(s).`)
}

main()
