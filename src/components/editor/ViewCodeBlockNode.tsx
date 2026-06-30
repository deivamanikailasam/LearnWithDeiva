import type { NodeViewProps } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import { inferLanguageFromCode } from '../../lib/infer-code-language'
import { normalizeLanguage } from '../../lib/code-languages'
import { LazyCodeBlock } from '../LazyCodeBlock'

export function ViewCodeBlockNode({ node }: NodeViewProps) {
  const attrLang =
    typeof node.attrs.language === 'string' ? node.attrs.language : null
  const code = node.textContent.trim()
  const language = normalizeLanguage(
    attrLang && attrLang !== 'text' ? attrLang : inferLanguageFromCode(code),
  )

  if (!code) return null

  return (
    <NodeViewWrapper className="not-prose my-4">
      <LazyCodeBlock code={code} language={language} />
    </NodeViewWrapper>
  )
}
