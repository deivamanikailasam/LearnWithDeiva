import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { writeFile, mkdir, readFile, readdir, rm } from 'node:fs/promises'
import { generateContent } from './scripts/gen-content.mjs'
import { validateRoadmapPayload, validateSubjectMetaPayload } from './src/lib/content-validation'
import {
  readGlobalGlossary,
  writeGlobalGlossary,
  upsertGlobalEntry,
  removeGlobalEntryIfUnused,
  findGlobalEntryByTerm,
} from './scripts/lib/global-glossary.mjs'

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

const DIFFICULTY = new Set(['beginner', 'intermediate', 'advanced'])

function validateTopicMetaPatch(meta: unknown): { ok: true; patch: Record<string, unknown> } | { ok: false; error: string } {
  if (meta === null || typeof meta !== 'object' || Array.isArray(meta)) {
    return { ok: false, error: 'Invalid topic metadata' }
  }
  const m = meta as Record<string, unknown>
  const title = typeof m.title === 'string' ? m.title.trim() : ''
  if (!title || title.length > 200) {
    return { ok: false, error: 'Title must be 1–200 characters.' }
  }
  if (typeof m.level !== 'string' || !DIFFICULTY.has(m.level)) {
    return { ok: false, error: 'Level must be beginner, intermediate, or advanced.' }
  }

  const patch: Record<string, unknown> = {
    title,
    level: m.level,
  }

  if ('summary' in m) {
    if (m.summary !== undefined && typeof m.summary !== 'string') {
      return { ok: false, error: 'Summary must be a string.' }
    }
    const summary = typeof m.summary === 'string' ? m.summary.trim() : ''
    if (summary.length > 2000) {
      return { ok: false, error: 'Summary must be at most 2000 characters.' }
    }
    patch.summary = summary || undefined
  }

  if ('hours' in m) {
    if (m.hours === null) {
      patch.hours = null
    } else if (typeof m.hours === 'number' && Number.isFinite(m.hours) && m.hours >= 0) {
      patch.hours = Math.round(m.hours * 100) / 100
    } else {
      return { ok: false, error: 'Hours must be a non-negative number or null.' }
    }
  }

  if ('tags' in m) {
    if (!Array.isArray(m.tags)) {
      return { ok: false, error: 'Tags must be an array of strings.' }
    }
    const tags = m.tags
      .filter((t): t is string => typeof t === 'string')
      .map((t) =>
        t
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9-]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 40),
      )
      .filter(Boolean)
    const unique = [...new Set(tags)]
    if (unique.length > 20) {
      return { ok: false, error: 'At most 20 tags allowed.' }
    }
    for (const tag of unique) {
      if (!/^[a-z0-9-]+$/.test(tag)) {
        return { ok: false, error: 'Tags must use lowercase letters, numbers, or hyphens.' }
      }
    }
    patch.tags = unique
  }

  if ('status' in m) {
    if (m.status !== 'core' && m.status !== 'optional') {
      return { ok: false, error: 'Status must be core or optional.' }
    }
    patch.status = m.status
  }

  return { ok: true, patch }
}

function jsonResponse(
  res: import('node:http').ServerResponse,
  status: number,
  body: unknown,
) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

async function regenContent() {
  await generateContent({ force: true, log: false })
}

type RawTopicMeta = Record<string, unknown> & {
  id?: string
  parentId?: string
  order?: number
}

async function listTopicMetas(subjectDir: string): Promise<RawTopicMeta[]> {
  const topicsDir = path.join(subjectDir, 'topics')
  if (!existsSync(topicsDir)) return []
  const entries = await readdir(topicsDir, { withFileTypes: true })
  const metas: RawTopicMeta[] = []
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const topicPath = path.join(topicsDir, entry.name, 'topic.json')
    if (!existsSync(topicPath)) continue
    const raw = JSON.parse(await readFile(topicPath, 'utf8')) as RawTopicMeta
    metas.push({ ...raw, id: raw.id ?? entry.name })
  }
  return metas
}

function topicDepth(metas: RawTopicMeta[], topicId: string): number {
  let depth = 0
  let current = metas.find((m) => m.id === topicId)
  while (current?.parentId) {
    depth += 1
    current = metas.find((m) => m.id === current?.parentId)
  }
  return depth
}

