import type { Editor } from '@tiptap/core'
import type { ResolvedPos } from '@tiptap/pm/model'

function findBlockDepth($from: ResolvedPos): number | null {
  for (let depth = $from.depth; depth > 0; depth -= 1) {
    const node = $from.node(depth)
    const parentType = $from.node(depth - 1).type.name

    if (node.type.name === 'listItem') return depth
    if (parentType === 'doc') return depth
    if (parentType === 'blockquote' && node.isBlock) return depth
    if ((parentType === 'tableCell' || parentType === 'tableHeader') && node.isBlock) {
      return depth
    }
  }

  return null
}

export function deleteBlockAtCursor(editor: Editor): boolean {
  const { $from } = editor.state.selection
  const depth = findBlockDepth($from)
  if (depth === null) return false

  const from = $from.before(depth)
  const to = $from.after(depth)
  const parentIsDoc = $from.node(depth - 1).type.name === 'doc'
  const isOnlyDocChild = parentIsDoc && editor.state.doc.childCount === 1

  if (isOnlyDocChild) {
    const node = $from.node(depth)
    if (node.type.name === 'paragraph') {
      return editor.chain().focus().clearNodes().run()
    }

    return editor
      .chain()
      .focus()
      .deleteRange({ from, to })
      .insertContent({ type: 'paragraph' })
      .run()
  }

  return editor.chain().focus().deleteRange({ from, to }).run()
}
