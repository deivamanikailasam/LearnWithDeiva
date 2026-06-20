import { isLanguageLabel, normalizeLanguage } from './code-languages'
import { parseInlineMarkdown, stripOrphanMarkdownDelimiters } from './parse-inline-markdown'
import {
  stripPerplexityCitations,
  stripPerplexityInlineCitations,
} from './strip-perplexity-citations'

function isCodeLikePlainLine(line: string): boolean {
  const t = line.trim()
  if (!t || isLanguageLabel(t)) return false
  if (t.length > 400) return false
  // Prose sentences (common in Perplexity pastes) are not code.
  if (/\b(the|and|for|with|used|heavily|common|operations|immutable|sequence)\b/i.test(t)) {
    return false
  }
  return (
    /^\s*(import|from|def|class|return|if|for|while|const|let|var|fn|func|public|private)\b/.test(
      t,
    ) ||
    /^\s*[\w.]+\s*=\s*[^=]/.test(t) ||
    /^\s*#\s*\w/.test(t) ||
    (/^[\s\t]*[\w$]+\([^)]*\)\s*[;{]?$/.test(t) && !/\s{2,}/.test(t))
  )
}

export type MarkdownPasteBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: number; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'table'; rows: string[][]; hasHeader: boolean }
  | { type: 'horizontalRule' }
  | { type: 'bulletList'; items: string[] }
  | { type: 'orderedList'; items: string[] }
  | { type: 'blockquote'; paragraphs: string[] }

function parseMarkdownTableRow(line: string): string[] | null {
  const trimmed = line.trim()
  if (!trimmed.includes('|')) return null

  let inner = trimmed
  if (inner.startsWith('|')) inner = inner.slice(1)
  if (inner.endsWith('|')) inner = inner.slice(0, -1)

  const cells = inner.split('|').map((cell) => normalizeMarkdownTableCell(cell))
  if (!cells.length || cells.every((cell) => cell === '')) return null
  return cells
}

function isMarkdownTableSeparator(line: string): boolean {
  const trimmed = line.trim()
  if (!trimmed.includes('-')) return false
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(trimmed)
}

function isHorizontalRuleLine(line: string): boolean {
  return /^(\*{3,}|-{3,}|_{3,})\s*$/.test(line.trim())
}

function parseBulletItem(line: string): string | null {
  const match = line.match(/^[-*+]\s+(.+)$/)
  return match ? stripPerplexityInlineCitations(match[1].trim()) : null
}

function parseOrderedItem(line: string): string | null {
  const match = line.match(/^\d+\.\s+(.+)$/)
  return match ? stripPerplexityInlineCitations(match[1].trim()) : null
}

function parseBlockquoteLine(line: string): string | null {
  const match = line.match(/^>\s?(.*)$/)
  if (!match) return null
  return stripOrphanMarkdownDelimiters(stripPerplexityInlineCitations(match[1].trim()))
}

/** TipTap supports heading levels 1–4 in this app. */
export function clampHeadingLevel(level: number): number {
  return Math.min(Math.max(level, 1), 4)
}

/** Normalize cell text copied from Perplexity markdown tables. */
export function normalizeMarkdownTableCell(cell: string): string {
  return stripOrphanMarkdownDelimiters(
    stripPerplexityInlineCitations(cell.replace(/\\\|/g, '|').trim()),
  )
}

export function inlineMarkdownToPlainText(text: string): string {
  return parseInlineMarkdown(text)
    .map((seg) => seg.text)
    .join('')
    .trim()
}

