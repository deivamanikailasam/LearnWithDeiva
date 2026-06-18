import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import clsx from 'clsx'
import { EditorContent, useEditor } from '@tiptap/react'
import type { TopicDocument } from '../../types/tiptap-document'
import { splitTiptapByH1 } from '../../lib/split-tiptap-document'
import { saveTopicDocument, type SaveStatus } from '../../lib/save-topic-document'
import { invalidateTopicDocumentCache, primeTopicDocumentCache } from '../../content/data'
import { sanitizeTiptapDocument } from '../../lib/sanitize-tiptap-document'
import { TiptapViewer } from './TiptapViewer'
import { tiptapEditEditorProps, tiptapExtensions } from './tiptap-extensions'

interface TopicDocumentEditorProps {
  subjectId: string
  topicId: string
  topicDocument: TopicDocument
  onDocumentSaved?: (doc: TopicDocument) => void
}

function ToolbarButton({
  active,
  disabled,
  onClick,
  title,
  children,
}: {
  active?: boolean
  disabled?: boolean
  onClick: () => void
  title: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'rounded-lg px-2 py-1 text-sm font-medium transition',
        active
          ? 'bg-brand-100 text-brand-800 dark:bg-brand-500/20 dark:text-brand-200'
          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
        disabled && 'cursor-not-allowed opacity-40',
      )}
    >
      {children}
    </button>
  )
}

