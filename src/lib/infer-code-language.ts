import { isLanguageLabel, normalizeLanguage } from './code-languages'

/** Best-effort language guess from code block body text. */
export function inferLanguageFromCode(code: string): string {
  const t = code.trim()
  if (!t) return 'text'
  if (isLanguageLabel(t)) return normalizeLanguage(t)

  if (
    /^\s*(from|import|def|class|elif|raise|async def)\b/m.test(t) ||
    /#\s*['"]/.test(t) ||
    (/\bprint\s*\(/.test(t) && /:\s*$/.test(t.split('\n').find((l) => l.trim()) ?? ''))
  ) {
    return 'python'
  }
  if (/^\s*(const|let|var|function|export|import)\b/m.test(t) || /=>\s*{/.test(t)) {
    return 'javascript'
  }
  if (/^\s*(func|package|import)\b/m.test(t)) return 'go'
  if (/^\s*(public|private|class|void|interface)\b/m.test(t)) return 'typescript'
  if (/^\s*(SELECT|INSERT|UPDATE|CREATE)\b/im.test(t)) return 'sql'
  if (/^\s*[\w.-]+\s*:\s/m.test(t) && !/[=<>!]=/.test(t.split('\n')[0] ?? '')) return 'yaml'
  if (/^[\s]*[{[]/.test(t) && /"[\w]+"\s*:/.test(t)) return 'json'
  if (/^#!\/bin\/(ba)?sh/.test(t) || /^\s*(sudo|apt|npm|curl|echo)\b/m.test(t)) return 'bash'

  return 'text'
}
