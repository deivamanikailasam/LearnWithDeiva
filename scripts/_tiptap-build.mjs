/** Minimal TipTap document builder for batch content authoring. */

export const t = (text, marks = []) =>
  marks.length ? { type: 'text', text, marks } : { type: 'text', text }

export const bold = (text) => t(text, [{ type: 'bold' }])
export const code = (text) => t(text, [{ type: 'code' }])
export const italic = (text) => t(text, [{ type: 'italic' }])

export const para = (...parts) => ({
  type: 'paragraph',
  content: parts.flat(),
})

export const h2 = (text) => ({
  type: 'heading',
  attrs: { level: 2 },
  content: [t(text)],
})

export const h3 = (text) => ({
  type: 'heading',
  attrs: { level: 3 },
  content: [t(text)],
})

export const cb = (language, source) => ({
  type: 'codeBlock',
  attrs: { language },
  content: [t(source)],
})

export const li = (...parts) => ({
  type: 'listItem',
  content: [para(...parts)],
})

export const ul = (...items) => ({
  type: 'bulletList',
  content: items,
})

export const ol = (...items) => ({
  type: 'orderedList',
  attrs: { start: 1 },
  content: items,
})

export const hr = () => ({ type: 'horizontalRule' })

export function doc(...nodes) {
  return {
    format: 'tiptap/v1',
    updatedAt: new Date().toISOString(),
    doc: { type: 'doc', content: nodes },
  }
}
