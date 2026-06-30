/**
 * Draft flat-topic groupings from the current on-disk tree.
 * Run: node scripts/docker/generate-flat-groupings.mjs > scripts/docker/flat-groupings.mjs
 */
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MANUAL_FLAT_OVERRIDES } from './flat-groupings-overrides.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TOPICS_DIR = resolve(__dirname, '../../src/content/subjects/docker/topics')

function loadTopics() {
  return readdirSync(TOPICS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const meta = JSON.parse(
        readFileSync(resolve(TOPICS_DIR, d.name, 'topic.json'), 'utf8'),
      )
      return meta
    })
}

function childSlug(id, parentId) {
  if (id.startsWith(`${parentId}--`)) return id.slice(parentId.length + 2)
  return id.split('--').pop() ?? id
}

function inferSubtopicTitle(leaves, index, total, rootTitle) {
  const slugs = leaves.map((l) => l.slug)
  if (slugs.every((s) => s.startsWith('docker-'))) return 'Docker CLI Commands'
  if (slugs.every((s) => s.startsWith('compose-'))) return 'Compose Features'
  if (slugs.every((s) => s.startsWith('swarm-'))) return 'Swarm Operations'
  if (slugs.every((s) => s.startsWith('oci-'))) return 'OCI Specifications'
  if (total === 1) return `${rootTitle} Core`
  if (total === 2) return index === 0 ? `${rootTitle} Fundamentals` : `${rootTitle} Advanced`
  if (total === 3) {
    return ['Foundations', 'Configuration & Operations', 'Expert Topics'][index] ?? `Area ${index + 1}`
  }
  return `Topic Area ${index + 1}`
}

function autoGroup(rootId, rootTitle, orphans) {
  if (orphans.length <= 4) {
    return [
      {
        id: 'core',
        title: `${rootTitle} Core`,
        leaves: orphans.map((o) => o.slug),
      },
    ]
  }

  const groupCount =
    orphans.length <= 8 ? 2 : orphans.length <= 14 ? 3 : orphans.length <= 21 ? 4 : 5
  const chunkSize = Math.ceil(orphans.length / groupCount)
  const groups = []

  for (let i = 0; i < groupCount; i++) {
    const chunk = orphans.slice(i * chunkSize, (i + 1) * chunkSize)
    if (chunk.length === 0) continue
    groups.push({
      id: `area-${i + 1}`,
      title: inferSubtopicTitle(chunk, i, groupCount, rootTitle),
      leaves: chunk.map((o) => o.slug),
    })
  }
  return groups
}

const topics = loadTopics()
const byId = new Map(topics.map((t) => [t.id, t]))
const children = (id) =>
  topics.filter((t) => t.parentId === id).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

const roots = topics.filter((t) => !t.parentId).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
const flatGroupings = {}

for (const root of roots) {
  const subs = children(root.id)
  const hasGrand = subs.some((s) => children(s.id).length > 0)
  if (hasGrand) continue

  const orphans = subs.map((s) => ({
    slug: childSlug(s.id, root.id),
    title: s.title,
  }))

  if (orphans.length === 0) continue

  flatGroupings[root.id] =
    MANUAL_FLAT_OVERRIDES[root.id] ?? autoGroup(root.id, root.title, orphans)
}

console.log('/** Auto-generated flat topic groupings — edit flat-groupings-overrides.mjs for manual fixes. */')
console.log('export const FLAT_GROUPINGS = ' + JSON.stringify(flatGroupings, null, 2))
