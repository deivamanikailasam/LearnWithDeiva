import type { Editor } from '@tiptap/core'
import type { Node as PmNode } from '@tiptap/pm/model'
import Mathematics from '@tiptap/extension-mathematics'
import { normalizeLatexForKatex } from '../../lib/normalize-latex-for-katex'

const katexOptions = {
  throwOnError: false,
  strict: 'ignore' as const,
  trust: true as const,
}

export type MathEditorHandlers = {
  getEditor: () => Editor | null
}

function editInlineMath(getEditor: () => Editor | null, node: PmNode, pos: number) {
  const editor = getEditor()
  if (!editor) return
  const latex = window.prompt('Edit inline math (LaTeX)', node.attrs.latex as string)
  if (latex === null) return
  editor
    .chain()
    .setNodeSelection(pos)
    .updateInlineMath({ latex: normalizeLatexForKatex(latex) })
    .focus()
    .run()
}

function editBlockMath(getEditor: () => Editor | null, node: PmNode, pos: number) {
  const editor = getEditor()
  if (!editor) return
  const latex = window.prompt('Edit block math (LaTeX)', node.attrs.latex as string)
  if (latex === null) return
  editor
    .chain()
    .setNodeSelection(pos)
    .updateBlockMath({ latex: normalizeLatexForKatex(latex) })
    .focus()
    .run()
}

export function createMathExtensions(handlers?: MathEditorHandlers) {
  const getEditor = handlers?.getEditor ?? (() => null)

  return Mathematics.configure({
    katexOptions,
    inlineOptions: {
      onClick: (node, pos) => editInlineMath(getEditor, node, pos),
    },
    blockOptions: {
      onClick: (node, pos) => editBlockMath(getEditor, node, pos),
    },
  })
}

/** Read-only math rendering for viewers (no click-to-edit). */
export const viewMathExtensions = Mathematics.configure({
  katexOptions,
})
