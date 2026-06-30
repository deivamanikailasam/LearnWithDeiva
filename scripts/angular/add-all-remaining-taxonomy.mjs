/**
 * Complete remaining Angular taxonomy gaps:
 * - AnalogJS meta-framework
 * - JWT authentication leaves
 * - Expand subtopics with <3 leaves to at least 3
 *
 * No document.json — metadata only.
 *
 * Usage: node scripts/angular/add-all-remaining-taxonomy.mjs [--dry-run]
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/angular')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')
const ROADMAP_FILE = resolve(SUBJECT_DIR, 'roadmap.json')
const DRY_RUN = process.argv.includes('--dry-run')

let written = 0
let skipped = 0

/** @param {Record<string, unknown>} meta */
function writeTopic(meta) {
  const file = resolve(TOPICS_DIR, meta.id, 'topic.json')
  if (existsSync(file)) {
    skipped += 1
    return false
  }
  const payload = { ...meta }
  if (payload.parentId === undefined) delete payload.parentId
  if (!DRY_RUN) {
    mkdirSync(resolve(TOPICS_DIR, meta.id), { recursive: true })
    writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`)
  }
  written += 1
  return true
}

function writeTree(root) {
  writeTopic({
    id: root.id,
    title: root.title,
    summary: root.summary ?? root.title,
    order: root.order,
    level: root.level,
    tags: root.tags,
    parentId: root.parentId,
  })

  for (const [subIdx, sub] of root.subtopics.entries()) {
    const subId = `${root.id}--${sub.id}`
    writeTopic({
      id: subId,
      title: sub.title,
      summary: sub.title,
      order: sub.order ?? subIdx + 1,
      level: sub.level ?? root.level,
      tags: root.tags,
      parentId: root.id,
    })
    for (const [leafIdx, leaf] of sub.leaves.entries()) {
      writeTopic({
        id: `${subId}--${leaf.id}`,
        title: leaf.title,
        summary: leaf.title,
        order: leaf.order ?? leafIdx + 1,
        level: leaf.level ?? sub.level ?? root.level,
        tags: root.tags,
        parentId: subId,
      })
    }
  }
}

function loadMetas() {
  return readdirSync(TOPICS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const p = resolve(TOPICS_DIR, d.name, 'topic.json')
      if (!existsSync(p)) return null
      return JSON.parse(readFileSync(p, 'utf8'))
    })
    .filter(Boolean)
}

function topicDepth(metas, id) {
  let depth = 0
  let cur = metas.find((m) => m.id === id)
  while (cur?.parentId) {
    depth += 1
    cur = metas.find((m) => m.id === cur.parentId)
  }
  return depth
}

const EXPANSION_SUFFIXES = [
  { suffix: 'overview', title: 'Overview' },
  { suffix: 'patterns', title: 'Patterns & Best Practices' },
  { suffix: 'pitfalls', title: 'Common Pitfalls' },
  { suffix: 'testing', title: 'Testing Considerations' },
]

function expandThinSubtopics(metas) {
  const subtopics = metas.filter((m) => topicDepth(metas, m.id) === 1)
  let expanded = 0

  for (const sub of subtopics) {
    const leaves = metas.filter((l) => l.parentId === sub.id)
    if (leaves.length >= 3) continue

    const needed = 3 - leaves.length
    const existingSlugs = new Set(
      leaves.map((l) => l.id.split('--').pop() ?? l.id),
    )

    let added = 0
    for (const tmpl of EXPANSION_SUFFIXES) {
      if (added >= needed) break
      if (existingSlugs.has(tmpl.suffix)) continue
      const leafId = `${sub.id}--${tmpl.suffix}`
      if (existsSync(resolve(TOPICS_DIR, leafId, 'topic.json'))) continue

      const title = `${sub.title.replace(/\s+/g, ' ').trim()} — ${tmpl.title}`
      if (
        writeTopic({
          id: leafId,
          title,
          summary: title,
          order: leaves.length + added + 1,
          level: sub.level ?? 'intermediate',
          tags: sub.tags ?? [],
          parentId: sub.id,
        })
      ) {
        added += 1
        expanded += 1
      }
    }
  }
  return expanded
}

// ── AnalogJS ──────────────────────────────────────────────────────────────────

writeTree({
  id: 'analogjs',
  title: 'AnalogJS',
  order: 1193,
  level: 'advanced',
  tags: ['enterprise-advanced'],
  subtopics: [
    {
      id: 'analog-fundamentals',
      title: 'Analog Fundamentals',
      leaves: [
        { id: 'what-is-analog', title: 'What is AnalogJS?' },
        { id: 'analog-vs-angular', title: 'Analog vs Angular CLI' },
        { id: 'analog-project-structure', title: 'Analog Project Structure' },
      ],
    },
    {
      id: 'analog-features',
      title: 'Analog Features',
      leaves: [
        { id: 'file-based-routing', title: 'File-Based Routing' },
        { id: 'server-side-data', title: 'Server-Side Data Loading' },
        { id: 'content-markdown', title: 'Markdown & Content Routes' },
      ],
    },
    {
      id: 'analog-deployment',
      title: 'Analog Deployment',
      leaves: [
        { id: 'analog-ssr-deploy', title: 'SSR & Static Deployment' },
        { id: 'analog-nitro-adapter', title: 'Nitro Adapter' },
        { id: 'analog-production-tips', title: 'Production Tips' },
      ],
    },
  ],
})

// ── JWT under authentication-authorization ────────────────────────────────────

if (
  writeTopic({
    id: 'authentication-authorization--jwt',
    title: 'JWT in Angular Apps',
    summary: 'JWT in Angular Apps',
    order: 5,
    level: 'advanced',
    tags: ['i18n-a11y-security'],
    parentId: 'authentication-authorization',
  })
) {
  for (const [i, leaf] of [
    { id: 'jwt-storage', title: 'Storing JWTs Securely' },
    { id: 'jwt-interceptor', title: 'JWT Auth Interceptor' },
    { id: 'jwt-refresh', title: 'Refresh Token Flow' },
    { id: 'jwt-validation', title: 'Token Validation & Expiry' },
  ].entries()) {
    writeTopic({
      id: `authentication-authorization--jwt--${leaf.id}`,
      title: leaf.title,
      summary: leaf.title,
      order: i + 1,
      level: 'advanced',
      tags: ['i18n-a11y-security'],
      parentId: 'authentication-authorization--jwt',
    })
  }
} else {
  for (const [i, leaf] of [
    { id: 'jwt-storage', title: 'Storing JWTs Securely' },
    { id: 'jwt-interceptor', title: 'JWT Auth Interceptor' },
    { id: 'jwt-refresh', title: 'Refresh Token Flow' },
    { id: 'jwt-validation', title: 'Token Validation & Expiry' },
  ].entries()) {
    writeTopic({
      id: `authentication-authorization--jwt--${leaf.id}`,
      title: leaf.title,
      summary: leaf.title,
      order: i + 1,
      level: 'advanced',
      tags: ['i18n-a11y-security'],
      parentId: 'authentication-authorization--jwt',
    })
  }
}

const thinExpanded = expandThinSubtopics(loadMetas())

function updateRoadmap() {
  const roadmap = JSON.parse(readFileSync(ROADMAP_FILE, 'utf8'))
  const enterprise = roadmap.stages.find((s) => s.id === 'enterprise-advanced')
  if (enterprise && !enterprise.nodes.some((n) => n.topicId === 'analogjs')) {
    enterprise.nodes.push({
      id: 'analogjs',
      title: 'AnalogJS',
      topicId: 'analogjs',
      status: 'optional',
      description: 'Full-stack Angular meta-framework with file-based routing and SSR.',
    })
  }
  if (!DRY_RUN) {
    writeFileSync(ROADMAP_FILE, `${JSON.stringify(roadmap, null, 2)}\n`)
  }
}

updateRoadmap()

if (!DRY_RUN) {
  execSync('npm run gen:content', {
    cwd: resolve(__dirname, '../..'),
    stdio: 'inherit',
  })
}

console.log(
  `[angular] add-all-remaining: wrote ${written}, skipped ${skipped}, thin expanded ${thinExpanded}${DRY_RUN ? ' (dry-run)' : ''}.`,
)
