import { isLanguageLabel, normalizeLanguage } from './code-languages'

function isCodeLikePlainLine(line: string): boolean {
  const t = line.trim()
  if (!t || isLanguageLabel(t)) return false
  return (
    /[=(){}\[\];#]|=>/.test(t) ||
    /^\s*[\w.]+\s*=\s*.+/.test(t) ||
    /^\s*#\s*\w/.test(t)
  )
}

export type MarkdownPasteBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: number; text: string }
  | { type: 'code'; language: string; code: string }

/**
 * Parse plain-text clipboard (markdown fences, Perplexity quirks) into blocks.
 * Used when HTML paste loses code block structure.
 */
export function parseMarkdownPaste(text: string): MarkdownPasteBlock[] {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const blocks: MarkdownPasteBlock[] = []
  let i = 0

  const pushParagraph = (raw: string) => {
    const t = raw.trim()
    if (t) blocks.push({ type: 'paragraph', text: t })
  }

  while (i < lines.length) {
    const line = lines[i]

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

    const heading = line.match(/^(#{1,3})\s+(.+)$/)
    if (heading) {
      blocks.push({
        type: 'heading',
        level: heading[1].length,
        text: heading[2].trim(),
      })
      i++
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
      const h = lines[i].match(/^(#{1,3})\s+/)
      if (h) break
      if (isLanguageLabel(lines[i].trim()) && i + 1 < lines.length) break
      para.push(lines[i])
      i++
    }
    pushParagraph(para.join('\n'))
  }

  return blocks
}

export function markdownPasteHasStructure(text: string): boolean {
  if (/```/.test(text) || /^#{1,3}\s/m.test(text)) return true
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  for (let i = 0; i < lines.length - 1; i++) {
    if (!isLanguageLabel(lines[i].trim())) continue
    const next = lines.slice(i + 1).find((l) => l.trim() !== '')
    if (next && (next.startsWith('```') || isCodeLikePlainLine(next))) return true
  }
  return false
}
