import { plainTextHasBareLatex } from './normalize-latex-for-katex'

/** Explicit LaTeX delimiters in pasted plain text (not heuristic unicode/backslash checks). */
export function pasteTextHasMath(text: string): boolean {
  if (!text.trim()) return false
  // Fenced code pastes must keep the markdown/code path; math migration skips code blocks.
  if (/```/.test(text)) return false
  if (/\$\$[\s\S]+?\$\$/m.test(text)) return true
  if (/(?<!\$)\$(?!\d)(?!\$)[^$\n]+?\$(?!\d)/.test(text)) return true
  if (/\\\([^\\\n]+\\\)/.test(text)) return true
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
