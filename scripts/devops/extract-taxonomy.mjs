/**
 * Extract intended topic structure from scripts/devops/part*.mjs.
 * Groups entries by parentId (roadmap root topic id).
 *
 * Usage: node scripts/devops/extract-taxonomy.mjs
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SCRIPTS_DIR = resolve(__dirname)

/** @type {Map<string, Map<string, { id: string, title: string, hasChildren: boolean, children?: { id: string, title: string }[] }>>} */
const byRoot = new Map()

function parsePartFile(path) {
  const src = readFileSync(path, 'utf8')
  const entryRe =
    /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*parentId:\s*'([^']+)'(?:,\s*level:\s*'[^']+')?(?:,\s*children:\s*\[([\s\S]*?)\])?\s*,?\s*\}/g

  let m
  while ((m = entryRe.exec(src)) !== null) {
    const [, id, title, parentId, childrenBlock] = m
    const children = []
    if (childrenBlock) {
      const childRe = /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)'/g
      let cm
      while ((cm = childRe.exec(childrenBlock)) !== null) {
        children.push({ id: cm[1], title: cm[2] })
      }
    }

    if (!byRoot.has(parentId)) byRoot.set(parentId, new Map())
    const rootEntries = byRoot.get(parentId)
    if (!rootEntries.has(id)) {
      rootEntries.set(id, {
        id,
        title,
        hasChildren: children.length > 0,
        children: children.length > 0 ? children : undefined,
      })
    }
  }
}

for (const f of readdirSync(SCRIPTS_DIR).filter((n) => n.startsWith('part') && n.endsWith('.mjs'))) {
  parsePartFile(resolve(SCRIPTS_DIR, f))
}

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

function buildGroupings(rootId, entries) {
  /** @type {{ id: string, title: string, leaves: { id: string, title: string }[] }[]} */
  const subtopics = []
  let leafBatch = []

  const flushBatch = () => {
    if (leafBatch.length === 0) return
    const title = inferGroupTitle(leafBatch)
    let groupId = `${rootId}--${slugify(title)}`
    if (subtopics.some((s) => s.id === groupId)) {
      groupId = `${groupId}-${subtopics.length + 1}`
    }
    subtopics.push({ id: groupId, title, leaves: [...leafBatch] })
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
      if (leafBatch.length >= 6) flushBatch()
    }
  }
  flushBatch()
  return subtopics
}

/** @type {Record<string, { id: string, title: string, leaves: { id: string, title: string }[] }[]>} */
const TAXONOMY = {}

for (const [rootId, entryMap] of byRoot) {
  TAXONOMY[rootId] = buildGroupings(rootId, [...entryMap.values()])
}

const outPath = resolve(__dirname, 'taxonomy.generated.mjs')
writeFileSync(
  outPath,
  `/** Auto-generated from part scripts — do not edit by hand; re-run extract-taxonomy.mjs */\nexport const GENERATED_TAXONOMY = ${JSON.stringify(TAXONOMY, null, 2)}\n`,
)

const roots = Object.keys(TAXONOMY).length
const subs = Object.values(TAXONOMY).reduce((n, s) => n + s.length, 0)
const leaves = Object.values(TAXONOMY).reduce(
  (n, s) => n + s.reduce((m, sub) => m + sub.leaves.length, 0),
  0,
)
console.log(`Extracted taxonomy for ${roots} root topics → ${outPath}`)
console.log(`  Total subtopics: ${subs}, sub-subtopics: ${leaves}`)
