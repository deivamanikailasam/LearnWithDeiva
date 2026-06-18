import { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import type { JSONContent } from '@tiptap/core'
import { viewTiptapExtensions } from './view-tiptap-extensions'
import { tiptapEditorProps } from './tiptap-extensions'

interface TiptapViewerProps {
  doc: JSONContent
  className?: string
}

/** Read-only TipTap renderer for a document fragment. */
export function TiptapViewer({ doc, className }: TiptapViewerProps) {
  const editor = useEditor({
    extensions: viewTiptapExtensions,
    content: doc,
    editable: false,
    editorProps: tiptapEditorProps,
  })

  useEffect(() => {
    if (!editor) return
    editor.commands.setContent(doc, { emitUpdate: false })
  }, [editor, doc])

  return (
    <div className={className}>
      <EditorContent editor={editor} />
    </div>
  )
}
