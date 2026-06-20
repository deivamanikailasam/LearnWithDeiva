/** Languages supported by `CodeBlock` syntax highlighting. */
export const HIGHLIGHT_LANGUAGES = new Set([
  'javascript',
  'js',
  'typescript',
  'ts',
  'jsx',
  'tsx',
  'bash',
  'shell',
  'json',
  'css',
  'html',
  'xml',
  'python',
  'py',
  'sql',
  'yaml',
  'text',
])

export function normalizeLanguage(raw: string | null | undefined): string {
  if (!raw) return 'text'
  const lang = raw.trim().toLowerCase().replace(/^language-/, '')
  if (!lang) return 'text'
  if (HIGHLIGHT_LANGUAGES.has(lang)) return lang === 'py' ? 'python' : lang === 'js' ? 'javascript' : lang === 'ts' ? 'typescript' : lang === 'shell' ? 'bash' : lang
  return lang
}

/** Extra language names seen on Perplexity/ChatGPT copy UI (not in HIGHLIGHT_LANGUAGES). */
const EXTRA_LANGUAGE_LABELS = new Set([
  'c',
  'c++',
  'cpp',
  'c#',
  'cs',
  'csharp',
  'f#',
  'go',
  'golang',
  'rust',
  'java',
  'kotlin',
  'ruby',
  'php',
  'swift',
  'scala',
  'r',
  'dockerfile',
  'graphql',
  'markdown',
  'md',
  'sh',
  'zsh',
  'powershell',
  'ps1',
  'plaintext',
])

export function isLanguageLabel(text: string | null | undefined): boolean {
  if (!text) return false
  const t = text.trim().toLowerCase()
  if (!t || t.length > 24 || /\s/.test(t)) return false
  if (HIGHLIGHT_LANGUAGES.has(t)) return true
  if (EXTRA_LANGUAGE_LABELS.has(t)) return true
  // Allow c++/c# style tokens only — not arbitrary short words like "str" or "dict".
  return /^(?:c\+\+|c#|f#|[\w+#.-]+)$/.test(t) && /[+.#]/.test(t)
}