function collectDescendantIds(metas: RawTopicMeta[], rootId: string): string[] {
  const out: string[] = [rootId]
  for (const m of metas) {
    if (m.parentId === rootId && typeof m.id === 'string') {
      out.push(...collectDescendantIds(metas, m.id))
    }
  }
  return out
}

function isMetaEffectivelyOptional(metas: RawTopicMeta[], meta: RawTopicMeta): boolean {
  if (meta.status === 'optional') return true
  if (!meta.parentId || typeof meta.parentId !== 'string') return false
  const parent = metas.find((m) => m.id === meta.parentId)
  return parent ? isMetaEffectivelyOptional(metas, parent) : false
}

async function applyTopicStatusCascade(
  subjectDir: string,
  metas: RawTopicMeta[],
  rootId: string,
  status: 'core' | 'optional',
): Promise<void> {
  for (const id of collectDescendantIds(metas, rootId)) {
    const topicPath = path.join(subjectDir, 'topics', id, 'topic.json')
    if (!existsSync(topicPath)) continue
    const existing = JSON.parse(await readFile(topicPath, 'utf8')) as Record<string, unknown>
    if (status === 'optional') existing.status = 'optional'
    else delete existing.status
    await writeFile(topicPath, `${JSON.stringify(existing, null, 2)}\n`, 'utf8')
  }
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
      server.middlewares.use('/api/content/glossary/sync', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        try {
          const body = (await readJsonBody(req)) as {
            action?: 'upsert' | 'remove'
            term?: string
            definition?: string
            subjectId?: string
            topicId?: string
            pendingDocument?: unknown
          }

          const action = body.action
          const term = typeof body.term === 'string' ? body.term.trim() : ''
          const definition = typeof body.definition === 'string' ? body.definition.trim() : ''

          if (action === 'upsert') {
            if (!term || !definition) {
              jsonResponse(res, 400, { error: 'Term and definition are required.' })
              return
            }

            const glossary = await readGlobalGlossary()
            const result = upsertGlobalEntry(glossary.items, { term, definition })
            if (!result.ok) {
              if ('conflict' in result && result.conflict) {
                jsonResponse(res, 409, {
                  ok: false,
                  conflict: true,
                  existing: result.existing,
                })
                return
              }
              jsonResponse(res, 400, { error: result.error ?? 'Invalid glossary entry.' })
              return
            }

            if (result.action === 'added') {
              await writeGlobalGlossary({ items: result.items })
            }

            jsonResponse(res, 200, {
              ok: true,
              action: result.action,
              item: result.item,
            })
            return
          }

          if (action === 'remove') {
            if (!term || !definition) {
              jsonResponse(res, 400, { error: 'Term and definition are required.' })
              return
            }
            if (!isSafeContentId(body.subjectId) || !isSafeContentId(body.topicId)) {
              jsonResponse(res, 400, { error: 'Invalid subject or topic.' })
              return
            }

            const glossary = await readGlobalGlossary()
            const result = await removeGlobalEntryIfUnused(glossary.items, term, definition, {
              subjectId: body.subjectId,
              topicId: body.topicId,
              pendingDocument: body.pendingDocument,
            })

            if (result.removed) {
              await writeGlobalGlossary({ items: result.items })
            }

            jsonResponse(res, 200, {
              ok: true,
              removed: result.removed,
              usage: result.usage,
            })
            return
          }

          jsonResponse(res, 400, { error: 'Invalid action.' })
        } catch (err) {
          jsonResponse(res, 500, {
            error: err instanceof Error ? err.message : 'Glossary sync failed',
          })
        }
      })

      server.middlewares.use('/api/content/glossary', async (req, res, next) => {
        if (req.method !== 'GET') return next()
        try {
          const glossary = await readGlobalGlossary()
          const url = new URL(req.url ?? '', 'http://local')
          const termQuery = url.searchParams.get('term')?.trim()
          if (termQuery) {
            const existing = findGlobalEntryByTerm(glossary.items, termQuery)
            jsonResponse(res, 200, { item: existing })
            return
          }
          jsonResponse(res, 200, glossary)
        } catch (err) {
          jsonResponse(res, 500, {
            error: err instanceof Error ? err.message : 'Could not load glossary',
          })
        }
      })

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
            jsonResponse(res, 400, { error: 'Invalid request' })
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
            jsonResponse(res, 404, { error: 'Topic not found' })
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

          jsonResponse(res, 200, { ok: true, document: payload })
        } catch (err) {
          jsonResponse(res, 500, {
            error: err instanceof Error ? err.message : 'Save failed',
          })
        }
      })

      // Register /create and /delete before /topic — Connect prefix-matches, so a
      // generic /api/content/topic handler would otherwise swallow those paths.
      server.middlewares.use('/api/content/topic/create', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        try {
          const body = (await readJsonBody(req)) as {
            subjectId?: string
            topic?: {
              id?: string
              title?: string
              summary?: string
              level?: string
              parentId?: string
              status?: string
              createEmptyDocument?: boolean
            }
          }
          const { subjectId, topic } = body
          if (!isSafeContentId(subjectId) || !topic || !isSafeContentId(topic.id)) {
            jsonResponse(res, 400, { error: 'Invalid request' })
            return
          }

          const validated = validateTopicMetaPatch({
            title: topic.title,
            level: topic.level,
            summary: topic.summary,
          })
          if (!validated.ok) {
            jsonResponse(res, 400, { error: validated.error })
            return
          }

          const subjectDir = path.join(contentDir, 'subjects', subjectId)
          const metas = await listTopicMetas(subjectDir)
          if (metas.some((m) => m.id === topic.id)) {
            jsonResponse(res, 409, { error: 'Topic id already exists.' })
            return
          }

          const parentId =
            typeof topic.parentId === 'string' && topic.parentId.length > 0
              ? topic.parentId
              : undefined
          if (parentId) {
            if (!isSafeContentId(parentId) || !metas.some((m) => m.id === parentId)) {
              jsonResponse(res, 400, { error: 'Parent topic not found.' })
              return
            }
            const parentDepth = topicDepth(metas, parentId)
            if (parentDepth >= 2) {
              jsonResponse(res, 400, { error: 'Maximum topic depth is 3 levels.' })
              return
            }
          }

          const siblings = metas.filter(
            (m) => (m.parentId ?? undefined) === parentId,
          )
          const maxOrder = siblings.reduce(
            (max, m) => Math.max(max, typeof m.order === 'number' ? m.order : 0),
            -1,
          )

          const nextTopic: Record<string, unknown> = {
            id: topic.id,
            title: validated.patch.title,
            level: validated.patch.level,
            order: maxOrder + 1,
            tags: [],
          }
          if (parentId) nextTopic.parentId = parentId
          if (validated.patch.summary) nextTopic.summary = validated.patch.summary

          const parentMeta = parentId ? metas.find((m) => m.id === parentId) : undefined
          const inheritOptional =
            parentMeta != null && isMetaEffectivelyOptional(metas, parentMeta)
          if (inheritOptional || topic.status === 'optional') {
            nextTopic.status = 'optional'
          }

          const topicDir = path.join(subjectDir, 'topics', topic.id!)
          await mkdir(topicDir, { recursive: true })
          await writeFile(
            path.join(topicDir, 'topic.json'),
            `${JSON.stringify(nextTopic, null, 2)}\n`,
            'utf8',
          )

          if (topic.createEmptyDocument) {
            const parentDepth = parentId ? topicDepth(metas, parentId) : -1
            if (parentDepth !== 1) {
              jsonResponse(res, 400, {
                error: 'Empty content documents can only be created for sub-subtopics.',
              })
              return
            }
            const doc = {
              format: 'tiptap/v1',
              updatedAt: new Date().toISOString(),
              doc: { type: 'doc', content: [] },
            }
            await writeFile(
              path.join(topicDir, 'document.json'),
              `${JSON.stringify(doc)}\n`,
              'utf8',
            )
          }

          await regenContent()
          jsonResponse(res, 200, { ok: true, topic: nextTopic })
        } catch (err) {
          jsonResponse(res, 500, {
            error: err instanceof Error ? err.message : 'Create failed',
          })
        }
      })

      server.middlewares.use('/api/content/topic/delete', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        try {
          const body = (await readJsonBody(req)) as {
            subjectId?: string
            topicId?: string
          }
          const { subjectId, topicId } = body
          if (!isSafeContentId(subjectId) || !isSafeContentId(topicId)) {
            jsonResponse(res, 400, { error: 'Invalid request' })
            return
          }

          const subjectDir = path.join(contentDir, 'subjects', subjectId)
          const metas = await listTopicMetas(subjectDir)
          if (!metas.some((m) => m.id === topicId)) {
            jsonResponse(res, 404, { error: 'Topic not found' })
            return
          }

          const toDelete = collectDescendantIds(metas, topicId)
          for (const id of toDelete) {
            const dir = path.join(subjectDir, 'topics', id)
            if (existsSync(dir)) await rm(dir, { recursive: true, force: true })
          }

          await regenContent()
          jsonResponse(res, 200, { ok: true, deletedIds: toDelete })
        } catch (err) {
          jsonResponse(res, 500, {
            error: err instanceof Error ? err.message : 'Delete failed',
          })
        }
      })

      server.middlewares.use('/api/content/topic', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        // Connect strips the mount path; subroutes use dedicated handlers above.
        const pathname = (req.url ?? '').split('?')[0]
        if (pathname === '/create' || pathname === '/delete') return next()
        try {
          const body = (await readJsonBody(req)) as {
            subjectId?: string
            topicId?: string
            meta?: unknown
          }
          const { subjectId, topicId, meta } = body
          if (!isSafeContentId(subjectId) || !isSafeContentId(topicId)) {
            jsonResponse(res, 400, { error: 'Invalid request' })
            return
          }

          const validated = validateTopicMetaPatch(meta)
          if (!validated.ok) {
            jsonResponse(res, 400, { error: validated.error })
            return
          }

          const topicPath = path.join(
            contentDir,
            'subjects',
            subjectId,
            'topics',
            topicId,
            'topic.json',
          )
          if (!existsSync(topicPath)) {
            jsonResponse(res, 404, { error: 'Topic not found' })
            return
          }

          const existing = JSON.parse(await readFile(topicPath, 'utf8')) as Record<
            string,
            unknown
          >
          const { patch } = validated
          const nextTopic: Record<string, unknown> = {
            ...existing,
            title: patch.title,
            level: patch.level,
          }
          if ('summary' in patch) {
            if (patch.summary) nextTopic.summary = patch.summary
            else delete nextTopic.summary
          }
          if ('hours' in patch) {
            if (patch.hours === null) delete nextTopic.hours
            else nextTopic.hours = patch.hours
          }
          if ('tags' in patch) {
            nextTopic.tags = patch.tags
          }
          if ('status' in patch) {
            if (patch.status === 'optional') nextTopic.status = 'optional'
            else delete nextTopic.status
          }

          await writeFile(topicPath, `${JSON.stringify(nextTopic, null, 2)}\n`, 'utf8')
          if ('status' in patch) {
            const subjectDir = path.join(contentDir, 'subjects', subjectId!)
            const metas = await listTopicMetas(subjectDir)
            await applyTopicStatusCascade(
              subjectDir,
              metas,
              topicId!,
              patch.status === 'optional' ? 'optional' : 'core',
            )
          }
          await regenContent()
          jsonResponse(res, 200, { ok: true, topic: nextTopic })
        } catch (err) {
          jsonResponse(res, 500, {
            error: err instanceof Error ? err.message : 'Save failed',
          })
        }
      })

      server.middlewares.use('/api/content/subject', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        try {
          const body = (await readJsonBody(req)) as {
            subjectId?: string
            meta?: unknown
          }
          const { subjectId, meta } = body
          if (!isSafeContentId(subjectId)) {
            jsonResponse(res, 400, { error: 'Invalid request' })
            return
          }

          const validated = validateSubjectMetaPayload(meta)
          if (!validated.ok) {
            jsonResponse(res, 400, { error: validated.error })
            return
          }

          const subjectPath = path.join(contentDir, 'subjects', subjectId, 'subject.json')
          if (!existsSync(subjectPath)) {
            jsonResponse(res, 404, { error: 'Subject not found' })
            return
          }

          const existing = JSON.parse(await readFile(subjectPath, 'utf8')) as Record<
            string,
            unknown
          >
          const nextSubject = {
            ...existing,
            ...validated.payload,
            id: subjectId,
          }

          await writeFile(subjectPath, `${JSON.stringify(nextSubject, null, 2)}\n`, 'utf8')
          await regenContent()
          jsonResponse(res, 200, { ok: true, subject: nextSubject })
        } catch (err) {
          jsonResponse(res, 500, {
            error: err instanceof Error ? err.message : 'Save failed',
          })
        }
      })

      server.middlewares.use('/api/content/roadmap', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        try {
          const body = (await readJsonBody(req)) as {
            subjectId?: string
            roadmap?: unknown
          }
          const { subjectId, roadmap } = body
          if (!isSafeContentId(subjectId) || roadmap == null) {
            jsonResponse(res, 400, { error: 'Invalid request' })
            return
          }

          const validated = validateRoadmapPayload(roadmap)
          if (!validated.ok) {
            jsonResponse(res, 400, { error: validated.error })
            return
          }

          const subjectDir = path.join(contentDir, 'subjects', subjectId)
          if (!existsSync(subjectDir)) {
            jsonResponse(res, 404, { error: 'Subject not found' })
            return
          }

          const roadmapPath = path.join(subjectDir, 'roadmap.json')
          await writeFile(
            roadmapPath,
            `${JSON.stringify(validated.payload, null, 2)}\n`,
            'utf8',
          )

          await regenContent()
          jsonResponse(res, 200, { ok: true, roadmap: validated.payload })
        } catch (err) {
          jsonResponse(res, 500, {
            error: err instanceof Error ? err.message : 'Save failed',
          })
        }
      })

      server.middlewares.use('/api/content/reorder', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        try {
          const body = (await readJsonBody(req)) as {
            subjectId?: string
            parentId?: string | null
            orderedIds?: string[]
          }
          const { subjectId, parentId, orderedIds } = body
          if (!isSafeContentId(subjectId) || !Array.isArray(orderedIds)) {
            jsonResponse(res, 400, { error: 'Invalid request' })
            return
          }
          if (parentId != null && parentId !== '' && !isSafeContentId(parentId)) {
            jsonResponse(res, 400, { error: 'Invalid parent id' })
            return
          }
          for (const id of orderedIds) {
            if (!isSafeContentId(id)) {
              jsonResponse(res, 400, { error: 'Invalid topic id in order list' })
              return
            }
          }

          const normalizedParent =
            parentId == null || parentId === '' ? undefined : parentId
          const subjectDir = path.join(contentDir, 'subjects', subjectId)
          const metas = await listTopicMetas(subjectDir)
          const siblings = metas.filter(
            (m) => (m.parentId ?? undefined) === normalizedParent,
          )
          const siblingIds = new Set(
            siblings.map((m) => m.id).filter((id): id is string => typeof id === 'string'),
          )

          if (orderedIds.length !== siblingIds.size) {
            jsonResponse(res, 400, { error: 'Order list must include all siblings.' })
            return
          }
          for (const id of orderedIds) {
            if (!siblingIds.has(id)) {
              jsonResponse(res, 400, { error: 'Order list contains non-siblings.' })
              return
            }
          }

          for (let i = 0; i < orderedIds.length; i++) {
            const id = orderedIds[i]!
            const topicPath = path.join(subjectDir, 'topics', id, 'topic.json')
            const raw = JSON.parse(await readFile(topicPath, 'utf8')) as RawTopicMeta
            raw.order = i
            await writeFile(topicPath, `${JSON.stringify(raw, null, 2)}\n`, 'utf8')
          }

          await regenContent()
          jsonResponse(res, 200, { ok: true })
        } catch (err) {
          jsonResponse(res, 500, {
            error: err instanceof Error ? err.message : 'Reorder failed',
          })
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
        const isTopicJson = file.endsWith(`${path.sep}topic.json`)
        const isGlobalGlossaryJson = file.endsWith(`${path.sep}glossary.json`)
        clearTimeout(timer)
        timer = setTimeout(async () => {
          await generateContent({ force: true, log: false })
          // Dev saves update the UI from the save response; skip full reload.
          if (!isDocumentJson && !isTopicJson && !isGlobalGlossaryJson) {
            server.ws.send({ type: 'full-reload' })
          }
        }, isDocumentJson || isTopicJson ? 3000 : 150)
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
