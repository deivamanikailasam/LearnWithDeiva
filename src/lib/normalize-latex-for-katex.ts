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
  const out = latex.trim()
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
    /\\(sum|prod|lim|max|min|log|ln|exp|det|gcd|inf|sup|arg|mathbb|mathrm|mathbf|operatorname)\{([^}]+)\}/g,
    '\\$1_{$2}',
  )
}

/** `\frac{a}{b}` pasted as `\frac a b` with missing braces around multi-char args is ok for KaTeX; fix `\frac12` style. */
function fixMissingFracBraces(latex: string): string {
  return latex.replace(/\\frac\s+([^\s\\{}]+)\s+([^\s\\{}]+)/g, '\\frac{$1}{$2}')
}

/** Common AI conflation of comparison operators outside `\text{}`. */
function normalizeComparisonOperators(latex: string): string {
  return latex
    .replace(/(?<!\\)<=(?!=)/g, '\\le ')
    .replace(/(?<!\\)>=(?!=)/g, '\\ge ')
    .replace(/(?<!\\)!=(?!=)/g, '\\ne ')
    .replace(/(?<!\\)->/g, '\\rightarrow ')
    .replace(/(?<!\\)<->/g, '\\leftrightarrow ')
}

/** Unicode math symbols pasted from rendered Claude HTML selections. */
function replaceUnicodeMathSymbols(latex: string): string {
  return latex
    .replace(/×/g, '\\times ')
    .replace(/÷/g, '\\div ')
    .replace(/±/g, '\\pm ')
    .replace(/∓/g, '\\mp ')
    .replace(/≤/g, '\\le ')
    .replace(/≥/g, '\\ge ')
    .replace(/≠/g, '\\ne ')
    .replace(/≈/g, '\\approx ')
    .replace(/≡/g, '\\equiv ')
    .replace(/∞/g, '\\infty ')
    .replace(/∑/g, '\\sum ')
    .replace(/∏/g, '\\prod ')
    .replace(/∫/g, '\\int ')
    .replace(/∂/g, '\\partial ')
    .replace(/√/g, '\\sqrt ')
    .replace(/→/g, '\\rightarrow ')
    .replace(/←/g, '\\leftarrow ')
    .replace(/↔/g, '\\leftrightarrow ')
    .replace(/⇒/g, '\\Rightarrow ')
    .replace(/⇐/g, '\\Leftarrow ')
    .replace(/∈/g, '\\in ')
    .replace(/∉/g, '\\notin ')
    .replace(/⊂/g, '\\subset ')
    .replace(/⊆/g, '\\subseteq ')
    .replace(/∪/g, '\\cup ')
    .replace(/∩/g, '\\cap ')
    .replace(/·/g, '\\cdot ')
    .replace(/…/g, '\\ldots ')
    .replace(/⋯/g, '\\cdots ')
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

/** Environments where `\\` separates rows/lines — a lone `\ ` there is a mangled separator. */
const ROW_SEPARATOR_ENVIRONMENTS =
  'matrix|pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix|smallmatrix|cases|dcases|array|aligned|alignedat|gathered|split'

const ROW_SEPARATOR_ENV_RE = new RegExp(
  String.raw`(\\begin\{(?:${ROW_SEPARATOR_ENVIRONMENTS})\})([\s\S]*?)(\\end\{(?:${ROW_SEPARATOR_ENVIRONMENTS})\})`,
  'g',
)

/**
 * Markdown/JSON round-trips and AI paste often collapse `\\` row separators into a
 * single backslash, leaving a control-space `\ ` between cells. Inside matrix/cases/
 * aligned environments that turns a column vector into a single row. Restore `\\`.
 */
function restoreEnvironmentRowSeparators(latex: string): string {
  if (!latex.includes('\\begin{')) return latex
  return latex.replace(ROW_SEPARATOR_ENV_RE, (_match, open, body: string, close) => {
    const fixed = body.replace(/(?<!\\)\\(?!\\)(?=\s)/g, '\\\\')
    return `${open}${fixed}${close}`
  })
}

/**
 * Normalize LaTeX from AI paste (Perplexity, ChatGPT, Claude) before KaTeX rendering.
 * Fixes common patterns that render in AI UIs but break KaTeX.
 */
export function normalizeLatexForKatex(latex: string): string {
  let out = stripInlineMathDelimiters(latex.trim())
  if (!out) return out

  out = collapseOverEscapedCommands(out)
  out = restoreEnvironmentRowSeparators(out)
  out = replaceUnicodeMathSymbols(out)
  out = normalizeComparisonOperators(out)
  out = escapeUnderscoresInBraceCommands(out)
  out = fixMalformedOperatorBraces(out)
  out = fixMissingFracBraces(out)
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
  if (/\\(times|cdot|div|pm|leq|geq|neq|approx|equiv|infty|le|ge|ne|to|rightarrow|leftarrow|Rightarrow|sum|prod|int|partial|sqrt|alpha|beta|gamma|delta|theta|lambda|sigma|omega)\b/.test(t) && /[=+\-<>^_\\]/.test(t)) {
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