export function TopicDocumentEditor({
  subjectId,
  topicId,
  topicDocument,
  onDocumentSaved,
}: TopicDocumentEditorProps) {
  const canEdit = import.meta.env.DEV
  const [editing, setEditing] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dirty, setDirty] = useState(false)
  const editorShellRef = useRef<HTMLDivElement>(null)
  const latestDoc = useRef(topicDocument)
  const editingRef = useRef(false)
  const baselineRef = useRef(JSON.stringify(topicDocument.doc))
  const skipNextUpdateRef = useRef(false)

  useEffect(() => {
    editingRef.current = editing
  }, [editing])

  const displayDocument = useMemo(
    () => sanitizeTiptapDocument(topicDocument),
    [topicDocument],
  )

  const sections = splitTiptapByH1(displayDocument.doc)

  const persist = useCallback(
    async (doc: TopicDocument): Promise<boolean> => {
      setSaveStatus('saving')
      setSaveError(null)
      try {
        const saved = await saveTopicDocument(subjectId, topicId, doc)
        latestDoc.current = saved
        baselineRef.current = JSON.stringify(saved.doc)
        setDirty(false)
        invalidateTopicDocumentCache(subjectId, topicId)
        primeTopicDocumentCache(subjectId, topicId, saved)
        setSaveStatus('idle')
        onDocumentSaved?.(saved)
        return true
      } catch (err) {
        setSaveStatus('error')
        setSaveError(err instanceof Error ? err.message : 'Save failed')
        return false
      }
    },
    [subjectId, topicId, onDocumentSaved],
  )

  const editor = useEditor({
    extensions: tiptapExtensions,
    content: topicDocument.doc,
    editable: false,
    editorProps: tiptapEditEditorProps,
    onUpdate: ({ editor: ed }) => {
      if (!editingRef.current) return
      if (skipNextUpdateRef.current) {
        skipNextUpdateRef.current = false
        return
      }

      const next: TopicDocument = {
        format: 'tiptap/v1',
        doc: ed.getJSON(),
      }
      latestDoc.current = next

      const serialized = JSON.stringify(next.doc)
      if (serialized === baselineRef.current) {
        setDirty(false)
        return
      }

      setDirty(true)
    },
  })

  useEffect(() => {
    if (!editor || editing) return
    editor.commands.setContent(displayDocument.doc, { emitUpdate: false })
  }, [editor, displayDocument.doc, editing])

  useEffect(() => {
    if (!editor) return
    editor.setEditable(editing)
  }, [editor, editing])

  const run = (fn: () => boolean) => {
    fn()
    editor?.commands.focus()
  }

  const startEdit = () => {
    if (editor) {
      baselineRef.current = JSON.stringify(editor.getJSON())
    }
    skipNextUpdateRef.current = true
    setDirty(false)
    setSaveStatus('idle')
    setSaveError(null)
    setEditing(true)
    requestAnimationFrame(() => {
      editorShellRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    })
  }

  const cancelEdit = () => {
    if (editor) {
      editor.commands.setContent(topicDocument.doc, { emitUpdate: false })
    }
    latestDoc.current = topicDocument
    setDirty(false)
    setSaveStatus('idle')
    setSaveError(null)
    setEditing(false)
  }

  const handleSave = async () => {
    const cleaned = sanitizeTiptapDocument(latestDoc.current)
    if (editor) {
      editor.commands.setContent(cleaned.doc, { emitUpdate: false })
    }
    latestDoc.current = cleaned
    const ok = await persist(cleaned)
    if (ok) setEditing(false)
  }

  const toolbarControls = editing ? (
    <>
      <ToolbarButton
        title="Bold"
        active={editor?.isActive('bold')}
        onClick={() => run(() => editor?.chain().focus().toggleBold().run() ?? false)}
      >
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton
        title="Italic"
        active={editor?.isActive('italic')}
        onClick={() => run(() => editor?.chain().focus().toggleItalic().run() ?? false)}
      >
        <em>I</em>
      </ToolbarButton>
      <span className="mx-1 text-slate-300 dark:text-slate-600">|</span>
      <ToolbarButton
        title="Heading 1"
        active={editor?.isActive('heading', { level: 1 })}
        onClick={() =>
          run(() => editor?.chain().focus().toggleHeading({ level: 1 }).run() ?? false)
        }
      >
        H1
      </ToolbarButton>
      <ToolbarButton
        title="Heading 2"
        active={editor?.isActive('heading', { level: 2 })}
        onClick={() =>
          run(() => editor?.chain().focus().toggleHeading({ level: 2 }).run() ?? false)
        }
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        title="Heading 3"
        active={editor?.isActive('heading', { level: 3 })}
        onClick={() =>
          run(() => editor?.chain().focus().toggleHeading({ level: 3 }).run() ?? false)
        }
      >
        H3
      </ToolbarButton>
      <span className="mx-1 text-slate-300 dark:text-slate-600">|</span>
      <ToolbarButton
        title="Bullet list"
        active={editor?.isActive('bulletList')}
        onClick={() => run(() => editor?.chain().focus().toggleBulletList().run() ?? false)}
      >
        • List
      </ToolbarButton>
      <ToolbarButton
        title="Numbered list"
        active={editor?.isActive('orderedList')}
        onClick={() => run(() => editor?.chain().focus().toggleOrderedList().run() ?? false)}
      >
        1. List
      </ToolbarButton>
      <ToolbarButton
        title="Code block"
        active={editor?.isActive('codeBlock')}
        onClick={() => run(() => editor?.chain().focus().toggleCodeBlock().run() ?? false)}
      >
        {'</>'}
      </ToolbarButton>
      <span className="mx-1 text-slate-300 dark:text-slate-600">|</span>
      <ToolbarButton
        title="Undo"
        onClick={() => run(() => editor?.chain().focus().undo().run() ?? false)}
      >
        ↶
      </ToolbarButton>
      <ToolbarButton
        title="Redo"
        onClick={() => run(() => editor?.chain().focus().redo().run() ?? false)}
      >
        ↷
      </ToolbarButton>
    </>
  ) : (
    <span className="text-xs text-slate-500 dark:text-slate-400">
      Dev editor — paste rich content from Word or Docs
    </span>
  )

  const toolbarActions = (
    <div className="flex items-center gap-2">
      {editing ? (
        <>
          {saveStatus === 'saving' && <span className="text-xs text-slate-500">Saving…</span>}
          {saveStatus === 'error' && (
            <span className="text-xs text-red-600 dark:text-red-400" title={saveError ?? undefined}>
              Save failed{saveError ? `: ${saveError}` : ''}
            </span>
          )}
          <button
            type="button"
            className="btn-ghost text-sm"
            onClick={cancelEdit}
            disabled={saveStatus === 'saving'}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary text-sm"
            onClick={() => void handleSave()}
            disabled={saveStatus === 'saving' || !dirty}
          >
            Save
          </button>
        </>
      ) : (
        <button
          type="button"
          className="btn-ghost border border-slate-200 text-sm dark:border-slate-700"
          onClick={startEdit}
          title="Edit document"
        >
          ✎ Edit
        </button>
      )}
    </div>
  )

  const toolbar = canEdit ? (
    <div
      className={clsx(
        'sticky z-20 flex flex-wrap items-center justify-between gap-2',
        'rounded-xl border border-slate-200 bg-slate-50/95 px-3 py-2 backdrop-blur',
        'dark:border-slate-700 dark:bg-slate-900/95',
        'top-14 sm:top-16',
        editing ? 'mb-2' : 'mb-4',
      )}
    >
      <div className="flex flex-wrap items-center gap-1">{toolbarControls}</div>
      {toolbarActions}
    </div>
  ) : null

  return (
    <div>
      {editing ? (
        <div ref={editorShellRef} className="scroll-mt-20">
          {toolbar}
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <EditorContent editor={editor} />
          </div>
        </div>
      ) : (
        <>
          {toolbar}
          <div className="space-y-10 sm:space-y-12">
            {sections.map((s) => (
              <section key={s.id} id={`section-${s.id}`} className="scroll-mt-24">
                {s.title && (
                  <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">{s.title}</h2>
                )}
                <TiptapViewer doc={s.doc} />
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
