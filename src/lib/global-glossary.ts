import type { JSONContent } from '@tiptap/core'
import { invalidateGlossaryCache } from './glossary'

export interface GlobalGlossaryItem {
  id: string
  term: string
  definition: string
  createdAt?: string
  updatedAt?: string
}

export interface GlobalGlossaryFile {
  updatedAt?: string
  items: GlobalGlossaryItem[]
}

export type GlossarySyncResult =
  | { ok: true; action: 'added' | 'reused'; item: GlobalGlossaryItem }
  | { ok: false; conflict: true; existing: GlobalGlossaryItem }
  | { ok: false; error: string }

type GlossarySyncApiResponse = {
  ok?: boolean
  action?: 'added' | 'reused'
  item?: GlobalGlossaryItem
  conflict?: boolean
  existing?: GlobalGlossaryItem
  error?: string
}

export type GlossaryRemoveResult = {
  ok: true
  removed: boolean
  usage: number
}

async function parseApiError(res: Response): Promise<string> {
  const text = await res.text()
  let message = `Request failed (${res.status})`
  try {
    const err = JSON.parse(text) as { error?: string }
    if (err.error) message = err.error
  } catch {
    if (text.trim()) message = text.trim().slice(0, 200)
  }
  return message
}

export async function loadGlobalGlossaryFromApi(): Promise<GlobalGlossaryFile> {
  const res = await fetch('/api/content/glossary')
  if (!res.ok) throw new Error(await parseApiError(res))
  const body = (await res.json()) as GlobalGlossaryFile
  return { items: body.items ?? [], updatedAt: body.updatedAt }
}

export async function findGlobalGlossaryEntry(term: string): Promise<GlobalGlossaryItem | null> {
  const trimmed = term.trim()
  if (!trimmed) return null
  const res = await fetch(`/api/content/glossary?term=${encodeURIComponent(trimmed)}`)
  if (!res.ok) throw new Error(await parseApiError(res))
  const body = (await res.json()) as { item?: GlobalGlossaryItem | null }
  return body.item ?? null
}

export async function syncGlobalGlossaryEntry(
  term: string,
  definition: string,
): Promise<GlossarySyncResult> {
  const res = await fetch('/api/content/glossary/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'upsert', term, definition }),
  })

  const body = (await res.json()) as GlossarySyncApiResponse

  if (res.status === 409 && body.conflict && body.existing) {
    return { ok: false, conflict: true, existing: body.existing }
  }
  if (!res.ok || !body.ok) {
    return { ok: false, error: body.error ?? `Request failed (${res.status})` }
  }

  invalidateGlossaryCache()
  return { ok: true, action: body.action ?? 'added', item: body.item! }
}

export async function removeGlobalGlossaryEntry(
  term: string,
  definition: string,
  options: {
    subjectId: string
    topicId: string
    pendingDocument?: JSONContent
  },
): Promise<GlossaryRemoveResult> {
  const res = await fetch('/api/content/glossary/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'remove',
      term,
      definition,
      subjectId: options.subjectId,
      topicId: options.topicId,
      pendingDocument: options.pendingDocument,
    }),
  })

  if (!res.ok) throw new Error(await parseApiError(res))
  const body = (await res.json()) as GlossaryRemoveResult
  invalidateGlossaryCache()
  return body
}
