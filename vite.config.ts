import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { writeFile, mkdir } from 'node:fs/promises'
import { generateContent } from './scripts/gen-content.mjs'

const ROOT = path.resolve(__dirname)

const SAFE_ID = /^[a-z0-9][a-z0-9._-]*$/i

function isSafeContentId(id: string | undefined): id is string {
  return (
    typeof id === 'string' &&
    id.length > 0 &&
    id.length <= 200 &&
    SAFE_ID.test(id) &&
    !id.includes('..') &&
    !id.includes('/')
  )
}

async function readJsonBody(req: import('node:http').IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

/**
 * Dev-only API: write `document.json` under `src/content/subjects/.../topics/`.
 * The content watcher regenerates `public/data/` after the file lands.
 */
function contentSaveApi(): Plugin {
  const contentDir = path.resolve(__dirname, 'src/content')
  return {
    name: 'learnwithdeiva:content-save',
    configureServer(server) {
      server.middlewares.use('/api/content/document', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        try {
          const body = (await readJsonBody(req)) as {
            subjectId?: string
            topicId?: string
            document?: { format?: string; doc?: unknown }
          }
          const { subjectId, topicId, document } = body
          if (
            !isSafeContentId(subjectId) ||
            !isSafeContentId(topicId) ||
            document?.format !== 'tiptap/v1' ||
            !document?.doc
          ) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Invalid request' }))
            return
          }

          const topicDir = path.join(
            contentDir,
            'subjects',
            subjectId,
            'topics',
            topicId,
          )
          if (!existsSync(path.join(topicDir, 'topic.json'))) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Topic not found' }))
            return
          }

          const outPath = path.join(topicDir, 'document.json')
          const payload = {
            format: 'tiptap/v1' as const,
            updatedAt: new Date().toISOString(),
            doc: document.doc,
          }
          await mkdir(topicDir, { recursive: true })
          await writeFile(outPath, `${JSON.stringify(payload)}\n`, 'utf8')

          const publicSection = path.join(
            ROOT,
            'public',
            'data',
            'subjects',
            subjectId,
            'sections',
            `${topicId}.json`,
          )
          await mkdir(path.dirname(publicSection), { recursive: true })
          await writeFile(publicSection, `${JSON.stringify(payload)}\n`, 'utf8')

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true, document: payload }))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: err instanceof Error ? err.message : 'Save failed',
            }),
          )
        }
      })
    },
  }
}

/**
 * Generates the consolidated content artifacts in `public/data/` before the
 * bundle/server starts, and regenerates them in dev whenever a content file
 * under `src/content/` changes (then triggers a reload so the new data is
 * picked up on the next fetch).
 */
function contentData(isBuild: boolean): Plugin {
  const contentDir = path.resolve(__dirname, 'src/content')
  return {
    name: 'learnwithdeiva:content-data',
    async buildStart() {
      // Builds always regenerate from scratch. Dev only generates when the
      // artifacts are missing (the watcher below keeps them fresh after that),
      // so restarting the dev server stays near-instant.
      await generateContent({ log: true, force: isBuild })
    },
    configureServer(server) {
      let timer: ReturnType<typeof setTimeout> | undefined
      const regen = (file: string) => {
        if (!file.startsWith(contentDir)) return
        const isDocumentJson = file.endsWith(`${path.sep}document.json`)
        clearTimeout(timer)
        timer = setTimeout(async () => {
          await generateContent({ force: true, log: false })
          // Dev saves update the UI from the save response; skip full reload.
          if (!isDocumentJson) {
            server.ws.send({ type: 'full-reload' })
          }
        }, isDocumentJson ? 3000 : 150)
      }
      server.watcher.add(contentDir)
      server.watcher.on('add', regen)
      server.watcher.on('change', regen)
      server.watcher.on('unlink', regen)
    },
  }
}

// On GitHub Pages a project site is served from /<repo-name>/, so the build
// needs that base path. Local dev keeps a clean root. Override with VITE_BASE.
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base:
    process.env.VITE_BASE ??
    (command === 'build' ? '/LearnWithDeiva/' : '/'),
  plugins: [contentData(command === 'build'), contentSaveApi(), react()],
  optimizeDeps: {
    // Force Vite to pre-bundle mermaid at server startup. Mermaid pulls in CJS
    // transitives (notably `dayjs`, whose `dist/dayjs.min.js` is UMD with no
    // ESM `default` export); without pre-bundling, dynamic imports of those
    // transitives blow up with
    //   "does not provide an export named 'default'"
    // Pre-bundling also stabilises the lazy diagram chunk hashes
    // (`mindmap-definition-XXX.js`, `sequenceDiagram-XXX.js`, ...) at startup,
    // so a first-time use of a new diagram type does not trigger a mid-session
    // rescan + stale-URL 404. If you ever do see one of those 404s after
    // editing content that introduces a brand-new diagram type, just run
    // `rm -rf node_modules/.vite` and restart the dev server.
    include: ['mermaid'],
  },
}))
