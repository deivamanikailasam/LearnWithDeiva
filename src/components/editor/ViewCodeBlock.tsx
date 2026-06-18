import { ReactNodeViewRenderer } from '@tiptap/react'
import { AppCodeBlock } from './app-code-block'
import { ViewCodeBlockNode } from './ViewCodeBlockNode'

/** Read-only code blocks rendered with the shared syntax-highlighted CodeBlock. */
export const ViewCodeBlock = AppCodeBlock.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ViewCodeBlockNode)
  },
})
