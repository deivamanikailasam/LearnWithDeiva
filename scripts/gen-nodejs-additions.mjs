/**
 * Supplementary scaffolder for the Node.js subject — fills gaps with widely
 * used, must-learn topics (as of June 2026) that the main roadmap missed.
 *
 * Same id / level / tags / order conventions as `gen-nodejs.mjs`:
 *   - depth 1 (topic):        id = slug                     (no parentId)
 *   - depth 2 (subtopic):     id = slug                     (parentId = topic id)
 *   - depth 3 (sub-subtopic): id = `${parentId}--${slug}`   (parentId = subtopic id)
 *
 * ADD = new top-level topics (with their subtrees). Each root has an explicit
 *       `order` so it sorts at the tail of its stage.
 * ATTACH = extra depth-3 children appended under an existing subtopic.
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
/** @typedef {{ stageId: string, level: string, parentId: string, startOrder: number, nodes: { s: string, t: string }[] }} AttachEntry */

/** @type {AddEntry[]} */
const ADD = [
  // ── Stage: JavaScript & TypeScript (language-foundations) ──
  {
    stageId: 'language-foundations',
    level: 'beginner',
    order: 160,
    tree: {
      s: 'date-time',
      t: 'Date & Time',
      k: [
        {
          s: 'js-dates',
          t: 'JavaScript Dates',
          k: [
            { s: 'date-object', t: 'Date Object' },
            { s: 'date-pitfalls', t: 'Date Pitfalls' },
            { s: 'unix-timestamps', t: 'Unix Timestamps' },
          ],
        },
        {
          s: 'temporal-api',
          t: 'Temporal API',
          k: [
            { s: 'temporal-overview', t: 'Temporal Overview' },
            { s: 'temporal-plain-types', t: 'PlainDate & PlainTime' },
            { s: 'temporal-zoneddatetime', t: 'ZonedDateTime' },
            { s: 'temporal-duration', t: 'Duration' },
          ],
        },
        {
          s: 'datetime-libraries',
          t: 'Date Libraries',
          k: [
            { s: 'date-fns', t: 'date-fns' },
            { s: 'dayjs', t: 'Day.js' },
            { s: 'luxon', t: 'Luxon' },
          ],
        },
        {
          s: 'timezones-intl',
          t: 'Time Zones & Intl',
          k: [
            { s: 'intl-datetimeformat', t: 'Intl.DateTimeFormat' },
            { s: 'timezone-handling', t: 'Time Zone Handling' },
            { s: 'utc-handling', t: 'UTC Handling' },
          ],
        },
      ],
    },
  },

  // ── Stage: Networking (networking) ──
  {
    stageId: 'networking',
    level: 'beginner',
    order: 860,
    tree: {
      s: 'http-clients',
      t: 'HTTP Client Libraries',
      k: [
        {
          s: 'axios',
          t: 'Axios',
          k: [
            { s: 'axios-overview', t: 'Overview' },
            { s: 'axios-interceptors', t: 'Interceptors' },
            { s: 'axios-instances', t: 'Instances & Config' },
            { s: 'axios-error-handling', t: 'Error Handling' },
          ],
        },
        {
          s: 'got',
          t: 'Got',
          k: [
            { s: 'got-overview', t: 'Overview' },
            { s: 'got-retries', t: 'Retries & Hooks' },
            { s: 'got-streams', t: 'Streams' },
          ],
        },
        {
          s: 'ky',
          t: 'Ky',
          k: [
            { s: 'ky-overview', t: 'Overview' },
            { s: 'ky-vs-fetch', t: 'Ky vs Fetch' },
          ],
        },
        {
          s: 'choosing-http-client',
          t: 'Choosing a Client',
          k: [
            { s: 'native-vs-libraries-http', t: 'Native vs Libraries' },
            { s: 'http-client-criteria', t: 'Selection Criteria' },
          ],
        },
      ],
    },
  },

  // ── Stage: Web Servers & Frameworks (web-frameworks) ──
  {
    stageId: 'web-frameworks',
    level: 'intermediate',
    order: 960,
    tree: {
      s: 'file-uploads',
      t: 'File Uploads',
      k: [
        {
          s: 'multipart-handling',
          t: 'Multipart Handling',
          k: [
            { s: 'multipart-form-data', t: 'multipart/form-data' },
            { s: 'parsing-multipart', t: 'Parsing Multipart' },
          ],
        },
        {
          s: 'upload-libraries',
          t: 'Upload Libraries',
          k: [
            { s: 'multer', t: 'Multer' },
            { s: 'busboy', t: 'Busboy' },
            { s: 'formidable', t: 'Formidable' },
          ],
        },
        {
          s: 'upload-best-practices',
          t: 'Best Practices',
          k: [
            { s: 'streaming-uploads', t: 'Streaming Uploads' },
            { s: 'validating-uploads', t: 'Validating Uploads' },
            { s: 'upload-storage', t: 'Storage Destinations' },
          ],
        },
      ],
    },
  },
  {
    stageId: 'web-frameworks',
    level: 'intermediate',
    order: 961,
    tree: {
      s: 'email-sending',
      t: 'Sending Email',
      k: [
        {
          s: 'email-basics',
          t: 'Email Basics',
          k: [
            { s: 'smtp-overview', t: 'SMTP Overview' },
            { s: 'transactional-email', t: 'Transactional Email' },
          ],
        },
        {
          s: 'email-libraries',
          t: 'Email Libraries',
          k: [
            { s: 'nodemailer', t: 'Nodemailer' },
            { s: 'resend', t: 'Resend' },
            { s: 'email-templates', t: 'Email Templates' },
          ],
        },
      ],
    },
  },
  {
    stageId: 'web-frameworks',
    level: 'intermediate',
    order: 962,
    tree: {
      s: 'trpc',
      t: 'tRPC',
      k: [
        {
          s: 'trpc-basics',
          t: 'tRPC Basics',
          k: [
            { s: 'trpc-overview', t: 'Overview' },
            { s: 'trpc-routers', t: 'Routers' },
            { s: 'trpc-procedures', t: 'Procedures' },
          ],
        },
        {
          s: 'trpc-usage',
          t: 'Using tRPC',
          k: [
            { s: 'trpc-client', t: 'Client' },
            { s: 'trpc-middleware', t: 'Middleware' },
            { s: 'trpc-vs-rest', t: 'tRPC vs REST' },
          ],
        },
      ],
    },
  },
  {
    stageId: 'web-frameworks',
    level: 'intermediate',
    order: 963,
    tree: {
      s: 'grpc',
      t: 'gRPC',
      k: [
        {
          s: 'grpc-basics',
          t: 'gRPC Basics',
          k: [
            { s: 'grpc-overview', t: 'Overview' },
            { s: 'protobuf', t: 'Protocol Buffers' },
            { s: 'grpc-vs-rest', t: 'gRPC vs REST' },
          ],
        },
        {
          s: 'grpc-node',
          t: 'gRPC in Node',
          k: [
            { s: 'grpc-server-node', t: 'gRPC Server' },
            { s: 'grpc-client-node', t: 'gRPC Client' },
            { s: 'grpc-streaming', t: 'Streaming RPCs' },
          ],
        },
      ],
    },
  },
  {
    stageId: 'web-frameworks',
    level: 'intermediate',
    order: 964,
    tree: {
      s: 'llm-integration',
      t: 'LLM & AI Integration',
      k: [
        {
          s: 'llm-sdks',
          t: 'AI SDKs',
          k: [
            { s: 'vercel-ai-sdk', t: 'Vercel AI SDK' },
            { s: 'openai-sdk', t: 'OpenAI SDK' },
            { s: 'langchain-js', t: 'LangChain.js' },
          ],
        },
        {
          s: 'llm-patterns',
          t: 'Integration Patterns',
          k: [
            { s: 'streaming-ai-responses', t: 'Streaming Responses' },
            { s: 'structured-output-ai', t: 'Structured Output' },
            { s: 'rag-overview', t: 'RAG Overview' },
          ],
        },
        {
          s: 'mcp',
          t: 'Model Context Protocol',
          k: [
            { s: 'mcp-overview', t: 'MCP Overview' },
            { s: 'mcp-servers-node', t: 'MCP Servers in Node' },
          ],
        },
      ],
    },
  },

  // ── Stage: Databases & Data Layer (databases) ──
  {
    stageId: 'databases',
    level: 'intermediate',
    order: 1060,
    tree: {
      s: 'vector-databases',
      t: 'Vector Databases',
      k: [
        {
          s: 'vector-basics',
          t: 'Vector Basics',
          k: [
            { s: 'embeddings-overview', t: 'Embeddings Overview' },
            { s: 'vector-search-concepts', t: 'Vector Search' },
            { s: 'similarity-search', t: 'Similarity Metrics' },
          ],
        },
        {
          s: 'vector-stores',
          t: 'Vector Stores',
          k: [
            { s: 'pgvector', t: 'pgvector' },
            { s: 'dedicated-vector-dbs', t: 'Pinecone / Qdrant / Chroma' },
          ],
        },
      ],
    },
  },

  // ── Stage: Modern Node.js Features (modern-features) ──
  {
    stageId: 'modern-features',
    level: 'intermediate',
    order: 1660,
    tree: {
      s: 'recent-runtime-additions',
      t: 'Recent Runtime Additions',
      k: [
        {
          s: 'script-running',
          t: 'Built-in Script Running',
          k: [
            { s: 'node-run', t: 'node --run' },
            { s: 'node-run-vs-npm', t: 'node --run vs npm' },
          ],
        },
        {
          s: 'runtime-globals',
          t: 'New Runtime Globals & APIs',
          k: [
            { s: 'navigator-global', t: 'navigator Global' },
            { s: 'process-getbuiltinmodule', t: 'process.getBuiltinModule' },
            { s: 'import-meta-main', t: 'import.meta.main' },
          ],
        },
      ],
    },
  },
]

