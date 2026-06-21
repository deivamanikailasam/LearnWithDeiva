import { EditorState } from '@tiptap/pm/state'
import {
  Fragment,
  Slice,
  type Mark,
  type Node as PmNode,
  type Schema,
} from '@tiptap/pm/model'
import { stripPerplexityInlineCitations } from './strip-perplexity-citations'

/** Strip markdown markers so plain text aligns with HTML textContent. */
export function plainTextForSpacingCompare(plain: string): string {
  let s = stripPerplexityInlineCitations(plain.replace(/\r\n/g, '\n'))
  s = s.replace(/`([^`\n]+)`/g, '$1')
  s = s.replace(/\*\*\*([^*]+)\*\*\*/g, '$1')
  s = s.replace(/\*\*([^*]+)\*\*/g, '$1')
  s = s.replace(/(?<!\*)\*(?!\*)([^*\n]+)\*(?!\*)/g, '$1')
  s = s.replace(/___([^_]+)___/g, '$1')
  s = s.replace(/__([^_]+)__/g, '$1')
  s = s.replace(/(?<!_)_(?!_)([^_\n]+)_(?!_)/g, '$1')
  s = s.replace(/~~([^~]+)~~/g, '$1')
  return s
}

/** Positions in `pasted` where `expected` has a space that pasted omits. */
export function findMissingSpacePositions(pasted: string, expected: string): number[] {
  const positions: number[] = []
  let i = 0
  let j = 0

  while (i < expected.length && j < pasted.length) {
    if (expected[i] === pasted[j]) {
      i += 1
      j += 1
      continue
    }

    if (expected[i] === ' ' && i + 1 < expected.length && expected[i + 1] === pasted[j]) {
      positions.push(j)
      i += 1
      continue
    }

    if (/\s/.test(expected[i]!)) {
      i += 1
      continue
    }

    if (/\s/.test(pasted[j]!)) {
      j += 1
      continue
    }

    if (j + 1 < pasted.length && expected[i] === pasted[j + 1]) {
      j += 1
      continue
    }

    if (i + 1 < expected.length && pasted[j] === expected[i + 1]) {
      i += 1
      continue
    }

    i += 1
    j += 1
  }

  return positions
}

function markSignature(marks: readonly Mark[]): string {
  return marks.map((m) => `${m.type.name}:${JSON.stringify(m.attrs)}`).join('|')
}

function flattenFragmentText(fragment: Fragment): string {
  let text = ''
  fragment.forEach((node) => {
    node.descendants((child) => {
      if (child.isText) text += child.text ?? ''
    })
  })
  return text
}

function buildFlatToDocPosMap(doc: PmNode): number[] {
  const map: number[] = []
  doc.descendants((node, pos) => {
    if (!node.isText || !node.text) return
    for (let i = 0; i < node.text.length; i++) {
      map.push(pos + i)
    }
  })
  return map
}

function isInlineMathNode(node: PmNode): boolean {
  return node.type.name === 'inlineMath'
}

function fixInlineContentMarkBoundaries(content: Fragment, schema: Schema): Fragment {
  const inlineNodes: PmNode[] = []
  content.forEach((node) => inlineNodes.push(node))

  const fixed: PmNode[] = []
  for (const curr of inlineNodes) {
    const prev = fixed[fixed.length - 1]
    if (
      prev?.isText &&
      curr.isText &&
      prev.text &&
      curr.text &&
      markSignature(prev.marks) !== markSignature(curr.marks) &&
      /\w$/.test(prev.text) &&
      /^\w/.test(curr.text)
    ) {
      fixed[fixed.length - 1] = schema.text(`${prev.text} `, prev.marks)
    } else if (prev?.isText && prev.text && isInlineMathNode(curr) && /\w$/.test(prev.text)) {
      fixed[fixed.length - 1] = schema.text(`${prev.text} `, prev.marks)
    } else if (
      prev &&
      isInlineMathNode(prev) &&
      curr.isText &&
      curr.text &&
      /^\w/.test(curr.text)
    ) {
      fixed.push(schema.text(' '))
    }
    fixed.push(curr)
  }

  return Fragment.from(fixed)
}

/** Insert spaces between adjacent inline nodes whose marks differ (e.g. plain + bold). */
export function fixInlineMarkBoundarySpaces(fragment: Fragment, schema: Schema): Fragment {
  const out: PmNode[] = []
  fragment.forEach((node) => {
    if (node.isTextblock) {
      out.push(node.copy(fixInlineContentMarkBoundaries(node.content, schema)))
      return
    }
    if (node.content.size) {
      out.push(node.copy(fixInlineMarkBoundarySpaces(node.content, schema)))
      return
    }
    out.push(node)
  })
  return Fragment.fromArray(out)
}

function wrapSliceForEdit(
  slice: Slice,
  schema: Schema,
): { doc: PmNode; unwrap: (edited: PmNode) => Fragment } {
  const docType = schema.nodes.doc
  const paragraph = schema.nodes.paragraph
  if (!docType) {
    throw new Error('Schema is missing doc node')
  }

  if (slice.openStart > 0 || slice.openEnd > 0) {
    const block = paragraph?.create(null, slice.content) ?? slice.content
    const doc = docType.create(null, Fragment.from(block))
    return {
      doc,
      unwrap: (edited) => edited.firstChild?.content ?? slice.content,
    }
  }

  const doc = docType.create(null, slice.content)
  return {
    doc,
    unwrap: (edited) => edited.content,
  }
}

function insertSpacesInDoc(doc: PmNode, positions: number[], schema: Schema): PmNode {
  const indexMap = buildFlatToDocPosMap(doc)
  const tr = EditorState.create({ schema, doc }).tr

  for (const idx of [...new Set(positions)].sort((a, b) => b - a)) {
    const pos = indexMap[idx]
    if (pos == null) continue
    const before = tr.doc.textBetween(Math.max(0, pos - 1), pos, undefined, '')
    const at = tr.doc.textBetween(pos, pos + 1, undefined, '')
    if (before === ' ' || at === ' ') continue
    tr.insertText(' ', pos, pos)
  }

  return tr.doc
}

/** Fix spacing in a parsed paste slice using mark boundaries and clipboard plain text. */
export function fixPastedSliceSpacing(
  slice: Slice,
  plainText: string | undefined,
  schema: Schema,
): Slice {
  let content = fixInlineMarkBoundarySpaces(slice.content, schema)

  if (plainText?.trim()) {
    const pastedText = stripPerplexityInlineCitations(flattenFragmentText(content))
    const expected = plainTextForSpacingCompare(plainText)

    if (expected.trim() && pastedText !== expected) {
      const positions = findMissingSpacePositions(pastedText, expected)
      if (positions.length) {
        const { doc, unwrap } = wrapSliceForEdit(
          new Slice(content, slice.openStart, slice.openEnd),
          schema,
        )
        content = unwrap(insertSpacesInDoc(doc, positions, schema))
      }
    }
  }

  return new Slice(content, slice.openStart, slice.openEnd)
}

interface TextSpan {
  node: Text
  start: number
  end: number
}

function collectTextSpans(root: Element): TextSpan[] {
  const spans: TextSpan[] = []
  let pos = 0
  const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let node: Node | null

  while ((node = walker.nextNode())) {
    const parent = node.parentElement
    if (parent?.closest('pre')) continue
    const text = node.textContent ?? ''
    if (!text) continue
    spans.push({ node: node as Text, start: pos, end: pos + text.length })
    pos += text.length
  }

  return spans
}

function insertSpacesAtPositions(root: Element, positions: number[]): void {
  if (!positions.length) return

  for (const pos of [...new Set(positions)].sort((a, b) => b - a)) {
    const spans = collectTextSpans(root)
    const span = spans.find((s) => pos >= s.start && pos <= s.end)
    if (!span) continue

    const offset = pos - span.start
    const text = span.node.textContent ?? ''
    if (text[offset - 1] === ' ' || text[offset] === ' ') continue
    span.node.textContent = `${text.slice(0, offset)} ${text.slice(offset)}`
  }
}

/** Use clipboard plain text to restore spaces lost in rich HTML paste. */
export function reconcileHtmlSpacingFromPlain(doc: Document, plainText: string): void {
  const expected = plainTextForSpacingCompare(plainText)
  const pasted = stripPerplexityInlineCitations(doc.body.textContent ?? '')
  if (!expected.trim() || !pasted.trim() || pasted === expected) return

  const positions = findMissingSpacePositions(pasted, expected)
  if (!positions.length) return

  insertSpacesAtPositions(doc.body, positions)
}
