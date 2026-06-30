/**
 * Rebuild the Docker subject topic tree to enforce a strict 3-level hierarchy:
 *   Topic (roadmap node) → Subtopic → Sub-subtopic (content leaf)
 *
 * - Keeps roadmap.json stages unchanged.
 * - Converts the old 2-level `${root}--${leaf}` layout into proper subtopics.
 * - Merges granular what/why/benefits/tradeoffs leaves into substantive pages.
 * - Removes orphaned topic folders (preserves document.json when present).
 *
 * Usage:
 *   node scripts/docker/generate-flat-groupings.mjs > scripts/docker/flat-groupings.mjs
 *   node scripts/docker/rebuild-tree.mjs [--dry-run]
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
import { FLAT_GROUPINGS } from './flat-groupings.mjs'
import {
  LEAF_ENRICHMENTS,
  NEW_ROOT_TOPICS,
  NEW_SUBTOPICS,
  ROOT_GROUPING_OVERRIDES,
} from './taxonomy-expansion.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/docker')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')
const DRY_RUN = process.argv.includes('--dry-run')

const ENTERPRISE_STAGE_IDS = new Set(['enterprise-delivery', 'production-lifecycle'])
const PRESERVE_CONTENT_IDS = new Set()

/** Old slug → new substantive leaf for merged granular pages. */
const LEAF_RENAMES = {
  'what-are-containers': {
    slug: 'container-isolation-model',
    title: 'Container Isolation Model',
  },
  'container-use-cases': {
    slug: 'workload-fit-patterns',
    title: 'Workload Fit Patterns',
  },
  'container-benefits-limitations': {
    slug: 'constraints-and-tradeoffs',
    title: 'Constraints & Tradeoffs',
  },
}

/** Group flat orphan siblings under partially nested topics. */
const PARTIAL_ORPHAN_GROUPINGS = {
  'creating-containers': [
    {
      id: 'lifecycle-commands',
      title: 'Container Lifecycle Commands',
      leaves: [
        'docker-create',
        'docker-start',
        'docker-stop',
        'docker-restart',
        'docker-pause-unpause',
        'docker-kill',
        'docker-rm',
        'docker-wait',
        'docker-update',
      ],
    },
  ],
  'inspecting-containers': [
    {
      id: 'runtime-inspection',
      title: 'Runtime Inspection',
      leaves: ['docker-top', 'docker-stats', 'docker-port', 'docker-diff'],
    },
  ],
  'interacting-with-containers': [
    {
      id: 'container-mutation',
      title: 'Container Mutation & Data Transfer',
      leaves: ['docker-attach', 'docker-cp', 'docker-commit', 'docker-rename'],
    },
  ],
  'container-runtime-options': [
    {
      id: 'identity-environment',
      title: 'Identity & Environment',
      leaves: [
        'hostname-domain',
        'working-directory-flag',
        'user-flag',
        'platform-flag-run',
      ],
    },
    {
      id: 'process-behavior',
      title: 'Process Behavior',
      leaves: [
        'entrypoint-override',
        'command-override',
        'read-only-rootfs',
        'tmpfs-mounts-run',
        'init-process-flag',
        'stop-signal',
        'stop-timeout',
        'attach-stdio',
      ],
    },
    {
      id: 'kernel-resources',
      title: 'Kernel & Resource Options',
      leaves: ['sysctl-flag', 'shm-size', 'ulimit-runtime', 'log-opt-runtime'],
    },
  ],
  'resource-constraints': [
    {
      id: 'process-pid-limits',
      title: 'Process Limits',
      leaves: ['pids-limits'],
    },
  ],
  'docker-installation': [
    {
      id: 'platform-installs',
      title: 'Platform Install Paths',
      leaves: [
        'install-docker-desktop',
        'install-docker-engine-linux',
        'install-docker-windows',
        'install-docker-mac',
        'docker-on-wsl2',
        'homebrew-cask-docker',
      ],
    },
    {
      id: 'install-operations',
      title: 'Install Operations',
      leaves: [
        'post-install-steps',
        'non-root-user-setup',
        'docker-versioning',
        'uninstalling-docker',
        'air-gapped-install',
        'static-binaries-install',
      ],
    },
  ],
  'docker-cli-configuration': [
    {
      id: 'cli-behavior',
      title: 'CLI Behavior',
      leaves: ['cli-plugins', 'docker-config-file', 'shell-completion', 'docker-environment-vars', 'docker-cli-pagination'],
    },
  ],
  'linux-container-primitives': [
    {
      id: 'isolation-hardening',
      title: 'Isolation & Hardening Primitives',
      leaves: [
        'linux-capabilities',
        'seccomp',
        'apparmor',
        'selinux',
        'overlay-filesystem',
        'union-mounts',
        'pivot-root-chroot',
        'idmap-mounts',
        'criu-checkpoint-restore',
        'subuid-subgid-files',
      ],
    },
  ],
}

