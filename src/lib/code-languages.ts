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

export function isLanguageLabel(text: string | null | undefined): boolean {
  if (!text) return false
  const t = text.trim().toLowerCase()
  if (!t || t.length > 24 || /\s/.test(t)) return false
  if (HIGHLIGHT_LANGUAGES.has(t)) return true
  return /^[a-z][\w+#.-]{0,20}$/.test(t)
}
