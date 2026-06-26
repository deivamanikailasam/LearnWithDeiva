import { plainTextHasBareLatex } from './normalize-latex-for-katex'

/**
 * Inner body of `\(...\)` — must tolerate LaTeX commands with backslashes (`\infty`, `\rightarrow`).
 * The old `[^\\\n]+` form stopped at the first `\` and never matched real Perplexity math.
 */
export const INLINE_LATEX_PAREN_INNER = '(?:[^\\\\]|\\\\.)+?'
export const INLINE_LATEX_PAREN_RE = new RegExp(
  String.raw`\\\(${INLINE_LATEX_PAREN_INNER}\\\)`,
)

/** `$...$` inline math (non-global — safe for repeated `.test()` calls). */
export const INLINE_LATEX_DOLLAR_TEST =
  /(?<!\$)\$(?!\d)(?!\$)[^$\n]+?\$(?!\d)/

/** Display math `$$...$$` on one line (non-global). */
export const DISPLAY_LATEX_DOLLAR_TEST = /\$\$[\s\S]+?\$\$/

/** Remove fenced and inline code before scanning for math delimiters. */
export function stripMarkdownCodeForMathScan(text: string): string {
  let out = text.replace(/\r\n/g, '\n')
  out = out.replace(/^```[^\n]*\n[\s\S]*?^```\s*/gm, '\n')
  out = out.replace(/`[^`\n]+`/g, ' ')
  return out
}

function proseHasMathDelimiters(text: string): boolean {
  if (!text.trim()) return false
  if (DISPLAY_LATEX_DOLLAR_TEST.test(text)) return true
  if (INLINE_LATEX_DOLLAR_TEST.test(text)) return true
  if (INLINE_LATEX_PAREN_RE.test(text)) return true
  if (/\\\[[\s\S]+?\\\]/m.test(text)) return true
  if (/^\\\[\s*$/m.test(text)) return true
  if (/^\\begin\{[a-z*]+\}/m.test(text)) return true
  if (plainTextHasBareLatex(text)) return true
  return false
}

/** Whether `text` contains `$...$` or `\(...\)` inline math delimiters. */
export function textHasInlineMathDelimiters(text: string): boolean {
  return (
    INLINE_LATEX_DOLLAR_TEST.test(text) ||
    INLINE_LATEX_PAREN_RE.test(text)
  )
}

/**
 * Whether pasted plain text contains LaTeX math outside markdown code fences.
 * Claude responses often mix ``` code blocks with `$...$` / `$$...$$` math.
 */
export function plainTextHasMathContent(text: string): boolean {
  if (!text.trim()) return false
  return proseHasMathDelimiters(stripMarkdownCodeForMathScan(text))
}

/** @deprecated Use {@link plainTextHasMathContent} — kept as alias for call sites. */
export function pasteTextHasMath(text: string): boolean {
  return plainTextHasMathContent(text)
}

/** Whether clipboard HTML contains renderable math (KaTeX, annotations, or TipTap markers). */
export function clipboardHtmlHasMath(html: string): boolean {
  if (!html.trim()) return false
  return (
    /katex|application\/x-tex|data-latex|data-type="(?:inline|block)-math"/i.test(html) ||
    /<annotation[^>]+encoding="[^"]*tex/i.test(html) ||
    /<math[\s>]/i.test(html)
  )
}

function textNodeInsideCodeBlock(
  doc: import('@tiptap/pm/model').Node,
  pos: number,
): boolean {
  const $pos = doc.resolve(pos)
  for (let depth = $pos.depth; depth > 0; depth--) {
    if ($pos.node(depth).type.name === 'codeBlock') return true
  }
  return false
}

export function shouldSkipMathMigrationAtPos(
  doc: import('@tiptap/pm/model').Node,
  pos: number,
): boolean {
  return textNodeInsideCodeBlock(doc, pos)
}