function tryParseMarkdownTable(
  lines: string[],
  start: number,
): { block: Extract<MarkdownPasteBlock, { type: 'table' }>; nextIndex: number } | null {
  const firstRow = parseMarkdownTableRow(lines[start])
  if (!firstRow) return null

  const rows: string[][] = [firstRow]
  let i = start + 1
  let hasHeader = false

  if (i < lines.length && isMarkdownTableSeparator(lines[i])) {
    hasHeader = true
    i++
    while (i < lines.length) {
      const row = parseMarkdownTableRow(lines[i])
      if (!row) break
      rows.push(row)
      i++
    }
    return { block: { type: 'table', rows, hasHeader }, nextIndex: i }
  }

  while (i < lines.length) {
    const row = parseMarkdownTableRow(lines[i])
    if (!row) break
    rows.push(row)
    i++
  }

  if (rows.length < 2) return null
  return { block: { type: 'table', rows, hasHeader }, nextIndex: i }
}

export function plainTextLooksLikeTsv(text: string): boolean {
  const lines = text.replace(/\r\n/g, '\n').split('\n').filter((line) => line.trim())
  if (lines.length < 2) return false

  const tabCounts = lines.map((line) => (line.match(/\t/g) ?? []).length)
  if (!tabCounts.every((count) => count >= 1)) return false

  const expected = tabCounts[0]
  return tabCounts.every((count) => count === expected)
}

export function parseTsvPaste(text: string): string[][] {
  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => line.split('\t').map((cell) => cell.trim()))
}

export function markdownPasteHasTable(text: string): boolean {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  for (let i = 0; i < lines.length; i++) {
    if (tryParseMarkdownTable(lines, i)) return true
  }
  return false
}

/**
 * Parse plain-text clipboard (markdown fences, Perplexity quirks) into blocks.
 * Used when HTML paste loses code block structure.
 */