/** @type {Map<string, object>} */
const out = new Map()

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

function childSlug(id, parentId) {
  if (id.startsWith(`${parentId}--`)) return id.slice(parentId.length + 2)
  return id.split('--').pop() ?? id
}

function isGranularLeaf(id, title) {
  const slug = id.split('--').pop() ?? id
  if (
    /^(what-is|what-it-is|what-are|why-|benefits|tradeoffs|pros|cons|advantages|use-cases)$/.test(
      slug,
    )
  ) {
    return true
  }
  if (/^(what-is|what-are|why-|benefits$|tradeoffs$|use-cases$)/.test(slug)) {
    return true
  }
  const t = (title ?? '').toLowerCase()
  return (
    t.startsWith('what is ') ||
    t.startsWith('what are ') ||
    t.startsWith('why ') ||
    t.startsWith('benefits of ') ||
    t === 'benefits' ||
    t === 'benefits & limitations' ||
    t === 'tradeoffs' ||
    t === 'use cases'
  )
}

function addTopic(meta) {
  out.set(meta.id, meta)
}

function resolveLeafMeta(rootId, subId, leaf, oldBySuffix) {
  const leafDef = typeof leaf === 'string' ? { id: leaf } : leaf
  const rename = LEAF_RENAMES[leafDef.id]
  const slug = rename?.slug ?? leafDef.id
  const old =
    oldBySuffix.get(leafDef.id) ??
    oldBySuffix.get(slug) ??
    oldBySuffix.get(rename?.slug)
  return {
    slug,
    id: `${subId}--${slug}`,
    title: leafDef.title ?? rename?.title ?? old?.title ?? slug.replace(/-/g, ' '),
    summary:
      leafDef.title ??
      rename?.title ??
      old?.summary ??
      old?.title ??
      slug.replace(/-/g, ' '),
    level: old?.level,
  }
}

function writeGroupedSubtopics(root, grouping, oldBySuffix) {
  grouping.forEach((sub, subIdx) => {
    const subId = `${root.id}--${sub.id}`
    addTopic({
      id: subId,
      title: sub.title,
      summary: sub.title,
      order: subIdx + 1,
      level: root.level ?? 'beginner',
      tags: root.tags ?? [],
      parentId: root.id,
    })

    const leafMetas = sub.leaves
      .map((leaf) => resolveLeafMeta(root.id, subId, leaf, oldBySuffix))
      .filter((leaf, idx, arr) => arr.findIndex((x) => x.slug === leaf.slug) === idx)

    leafMetas.forEach((leaf, leafIdx) => {
      if (isGranularLeaf(leaf.id, leaf.title) && !PRESERVE_CONTENT_IDS.has(leaf.id)) return
      addTopic({
        id: leaf.id,
        title: leaf.title,
        summary: leaf.summary,
        order: leafIdx + 1,
        level: leaf.level ?? root.level ?? 'beginner',
        tags: root.tags ?? [],
        parentId: subId,
      })
    })

    const leaves = [...out.values()].filter((t) => t.parentId === subId)
    if (leaves.length === 0) {
      console.warn(`Subtopic ${subId} has no leaves after filtering — adding overview leaf`)
      addTopic({
        id: `${subId}--overview`,
        title: sub.title,
        summary: sub.title,
        order: 1,
        level: root.level ?? 'beginner',
        tags: root.tags ?? [],
        parentId: subId,
      })
    }
  })
}

