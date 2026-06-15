/**
 * One-off scaffolder for the Node.js subject topic tree.
 *
 * Writes `src/content/subjects/nodejs/topics/<id>/topic.json` files from a
 * compact, nested description of the roadmap. Built incrementally, one stage at
 * a time: the STAGES array below holds only the stage currently being authored
 * (previously generated files remain on disk). Re-running is idempotent.
 *
 * Node shape (compact):
 *   { s: 'slug', t: 'Title', l: 'level'?, k: [ ...children ] }
 *
 * Hierarchy / id rules (mirrors the existing subjects):
 *   - depth 1 (topic):        id = slug                       (no parentId)
 *   - depth 2 (subtopic):     id = slug                       (parentId = topic id)
 *   - depth 3 (sub-subtopic): id = `${parentId}--${slug}`     (parentId = subtopic id)
 *
 * `order` is the 1-based sibling index (roots are offset by the stage's
 * baseOrder so they sort globally in roadmap order). `level` inherits from the
 * parent when not specified. `tags` is always `[stageId]`. `summary` = title.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const TOPICS_DIR = path.join(ROOT, 'src', 'content', 'subjects', 'nodejs', 'topics')

/** @typedef {{ s: string, t: string, l?: string, k?: TreeNode[] }} TreeNode */
/** @typedef {{ stageId: string, baseOrder: number, level?: string, topics: TreeNode[] }} Stage */

/** @type {Stage[]} */
const STAGES = []

