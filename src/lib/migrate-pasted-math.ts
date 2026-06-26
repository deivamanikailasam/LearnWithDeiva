import type { Editor } from '@tiptap/core'
import type { Node as PmNode } from '@tiptap/pm/model'
import { mathMigrationRegex } from '@tiptap/extension-mathematics'
import { inlineTextToPmNodes } from './inline-math-to-nodes'
import {
  latexHasRawInlineDelimiters,
  latexIsProseAndMathBlob,
  looksLikeLatexFormulaLine,
  normalizeLatexForKatex,
} from './normalize-latex-for-katex'
import { INLINE_LATEX_PAREN_INNER, shouldSkipMathMigrationAtPos, textHasInlineMathDelimiters } from './paste-math'
import { repairMathLatexInEditor } from './repair-math-latex'

const blockMathRegex = /\$\$([\s\S]+?)\$\$/g
const latexParenRegex = new RegExp(
  String.raw`\\\(((${INLINE_LATEX_PAREN_INNER}))\\\)`,
  'g',
)
const wholeBracketBlockRegex = /^\s*\\\[\s*([\s\S]+?)\s*\\\]\s*$/
const displayDollarInTextRegex = /\$\$([\s\S]+?)\$\$/g

function migrateDisplayDollarMathInParagraphs(
  editor: Editor,
  tr: import('@tiptap/pm/state').Transaction,
): import('@tiptap/pm/state').Transaction {
  const blockMath = editor.schema.nodes.blockMath
  const paragraph = editor.schema.nodes.paragraph
  if (!blockMath || !paragraph) return tr

  const jobs: { pos: number; nodeSize: number; nodes: PmNode[] }[] = []

  tr.doc.descendants((node, pos) => {
    if (node.type.name === 'codeBlock') return false
    if (node.type.name !== 'paragraph') return

    const text = node.textContent
    if (!/\$\$[\s\S]+?\$\$/.test(text)) return

    const nodes: PmNode[] = []
    let last = 0
    const regex = new RegExp(displayDollarInTextRegex.source, displayDollarInTextRegex.flags)
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      const before = text.slice(last, match.index).trim()
      if (before) {
        nodes.push(paragraph.create({}, inlineTextToPmNodes(editor.schema, before)))
      }
      const latex = match[1]?.trim()
      if (latex) {
        nodes.push(blockMath.create({ latex: normalizeLatexForKatex(latex) }))
      }
      last = match.index + match[0].length
    }

    const after = text.slice(last).trim()
    if (after) {
      nodes.push(paragraph.create({}, inlineTextToPmNodes(editor.schema, after)))
    }

    if (nodes.length) {
      jobs.push({
        pos: tr.mapping.map(pos),
        nodeSize: node.nodeSize,
        nodes,
      })
    }
  })

  for (const job of jobs.reverse()) {
    tr.replaceWith(job.pos, tr.mapping.map(job.pos + job.nodeSize), job.nodes)
  }

  return tr
}

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

/** Plain text for math migration — includes atom `inlineMath` attrs (omitted from `textContent`). */
function textblockTextForMathMigration(node: PmNode): string {
  let text = ''
  node.forEach((child) => {
    if (child.isText) {
      text += child.text ?? ''
      return
    }
    if (child.type.name === 'inlineMath') {
      const latex = typeof child.attrs.latex === 'string' ? child.attrs.latex : ''
      if (latex) text += latex
    }
  })
  return text
}

/**
 * Rebuild textblock inline content when delimiters span multiple text nodes (HTML paste)
 * or when per-node regex migration missed `\(...\)` / `$...$` with LaTeX commands.
 */
function migrateInlineMathInTextblocks(
  editor: Editor,
  tr: import('@tiptap/pm/state').Transaction,
): import('@tiptap/pm/state').Transaction {
  const inlineMath = editor.schema.nodes.inlineMath
  if (!inlineMath) return tr

  const jobs: { from: number; to: number; nodes: PmNode[] }[] = []

  tr.doc.descendants((node, pos) => {
    if (node.type.name === 'codeBlock') return false
    if (!node.isTextblock || node.childCount === 0) return

    let textOnly = ''
    const brokenMath: { childPos: number; latex: string }[] = []
    let hasValidMathNode = false

    node.forEach((child, offset) => {
      if (child.isText) {
        textOnly += child.text ?? ''
        return
      }
      if (child.type.name !== 'inlineMath') return

      const raw = typeof child.attrs.latex === 'string' ? child.attrs.latex : ''
      if (!raw) return
      if (latexHasRawInlineDelimiters(raw)) {
        brokenMath.push({ childPos: pos + 1 + offset, latex: raw })
      } else {
        hasValidMathNode = true
      }
    })

    if (hasValidMathNode) return

    const needsRebuild =
      textHasInlineMathDelimiters(textOnly) ||
      brokenMath.some((entry) => latexIsProseAndMathBlob(entry.latex))

    if (needsRebuild) {
      const text = textblockTextForMathMigration(node)
      if (!textHasInlineMathDelimiters(text) && brokenMath.length === 0) return

      const pmNodes = inlineTextToPmNodes(editor.schema, text)
      if (!pmNodes.some((n) => n.type.name === 'inlineMath')) return

      jobs.push({
        from: pos + 1,
        to: pos + node.nodeSize - 1,
        nodes: pmNodes,
      })
      return
    }

    for (const entry of brokenMath) {
      const fixed = normalizeLatexForKatex(entry.latex)
      if (!fixed || fixed === entry.latex) continue
      tr.setNodeMarkup(tr.mapping.map(entry.childPos), inlineMath, { latex: fixed })
    }
  })

  for (const job of jobs.reverse()) {
    tr.replaceWith(tr.mapping.map(job.from), tr.mapping.map(job.to), job.nodes)
  }

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
    tr = migrateDisplayDollarMathInParagraphs(editor, tr)
    tr = replaceMathInTextNodes(editor, tr, blockMathRegex, (latex) =>
      blockMath.create({ latex }),
    )
  }

  if (inlineMath) {
    tr = migrateInlineMathInTextblocks(editor, tr)
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
