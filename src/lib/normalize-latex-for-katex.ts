/** `\(...\)` inner — allows `\infty`, `\rightarrow`, etc. (mirrors paste-math.ts). */
const INLINE_MATH_PAREN_INNER = '(?:[^\\\\]|\\\\.)+?'

const WRAPPED_PAREN_MATH_RE = new RegExp(
  String.raw`^\\\(${INLINE_MATH_PAREN_INNER}\\\)$`,
)
const WRAPPED_DOLLAR_MATH_RE = /^(?<!\$)\$(?!\$)([^$\n]+?)\$(?!\$)$/

/** KaTeX math nodes must not keep prose delimiters like `\(` or `$...$`. */
export function latexHasRawInlineDelimiters(latex: string): boolean {
  const t = latex.trim()
  if (!t) return false
  if (/\\\(|\\\)/.test(t)) return true
  return /(?<!\$)\$(?!\$)[^$\n]+?\$(?!\$)/.test(t)
}

/**
 * Strip `\(...\)` / `$...$` wrappers when the entire string is math delimiters only.
 * Does not extract math from prose blobs — structural migration handles those.
 */
export function stripInlineMathDelimiters(latex: string): string {
  let out = latex.trim()
  if (!out) return out

  if (WRAPPED_PAREN_MATH_RE.test(out)) {
    return out.slice(2, -2).trim()
  }

  const wrappedDollar = out.match(WRAPPED_DOLLAR_MATH_RE)
  if (wrappedDollar) return wrappedDollar[1].trim()

  return out
}

/** Math node `latex` wrongly includes prose outside delimiters (needs paragraph rebuild). */
export function latexIsProseAndMathBlob(latex: string): boolean {
  const t = latex.trim()
  if (!latexHasRawInlineDelimiters(t)) return false
  if (WRAPPED_PAREN_MATH_RE.test(t) || WRAPPED_DOLLAR_MATH_RE.test(t)) return false
  return true
}

/** Commands whose `{...}` argument is text mode — underscores must be escaped for KaTeX. */
const TEXT_BRACE_COMMANDS = [
  'text',
  'mathrm',
  'mathbf',
  'textit',
  'textrm',
  'texttt',
  'operatorname',
  'mbox',
  'hbox',
  'boldsymbol',
  'emph',
] as const

function escapeUnderscoresInBraceCommands(latex: string): string {
  let out = latex
  for (const cmd of TEXT_BRACE_COMMANDS) {
    const re = new RegExp(`\\\\${cmd}\\{([^}]*)\\}`, 'g')
    out = out.replace(re, (_, content: string) => {
      const fixed = content.replace(/(?<!\\)_/g, '\\_')
      return `\\${cmd}{${fixed}}`
    })
  }
  return out
}

/** AI pastes `\sum{j}` instead of `\sum_{j}`. */
function fixMalformedOperatorBraces(latex: string): string {
  return latex.replace(
    /\\(sum|prod|lim|max|min|log|ln|exp|det|gcd|inf|sup|arg)\{([^}]+)\}/g,
    '\\$1_{$2}',
  )
}

function braceSingleCharScripts(latex: string): string {
  let out = latex
  out = out.replace(/(\d)\^([a-zA-Z0-9])(?![a-zA-Z0-9{])/g, '$1^{$2}')
  out = out.replace(/([a-zA-Z])\^([a-zA-Z0-9])(?![a-zA-Z0-9{])/g, '$1^{$2}')
  return out
}

/** Clipboard sometimes doubles backslashes before command names. */
function collapseOverEscapedCommands(latex: string): string {
  if (!/\\\\[a-zA-Z]/.test(latex)) return latex
  return latex.replace(/\\\\([a-zA-Z])/g, '\\$1')
}

/**
 * Normalize LaTeX from AI paste (Perplexity, ChatGPT, Claude) before KaTeX rendering.
 * Fixes common patterns that render in AI UIs but break KaTeX.
 */
export function normalizeLatexForKatex(latex: string): string {
  let out = stripInlineMathDelimiters(latex.trim())
  if (!out) return out

  out = collapseOverEscapedCommands(out)
  out = escapeUnderscoresInBraceCommands(out)
  out = fixMalformedOperatorBraces(out)
  out = braceSingleCharScripts(out)

  return out
}

const CODE_LINE_PREFIX =
  /^\s*(import|from|def\b|class\b|const |let |var |fn |func |public |private |#include|#|\/\/|\/\*|\*\s|if\s*\(|for\s*\(|while\s*\(|return\b)/

/** Bare LaTeX formula line without `$` / `\(` delimiters (common in AI plain-text paste). */
export function looksLikeLatexFormulaLine(line: string): boolean {
  const t = line.trim()
  if (!t || !t.includes('\\')) return false
  if (CODE_LINE_PREFIX.test(t)) return false
  if (/^\\begin\{[a-z*]+\}/.test(t)) return true
  if (/^\\(text|min|max|frac|sum|int|log|ln|sin|cos|lim|exp|det|gcd|operatorname|mathbf|mathrm)\b/.test(t)) {
    return true
  }
  if (/\\(times|cdot|div|pm|leq|geq|neq|approx|equiv|infty)\b/.test(t) && /[=+\-<>]/.test(t)) {
    return true
  }
  return false
}

export function plainTextHasBareLatex(text: string): boolean {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  return lines.some((line) => looksLikeLatexFormulaLine(line))
}

/** Whether a pasted line opens a LaTeX environment block. */
export function parseLatexEnvironmentStart(line: string): string | null {
  const match = line.trim().match(/^\\begin\{([a-z*]+)\}/)
  return match?.[1] ?? null
}
