/**
 * Extract intended topic structure from scripts/devops/part*.mjs and enterprise.mjs.
 * Outputs a map: rootId -> { subtopics: [{ id, title, leaves: [{ id, title }] }] }
 *
 * Usage: node scripts/devops/extract-taxonomy.mjs
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SCRIPTS_DIR = resolve(__dirname)

/** @type {Map<string, { id: string, title: string, hasChildren: boolean, children?: { id: string, title: string }[] }[]>} */
const byRoot = new Map()

function parsePartFile(path) {
  const src = readFileSync(path, 'utf8')
  let currentRoot = null

  const rootRe = /\/\* ---- ([a-z0-9-]+)(?: \([^)]+\))? ---- \*\//g
  const blocks = src.split(/(?=\/\* ---- [a-z0-9-]+(?: \([^)]+\))? ---- \*\/)/)

  for (const block of blocks) {
    const rootMatch = block.match(/\/\* ---- ([a-z0-9-]+)(?: \([^)]+\))? ---- \*\//)
    if (rootMatch) currentRoot = rootMatch[1]

    if (!currentRoot) continue

    // Match addTopics entries whose parentId matches the current roadmap root
    const entryRe =
      /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*parentId:\s*'([^']+)'(?:,\s*level:\s*'[^']+')?(?:,\s*children:\s*\[([\s\S]*?)\])?\s*,?\s*\}/g

    let m
    while ((m = entryRe.exec(block)) !== null) {
      const [, id, title, parentId, childrenBlock] = m
      if (parentId !== currentRoot) continue
      const children = []
      if (childrenBlock) {
        const childRe = /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)'/g
        let cm
        while ((cm = childRe.exec(childrenBlock)) !== null) {
          children.push({ id: cm[1], title: cm[2] })
        }
      }

      if (!byRoot.has(currentRoot)) byRoot.set(currentRoot, [])
      byRoot.get(currentRoot).push({
        id,
        title,
        hasChildren: children.length > 0,
        children: children.length > 0 ? children : undefined,
      })
    }
  }
}

function parseEnterpriseFile(path) {
  const src = readFileSync(path, 'utf8')
  const stageRe = /nodes:\s*\[([\s\S]*?)\]\s*,?\s*\}/g
  // Simpler: find each root block with id and children array
  const rootRe =
    /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*summary:[\s\S]*?children:\s*\[([\s\S]*?)\]\s*,?\s*\}/g
  let m
  while ((m = rootRe.exec(src)) !== null) {
    const [, rootId, rootTitle, childrenBlock] = m
    const children = []
    const childRe = /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)'/g
    let cm
    while ((cm = childRe.exec(childrenBlock)) !== null) {
      children.push({ id: cm[1], title: cm[2] })
    }
    byRoot.set(rootId, children.map((c) => ({ ...c, hasChildren: false })))
  }
}

for (const f of readdirSync(SCRIPTS_DIR).filter((n) => n.startsWith('part') && n.endsWith('.mjs'))) {
  parsePartFile(resolve(SCRIPTS_DIR, f))
}
// Enterprise/production topics use scripts/devops/enterprise-groupings.mjs instead.

/** Heuristic titles for auto-grouped subtopics. */
const GROUP_TITLE_HINTS = [
  { test: /phase|continuous-/i, title: 'Lifecycle Phases & Continuous Practices' },
  { test: /book|project|handbook|accelerate/i, title: 'Essential Reading & References' },
  { test: /myth|anti-pattern|pitfall/i, title: 'Pitfalls, Myths & Anti-Patterns' },
  { test: /what-is|history|vs-|agile/i, title: 'Concepts, History & Comparisons' },
  { test: /metric|cycle-time|lead-time|mttr|vanity|stream-mapping/i, title: 'Delivery & Flow Metrics' },
  { test: /kernel|filesystem|file-management|boot|namespace|proc|device|link|environment/i, title: 'Core Linux Systems' },
  { test: /bash|zsh|fish|alias|dotfile|history/i, title: 'Shells & Configuration' },
  { test: /init|cron|logging|supervision|package-management|backup|hardening|time-sync|ntp/i, title: 'System Services & Operations' },
  { test: /osi|tcp|ip|subnet|port|socket|nat|routing|switch|vlan|mtu|qos|sdn/i, title: 'Network Foundations' },
  { test: /dns|discovery|resolution|record/i, title: 'DNS Core Concepts' },
  { test: /cert|tls|ssl|pki|acme|mtls/i, title: 'TLS & Certificate Operations' },
  { test: /git (?!hub)|branch|merge|rebase|stash|tag|remote|object|reflog/i, title: 'Git Core Mechanics' },
  { test: /workflow|trunk|gitflow|release strategy/i, title: 'Branching & Release Workflows' },
  { test: /pull request|review|quality gate|static analysis/i, title: 'Code Review & Quality Gates' },
]

function inferGroupTitle(leaves) {
  for (const hint of GROUP_TITLE_HINTS) {
    const matchCount = leaves.filter((l) =>
      hint.test.test(`${l.id} ${l.title}`),
    ).length
    if (matchCount >= Math.ceil(leaves.length / 2)) return hint.title
  }
  if (leaves.length === 1) return leaves[0].title
  return `${leaves[0].title} & Related Topics`
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
}

/**
 * Turn flat part-script entries into 3-level subtopic groupings.
 * Entries with children become subtopics; consecutive leaf entries are batched.
 */
function buildGroupings(rootId, entries) {
  /** @type {{ id: string, title: string, leaves: { id: string, title: string }[] }[]} */
  const subtopics = []
  /** @type {{ id: string, title: string }[]} */
  let leafBatch = []

  const flushBatch = () => {
    if (leafBatch.length === 0) return
    const title = inferGroupTitle(leafBatch)
    let groupId = `${rootId}--${slugify(title)}`
    if (subtopics.some((s) => s.id === groupId)) {
      groupId = `${groupId}-${subtopics.length + 1}`
    }
    subtopics.push({
      id: groupId,
      title,
      leaves: [...leafBatch],
    })
    leafBatch = []
  }

  for (const entry of entries) {
    if (entry.hasChildren && entry.children?.length) {
      flushBatch()
      subtopics.push({
        id: entry.id,
        title: entry.title,
        leaves: entry.children,
      })
    } else {
      leafBatch.push({ id: entry.id, title: entry.title })
      // Batch size 4–7 for readability
      if (leafBatch.length >= 6) flushBatch()
    }
  }
  flushBatch()
  return subtopics
}

/** @type {Record<string, { id: string, title: string, leaves: { id: string, title: string }[] }[]>} */
const TAXONOMY = {}

for (const [rootId, entries] of byRoot) {
  TAXONOMY[rootId] = buildGroupings(rootId, entries)
}

const outPath = resolve(__dirname, 'taxonomy.generated.mjs')
const body = `/** Auto-generated from part scripts — do not edit by hand; re-run extract-taxonomy.mjs */\nexport const GENERATED_TAXONOMY = ${JSON.stringify(TAXONOMY, null, 2)}\n`
writeFileSync(outPath, body)

console.log(`Extracted taxonomy for ${Object.keys(TAXONOMY).length} root topics → ${outPath}`)
for (const [rootId, subs] of Object.entries(TAXONOMY).slice(0, 3)) {
  const leaves = subs.reduce((n, s) => n + s.leaves.length, 0)
  console.log(`  ${rootId}: ${subs.length} subtopics, ${leaves} sub-subtopics`)
}
