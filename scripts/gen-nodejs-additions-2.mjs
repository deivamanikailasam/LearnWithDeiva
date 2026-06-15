/**
 * Second supplementary scaffolder for the Node.js subject — a further gap-fill
 * pass for widely used, must-learn topics (as of June 2026) not yet covered.
 *
 * Same conventions as `gen-nodejs.mjs` / `gen-nodejs-additions.mjs`:
 *   - depth 1 (topic):        id = slug                     (no parentId)
 *   - depth 2 (subtopic):     id = slug                     (parentId = topic id)
 *   - depth 3 (sub-subtopic): id = `${parentId}--${slug}`   (parentId = subtopic id)
 * Re-running is idempotent.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const TOPICS_DIR = path.join(ROOT, 'src', 'content', 'subjects', 'nodejs', 'topics')

/** @typedef {{ s: string, t: string, l?: string, k?: TreeNode[] }} TreeNode */
/** @typedef {{ stageId: string, level: string, order: number, tree: TreeNode }} AddEntry */

/** @type {AddEntry[]} */
const ADD = [
  // ── Stage: Web Servers & Frameworks (web-frameworks) ──
  {
    stageId: 'web-frameworks',
    level: 'intermediate',
    order: 965,
    tree: {
      s: 'internationalization',
      t: 'Internationalization (i18n)',
      k: [
        {
          s: 'i18n-basics',
          t: 'i18n Basics',
          k: [
            { s: 'i18n-overview', t: 'Overview' },
            { s: 'locales-translations', t: 'Locales & Translations' },
          ],
        },
        {
          s: 'i18n-libraries',
          t: 'i18n Libraries',
          k: [
            { s: 'i18next', t: 'i18next' },
            { s: 'formatjs', t: 'FormatJS' },
          ],
        },
        {
          s: 'i18n-formatting',
          t: 'Formatting',
          k: [
            { s: 'message-formatting', t: 'Message Formatting' },
            { s: 'pluralization', t: 'Pluralization' },
            { s: 'number-currency-format', t: 'Number & Currency' },
          ],
        },
      ],
    },
  },
  {
    stageId: 'web-frameworks',
    level: 'intermediate',
    order: 966,
    tree: {
      s: 'image-processing',
      t: 'Image Processing',
      k: [
        {
          s: 'sharp',
          t: 'Sharp',
          k: [
            { s: 'sharp-overview', t: 'Overview' },
            { s: 'resizing-cropping', t: 'Resizing & Cropping' },
            { s: 'format-conversion', t: 'Format Conversion' },
          ],
        },
        {
          s: 'image-tasks',
          t: 'Common Tasks',
          k: [
            { s: 'thumbnails', t: 'Thumbnails' },
            { s: 'image-optimization', t: 'Optimization' },
            { s: 'watermarking', t: 'Watermarking' },
          ],
        },
      ],
    },
  },

  // ── Stage: Databases & Data Layer (databases) ──
  {
    stageId: 'databases',
    level: 'intermediate',
    order: 1061,
    tree: {
      s: 'object-storage',
      t: 'Object Storage',
      k: [
        {
          s: 'storage-basics',
          t: 'Storage Basics',
          k: [
            { s: 'blob-storage-overview', t: 'Blob Storage Overview' },
            { s: 's3-compatible-storage', t: 'S3-Compatible Storage' },
          ],
        },
        {
          s: 's3-node',
          t: 'S3 in Node',
          k: [
            { s: 'aws-sdk-v3', t: 'AWS SDK v3' },
            { s: 'uploading-objects', t: 'Uploading Objects' },
            { s: 'presigned-urls', t: 'Presigned URLs' },
          ],
        },
        {
          s: 'other-object-storage',
          t: 'Other Providers',
          k: [
            { s: 'cloudflare-r2', t: 'Cloudflare R2' },
            { s: 'gcs-azure-blob', t: 'GCS & Azure Blob' },
          ],
        },
      ],
    },
  },

  // ── Stage: Testing & Quality (testing) ──
  {
    stageId: 'testing',
    level: 'intermediate',
    order: 1260,
    tree: {
      s: 'testing-libraries',
      t: 'Testing Libraries',
      k: [
        {
          s: 'test-data',
          t: 'Test Data',
          k: [
            { s: 'faker', t: 'Faker' },
            { s: 'test-fixtures-libs', t: 'Fixture Factories' },
          ],
        },
        {
          s: 'http-mocking-libs',
          t: 'HTTP Mocking',
          k: [
            { s: 'nock', t: 'Nock' },
            { s: 'msw', t: 'MSW' },
            { s: 'undici-mockagent', t: 'undici MockAgent' },
          ],
        },
      ],
    },
  },

  // ── Stage: Tooling & Developer Experience (tooling) ──
  {
    stageId: 'tooling',
    level: 'intermediate',
    order: 1760,
    tree: {
      s: 'cli-tooling',
      t: 'Building CLI Tools',
      k: [
        {
          s: 'cli-frameworks',
          t: 'CLI Frameworks',
          k: [
            { s: 'commander', t: 'Commander' },
            { s: 'yargs', t: 'Yargs' },
            { s: 'oclif', t: 'oclif' },
            { s: 'clipanion', t: 'Clipanion' },
          ],
        },
        {
          s: 'cli-ux',
          t: 'CLI UX',
          k: [
            { s: 'prompts-inquirer', t: 'Prompts & Inquirer' },
            { s: 'terminal-styling', t: 'Terminal Styling' },
            { s: 'spinners-progress', t: 'Spinners & Progress' },
          ],
        },
        {
          s: 'cli-practices',
          t: 'CLI Best Practices',
          k: [
            { s: 'cli-config-files', t: 'Config Files' },
            { s: 'cli-testing', t: 'Testing CLIs' },
            { s: 'distributing-clis', t: 'Distributing CLIs' },
          ],
        },
      ],
    },
  },

  // ── Stage: Architecture & Design Patterns (architecture-patterns) ──
  {
    stageId: 'architecture-patterns',
    level: 'intermediate',
    order: 1860,
    tree: {
      s: 'dependency-injection-containers',
      t: 'DI Containers',
      k: [
        {
          s: 'di-libraries',
          t: 'DI Libraries',
          k: [
            { s: 'awilix', t: 'Awilix' },
            { s: 'tsyringe', t: 'tsyringe' },
            { s: 'inversify', t: 'InversifyJS' },
          ],
        },
        {
          s: 'di-usage',
          t: 'Using DI',
          k: [
            { s: 'registering-dependencies', t: 'Registering Dependencies' },
            { s: 'di-scopes', t: 'Lifetimes & Scopes' },
            { s: 'di-vs-manual', t: 'DI vs Manual Wiring' },
          ],
        },
      ],
    },
  },

  // ── Stage: Ecosystem, Frontier & Career (ecosystem-frontier) ──
  {
    stageId: 'ecosystem-frontier',
    level: 'intermediate',
    order: 2060,
    tree: {
      s: 'web-scraping-automation',
      t: 'Web Scraping & Automation',
      k: [
        {
          s: 'scraping-tools',
          t: 'Scraping Tools',
          k: [
            { s: 'cheerio', t: 'Cheerio' },
            { s: 'puppeteer', t: 'Puppeteer' },
            { s: 'playwright-scraping', t: 'Playwright' },
          ],
        },
        {
          s: 'scraping-practices',
          t: 'Best Practices',
          k: [
            { s: 'handling-dynamic-content', t: 'Dynamic Content' },
            { s: 'rate-limiting-scraping', t: 'Rate Limiting' },
            { s: 'scraping-ethics', t: 'Ethics & Legality' },
          ],
        },
      ],
    },
  },
]

let written = 0

async function writeNode(node, depth, parentId, order, stageId, parentLevel) {
  const id = depth === 3 ? `${parentId}--${node.s}` : node.s
  const level = node.l ?? parentLevel
  const topic = { id, title: node.t, summary: node.t, order, level, tags: [stageId] }
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
  for (const entry of ADD) {
    await writeNode(entry.tree, 1, undefined, entry.order, entry.stageId, entry.level)
  }
  console.log(`[gen-nodejs-additions-2] wrote ${written} topic.json files`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
