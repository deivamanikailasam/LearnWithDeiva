import type { Editor } from '@tiptap/core'
import type { JSONContent } from '@tiptap/core'
import { normalizeLatexForKatex } from './normalize-latex-for-katex'

/** Normalize `latex` attrs on saved TipTap JSON (does not touch code blocks or plain text). */
export function sanitizeMathInJson(nodes: JSONContent[]): JSONContent[] {
  return nodes.map((node) => {
    if (node.type === 'inlineMath' || node.type === 'blockMath') {
      const latex = typeof node.attrs?.latex === 'string' ? node.attrs.latex : ''
      return {
        ...node,
        attrs: { ...node.attrs, latex: normalizeLatexForKatex(latex) },
      }
    }
    if (Array.isArray(node.content)) {
      return { ...node, content: sanitizeMathInJson(node.content) }
    }
    return node
  })
}

/** Re-normalize existing math nodes so previously broken LaTeX renders after fixes ship. */
export function repairMathLatexInEditor(editor: Editor): boolean {
  const tr = editor.state.tr
  let changed = false

  editor.state.doc.descendants((node, pos) => {
    if (node.type.name !== 'inlineMath' && node.type.name !== 'blockMath') return

    const raw = typeof node.attrs.latex === 'string' ? node.attrs.latex : ''
    const fixed = normalizeLatexForKatex(raw)
    if (!fixed || fixed === raw) return

    tr.setNodeMarkup(tr.mapping.map(pos), node.type, { ...node.attrs, latex: fixed })
    changed = true
  })

  if (!changed) return false
  tr.setMeta('addToHistory', false)
  editor.view.dispatch(tr)
  return true
}
