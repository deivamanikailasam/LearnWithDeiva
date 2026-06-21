import type { Node as PmNode, Schema } from '@tiptap/pm/model'
import { normalizeLatexForKatex } from './normalize-latex-for-katex'
import { parseInlineMarkdown } from './parse-inline-markdown'

/** `$x$` and `\(...\)` inline LaTeX delimiters. */
const inlineMathPattern =
  /(?<!\$)\$(?!\$)([^$\n]+?)\$(?!\$)|\\\(([^\\\n]+?)\\\)/g

export type InlineMathSegment = { type: 'text' | 'math'; text: string }

export function splitInlineMathSegments(input: string): InlineMathSegment[] {
  if (!input) return []

  const segments: InlineMathSegment[] = []
  let last = 0
  let match: RegExpExecArray | null
  const regex = new RegExp(inlineMathPattern.source, inlineMathPattern.flags)

  while ((match = regex.exec(input)) !== null) {
    const latex = (match[1] ?? match[2] ?? '').trim()
    if (!latex) continue

    if (match.index > last) {
      segments.push({ type: 'text', text: input.slice(last, match.index) })
    }
    segments.push({ type: 'math', text: latex })
    last = match.index + match[0].length
  }

  if (last < input.length) {
    segments.push({ type: 'text', text: input.slice(last) })
  }

  if (!segments.length && input) {
    segments.push({ type: 'text', text: input })
  }

  return segments
}

export function textHasInlineMathDelimiters(text: string): boolean {
  return /(?<!\$)\$(?!\$)([^$\n]+?)\$(?!\$)|\\\(([^\\\n]+?)\\\)/.test(text)
}

function markdownSegmentsToNodes(schema: Schema, text: string): PmNode[] {
  const segments = parseInlineMarkdown(text)
  if (!segments.length) return text ? [schema.text(text)] : []

  return segments.flatMap((seg) => {
    if (!seg.text) return []
    const marks = seg.marks.flatMap((mark) => {
      const markType = schema.marks[mark.type]
      if (!markType) return []
      return [markType.create(mark.attrs)]
    })
    return [schema.text(seg.text, marks)]
  })
}

/** Parse inline markdown plus `$latex$` / `\(...\)` into TipTap inline nodes. */
export function inlineTextToPmNodes(schema: Schema, text: string): PmNode[] {
  const inlineMath = schema.nodes.inlineMath
  if (!inlineMath || !textHasInlineMathDelimiters(text)) {
    return markdownSegmentsToNodes(schema, text)
  }

  return splitInlineMathSegments(text).flatMap((seg) => {
    if (seg.type === 'math') {
      return [inlineMath.create({ latex: normalizeLatexForKatex(seg.text) })]
    }
    return markdownSegmentsToNodes(schema, seg.text)
  })
}
