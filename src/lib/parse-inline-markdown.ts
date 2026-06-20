import { looksLikePerplexitySourceId } from './strip-perplexity-citations'

export type InlineMarkType = 'bold' | 'italic' | 'code' | 'link' | 'strike'

export interface InlineMark {
  type: InlineMarkType
  attrs?: Record<string, unknown>
}

export interface InlineSegment {
  text: string
  marks: InlineMark[]
}

function marksEqual(a: InlineMark[], b: InlineMark[]): boolean {
  return a.length === b.length && a.every((m, i) => m.type === b[i]?.type)
}

function pushSegment(segments: InlineSegment[], text: string, marks: InlineMark[]) {
  if (!text) return
  const cleaned = marks.map(({ type, attrs }) =>
    type === 'link' ? { type, attrs: { href: attrs?.href } } : { type },
  )
  const last = segments[segments.length - 1]
  if (last && marksEqual(last.marks, cleaned)) {
    last.text += text
    return
  }
  segments.push({ text, marks: cleaned })
}

interface OpenDelimiter {
  token: string
  marks: InlineMark[]
}

/**
 * Parse inline markdown (bold, italic, code, links, strike) into segments.
 * Used when pasting Perplexity / ChatGPT markdown into TipTap.
 */
export function parseInlineMarkdown(input: string): InlineSegment[] {
  const segments: InlineSegment[] = []
  const baseMarks: InlineMark[] = []
  const stack: OpenDelimiter[] = []
  let i = 0

  const activeMarks = (): InlineMark[] => [
    ...baseMarks,
    ...stack.flatMap((entry) => entry.marks),
  ]

  while (i < input.length) {
    // Autolinks skipped; explicit [label](url)
    if (input[i] === '[') {
      const closeBracket = input.indexOf(']', i + 1)
      if (closeBracket > i) {
        const label = input.slice(i + 1, closeBracket)
        if (input[closeBracket + 1] !== '(' && looksLikePerplexitySourceId(label)) {
          i = closeBracket + 1
          continue
        }
        if (input[closeBracket + 1] === '(') {
          const closeParen = input.indexOf(')', closeBracket + 2)
          if (closeParen > closeBracket) {
            const href = input.slice(closeBracket + 2, closeParen).trim()
            if (label && href && !looksLikePerplexitySourceId(label)) {
              baseMarks.push({ type: 'link', attrs: { href } })
              const inner = parseInlineMarkdown(label)
              for (const seg of inner) {
                pushSegment(segments, seg.text, [...activeMarks(), ...seg.marks])
              }
              baseMarks.pop()
              i = closeParen + 1
              continue
            }
            if (label && href && looksLikePerplexitySourceId(label)) {
              i = closeParen + 1
              continue
            }
          }
        }
      }
    }

    // Inline code
    if (input[i] === '`') {
      const end = input.indexOf('`', i + 1)
      if (end > i + 1) {
        pushSegment(segments, input.slice(i + 1, end), [...activeMarks(), { type: 'code' }])
        i = end + 1
        continue
      }
    }

    const triple = input.slice(i, i + 3)
    if (triple === '***' || triple === '___') {
      const idx = stack.findIndex((entry) => entry.token === triple)
      if (idx >= 0) stack.splice(idx, 1)
      else
        stack.push({
          token: triple,
          marks: [{ type: 'bold' }, { type: 'italic' }],
        })
      i += 3
      continue
    }

    const double = input.slice(i, i + 2)
    if (double === '**' || double === '__') {
      const idx = stack.findIndex((entry) => entry.token === double)
      if (idx >= 0) stack.splice(idx, 1)
      else stack.push({ token: double, marks: [{ type: 'bold' }] })
      i += 2
      continue
    }

    if (double === '~~') {
      const idx = stack.findIndex((entry) => entry.token === '~~')
      if (idx >= 0) stack.splice(idx, 1)
      else stack.push({ token: '~~', marks: [{ type: 'strike' }] })
      i += 2
      continue
    }

    const ch = input[i]
    if (ch === '*' || ch === '_') {
      const token = ch
      const next = input[i + 1]
      const prev = input[i - 1]
      if (token === '_' && prev && /[\w]/.test(prev) && next && /[\w]/.test(next)) {
        pushSegment(segments, ch, activeMarks())
        i += 1
        continue
      }
      if (next === token) {
        pushSegment(segments, ch, activeMarks())
        i += 1
        continue
      }
      const idx = stack.findIndex((entry) => entry.token === token)
      if (idx >= 0) stack.splice(idx, 1)
      else stack.push({ token, marks: [{ type: 'italic' }] })
      i += 1
      continue
    }

    pushSegment(segments, ch, activeMarks())
    i += 1
  }

  return segments
}

/** Remove dangling markdown delimiter runs left by broken AI pastes. */
export function stripOrphanMarkdownDelimiters(text: string): string {
  return text
    .replace(/(?:^|\s)[*_~]{1,3}(?=\s|$)/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}
