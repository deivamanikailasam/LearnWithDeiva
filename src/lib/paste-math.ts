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

/** Whether `text` contains `$...$` or `\(...\)` inline math delimiters. */
export function textHasInlineMathDelimiters(text: string): boolean {
  return INLINE_LATEX_DOLLAR_TEST.test(text) || INLINE_LATEX_PAREN_RE.test(text)
}

/** Explicit LaTeX delimiters in pasted plain text (not heuristic unicode/backslash checks). */
export function pasteTextHasMath(text: string): boolean {
  if (!text.trim()) return false
  // Fenced code pastes must keep the markdown/code path; math migration skips code blocks.
  if (/```/.test(text)) return false
  if (/\$\$[\s\S]+?\$\$/m.test(text)) return true
  if (INLINE_LATEX_DOLLAR_TEST.test(text)) return true
  if (INLINE_LATEX_PAREN_RE.test(text)) return true
  if (/\\\[[\s\S]+?\\\]/m.test(text)) return true
  if (/^\\\[\s*$/m.test(text)) return true
  if (/^\\begin\{[a-z*]+\}/m.test(text)) return true
  if (plainTextHasBareLatex(text)) return true
  return false
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
