import { useEffect, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import type { Difficulty } from '../../types/content'
import { createTopic } from '../../lib/content-api'
import {
  proposeTopicId,
  slugifyTitle,
  validateCreateTopic,
} from '../../lib/content-validation'
import { fieldErrorClass, inputClass, labelClass } from '../../lib/form-styles'
import { LevelSelect } from './LevelSelect'

interface CreateTopicFormProps {
  subjectId: string
  parentId?: string
  parentDepth?: number
  heading: string
  onClose: () => void
  onCreated: (topicId: string) => void
}

function CreateTopicForm({
  subjectId,
  parentId,
  parentDepth,
  heading,
  onClose,
  onCreated,
}: CreateTopicFormProps) {
  const isSubSubtopic = parentDepth === 1
  const includeSummary = !isSubSubtopic
  const allowEmptyDocument = isSubSubtopic

  const [title, setTitle] = useState('')
  const [id, setId] = useState('')
  const [idTouched, setIdTouched] = useState(false)
  const [summary, setSummary] = useState('')
  const [level, setLevel] = useState<Difficulty>('beginner')
  const [createEmptyDocument, setCreateEmptyDocument] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const effectiveId = idTouched ? id : proposeTopicId(title, parentId, parentDepth)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const result = validateCreateTopic(
      { id: effectiveId, title, level, summary, createEmptyDocument },
      { includeSummary, allowEmptyDocument },
    )
    if (!result.ok) {
      setErrors(result.errors)
      return
    }

    setErrors({})
    setSubmitError(null)
    setBusy(true)
    try {
      const created = await createTopic(subjectId, {
        ...result.payload,
        parentId,
      })
      onCreated(created.id)
      onClose()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Create failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-topic-title"
      className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => void handleSubmit(e)}
    >
      <h2 id="create-topic-title" className="text-lg font-bold">
        {heading}
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Creates a new folder under{' '}
        <code className="rounded bg-slate-100 px-1 text-xs dark:bg-slate-800">
          src/content/subjects/{subjectId}/topics/
        </code>
      </p>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="create-topic-name" className={labelClass}>
            Title
          </label>
          <input
            id="create-topic-name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            disabled={busy}
            autoFocus
          />
          {errors.title && <p className={fieldErrorClass}>{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="create-topic-id" className={labelClass}>
            Id
          </label>
          <input
            id="create-topic-id"
            value={effectiveId}
            onChange={(e) => {
              setIdTouched(true)
              setId(e.target.value)
            }}
            className={clsx(inputClass, 'font-mono text-xs')}
            disabled={busy}
          />
          {errors.id && <p className={fieldErrorClass}>{errors.id}</p>}
          {!idTouched && title && (
            <p className="mt-1 text-xs text-slate-400">Slug: {slugifyTitle(title)}</p>
          )}
        </div>

        {includeSummary && (
          <div>
            <label htmlFor="create-topic-summary" className={labelClass}>
              Summary
            </label>
            <textarea
              id="create-topic-summary"
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className={clsx(inputClass, 'resize-none')}
              disabled={busy}
            />
            {errors.summary && <p className={fieldErrorClass}>{errors.summary}</p>}
          </div>
        )}

        <LevelSelect
          compact
          value={level}
          onChange={setLevel}
          disabled={busy}
          error={errors.level}
        />

        {allowEmptyDocument && (
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={createEmptyDocument}
              onChange={(e) => setCreateEmptyDocument(e.target.checked)}
              disabled={busy}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            Create empty content document
          </label>
        )}
      </div>

      {submitError && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{submitError}</p>
      )}

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={onClose}
          disabled={busy}
          className="btn-ghost flex-1 border border-slate-200 dark:border-slate-700"
        >
          Cancel
        </button>
        <button type="submit" disabled={busy} className="btn-primary flex-1">
          {busy ? 'Creating…' : 'Create'}
        </button>
      </div>
    </form>
  )
}

export interface CreateTopicDialogProps {
  open: boolean
  subjectId: string
  parentId?: string
  parentDepth?: number
  onClose: () => void
  onCreated: (topicId: string) => void
}

export function CreateTopicDialog({
  open,
  subjectId,
  parentId,
  parentDepth,
  onClose,
  onCreated,
}: CreateTopicDialogProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const heading =
    parentDepth == null ? 'Add topic' : parentDepth === 0 ? 'Add subtopic' : 'Add sub-subtopic'

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <CreateTopicForm
          key={`${parentId ?? 'root'}`}
          subjectId={subjectId}
          parentId={parentId}
          parentDepth={parentDepth}
          heading={heading}
          onClose={onClose}
          onCreated={onCreated}
        />
      </div>
    </div>,
    document.body,
  )
}
