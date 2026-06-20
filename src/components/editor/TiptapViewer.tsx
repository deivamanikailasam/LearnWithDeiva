import { useEffect, useRef } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import type { JSONContent } from '@tiptap/core'
import { viewTiptapExtensions } from './view-tiptap-extensions'
import { tiptapEditorProps } from './tiptap-extensions'
import { GlossaryTermPopover } from './GlossaryTermPopover'
import { useGlossaryTermPopover } from './useGlossaryTermPopover'

interface TiptapViewerProps {
  doc: JSONContent
  className?: string
}

/** Read-only TipTap renderer for a document fragment. */
export function TiptapViewer({ doc, className }: TiptapViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { popover, closePopover, onContainerClick, onContainerKeyDown } = useGlossaryTermPopover()

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
    <div
      ref={containerRef}
      className={className}
      onClick={onContainerClick}
      onKeyDown={onContainerKeyDown}
    >
      <EditorContent editor={editor} />
      <GlossaryTermPopover state={popover} onClose={closePopover} />
    </div>
  )
}
