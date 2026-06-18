import type { JSONContent } from '@tiptap/core'

/** On-disk / build artifact shape for TipTap-authored topic bodies. */
export interface TopicDocument {
  format: 'tiptap/v1'
  updatedAt?: string
  doc: JSONContent
}

export function isTopicDocument(data: unknown): data is TopicDocument {
  if (!data || typeof data !== 'object') return false
  const d = data as TopicDocument
  return d.format === 'tiptap/v1' && d.doc?.type === 'doc'
}

export function emptyTopicDocument(): TopicDocument {
  return {
    format: 'tiptap/v1',
    doc: { type: 'doc', content: [{ type: 'paragraph' }] },
  }
}
