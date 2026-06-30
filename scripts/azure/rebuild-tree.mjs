/**
 * Rebuild the Azure subject topic tree to enforce a strict 3-level hierarchy:
 *   Topic (roadmap node) → Subtopic → Sub-subtopic (content leaf)
 *
 * - Keeps roadmap.json stages unchanged.
 * - Restructures enterprise/production topics from 2 → 3 levels.
 * - Merges granular what/why/benefits/tradeoffs leaves into substantive pages.
 * - Removes orphaned topic folders (preserves document.json files).
 *
 * Usage: node scripts/azure/rebuild-tree.mjs [--dry-run]
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ENTERPRISE_GROUPINGS } from './enterprise-groupings.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/azure')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')
const DRY_RUN = process.argv.includes('--dry-run')

const PRESERVE_CONTENT_IDS = new Set()

/** Rename subtopics that used granular framing. */
const SUBTOPIC_RENAMES = {
  'what-is-cloud-computing': {
    title: 'Cloud Computing Fundamentals',
    summary: 'Core concepts, comparisons and evolution of cloud computing.',
  },
  'benefits-of-cloud': {
    title: 'Cloud Value Pillars',
    summary:
      'Availability, scalability, agility, security and governance benefits of the cloud.',
  },
}

/** @type {Map<string, object>} */
const out = new Map()

/** Merge leaf ids into a single substantive leaf within the same subtopic. */
const LEAF_MERGES = {
  'what-is-cloud-computing': {
    'cloud-computing-fundamentals': {
      title: 'Cloud Computing Fundamentals',
      merge: [
        'definition-of-cloud',
        'on-premises-vs-cloud',
        'cloud-vs-traditional-it',
        'history-of-cloud',
      ],
    },
  },
  'benefits-of-cloud': {
    'availability-scalability-elasticity': {
      title: 'Availability, Scalability & Elasticity',
      merge: ['high-availability', 'scalability', 'elasticity'],
    },
    'agility-reliability-predictability': {
      title: 'Agility, Reliability & Predictability',
      merge: ['agility', 'reliability', 'predictability'],
    },
    'security-governance-manageability': {
      title: 'Security, Governance & Manageability',
      merge: ['security', 'governance', 'manageability'],
    },
  },
  'waf-overview': {
    'well-architected-framework': {
      title: 'Azure Well-Architected Framework',
      merge: ['what-is-waf', 'tradeoffs'],
    },
  },
  'caf-overview': {
    'cloud-adoption-framework': {
      title: 'Cloud Adoption Framework Overview',
      merge: ['what-is-caf'],
    },
  },
}