function rebuildEnterprise(topics, children, enterpriseRootIds) {
  for (const rootId of enterpriseRootIds) {
    const root = topics.find((t) => t.id === rootId)
    const grouping = ENTERPRISE_GROUPINGS[rootId]
    if (!root || !grouping) {
      console.warn(`Missing enterprise root or grouping: ${rootId}`)
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
    const oldBySuffix = new Map()
    for (const s of oldSubs) {
      oldBySuffix.set(childSlug(s.id, rootId), s)
      for (const leaf of children.get(s.id) ?? []) {
        oldBySuffix.set(childSlug(leaf.id, s.id), leaf)
      }
    }

    writeGroupedSubtopics(root, grouping, oldBySuffix)
  }
}

function autoGroupOrphans(root, orphans) {
  if (orphans.length <= 4) {
    return [{ id: 'core', title: `${root.title} Core`, leaves: orphans.map((o) => o.slug) }]
  }

  const dockerCmds = orphans.filter((o) => o.slug.startsWith('docker-'))
  const composeItems = orphans.filter((o) => o.slug.startsWith('compose-'))
  const rest = orphans.filter(
    (o) => !o.slug.startsWith('docker-') && !o.slug.startsWith('compose-'),
  )
  const groups = []

  if (dockerCmds.length) {
    groups.push({
      id: 'docker-cli-commands',
      title: 'Docker CLI Commands',
      leaves: dockerCmds.map((o) => o.slug),
    })
  }
  if (composeItems.length) {
    groups.push({
      id: 'compose-features',
      title: 'Compose Features',
      leaves: composeItems.map((o) => o.slug),
    })
  }
  if (rest.length) {
    const chunkCount = rest.length <= 8 ? 2 : rest.length <= 14 ? 3 : 4
    const chunkSize = Math.ceil(rest.length / chunkCount)
    for (let i = 0; i < chunkCount; i++) {
      const chunk = rest.slice(i * chunkSize, (i + 1) * chunkSize)
      if (chunk.length === 0) continue
      groups.push({
        id: `topic-area-${i + 1}`,
        title:
          chunkCount === 2
            ? i === 0
              ? `${root.title} Fundamentals`
              : `${root.title} Advanced`
            : `Topic Area ${i + 1}`,
        leaves: chunk.map((o) => o.slug),
      })
    }
  }
  return groups
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

    const direct = children.get(root.id) ?? []
    const oldBySuffix = new Map()
    for (const node of direct) {
      oldBySuffix.set(childSlug(node.id, root.id), node)
      for (const leaf of children.get(node.id) ?? []) {
        oldBySuffix.set(childSlug(leaf.id, node.id), leaf)
      }
    }

    const nestedSubs = []
    const orphans = []

    for (const child of direct) {
      const grandchildren = children.get(child.id) ?? []
      if (grandchildren.length > 0) {
        nestedSubs.push({
          id: childSlug(child.id, root.id),
          title: child.title,
          leaves: grandchildren.map((gc) => childSlug(gc.id, child.id)),
        })
      } else {
        orphans.push({
          slug: childSlug(child.id, root.id),
          title: child.title,
        })
      }
    }

    const grouping = []
    let orderOffset = 0

    for (const sub of nestedSubs) {
      grouping.push(sub)
      orderOffset += 1
    }

    if (orphans.length > 0) {
      const flatGrouping = FLAT_GROUPINGS[root.id]
      const partialGrouping = PARTIAL_ORPHAN_GROUPINGS[root.id]
      const orphanGroups = flatGrouping ?? partialGrouping ?? autoGroupOrphans(root, orphans)
      grouping.push(...orphanGroups)
    } else if (grouping.length === 0 && FLAT_GROUPINGS[root.id]) {
      grouping.push(...FLAT_GROUPINGS[root.id])
    }

    if (grouping.length === 0) {
      console.warn(`Topic ${root.id} has no grouping — creating core subtopic`)
      grouping.push({
        id: 'core',
        title: `${root.title} Core`,
        leaves: [{ id: 'overview', title: root.title }],
      })
    }

    writeGroupedSubtopics(root, grouping, oldBySuffix)
  }
}

function descendantIds(rootId) {
  const ids = new Set()
  let changed = true
  while (changed) {
    changed = false
    for (const t of out.values()) {
      if (t.parentId === rootId || (t.parentId && ids.has(t.parentId))) {
        if (!ids.has(t.id)) {
          ids.add(t.id)
          changed = true
        }
      }
    }
  }
  return ids
}

function removeDescendants(rootId) {
  for (const id of descendantIds(rootId)) {
    out.delete(id)
  }
}

