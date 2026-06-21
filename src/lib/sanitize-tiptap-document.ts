import type { JSONContent } from '@tiptap/core'
import type { TopicDocument } from '../types/tiptap-document'
import { isLanguageLabel, normalizeLanguage } from './code-languages'
import { inferLanguageFromCode } from './infer-code-language'
import { sanitizeMathInJson } from './repair-math-latex'

function nodeText(node: JSONContent): string {
  if (typeof node.text === 'string') return node.text
  return (node.content ?? []).map(nodeText).join('')
}

function sanitizeBlocks(nodes: JSONContent[]): JSONContent[] {
  const out: JSONContent[] = []
  let pendingLanguage: string | null = null

  const pushCode = (code: string, language: string | null) => {
    const trimmed = code.trimEnd()
    if (!trimmed) return
    const lang =
      language && language !== 'text'
        ? normalizeLanguage(language)
        : inferLanguageFromCode(trimmed)
    out.push({
      type: 'codeBlock',
      attrs: { language: lang },
      content: [{ type: 'text', text: trimmed }],
    })
  }

  for (const node of nodes) {
    if (node.type === 'codeBlock') {
      const code = nodeText(node)
      if (isLanguageLabel(code.trim())) {
        pendingLanguage = normalizeLanguage(code.trim())
        continue
      }
      const attrLang =
        typeof node.attrs?.language === 'string' ? node.attrs.language : null
      pushCode(code, attrLang ?? pendingLanguage)
      pendingLanguage = null
      continue
    }

    pendingLanguage = null

    if (Array.isArray(node.content)) {
      out.push({ ...node, content: sanitizeBlocks(node.content) })
    } else {
      out.push(node)
    }
  }

  return mergeAdjacentCodeBlocks(out)
}

function mergeAdjacentCodeBlocks(nodes: JSONContent[]): JSONContent[] {
  const out: JSONContent[] = []
  for (const node of nodes) {
    const prev = out[out.length - 1]
    if (
      node.type === 'codeBlock' &&
      prev?.type === 'codeBlock' &&
      prev.attrs?.language === node.attrs?.language
    ) {
      const a = nodeText(prev)
      const b = nodeText(node)
      prev.content = [{ type: 'text', text: `${a}\n${b}`.trimEnd() }]
      continue
    }
    out.push(node)
  }
  return out
}

/** Normalize code blocks and math LaTeX before save / after paste. */
export function sanitizeTiptapDocument(document: TopicDocument): TopicDocument {
  const codeSanitized = sanitizeBlocks(document.doc.content ?? [])
  return {
    ...document,
    doc: {
      type: 'doc',
      content: sanitizeMathInJson(codeSanitized),
    },
  }
}