function loadExisting() {
  const topics = []
  for (const dir of readdirSync(TOPICS_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    const file = resolve(TOPICS_DIR, dir.name, 'topic.json')
    if (!existsSync(file)) continue
    topics.push(JSON.parse(readFileSync(file, 'utf8')))
  }
  return topics
}

function buildChildrenMap(topics) {
  const children = new Map()
  for (const t of topics) {
    if (!t.parentId) continue
    const list = children.get(t.parentId) ?? []
    list.push(t)
    children.set(t.parentId, list)
  }
  for (const list of children.values()) {
    list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }
  return children
}

function isGranularLeaf(id, title) {
  const slug = id.split('--').pop() ?? id
  if (
    /^(what-is|what-are|what-it-is|why-|benefits|tradeoffs|pros|cons|advantages|overview)$/.test(
      slug,
    )
  ) {
    return true
  }
  const t = (title ?? '').toLowerCase()
  return (
    t.startsWith('what is ') ||
    t.startsWith('what are ') ||
    t.startsWith('why ') ||
    t.startsWith('benefits of ') ||
    t === 'benefits' ||
    t === 'tradeoffs'
  )
}

function addTopic(meta) {
  out.set(meta.id, meta)
}

function rebuildEnterprise(topics, children, enterpriseRootIds) {
  for (const rootId of enterpriseRootIds) {
    const root = topics.find((t) => t.id === rootId)
    if (!root) continue
    const grouping = ENTERPRISE_GROUPINGS[rootId]
    if (!grouping) {
      console.warn(`No grouping defined for enterprise topic: ${rootId}`)
      continue
    }

    addTopic({
      id: root.id,
      title: root.title,
      summary: root.summary ?? root.title,
      order: root.order,
      level: root.level ?? 'advanced',
      tags: root.tags ?? [],
    })

    const oldSubs = children.get(rootId) ?? []
    const oldBySuffix = new Map(
      oldSubs.map((s) => {
        const suffix = s.id.startsWith(`${rootId}--`)
          ? s.id.slice(rootId.length + 2)
          : s.id
        return [suffix, s]
      }),
    )

    grouping.forEach((sub, subIdx) => {
      const subId = `${rootId}--${sub.id}`
      addTopic({
        id: subId,
        title: sub.title,
        summary: sub.title,
        order: subIdx + 1,
        level: root.level ?? 'advanced',
        tags: root.tags ?? [],
        parentId: rootId,
      })

      sub.leaves.forEach((leafSlug, leafIdx) => {
        const old = oldBySuffix.get(leafSlug)
        addTopic({
          id: `${subId}--${leafSlug}`,
          title: old?.title ?? leafSlug.replace(/-/g, ' '),
          summary: old?.summary ?? old?.title ?? leafSlug.replace(/-/g, ' '),
          order: leafIdx + 1,
          level: old?.level ?? root.level ?? 'advanced',
          tags: root.tags ?? [],
          parentId: subId,
        })
      })
    })
  }
}

function applyLeafMerges(subtopicId, leaves) {
  const rules = LEAF_MERGES[subtopicId]
  if (!rules) return leaves

  let merged = [...leaves]
  for (const [newSlug, rule] of Object.entries(rules)) {
    const toMerge = rule.merge
      .map((slug) => merged.find((l) => (l.id.split('--').pop() ?? l.id) === slug))
      .filter(Boolean)
    if (toMerge.length === 0) continue

    merged = merged.filter(
      (l) =>
        !toMerge.includes(l) ||
        (rule.preserveId && (l.id.split('--').pop() ?? l.id) === rule.preserveId),
    )

    const preserve = rule.preserveId
      ? toMerge.find((l) => (l.id.split('--').pop() ?? l.id) === rule.preserveId)
      : null
    const id = preserve ? preserve.id : `${subtopicId}--${newSlug}`

    if (!merged.some((l) => l.id === id)) {
      merged.unshift({
        ...toMerge[0],
        id,
        title: rule.title,
        summary: rule.title,
      })
    } else {
      const existing = merged.find((l) => l.id === id)
      if (existing) {
        existing.title = rule.title
        existing.summary = rule.title
      }
    }
  }
  return merged
}

function rebuildTechnical(topics, children, enterpriseRootIds) {
  const enterpriseSet = new Set(enterpriseRootIds)
  const roots = topics
    .filter((t) => !t.parentId && !enterpriseSet.has(t.id))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  for (const root of roots) {
    addTopic({
      id: root.id,
      title: root.title,
      summary: root.summary ?? root.title,
      order: root.order,
      level: root.level ?? 'beginner',
      tags: root.tags ?? [],
    })

    const subs = [...(children.get(root.id) ?? [])]

    subs.forEach((sub, subIdx) => {
      const rename = SUBTOPIC_RENAMES[sub.id]
      addTopic({
        id: sub.id,
        title: rename?.title ?? sub.title,
        summary: rename?.summary ?? sub.summary ?? sub.title,
        order: subIdx + 1,
        level: sub.level ?? root.level ?? 'beginner',
        tags: sub.tags ?? root.tags ?? [],
        parentId: root.id,
      })

      let leaves = [...(children.get(sub.id) ?? [])]
      leaves = applyLeafMerges(sub.id, leaves)

      const substantive = leaves.filter((l) => !isGranularLeaf(l.id, l.title))
      if (substantive.length > 0) {
        leaves = leaves.filter(
          (l) => !isGranularLeaf(l.id, l.title) || PRESERVE_CONTENT_IDS.has(l.id),
        )
      }

      if (leaves.length === 0) {
        console.warn(`Subtopic ${sub.id} has no leaves — creating overview leaf`)
        leaves = [
          {
            id: `${sub.id}--overview`,
            title: sub.title,
            summary: sub.summary ?? sub.title,
            level: sub.level,
            tags: sub.tags,
          },
        ]
      }

      leaves.forEach((leaf, leafIdx) => {
        addTopic({
          id: leaf.id,
          title: leaf.title,
          summary: leaf.summary ?? leaf.title,
          order: leafIdx + 1,
          level: leaf.level ?? sub.level ?? root.level ?? 'beginner',
          tags: leaf.tags ?? sub.tags ?? root.tags ?? [],
          parentId: sub.id,
        })
      })
    })
  }
}

function validateTree(roadmap) {
  const errors = []
  const nodeIds = roadmap.stages.flatMap((s) => s.nodes.map((n) => n.topicId))

  for (const nodeId of nodeIds) {
    const root = out.get(nodeId)
    if (!root) {
      errors.push(`Missing root topic: ${nodeId}`)
      continue
    }
    const subs = [...out.values()].filter((t) => t.parentId === nodeId)
    if (subs.length === 0) errors.push(`Topic ${nodeId} has no subtopics`)
    for (const sub of subs) {
      const leaves = [...out.values()].filter((t) => t.parentId === sub.id)
      if (leaves.length === 0) errors.push(`Subtopic ${sub.id} has no sub-subtopics`)
    }
  }

  return errors
}

function writeTree() {
  const existingDirs = new Set(
    readdirSync(TOPICS_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name),
  )
  const newIds = new Set(out.keys())

  let written = 0
  let removed = 0

  if (!DRY_RUN) {
    for (const id of newIds) {
      const dir = resolve(TOPICS_DIR, id)
      mkdirSync(dir, { recursive: true })
      writeFileSync(
        resolve(dir, 'topic.json'),
        JSON.stringify(out.get(id), null, 2) + '\n',
      )
      written += 1
    }

    for (const dir of existingDirs) {
      if (newIds.has(dir)) continue
      const docPath = resolve(TOPICS_DIR, dir, 'document.json')
      if (existsSync(docPath) && PRESERVE_CONTENT_IDS.has(dir)) {
        console.warn(`Preserving orphaned content folder: ${dir}`)
        continue
      }
      rmSync(resolve(TOPICS_DIR, dir), { recursive: true, force: true })
      removed += 1
    }
  }

  return { written, removed }
}

function main() {
  const roadmap = JSON.parse(readFileSync(resolve(SUBJECT_DIR, 'roadmap.json'), 'utf8'))
  const enterpriseStages = new Set(['enterprise-delivery', 'production-lifecycle'])
  const enterpriseRootIds = roadmap.stages
    .filter((s) => enterpriseStages.has(s.id))
    .flatMap((s) => s.nodes.map((n) => n.topicId))

  const topics = loadExisting()
  const children = buildChildrenMap(topics)

  rebuildEnterprise(topics, children, enterpriseRootIds)
  rebuildTechnical(topics, children, enterpriseRootIds)

  const errors = validateTree(roadmap)
  if (errors.length) {
    console.error('Validation errors:')
    errors.forEach((e) => console.error(' ', e))
    process.exit(1)
  }

  const { written, removed } = writeTree()

  console.log(`Azure tree rebuild ${DRY_RUN ? '(dry run)' : 'complete'}.`)
  console.log(`  Topics in new tree: ${out.size}`)
  console.log(`  Written: ${written}, Removed folders: ${removed}`)

  const roots = [...out.values()].filter((t) => !t.parentId).length
  const subs = [...out.values()].filter((t) => {
    if (!t.parentId) return false
    const p = out.get(t.parentId)
    return p && !p.parentId
  }).length
  const leaves = [...out.values()].filter((t) => {
    if (!t.parentId) return false
    const p = out.get(t.parentId)
    return p?.parentId
  }).length
  console.log(`  Depth counts — roots: ${roots}, subtopics: ${subs}, sub-subtopics: ${leaves}`)

  const granular = [...out.values()].filter((t) => {
    const p = out.get(t.parentId)
    return p?.parentId && isGranularLeaf(t.id, t.title)
  })
  console.log(`  Remaining granular sub-subtopics: ${granular.length}`)
}

main()