function appendLeaves(subtopicId, leaves, level, tags) {
  const sub = out.get(subtopicId)
  if (!sub) return
  const existing = [...out.values()].filter((t) => t.parentId === subtopicId)
  const existingSlugs = new Set(existing.map((l) => childSlug(l.id, subtopicId)))
  let order = existing.length

  for (const leaf of leaves) {
    const leafDef = typeof leaf === 'string' ? { id: leaf } : leaf
    if (existingSlugs.has(leafDef.id)) continue
    order += 1
    addTopic({
      id: `${subtopicId}--${leafDef.id}`,
      title: leafDef.title ?? leafDef.id.replace(/-/g, ' '),
      summary: leafDef.title ?? leafDef.id.replace(/-/g, ' '),
      order,
      level: level ?? sub.level ?? 'intermediate',
      tags: tags ?? sub.tags ?? [],
      parentId: subtopicId,
    })
  }
}

function applyTaxonomyExpansion(roadmap) {
  let addedRoots = 0
  let overriddenRoots = 0
  let addedSubtopics = 0
  let enrichedLeaves = 0

  for (const [rootId, grouping] of Object.entries(ROOT_GROUPING_OVERRIDES)) {
    const root = out.get(rootId)
    if (!root) continue
    removeDescendants(rootId)
    writeGroupedSubtopics(root, grouping, new Map())
    overriddenRoots += 1
  }

  for (const [rootId, subtopics] of Object.entries(NEW_SUBTOPICS)) {
    const root = out.get(rootId)
    if (!root) continue
    const existingSubs = [...out.values()].filter((t) => t.parentId === rootId)
    const startOrder = existingSubs.length
    subtopics.forEach((sub, idx) => {
      const subId = `${rootId}--${sub.id}`
      if (out.has(subId)) return
      addTopic({
        id: subId,
        title: sub.title,
        summary: sub.title,
        order: startOrder + idx + 1,
        level: root.level ?? 'intermediate',
        tags: root.tags ?? [],
        parentId: rootId,
      })
      sub.leaves.forEach((leaf, leafIdx) => {
        const leafDef = typeof leaf === 'string' ? { id: leaf } : leaf
        addTopic({
          id: `${subId}--${leafDef.id}`,
          title: leafDef.title ?? leafDef.id.replace(/-/g, ' '),
          summary: leafDef.title ?? leafDef.id.replace(/-/g, ' '),
          order: leafIdx + 1,
          level: root.level ?? 'intermediate',
          tags: root.tags ?? [],
          parentId: subId,
        })
      })
      addedSubtopics += 1
    })
  }

  for (const [subtopicId, leaves] of Object.entries(LEAF_ENRICHMENTS)) {
    const sub = out.get(subtopicId)
    if (!sub) continue
    const before = [...out.values()].filter((t) => t.parentId === subtopicId).length
    appendLeaves(subtopicId, leaves, sub.level, sub.tags)
    const after = [...out.values()].filter((t) => t.parentId === subtopicId).length
    enrichedLeaves += after - before
  }

  for (const [rootId, def] of Object.entries(NEW_ROOT_TOPICS)) {
    if (out.has(rootId)) continue
    const root = {
      id: rootId,
      title: def.title,
      summary: def.summary,
      order: def.order,
      level: def.level,
      tags: [def.stageTag],
    }
    addTopic(root)
    writeGroupedSubtopics(root, def.subtopics, new Map())
    addedRoots += 1
  }

  console.log(
    `Taxonomy expansion: ${addedRoots} new roots, ${overriddenRoots} regrouped, ${addedSubtopics} new subtopics, ${enrichedLeaves} enriched leaves`,
  )
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

  const depthErrors = []
  for (const t of out.values()) {
    if (!t.parentId) continue
    const parent = out.get(t.parentId)
    if (!parent) continue
    if (parent.parentId) {
      const grand = out.get(parent.parentId)
      if (grand?.parentId) depthErrors.push(`Depth > 3: ${t.id}`)
    }
  }
  if (depthErrors.length) errors.push(...depthErrors.slice(0, 10))

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
  const enterpriseRootIds = roadmap.stages
    .filter((s) => ENTERPRISE_STAGE_IDS.has(s.id))
    .flatMap((s) => s.nodes.map((n) => n.topicId))

  const topics = loadExisting()
  const children = buildChildrenMap(topics)

  rebuildEnterprise(topics, children, enterpriseRootIds)
  rebuildTechnical(topics, children, enterpriseRootIds)
  applyTaxonomyExpansion(roadmap)

  const errors = validateTree(roadmap)
  if (errors.length) {
    console.error('Validation errors:')
    errors.forEach((e) => console.error(' ', e))
    process.exit(1)
  }

  const { written, removed } = writeTree()

  console.log(`Docker tree rebuild ${DRY_RUN ? '(dry run)' : 'complete'}.`)
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
