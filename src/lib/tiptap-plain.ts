import type { JSONContent } from '@tiptap/core'

/** Recursively flatten a TipTap / ProseMirror JSON tree into plain text. */
export function tiptapNodeToPlain(node: JSONContent | undefined): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  return (node.content ?? []).map(tiptapNodeToPlain).join(' ')
}

export function tiptapDocToPlain(doc: JSONContent): string {
  return tiptapNodeToPlain(doc)
}
