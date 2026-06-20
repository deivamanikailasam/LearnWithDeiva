import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export function GlossaryTermEditorDialog({
  open,
  term,
  initialDefinition = '',
  termEditable = false,
  termHint,
  saving = false,
  onSave,
  onRemove,
  onCancel,
}: {
  open: boolean
  term: string
  initialDefinition?: string
  termEditable?: boolean
  termHint?: string
  saving?: boolean
  onSave: (payload: { term: string; definition: string }) => void
  onRemove: () => void
  onCancel: () => void
}) {
  const definitionId = useId()
  const termId = useId()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const termInputRef = useRef<HTMLInputElement>(null)
  const [termValue, setTermValue] = useState(term)
  const [definition, setDefinition] = useState(initialDefinition)

  useEffect(() => {
    if (!open) return
    setTermValue(term)
    setDefinition(initialDefinition)
  }, [open, term, initialDefinition])

  useEffect(() => {
    if (!open) return
    requestAnimationFrame(() => {
      if (termEditable) {
        termInputRef.current?.focus()
        termInputRef.current?.select()
      } else {
        textareaRef.current?.focus()
        textareaRef.current?.select()
      }
    })
  }, [open, termEditable])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onCancel])

  if (!open) return null

  const hasExisting = initialDefinition.trim().length > 0
  const trimmedTerm = termValue.trim()
  const trimmedDefinition = definition.trim()
  const canSave = trimmedTerm.length > 0 && trimmedDefinition.length > 0 && !saving

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${definitionId}-title`}
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          onClick={(event) => event.stopPropagation()}
        >
          <p
            id={`${definitionId}-title`}
            className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300"
          >
            Glossary term
          </p>
          {termEditable ? (
            <>
              <label htmlFor={termId} className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Term label
              </label>
              <input
                id={termId}
                ref={termInputRef}
                value={termValue}
                onChange={(event) => setTermValue(event.target.value)}
                placeholder="Use a unique label, e.g. Token (context window)"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-brand-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              {termHint && (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{termHint}</p>
              )}
            </>
          ) : (
            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">{termValue}</h2>
          )}
          <label htmlFor={definitionId} className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Definition
          </label>
          <textarea
            id={definitionId}
            ref={textareaRef}
            rows={4}
            value={definition}
            onChange={(event) => setDefinition(event.target.value)}
            placeholder="Explain this term in the context of this topic…"
            className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-brand-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Saved definitions are added to the global glossary when they are new. Duplicate terms reuse
            or prompt for a unique label.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {hasExisting ? (
              <button
                type="button"
                onClick={onRemove}
                disabled={saving}
                className="btn-ghost text-rose-600 dark:text-rose-400"
              >
                Remove
              </button>
            ) : (
              <span />
            )}
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={onCancel}
                disabled={saving}
                className="btn-ghost border border-slate-200 dark:border-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onSave({ term: trimmedTerm, definition: trimmedDefinition })}
                disabled={!canSave}
                className="btn-primary"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
