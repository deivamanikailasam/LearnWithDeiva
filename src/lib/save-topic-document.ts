import type { TopicDocument } from '../types/tiptap-document'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export interface SavedTopicDocumentResult {
  document: TopicDocument
  duration?: {
    hours: number
    hoursSource: 'computed'
  }
}

export async function saveTopicDocument(
  subjectId: string,
  topicId: string,
  document: TopicDocument,
): Promise<SavedTopicDocumentResult> {
  const payload: TopicDocument = {
    ...document,
    format: 'tiptap/v1',
    updatedAt: new Date().toISOString(),
  }

  const res = await fetch('/api/content/document', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subjectId, topicId, document: payload }),
  })

  if (!res.ok) {
    const text = await res.text()
    let message = `Save failed (${res.status})`
    try {
      const err = JSON.parse(text) as { error?: string }
      if (err.error) message = err.error
    } catch {
      if (text.trim()) message = text.trim().slice(0, 200)
    }
    throw new Error(message)
  }

  const body = (await res.json()) as {
    document?: TopicDocument
    duration?: { hours?: number; hoursSource?: 'computed' }
  }
  const saved = body.document ?? payload
  const duration =
    typeof body.duration?.hours === 'number' && body.duration.hoursSource === 'computed'
      ? { hours: body.duration.hours, hoursSource: 'computed' as const }
      : undefined
  return { document: saved, duration }
}