STAGES.push({
  stageId: 'ecosystem-frontier',
  baseOrder: 2000,
  level: 'intermediate',
  topics: [
    {
      s: 'alternative-runtimes',
      t: 'Alternative Runtimes',
      k: [
        {
          s: 'deno',
          t: 'Deno',
          k: [
            { s: 'deno-overview', t: 'Overview' },
            { s: 'deno-vs-node', t: 'Deno vs Node' },
            { s: 'deno-security', t: 'Security Model' },
            { s: 'deno-node-compat', t: 'Node Compatibility' },
          ],
        },
        {
          s: 'bun',
          t: 'Bun',
          k: [
            { s: 'bun-overview', t: 'Overview' },
            { s: 'bun-runtime', t: 'Runtime' },
            { s: 'bun-vs-node', t: 'Bun vs Node' },
            { s: 'bun-package-manager', t: 'Package Manager' },
            { s: 'bun-bundler', t: 'Bundler & Tooling' },
          ],
        },
        {
          s: 'runtime-comparison',
          t: 'Comparison',
          k: [
            { s: 'performance-comparison-runtimes', t: 'Performance' },
            { s: 'api-compatibility', t: 'API Compatibility' },
            { s: 'choosing-runtime', t: 'Choosing a Runtime' },
          ],
        },
      ],
    },
    {
      s: 'edge-runtimes',
      t: 'Edge Runtimes',
      k: [
        {
          s: 'edge-basics',
          t: 'Edge Basics',
          k: [
            { s: 'what-is-edge', t: 'What is Edge' },
            { s: 'edge-vs-server', t: 'Edge vs Server' },
            { s: 'edge-limitations', t: 'Limitations' },
          ],
        },
        {
          s: 'edge-platforms-frontier',
          t: 'Edge Platforms',
          k: [
            { s: 'cloudflare-workers-edge', t: 'Cloudflare Workers' },
            { s: 'vercel-edge', t: 'Vercel Edge' },
            { s: 'deno-deploy', t: 'Deno Deploy' },
          ],
        },
        {
          s: 'wintercg',
          t: 'WinterCG & Web Interop',
          k: [
            { s: 'wintercg-overview', t: 'WinterCG Overview' },
            { s: 'web-interop-runtimes', t: 'Web Interop' },
            { s: 'common-apis-edge', t: 'Common Minimum APIs' },
          ],
        },
      ],
    },
    {
      s: 'contributing-to-node',
      t: 'Contributing to Node.js',
      l: 'advanced',
      k: [
        {
          s: 'node-project',
          t: 'The Node.js Project',
          k: [
            { s: 'node-governance', t: 'Governance' },
            { s: 'working-groups', t: 'Working Groups' },
            { s: 'tsc-node', t: 'Technical Steering Committee' },
          ],
        },
        {
          s: 'contributing-process',
          t: 'Contribution Process',
          k: [
            { s: 'finding-issues', t: 'Finding Issues' },
            { s: 'building-node-source', t: 'Building from Source' },
            { s: 'submitting-prs', t: 'Submitting PRs' },
            { s: 'node-collaborators', t: 'Becoming a Collaborator' },
          ],
        },
        {
          s: 'node-internals-contrib',
          t: 'Internals for Contributors',
          k: [
            { s: 'c-cpp-internals', t: 'C/C++ Internals' },
            { s: 'javascript-internals', t: 'JavaScript Internals' },
            { s: 'writing-tests-node', t: 'Writing Tests' },
          ],
        },
      ],
    },
    {
      s: 'emerging-trends',
      t: 'Emerging Trends',
      k: [
        {
          s: 'language-trends',
          t: 'Language Trends',
          k: [
            { s: 'typescript-everywhere', t: 'TypeScript Everywhere' },
            { s: 'esm-adoption', t: 'ESM Adoption' },
            { s: 'web-standards-convergence', t: 'Web Standards Convergence' },
          ],
        },
        {
          s: 'runtime-trends',
          t: 'Runtime Trends',
          k: [
            { s: 'performance-improvements-trend', t: 'Performance Improvements' },
            { s: 'built-in-tooling-trend', t: 'Built-in Tooling' },
            { s: 'security-trends-node', t: 'Security' },
          ],
        },
        {
          s: 'ecosystem-trends',
          t: 'Ecosystem Trends',
          k: [
            { s: 'ai-in-node', t: 'AI in Node' },
            { s: 'full-stack-frameworks-trend', t: 'Full-Stack Frameworks' },
            { s: 'edge-first-trend', t: 'Edge-First' },
          ],
        },
      ],
    },
    {
      s: 'career-learning',
      t: 'Career & Continuous Learning',
      l: 'beginner',
      k: [
        {
          s: 'building-skills',
          t: 'Building Skills',
          k: [
            { s: 'portfolio-projects', t: 'Portfolio Projects' },
            { s: 'open-source-contributions', t: 'Open Source' },
            { s: 'reading-source-code', t: 'Reading Source Code' },
          ],
        },
        {
          s: 'staying-current',
          t: 'Staying Current',
          k: [
            { s: 'following-releases', t: 'Following Releases' },
            { s: 'community-resources', t: 'Community Resources' },
            { s: 'blogs-newsletters', t: 'Blogs & Newsletters' },
            { s: 'conferences-node', t: 'Conferences' },
          ],
        },
        {
          s: 'career-paths',
          t: 'Career Paths',
          k: [
            { s: 'backend-engineer', t: 'Backend Engineer' },
            { s: 'full-stack-node', t: 'Full-Stack' },
            { s: 'devops-node', t: 'DevOps' },
            { s: 'specializations-career', t: 'Specializations' },
          ],
        },
        {
          s: 'interview-prep-node',
          t: 'Interview Prep',
          k: [
            { s: 'node-interview-topics', t: 'Interview Topics' },
            { s: 'system-design-node', t: 'System Design' },
            { s: 'coding-challenges-node', t: 'Coding Challenges' },
          ],
        },
      ],
    },
  ],
})

let written = 0

async function writeNode(node, depth, parentId, order, stageId, parentLevel) {
  const id = depth === 3 ? `${parentId}--${node.s}` : node.s
  const level = node.l ?? parentLevel
  const topic = {
    id,
    title: node.t,
    summary: node.t,
    order,
    level,
    tags: [stageId],
  }
  if (parentId) topic.parentId = parentId

  const dir = path.join(TOPICS_DIR, id)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'topic.json'), `${JSON.stringify(topic, null, 2)}\n`)
  written++

  const kids = node.k ?? []
  for (let i = 0; i < kids.length; i++) {
    await writeNode(kids[i], depth + 1, id, i + 1, stageId, level)
  }
}

async function main() {
  for (const stage of STAGES) {
    const stageLevel = stage.level ?? 'beginner'
    for (let i = 0; i < stage.topics.length; i++) {
      await writeNode(stage.topics[i], 1, undefined, stage.baseOrder + i + 1, stage.stageId, stageLevel)
    }
  }
  console.log(`[gen-nodejs] wrote ${written} topic.json files for ${STAGES.length} stage(s)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