/** @type {AttachEntry[]} */
const ATTACH = [
  // Extra validation libraries under the existing `validation-libraries` subtopic
  // (existing children: zod, valibot, joi, yup, class-validator → next order is 6).
  {
    stageId: 'web-frameworks',
    level: 'intermediate',
    parentId: 'validation-libraries',
    startOrder: 6,
    nodes: [
      { s: 'typebox', t: 'TypeBox' },
      { s: 'arktype', t: 'ArkType' },
    ],
  },
]

let written = 0

async function writeTopic(id, title, order, level, stageId, parentId, includeSummary = true) {
  const topic = {
    id,
    title,
    ...(includeSummary ? { summary: title } : {}),
    order,
    level,
    tags: [stageId],
  }
  if (parentId) topic.parentId = parentId
  const dir = path.join(TOPICS_DIR, id)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'topic.json'), `${JSON.stringify(topic, null, 2)}\n`)
  written++
}

async function writeNode(node, depth, parentId, order, stageId, parentLevel) {
  const id = depth === 3 ? `${parentId}--${node.s}` : node.s
  const level = node.l ?? parentLevel
  await writeTopic(id, node.t, order, level, stageId, parentId, depth !== 3)
  const kids = node.k ?? []
  for (let i = 0; i < kids.length; i++) {
    await writeNode(kids[i], depth + 1, id, i + 1, stageId, level)
  }
}

async function main() {
  for (const entry of ADD) {
    await writeNode(entry.tree, 1, undefined, entry.order, entry.stageId, entry.level)
  }
  for (const entry of ATTACH) {
    for (let i = 0; i < entry.nodes.length; i++) {
      const node = entry.nodes[i]
      const id = `${entry.parentId}--${node.s}`
      await writeTopic(id, node.t, entry.startOrder + i, entry.level, entry.stageId, entry.parentId, false)
    }
  }
  console.log(`[gen-nodejs-additions] wrote ${written} topic.json files`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
