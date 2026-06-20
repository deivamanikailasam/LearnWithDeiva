import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import clsx from 'clsx'
import { EditorContent, useEditor } from '@tiptap/react'
import type { Editor } from '@tiptap/core'
import type { TopicDocument } from '../../types/tiptap-document'
import { splitTiptapByH1 } from '../../lib/split-tiptap-document'
import { saveTopicDocument, type SaveStatus, type SavedTopicDocumentResult } from '../../lib/save-topic-document'
import {
  invalidateTopicDocumentCache,
  primeTopicDocumentCache,
} from '../../content/data'
import { formatDuration } from '../../lib/duration'
import { sanitizeTiptapDocument } from '../../lib/sanitize-tiptap-document'
import { TiptapViewer } from './TiptapViewer'
import { useEditMode } from '../../lib/editModeContext'
import { useToast } from '../../lib/toastContext'
import { useDirtyEditor } from '../../lib/useDirtyEditor'
import { tiptapEditEditorProps, tiptapExtensions } from './tiptap-extensions'
import { GlossaryTermEditorDialog } from './GlossaryTermEditorDialog'
import { GlossaryTermConflictDialog } from './GlossaryTermConflictDialog'
import {
  removeGlobalGlossaryEntry,
  syncGlobalGlossaryEntry,
  findGlobalGlossaryEntry,
  type GlobalGlossaryItem,
} from '../../lib/global-glossary'

