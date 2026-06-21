import type { Editor } from '@tiptap/core'
import type { Node as PmNode } from '@tiptap/pm/model'
import { mathMigrationRegex } from '@tiptap/extension-mathematics'
import { inlineTextToPmNodes } from './inline-math-to-nodes'
import { normalizeLatexForKatex, looksLikeLatexFormulaLine } from './normalize-latex-for-katex'
import { shouldSkipMathMigrationAtPos } from './paste-math'
import { repairMathLatexInEditor } from './repair-math-latex'

const blockMathRegex = /\$\$([\s\S]+?)\$\$/g
const latexParenRegex = /\\\(([^\\\n]+?)\\\)/g
const wholeBracketBlockRegex = /^\s*\\\[\s*([\s\S]+?)\s*\\\]\s*$/

function replaceMathInTextNodes(
  editor: Editor,
  tr: import('@tiptap/pm/state').Transaction,
  regex: RegExp,
  createNode: (latex: string) => PmNode | null,
  options?: { blockInParagraph?: boolean },
): import('@tiptap/pm/state').Transaction {
  const inlineMath = editor.schema.nodes.inlineMath
  const blockMath = editor.schema.nodes.blockMath
  if (!inlineMath && !blockMath) return tr

  tr.doc.descendants((node, pos) => {
    if (node.type.name === 'codeBlock') return false

    if (!node.isText || !node.text) return

    const mappedPos = tr.mapping.map(pos)
    if (shouldSkipMathMigrationAtPos(tr.doc, mappedPos)) return

    const { text } = node
    let match: RegExpExecArray | null
    const localRegex = new RegExp(regex.source, regex.flags)

    while ((match = localRegex.exec(text)) !== null) {
      const full = match[0]
      const latex = (match[1] ?? '').trim()
      if (!latex) continue

      const start = match.index
      const end = start + full.length
      const from = tr.mapping.map(pos + start)
      if (shouldSkipMathMigrationAtPos(tr.doc, from)) continue

      const $from = tr.doc.resolve(from)
      const parent = $from.parent
      const index = $from.index()

      const nodeToInsert = createNode(normalizeLatexForKatex(latex))
      if (!nodeToInsert) continue

      if (nodeToInsert.type.name === 'blockMath' && !options?.blockInParagraph) {
        continue
      }

      if (nodeToInsert.type.name === 'blockMath') {
        tr.replaceWith(tr.mapping.map(pos + start), tr.mapping.map(pos + end), nodeToInsert)
        localRegex.lastIndex = end
        continue
      }

      if (!inlineMath || !parent.canReplaceWith(index, index + 1, inlineMath)) continue

      tr.replaceWith(
        tr.mapping.map(pos + start),
        tr.mapping.map(pos + end),
        nodeToInsert,
      )
    }
  })

  return tr
}

function migrateBareLatexParagraphs(
  editor: Editor,
  tr: import('@tiptap/pm/state').Transaction,
): import('@tiptap/pm/state').Transaction {
  const blockMath = editor.schema.nodes.blockMath
  if (!blockMath) return tr

  const replacements: { pos: number; nodeSize: number; latex: string }[] = []

  tr.doc.descendants((node, pos) => {
    if (node.type.name === 'codeBlock') return false
    if (node.type.name !== 'paragraph') return

    const text = node.textContent.trim()
    if (!looksLikeLatexFormulaLine(text)) return

    replacements.push({
      pos: tr.mapping.map(pos),
      nodeSize: node.nodeSize,
      latex: normalizeLatexForKatex(text),
    })
  })

  for (const { pos, nodeSize, latex } of replacements) {
    tr.replaceWith(pos, tr.mapping.map(pos + nodeSize), blockMath.create({ latex }))
  }

  return tr
}

function migrateWholeBracketParagraphs(
  editor: Editor,
  tr: import('@tiptap/pm/state').Transaction,
): import('@tiptap/pm/state').Transaction {
  const blockMath = editor.schema.nodes.blockMath
  const paragraph = editor.schema.nodes.paragraph
  if (!blockMath || !paragraph) return tr

  const replacements: { pos: number; nodeSize: number; latex: string }[] = []

  tr.doc.descendants((node, pos) => {
    if (node.type.name === 'codeBlock') return false
    if (node.type.name !== 'paragraph') return

    const match = node.textContent.match(wholeBracketBlockRegex)
    if (!match?.[1]?.trim()) return

    replacements.push({
      pos: tr.mapping.map(pos),
      nodeSize: node.nodeSize,
      latex: match[1].trim(),
    })
  })

  for (const { pos, nodeSize, latex } of replacements) {
    tr.replaceWith(pos, tr.mapping.map(pos + nodeSize), blockMath.create({ latex }))
  }

  return tr
}

