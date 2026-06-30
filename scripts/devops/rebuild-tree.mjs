/**
 * Rebuild the DevOps subject topic tree to enforce a strict 3-level hierarchy:
 *   Topic (roadmap node) → Subtopic → Sub-subtopic (content leaf)
 *
 * - Keeps roadmap.json stages unchanged.
 * - Technical topics use taxonomy from part scripts (generated + overrides).
 * - Enterprise/production topics use curated groupings.
 * - Removes orphaned topic folders (no document.json exists yet).
 *
 * Usage:
 *   node scripts/devops/extract-taxonomy.mjs   # refresh generated taxonomy
 *   node scripts/devops/rebuild-tree.mjs [--dry-run]
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
import { GENERATED_TAXONOMY } from './taxonomy.generated.mjs'
import { TAXONOMY_OVERRIDES } from './taxonomy-overrides.mjs'
import { ENTERPRISE_GROUPINGS } from './enterprise-groupings.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/devops')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')
const DRY_RUN = process.argv.includes('--dry-run')

const ENTERPRISE_STAGES = new Set(['enterprise-delivery', 'production-lifecycle'])

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

/** Build lookup by id and by leaf suffix for title preservation. */
function buildLookups(topics) {
  const byId = new Map(topics.map((t) => [t.id, t]))
  const bySuffix = new Map()
  for (const t of topics) {
    const parts = t.id.split('--')
    const suffix = parts[parts.length - 1]
    if (!bySuffix.has(suffix)) bySuffix.set(suffix, t)
    bySuffix.set(t.id, t)
  }
  return { byId, bySuffix }
}

/** Meta-only leaves (what/why/benefits/tradeoffs as standalone pages). */
function isGranularLeaf(id, title) {
  const slug = id.split('--').pop() ?? id
  if (/^(benefits|tradeoffs|pros|cons|advantages|overview)$/.test(slug)) {
    return true
  }
  if (/^what-is$|^what-are$|^why-/.test(slug)) return true
  const t = (title ?? '').toLowerCase()
  return t === 'benefits' || t === 'tradeoffs'
}

function resolveTitle(existing, leafId, leafTitle, suffixLookup) {
  if (existing?.title) return existing.title
  const bySuffix = suffixLookup.get(leafId) ?? suffixLookup.get(leafId.split('--').pop())
  if (bySuffix?.title) return bySuffix.title
  return leafTitle ?? leafId.replace(/-/g, ' ')
}

function addTopic(meta) {
  out.set(meta.id, meta)
}

function buildTechnicalTree(root, subtopics, suffixLookup) {
  addTopic({
    id: root.id,
    title: root.title,
    summary: root.summary ?? root.title,
    order: root.order,
    level: root.level ?? 'beginner',
    tags: root.tags ?? [],
  })

  subtopics.forEach((sub, subIdx) => {
    const subId = sub.id.includes('--') ? sub.id : sub.id
    const existingSub = suffixLookup.get(subId)
    addTopic({
      id: subId,
      title: sub.title,
      summary: sub.title,
      order: subIdx + 1,
      level: existingSub?.level ?? root.level ?? 'beginner',
      tags: root.tags ?? [],
      parentId: root.id,
    })

    sub.leaves.forEach((leaf, leafIdx) => {
      const leafSlug = typeof leaf === 'string' ? leaf : leaf.id
      const leafTitle = typeof leaf === 'string' ? undefined : leaf.title
      const leafId = `${subId}--${leafSlug}`
      const existing = suffixLookup.get(leafId) ?? suffixLookup.get(leafSlug)
      const title = resolveTitle(existing, leafId, leafTitle, suffixLookup)

      addTopic({
        id: leafId,
        title,
        summary: title,
        order: leafIdx + 1,
        level: existing?.level ?? root.level ?? 'beginner',
        tags: root.tags ?? [],
        parentId: subId,
      })
    })
  })
}

function buildEnterpriseTree(root, grouping, suffixLookup) {
  addTopic({
    id: root.id,
    title: root.title,
    summary: root.summary ?? root.title,
    order: root.order,
    level: root.level ?? 'advanced',
    tags: root.tags ?? [],
  })

  grouping.forEach((sub, subIdx) => {
    const subId = `${root.id}--${sub.id}`
    addTopic({
      id: subId,
      title: sub.title,
      summary: sub.title,
      order: subIdx + 1,
      level: root.level ?? 'advanced',
      tags: root.tags ?? [],
      parentId: root.id,
    })

    sub.leaves.forEach((leafSlug, leafIdx) => {
      const leafId = `${subId}--${leafSlug}`
      const oldFlatId = `${root.id}--${leafSlug}`
      const existing =
        suffixLookup.get(leafId) ??
        suffixLookup.get(oldFlatId) ??
        suffixLookup.get(leafSlug)
      const title = resolveTitle(existing, leafId, undefined, suffixLookup)

      addTopic({
        id: leafId,
        title,
        summary: title,
        order: leafIdx + 1,
        level: existing?.level ?? root.level ?? 'advanced',
        tags: root.tags ?? [],
        parentId: subId,
      })
    })
  })
}

function getTaxonomy(rootId) {
  if (ENTERPRISE_GROUPINGS[rootId]) return ENTERPRISE_GROUPINGS[rootId]
  if (TAXONOMY_OVERRIDES[rootId]) return TAXONOMY_OVERRIDES[rootId]
  if (GENERATED_TAXONOMY[rootId]) return GENERATED_TAXONOMY[rootId]
  return null
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

  // No depth > 3
  for (const t of out.values()) {
    if (!t.parentId) continue
    const parent = out.get(t.parentId)
    if (!parent) continue
    if (parent.parentId) {
      const grandparent = out.get(parent.parentId)
      if (grandparent?.parentId) {
        errors.push(`Depth > 3: ${t.id}`)
      }
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
      if (existsSync(docPath)) {
        console.warn(`Preserving folder with content: ${dir}`)
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
  const existing = loadExisting()
  const { byId: suffixLookup } = buildLookups(existing)

  const enterpriseRootIds = new Set(
    roadmap.stages
      .filter((s) => ENTERPRISE_STAGES.has(s.id))
      .flatMap((s) => s.nodes.map((n) => n.topicId)),
  )

  let order = 0
  for (const stage of roadmap.stages) {
    for (const node of stage.nodes) {
      order += 1
      const rootExisting = suffixLookup.get(node.topicId)
      const root = {
        id: node.topicId,
        title: node.title,
        summary: node.description ?? node.title,
        order,
        level: rootExisting?.level ?? 'intermediate',
        tags: rootExisting?.tags ?? [stage.id],
      }

      const taxonomy = getTaxonomy(node.topicId)
      if (!taxonomy) {
        console.error(`No taxonomy for root: ${node.topicId}`)
        process.exit(1)
      }

      if (enterpriseRootIds.has(node.topicId)) {
        buildEnterpriseTree(root, taxonomy, suffixLookup)
      } else {
        buildTechnicalTree(root, taxonomy, suffixLookup)
      }
    }
  }

  const errors = validateTree(roadmap)
  if (errors.length) {
    console.error('Validation errors:')
    errors.forEach((e) => console.error(' ', e))
    process.exit(1)
  }

  const { written, removed } = writeTree()

  console.log(`DevOps tree rebuild ${DRY_RUN ? '(dry run)' : 'complete'}.`)
  console.log(`  Topics in new tree: ${out.size}`)

  if (!DRY_RUN) {
    console.log(`  Written: ${written}, Removed folders: ${removed}`)
  }

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
  console.log(`  Granular sub-subtopics (review): ${granular.length}`)
}

main()