export function parseMarkdownPaste(text: string): MarkdownPasteBlock[] {
  const lines = stripPerplexityCitations(text).replace(/\r\n/g, '\n').split('\n')
  const blocks: MarkdownPasteBlock[] = []
  let i = 0

  const pushParagraph = (raw: string) => {
    const t = stripOrphanMarkdownDelimiters(stripPerplexityInlineCitations(raw.trim()))
    if (t) blocks.push({ type: 'paragraph', text: t })
  }

  while (i < lines.length) {
    const line = lines[i]

    if (isHorizontalRuleLine(line)) {
      blocks.push({ type: 'horizontalRule' })
      i++
      continue
    }

    const fence = line.match(/^```([\w+#.-]*)$/)
    if (fence) {
      const language = normalizeLanguage(fence[1] || 'text')
      i++
      const codeLines: string[] = []
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      if (i < lines.length) i++ // closing fence
      blocks.push({ type: 'code', language, code: codeLines.join('\n').replace(/\n$/, '') })
      continue
    }

    const table = tryParseMarkdownTable(lines, i)
    if (table) {
      blocks.push(table.block)
      i = table.nextIndex
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    if (heading) {
      blocks.push({
        type: 'heading',
        level: clampHeadingLevel(heading[1].length),
        text: stripOrphanMarkdownDelimiters(
          stripPerplexityInlineCitations(heading[2].trim()),
        ),
      })
      i++
      continue
    }

    const blockquoteLine = parseBlockquoteLine(line)
    if (blockquoteLine !== null) {
      const paragraphs: string[] = []
      const group: string[] = [blockquoteLine]
      i++
      while (i < lines.length) {
        const nextLine = parseBlockquoteLine(lines[i])
        if (nextLine !== null) {
          group.push(nextLine)
          i++
          continue
        }
        if (lines[i].trim() === '') {
          if (group.length) {
            paragraphs.push(group.join(' '))
            group.length = 0
          }
          i++
          if (i < lines.length && parseBlockquoteLine(lines[i]) !== null) continue
          break
        }
        break
      }
      if (group.length) paragraphs.push(group.join(' '))
      if (paragraphs.length) blocks.push({ type: 'blockquote', paragraphs })
      continue
    }

    const bulletItem = parseBulletItem(line)
    if (bulletItem !== null) {
      const items: string[] = [bulletItem]
      i++
      while (i < lines.length) {
        const nextItem = parseBulletItem(lines[i])
        if (nextItem === null) break
        items.push(nextItem)
        i++
      }
      blocks.push({ type: 'bulletList', items })
      continue
    }

    const orderedItem = parseOrderedItem(line)
    if (orderedItem !== null) {
      const items: string[] = [orderedItem]
      i++
      while (i < lines.length) {
        const nextItem = parseOrderedItem(lines[i])
        if (nextItem === null) break
        items.push(nextItem)
        i++
      }
      blocks.push({ type: 'orderedList', items })
      continue
    }

    // Perplexity broken paste: lone language label then fenced or backtick code.
    if (isLanguageLabel(line.trim())) {
      const language = normalizeLanguage(line.trim())
      let j = i + 1
      while (j < lines.length && lines[j].trim() === '') j++
      if (j < lines.length) {
        const next = lines[j]
        const fence2 = next.match(/^```([\w+#.-]*)$/)
        if (fence2) {
          i = j + 1
          const codeLines: string[] = []
          while (i < lines.length && !lines[i].startsWith('```')) {
            codeLines.push(lines[i])
            i++
          }
          if (i < lines.length) i++
          blocks.push({
            type: 'code',
            language: normalizeLanguage(fence2[1] || language),
            code: codeLines.join('\n').replace(/\n$/, ''),
          })
          continue
        }
        const inline = next.match(/^`([^`]+)`$/)
        if (inline) {
          blocks.push({ type: 'code', language, code: inline[1] })
          i = j + 1
          continue
        }

        const codeLines: string[] = []
        let k = j
        while (k < lines.length && isCodeLikePlainLine(lines[k])) {
          codeLines.push(lines[k])
          k++
        }
        if (codeLines.length) {
          blocks.push({ type: 'code', language, code: codeLines.join('\n') })
          i = k
          continue
        }
      }
    }

    if (line.trim() === '') {
      i++
      continue
    }

    const para: string[] = [line]
    i++
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('```')) {
      const h = lines[i].match(/^(#{1,6})\s+/)
      if (h) break
      if (parseBlockquoteLine(lines[i]) !== null) break
      if (isLanguageLabel(lines[i].trim()) && i + 1 < lines.length) break
      para.push(lines[i])
      i++
    }
    pushParagraph(para.join('\n'))
  }

  return blocks
}

export function markdownPasteHasStructure(text: string): boolean {
  if (/```/.test(text) || /^#{1,6}\s/m.test(text) || markdownPasteHasTable(text)) return true
  if (/^>\s+/m.test(text)) return true
  if (/\*\*[^*\n]+\*\*/.test(text) || /^(\*{3,}|-{3,}|_{3,})\s*$/m.test(text)) return true
  if (/^[-*+]\s+/m.test(text) || /^\d+\.\s+/m.test(text)) return true
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  for (let i = 0; i < lines.length - 1; i++) {
    if (!isLanguageLabel(lines[i].trim())) continue
    const next = lines.slice(i + 1).find((l) => l.trim() !== '')
    if (next && (next.startsWith('```') || isCodeLikePlainLine(next))) return true
  }
  return false
}

/** Prefer plain-text markdown over HTML when AI copy leaves literal ** / tables in HTML. */
export function shouldPreferMarkdownPaste(text: string, html: string): boolean {
  if (!text.trim() || !markdownPasteHasStructure(text)) return false
  if (!html.trim()) return true

  if (/```/.test(text)) return true
  if (markdownPasteHasTable(text)) return true

  const mdBold = (text.match(/\*\*[^*\n]+\*\*/g) ?? []).length
  const htmlBold = (html.match(/<(?:strong|b)\b/gi) ?? []).length
  if (mdBold > 0 && htmlBold < Math.max(1, mdBold / 2)) return true

  if (/^(\*{3,}|-{3,}|_{3,})\s*$/m.test(text) && !/<hr\b/i.test(html)) return true
  if (/^>\s+/m.test(text) && !/<blockquote[\s>]/i.test(html)) return true
  if (/^#{4,6}\s/m.test(text)) return true

  return false
}