function migrateSplitBracketParagraphs(
  editor: Editor,
  tr: import('@tiptap/pm/state').Transaction,
): import('@tiptap/pm/state').Transaction {
  const blockMath = editor.schema.nodes.blockMath
  const paragraph = editor.schema.nodes.paragraph
  if (!blockMath || !paragraph) return tr

  const replacements: { pos: number; nodeSize: number; nodes: PmNode[] }[] = []

  tr.doc.descendants((node, pos) => {
    if (node.type.name === 'codeBlock') return false
    if (node.type.name !== 'paragraph') return

    const text = node.textContent
    const match = text.match(/\\\[([\s\S]+?)\\\]/)
    if (!match?.[1]?.trim()) return
    const matchIndex = match.index ?? 0
    if (wholeBracketBlockRegex.test(text)) return

    const before = text.slice(0, matchIndex).trim()
    const after = text.slice(matchIndex + match[0].length).trim()
    const latex = match[1].trim()

    const nodes: PmNode[] = []
    if (before) {
      nodes.push(paragraph.create({}, inlineTextToPmNodes(editor.schema, before)))
    }
    nodes.push(blockMath.create({ latex: normalizeLatexForKatex(latex) }))
    if (after) {
      nodes.push(paragraph.create({}, inlineTextToPmNodes(editor.schema, after)))
    }

    if (!nodes.length) return

    replacements.push({
      pos: tr.mapping.map(pos),
      nodeSize: node.nodeSize,
      nodes,
    })
  })

  for (const { pos, nodeSize, nodes } of replacements) {
    tr.replaceWith(pos, tr.mapping.map(pos + nodeSize), nodes)
  }

  return tr
}

function migrateBracketParagraphRuns(
  editor: Editor,
  tr: import('@tiptap/pm/state').Transaction,
): import('@tiptap/pm/state').Transaction {
  const blockMath = editor.schema.nodes.blockMath
  const paragraph = editor.schema.nodes.paragraph
  if (!blockMath || !paragraph) return tr

  const children: { node: PmNode; pos: number }[] = []
  tr.doc.forEach((node, offset) => {
    if (node.type.name === 'codeBlock') return
    if (node.isBlock && node.type.name === 'paragraph') {
      children.push({ node, pos: offset })
    }
  })

  let i = 0
  while (i < children.length) {
    const current = children[i]
    if (current.node.textContent.trim() !== '\\[') {
      i++
      continue
    }

    const latexLines: string[] = []
    let j = i + 1
    while (j < children.length && children[j].node.textContent.trim() !== '\\]') {
      latexLines.push(children[j].node.textContent)
      j++
    }

    if (j >= children.length || children[j].node.textContent.trim() !== '\\]') {
      i++
      continue
    }

    const latex = latexLines.join('\n').trim()
    if (!latex) {
      i = j + 1
      continue
    }

    const from = tr.mapping.map(current.pos)
    const to = tr.mapping.map(children[j].pos + children[j].node.nodeSize)
    tr.replaceWith(from, to, blockMath.create({ latex: normalizeLatexForKatex(latex) }))

    children.splice(i, j - i + 1)
  }

  return tr
}

function migrateSingleDollarMath(
  editor: Editor,
  tr: import('@tiptap/pm/state').Transaction,
): import('@tiptap/pm/state').Transaction {
  const inlineMath = editor.schema.nodes.inlineMath
  if (!inlineMath) return tr

  const regex = new RegExp(mathMigrationRegex.source, mathMigrationRegex.flags)

  tr.doc.descendants((node, pos) => {
    if (node.type.name === 'codeBlock') return false
    if (!node.isText || !node.text || !node.text.includes('$')) return

    const mappedPos = tr.mapping.map(pos)
    if (shouldSkipMathMigrationAtPos(tr.doc, mappedPos)) return

    const { text } = node
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      const full = match[0]
      const latex = full.slice(1, -1)
      if (!latex.trim()) continue

      const start = match.index
      const end = start + full.length
      const from = tr.mapping.map(pos + start)
      if (shouldSkipMathMigrationAtPos(tr.doc, from)) continue

      const $from = tr.doc.resolve(from)
      const parent = $from.parent
      const index = $from.index()

      if (!parent.canReplaceWith(index, index + 1, inlineMath)) continue

      tr.replaceWith(
        tr.mapping.map(pos + start),
        tr.mapping.map(pos + end),
        inlineMath.create({ latex: normalizeLatexForKatex(latex) }),
      )
    }
  })

  return tr
}

/** Convert pasted LaTeX delimiters in prose into math nodes. Never touches code blocks. */
export function migratePastedMath(editor: Editor): void {
  const { inlineMath, blockMath } = editor.schema.nodes
  if (!inlineMath && !blockMath) return

  let tr = editor.state.tr

  if (blockMath) {
    tr = migrateBareLatexParagraphs(editor, tr)
    tr = migrateBracketParagraphRuns(editor, tr)
    tr = migrateWholeBracketParagraphs(editor, tr)
    tr = migrateSplitBracketParagraphs(editor, tr)
    tr = replaceMathInTextNodes(editor, tr, blockMathRegex, (latex) =>
      blockMath.create({ latex }),
    )
  }

  if (inlineMath) {
    tr = migrateSingleDollarMath(editor, tr)
    tr = replaceMathInTextNodes(editor, tr, latexParenRegex, (latex) =>
      inlineMath.create({ latex }),
    )
  }

  if (tr !== editor.state.tr) {
    tr.setMeta('addToHistory', false)
    editor.view.dispatch(tr)
  }

  repairMathLatexInEditor(editor)
}