interface TopicDocumentEditorProps {
  subjectId: string
  topicId: string
  topicDocument: TopicDocument
  onDocumentSaved?: (result: SavedTopicDocumentResult) => void
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
  const { editMode, canUseEditMode, registerOnLeaveEditMode } = useEditMode()
  const { showToast } = useToast()
  const canEdit = canUseEditMode && editMode
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dirty, setDirty] = useState(false)
  const [, setToolbarRevision] = useState(0)
  const [glossaryDialogOpen, setGlossaryDialogOpen] = useState(false)
  const [glossaryDraft, setGlossaryDraft] = useState({ term: '', definition: '' })
  const [glossaryTermEditable, setGlossaryTermEditable] = useState(false)
  const [glossarySaving, setGlossarySaving] = useState(false)
  const [glossaryConflict, setGlossaryConflict] = useState<{
    term: string
    pendingDefinition: string
    existing: GlobalGlossaryItem
    variant: 'available' | 'conflict'
  } | null>(null)
  const glossarySelectionRef = useRef<{ from: number; to: number } | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const latestDoc = useRef(topicDocument)
  const canEditRef = useRef(false)
  const baselineRef = useRef(JSON.stringify(topicDocument.doc))
  const ignoreDocChangeRef = useRef(false)

  const syncDirtyFromEditor = useCallback((ed: Editor) => {
    if (!canEditRef.current) return

    const next: TopicDocument = {
      format: 'tiptap/v1',
      doc: ed.getJSON(),
    }
    latestDoc.current = next
    setDirty(JSON.stringify(next.doc) !== baselineRef.current)
  }, [])

  useEffect(() => {
    canEditRef.current = canEdit
  }, [canEdit])

  const displayDocument = useMemo(
    () => sanitizeTiptapDocument(topicDocument),
    [topicDocument],
  )

  const topicDocKey = useMemo(
    () => JSON.stringify(displayDocument.doc),
    [displayDocument.doc],
  )

  const sections = splitTiptapByH1(displayDocument.doc)

  const persist = useCallback(
    async (doc: TopicDocument): Promise<boolean> => {
      setSaveStatus('saving')
      setSaveError(null)
      try {
        const result = await saveTopicDocument(subjectId, topicId, doc)
        latestDoc.current = result.document
        baselineRef.current = JSON.stringify(result.document.doc)
        setDirty(false)
        invalidateTopicDocumentCache(subjectId, topicId)
        primeTopicDocumentCache(subjectId, topicId, result.document)
        setSaveStatus('idle')
        if (result.duration) {
          showToast(
            `Document saved · ~${formatDuration(Math.round(result.duration.hours * 60))} estimated`,
            'success',
          )
        } else {
          showToast('Document saved', 'success')
        }
        onDocumentSaved?.(result)
        return true
      } catch (err) {
        setSaveStatus('error')
        const message = err instanceof Error ? err.message : 'Save failed'
        setSaveError(message)
        showToast(message, 'error')
        return false
      }
    },
    [subjectId, topicId, onDocumentSaved, showToast],
  )

  const editor = useEditor({
    extensions: tiptapExtensions,
    content: topicDocument.doc,
    editable: false,
    editorProps: tiptapEditEditorProps,
    onSelectionUpdate: () => {
      setToolbarRevision((n) => n + 1)
    },
    onTransaction: ({ editor: ed, transaction }) => {
      if (transaction.selectionSet) {
        setToolbarRevision((n) => n + 1)
      }
      if (!transaction.docChanged) return
      if (ignoreDocChangeRef.current) {
        ignoreDocChangeRef.current = false
        return
      }
      syncDirtyFromEditor(ed)
    },
  })

  // Sync read-only view when the loaded document changes. Edit mode is owned by
  // the TipTap instance; topic navigation remounts this component via `key`.
  useEffect(() => {
    if (!editor || canEdit) return
    ignoreDocChangeRef.current = true
    editor.commands.setContent(displayDocument.doc, { emitUpdate: false })
    latestDoc.current = topicDocument
    baselineRef.current = topicDocKey
    setDirty(false)
  }, [editor, canEdit, topicDocKey, displayDocument.doc, topicDocument])

  useEffect(() => {
    if (!editor) return
    editor.setEditable(canEdit)
  }, [editor, canEdit])

  useEffect(() => {
    if (!editor || !canEdit) return
    baselineRef.current = JSON.stringify(editor.getJSON())
    setDirty(false)
  }, [editor, canEdit, topicDocKey])

  const cancelEdit = useCallback(() => {
    if (editor) {
      ignoreDocChangeRef.current = true
      editor.commands.setContent(topicDocument.doc, { emitUpdate: false })
    }
    latestDoc.current = topicDocument
    setDirty(false)
    setSaveStatus('idle')
    setSaveError(null)
  }, [editor, topicDocument])

  useEffect(() => {
    return registerOnLeaveEditMode(cancelEdit)
  }, [registerOnLeaveEditMode, cancelEdit])

  const run = (fn: () => boolean) => {
    fn()
    editor?.commands.focus()
  }

  const insertLink = () => {
    const previous = editor?.getAttributes('link').href as string | undefined
    const href = window.prompt('Link URL', previous ?? 'https://')
    if (href === null) return
    if (href === '') {
      run(() => editor?.chain().focus().extendMarkRange('link').unsetLink().run() ?? false)
      return
    }
    run(() => editor?.chain().focus().extendMarkRange('link').setLink({ href }).run() ?? false)
  }

  const insertImageFromFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') return
      run(
        () =>
          editor
            ?.chain()
            .focus()
            .setImage({ src: reader.result as string, alt: file.name || 'Image' })
            .run() ?? false,
      )
    }
    reader.readAsDataURL(file)
  }

  const insertImageFromUrl = () => {
    const src = window.prompt('Image URL')
    if (!src?.trim()) return
    run(() => editor?.chain().focus().setImage({ src: src.trim() }).run() ?? false)
  }

  const openGlossaryEditor = () => {
    if (!editor) return

    const { empty, from, to } = editor.state.selection
    let term = ''

    if (!empty) {
      term = editor.state.doc.textBetween(from, to, ' ')
    } else if (editor.isActive('glossaryTerm')) {
      editor.chain().focus().extendMarkRange('glossaryTerm').run()
      const sel = editor.state.selection
      term = editor.state.doc.textBetween(sel.from, sel.to, ' ')
    }

    const trimmed = term.trim()
    if (!trimmed) {
      showToast('Select a word or phrase first', 'error')
      return
    }

    const existingInline = editor.getAttributes('glossaryTerm').definition as string | undefined
    glossarySelectionRef.current = {
      from: editor.state.selection.from,
      to: editor.state.selection.to,
    }

    void (async () => {
      if (existingInline?.trim()) {
        setGlossaryDraft({ term: trimmed, definition: existingInline })
        setGlossaryTermEditable(false)
        setGlossaryDialogOpen(true)
        return
      }

      try {
        const globalEntry = await findGlobalGlossaryEntry(trimmed)
        if (globalEntry) {
          setGlossaryConflict({
            term: trimmed,
            pendingDefinition: '',
            existing: globalEntry,
            variant: 'available',
          })
          return
        }
      } catch (err) {
        showToast(
          err instanceof Error ? err.message : 'Could not check global glossary',
          'error',
        )
      }

      setGlossaryDraft({ term: trimmed, definition: '' })
      setGlossaryTermEditable(false)
      setGlossaryDialogOpen(true)
    })()
  }

  const applyGlossaryMark = (term: string, definition: string) => {
    if (!editor) return false
    const saved = glossarySelectionRef.current
    let chain = editor.chain().focus()
    if (saved) chain = chain.setTextSelection(saved)
    if (editor.isActive('glossaryTerm')) chain = chain.extendMarkRange('glossaryTerm')

    const { from, to } = editor.state.selection
    const currentText = editor.state.doc.textBetween(from, to, ' ')
    if (currentText.trim() !== term.trim()) {
      return chain
        .deleteRange({ from, to })
        .insertContent({
          type: 'text',
          text: term,
          marks: [{ type: 'glossaryTerm', attrs: { definition } }],
        })
        .run()
    }
    return chain.setMark('glossaryTerm', { definition }).run()
  }

  const closeGlossaryDialogs = () => {
    glossarySelectionRef.current = null
    setGlossaryDialogOpen(false)
    setGlossaryConflict(null)
    setGlossaryTermEditable(false)
  }

  const finishGlossarySave = async (term: string, definition: string) => {
    setGlossarySaving(true)
    try {
      const result = await syncGlobalGlossaryEntry(term, definition)
      if (!result.ok) {
        if ('conflict' in result && result.conflict) {
          setGlossaryDialogOpen(false)
          setGlossaryConflict({
            term,
            pendingDefinition: definition,
            existing: result.existing,
            variant: 'conflict',
          })
          return
        }
        showToast('error' in result ? result.error : 'Could not sync glossary', 'error')
        return
      }

      run(() => applyGlossaryMark(term, result.item.definition))
      closeGlossaryDialogs()
      if (result.action === 'reused') {
        showToast('Linked to existing global glossary definition', 'success')
      } else {
        showToast('Glossary term saved to global glossary', 'success')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not sync glossary', 'error')
    } finally {
      setGlossarySaving(false)
    }
  }

  const saveGlossaryDefinition = ({ term, definition }: { term: string; definition: string }) => {
    if (!editor || !definition.trim() || !term.trim()) return
    void finishGlossarySave(term.trim(), definition.trim())
  }

  const acceptExistingGlossaryDefinition = () => {
    if (!glossaryConflict) return
    run(() => applyGlossaryMark(glossaryConflict.term, glossaryConflict.existing.definition))
    closeGlossaryDialogs()
    showToast('Using existing global glossary definition', 'success')
  }

  const chooseDifferentGlossaryTerm = () => {
    if (!glossaryConflict) return
    glossarySelectionRef.current = glossarySelectionRef.current ?? {
      from: editor?.state.selection.from ?? 0,
      to: editor?.state.selection.to ?? 0,
    }
    setGlossaryDraft({
      term: glossaryConflict.term,
      definition:
        glossaryConflict.variant === 'conflict' ? glossaryConflict.pendingDefinition : '',
    })
    setGlossaryConflict(null)
    setGlossaryTermEditable(true)
    setGlossaryDialogOpen(true)
  }

  const writeDifferentGlossaryDefinition = () => {
    if (!glossaryConflict) return
    glossarySelectionRef.current = glossarySelectionRef.current ?? {
      from: editor?.state.selection.from ?? 0,
      to: editor?.state.selection.to ?? 0,
    }
    setGlossaryDraft({ term: glossaryConflict.term, definition: '' })
    setGlossaryConflict(null)
    setGlossaryTermEditable(false)
    setGlossaryDialogOpen(true)
  }

  const removeGlossaryDefinition = () => {
    if (!editor) return

    const saved = glossarySelectionRef.current
    let chain = editor.chain().focus()
    if (saved) chain = chain.setTextSelection(saved)
    chain.extendMarkRange('glossaryTerm').run()

    const term = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' ',
    ).trim()
    const definition = (editor.getAttributes('glossaryTerm').definition as string | undefined)?.trim()
    if (!term || !definition) {
      closeGlossaryDialogs()
      return
    }

    run(() => {
      const sel = glossarySelectionRef.current
      let removeChain = editor.chain().focus()
      if (sel) removeChain = removeChain.setTextSelection(sel)
      return removeChain.extendMarkRange('glossaryTerm').unsetMark('glossaryTerm').run()
    })

    const pendingDocument = editor.getJSON()
    void (async () => {
      try {
        const result = await removeGlobalGlossaryEntry(term, definition, {
          subjectId,
          topicId,
          pendingDocument,
        })
        closeGlossaryDialogs()
        if (result.removed) {
          showToast('Removed from global glossary', 'success')
        }
      } catch (err) {
        showToast(err instanceof Error ? err.message : 'Could not update global glossary', 'error')
      }
    })()
  }

  const handleSave = useCallback(async () => {
    const cleaned = sanitizeTiptapDocument(latestDoc.current)
    if (editor) {
      ignoreDocChangeRef.current = true
      editor.commands.setContent(cleaned.doc, { emitUpdate: false })
    }
    latestDoc.current = cleaned
    const ok = await persist(cleaned)
    if (ok) baselineRef.current = JSON.stringify(cleaned.doc)
  }, [editor, persist])

  useDirtyEditor({
    id: `topic-doc:${subjectId}:${topicId}`,
    label: 'Document',
    dirty: canEdit && dirty,
    enabled: canEdit && dirty,
    save: handleSave,
  })

  const isParagraph =
    Boolean(editor) &&
    !editor.isActive('heading') &&
    !editor.isActive('bulletList') &&
    !editor.isActive('orderedList') &&
    !editor.isActive('codeBlock') &&
    !editor.isActive('blockquote')

  const toolbarControls = canEdit ? (
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
      <ToolbarButton
        title="Strikethrough"
        active={editor?.isActive('strike')}
        onClick={() => run(() => editor?.chain().focus().toggleStrike().run() ?? false)}
      >
        <s>S</s>
      </ToolbarButton>
      <ToolbarButton
        title="Inline code"
        active={editor?.isActive('code')}
        onClick={() => run(() => editor?.chain().focus().toggleCode().run() ?? false)}
      >
        {'`'}
      </ToolbarButton>
      <ToolbarButton title="Link" active={editor?.isActive('link')} onClick={insertLink}>
        🔗
      </ToolbarButton>
      <ToolbarButton
        title="Glossary"
        active={editor?.isActive('glossaryTerm')}
        onClick={openGlossaryEditor}
      >
        Gloss
      </ToolbarButton>
      <span className="mx-1 text-slate-300 dark:text-slate-600">|</span>
      <ToolbarButton
        title="Paragraph"
        active={isParagraph}
        onClick={() => run(() => editor?.chain().focus().setParagraph().run() ?? false)}
      >
        P
      </ToolbarButton>
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
      <ToolbarButton
        title="Blockquote"
        active={editor?.isActive('blockquote')}
        onClick={() => run(() => editor?.chain().focus().toggleBlockquote().run() ?? false)}
      >
        ❝
      </ToolbarButton>
      <ToolbarButton
        title="Horizontal rule"
        onClick={() => run(() => editor?.chain().focus().setHorizontalRule().run() ?? false)}
      >
        ―
      </ToolbarButton>
      <span className="mx-1 text-slate-300 dark:text-slate-600">|</span>
      <ToolbarButton title="Insert image from URL" onClick={insertImageFromUrl}>
        🖼
      </ToolbarButton>
      <ToolbarButton title="Upload image" onClick={() => imageInputRef.current?.click()}>
        📁
      </ToolbarButton>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) insertImageFromFile(file)
          e.target.value = ''
        }}
      />
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
  ) : null

  const toolbarActions = canEdit ? (
    <div className="flex items-center gap-2">
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
    </div>
  ) : null

  const toolbar = canEdit ? (
    <div
      className={clsx(
        'sticky z-20 flex flex-wrap items-center justify-between gap-2',
        'rounded-xl border border-slate-200 bg-slate-50/95 px-3 py-2 backdrop-blur',
        'dark:border-slate-700 dark:bg-slate-900/95',
        'top-14 sm:top-16',
        'mb-2',
      )}
    >
      <div className="flex flex-wrap items-center gap-1">{toolbarControls}</div>
      {toolbarActions}
    </div>
  ) : null

  return (
    <div>
      <GlossaryTermConflictDialog
        open={glossaryConflict !== null}
        term={glossaryConflict?.term ?? ''}
        existingDefinition={glossaryConflict?.existing.definition ?? ''}
        variant={glossaryConflict?.variant ?? 'conflict'}
        onAcceptExisting={acceptExistingGlossaryDefinition}
        onUseDifferent={chooseDifferentGlossaryTerm}
        onWriteDifferentDefinition={
          glossaryConflict?.variant === 'available' ? writeDifferentGlossaryDefinition : undefined
        }
        onCancel={() => setGlossaryConflict(null)}
      />
      <GlossaryTermEditorDialog
        key={
          glossaryDialogOpen
            ? `${glossaryDraft.term}:${glossaryDraft.definition}:${glossaryTermEditable ? 'edit' : 'view'}`
            : 'closed'
        }
        open={glossaryDialogOpen}
        term={glossaryDraft.term}
        initialDefinition={glossaryDraft.definition}
        termEditable={glossaryTermEditable}
        termHint={
          glossaryTermEditable
            ? 'Choose a unique label so this definition can live alongside the existing global entry.'
            : undefined
        }
        saving={glossarySaving}
        onSave={saveGlossaryDefinition}
        onRemove={removeGlossaryDefinition}
        onCancel={closeGlossaryDialogs}
      />
      {canEdit ? (
        <div className="scroll-mt-20">
          {toolbar}
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <EditorContent editor={editor} />
          </div>
        </div>
      ) : (
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
      )}
    </div>
  )
}
