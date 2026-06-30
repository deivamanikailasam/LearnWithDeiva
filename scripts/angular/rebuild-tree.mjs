/**
 * Rebuild the Angular subject topic tree to enforce a strict 3-level hierarchy:
 *   Topic (roadmap node) → Subtopic → Sub-subtopic (content leaf)
 *
 * - Keeps roadmap.json stages unchanged.
 * - Restructures enterprise/production topics from 2 → 3 levels.
 * - Merges granular what/why/benefits/tradeoffs leaves into substantive pages.
 * - Removes orphaned topic folders (preserves document.json files).
 *
 * Usage: node scripts/angular/rebuild-tree.mjs [--dry-run]
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
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/angular')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')
const DRY_RUN = process.argv.includes('--dry-run')

const PRESERVE_CONTENT_IDS = new Set(['intro-overview--what-it-is'])

/** @type {Map<string, object>} */
const out = new Map()

/** Merge leaf ids into a single substantive leaf within the same subtopic. */
const LEAF_MERGES = {
  'di-concepts': {
    'dependency-injection-fundamentals': {
      title: 'Dependency Injection & Inversion of Control',
      merge: ['what-is-di', 'di-benefits', 'inversion-of-control'],
    },
  },
  'micro-frontend-concepts': {
    'micro-frontend-architecture': {
      title: 'Micro-Frontend Architecture & Tradeoffs',
      merge: ['what-are-micro-frontends', 'mfe-tradeoffs'],
    },
  },
  'rxjs-in-angular': {
    'rxjs-in-angular-applications': {
      title: 'RxJS in Angular Applications',
      merge: ['why-rxjs', 'where-angular-uses-rxjs'],
    },
  },
  'hydration-basics': {
    'client-hydration': {
      title: 'Client Hydration',
      merge: ['what-is-hydration', 'full-hydration'],
    },
  },
  'i18n-basics': {
    'angular-i18n-system': {
      title: 'Angular i18n System',
      merge: ['what-is-i18n', 'marking-text'],
    },
  },
  'a11y-fundamentals': {
    'web-accessibility-fundamentals': {
      title: 'Web Accessibility Fundamentals',
      merge: ['what-is-a11y', 'wcag-overview'],
    },
  },
  builders: {
    'custom-angular-builders': {
      title: 'Custom Angular Builders',
      merge: ['what-are-builders', 'custom-builders'],
    },
  },
  schematics: {
    'custom-angular-schematics': {
      title: 'Custom Angular Schematics',
      merge: ['what-are-schematics', 'creating-schematics'],
    },
  },
  'cdk-overview': {
    'angular-cdk-overview': {
      title: 'Angular CDK Overview',
      merge: ['what-is-cdk', 'cdk-modules'],
    },
  },
  'monorepo-concepts': {
    'monorepo-fundamentals': {
      title: 'Monorepo Fundamentals for Angular',
      merge: ['what-is-monorepo', 'nx-overview'],
    },
  },
  'state-fundamentals': {
    'application-state-fundamentals': {
      title: 'Application State Fundamentals',
      merge: ['what-is-state', 'local-vs-global-state'],
    },
  },
  'intro-overview': {
    'angular-platform-overview': {
      title: 'The Angular Platform',
      merge: ['what-it-is', 'spa-concept'],
      preserveId: 'what-it-is',
    },
  },
}

const SUBTOPIC_ABSORB = {
  'lazy-loading': {
    from: 'lazy-loading-benefits',
    into: 'lazy-loading-routes',
    leafMap: {
      'bundle-splitting': 'lazy-route-bundle-splitting',
      'faster-initial-load': 'lazy-loading-performance',
    },
  },
}

const LONE_SUBTOPIC_FOLD = {
  'bundle-optimization': {
    from: 'bundle-optimization--chunk-optimization',
    into: 'reducing-bundle-size',
    leafId: 'code-splitting-strategies',
    title: 'Code Splitting & Chunk Optimization',
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
  if (/^(what-is|what-it-is|why-|benefits|tradeoffs|pros|cons|advantages)/.test(slug)) {
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

    let subs = [...(children.get(root.id) ?? [])]

    const absorb = SUBTOPIC_ABSORB[root.id]
    if (absorb) {
      const fromSub = subs.find((s) => s.id === absorb.from)
      const intoSub = subs.find((s) => s.id === absorb.into)
      if (fromSub && intoSub) {
        const fromLeaves = children.get(fromSub.id) ?? []
        for (const leaf of fromLeaves) {
          const slug = leaf.id.split('--').pop() ?? leaf.id
          const newSlug = absorb.leafMap?.[slug] ?? slug
          const intoLeaves = children.get(intoSub.id) ?? []
          children.set(intoSub.id, intoLeaves)
          intoLeaves.push({
            ...leaf,
            id: `${intoSub.id}--${newSlug}`,
            parentId: intoSub.id,
          })
        }
        subs = subs.filter((s) => s.id !== fromSub.id)
      }
    }

    const fold = LONE_SUBTOPIC_FOLD[root.id]
    if (fold) {
      const fromSub = subs.find((s) => s.id === fold.from)
      const intoSub = subs.find((s) => s.id === fold.into)
      if (fromSub && intoSub) {
        const intoLeaves = children.get(intoSub.id) ?? []
        children.set(intoSub.id, intoLeaves)
        intoLeaves.push({
          id: `${intoSub.id}--${fold.leafId}`,
          title: fold.title,
          summary: fold.title,
          order: 99,
          level: fromSub.level ?? intoSub.level,
          tags: fromSub.tags ?? intoSub.tags,
          parentId: intoSub.id,
        })
        subs = subs.filter((s) => s.id !== fromSub.id)
      }
    }

    subs.forEach((sub, subIdx) => {
      addTopic({
        id: sub.id,
        title: sub.title,
        summary: sub.summary ?? sub.title,
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

  console.log(`Angular tree rebuild ${DRY_RUN ? '(dry run)' : 'complete'}.`)
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
}

main()
