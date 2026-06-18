import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import type { Subject } from '../../types/content'
import { saveSubjectMeta, type SaveStatus } from '../../lib/content-api'
import {
  subjectMetaDraftsEqual,
  subjectMetaFingerprint,
  subjectToMetaDraft,
  validateSubjectMetaDraft,
} from '../../lib/content-validation'
import { useEditMode } from '../../lib/editModeContext'
import { useToast } from '../../lib/toastContext'
import { useDirtyEditor } from '../../lib/useDirtyEditor'
import { compactInputClass, fieldErrorClass, ghostInputClass, inputClass, labelClass } from '../../lib/form-styles'
import { LevelSelect } from './LevelSelect'
import { TagsInput } from './TagsInput'

interface EditableSubjectHeaderProps {
  subject: Subject
  editable: boolean
  onSaved?: () => void
}

function ViewHero({ subject }: { subject: Subject }) {
  return (
    <>
      <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:flex-row sm:items-center sm:gap-5">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl shadow-md sm:h-20 sm:w-20 sm:text-4xl"
          style={{
            backgroundImage: `linear-gradient(135deg, ${subject.gradient[0]}, ${subject.gradient[1]})`,
          }}
        >
          {subject.icon}
        </span>
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">{subject.title}</h1>
          <p className="text-base text-slate-600 sm:text-lg dark:text-slate-300">
            {subject.tagline}
          </p>
        </div>
      </div>
      <p className="mt-4 max-w-3xl text-sm text-slate-600 sm:mt-5 sm:text-base dark:text-slate-400">
        {subject.description}
      </p>
    </>
  )
}

export function EditableSubjectHeader({
  subject,
  editable,
  onSaved,
}: EditableSubjectHeaderProps) {
  const { registerOnLeaveEditMode } = useEditMode()
  const { showToast } = useToast()
  const [committed, setCommitted] = useState(() => subjectToMetaDraft(subject))
  const [draft, setDraft] = useState(committed)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const serverFingerprintRef = useRef(subjectMetaFingerprint(subject))
  const pendingServerFingerprintRef = useRef<string | null>(null)

  useEffect(() => {
    const fingerprint = subjectMetaFingerprint(subject)
    if (pendingServerFingerprintRef.current) {
      if (fingerprint !== pendingServerFingerprintRef.current) return
      pendingServerFingerprintRef.current = null
    }
    if (fingerprint === serverFingerprintRef.current) return
    serverFingerprintRef.current = fingerprint
    const next = subjectToMetaDraft(subject)
    setCommitted(next)
    setDraft(next)
    setFieldErrors({})
    setSaveStatus('idle')
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync from reloaded subject
  }, [
    subject.id,
    subject.title,
    subject.tagline,
    subject.description,
    subject.icon,
    subject.gradient,
    subject.tags,
    subject.level,
  ])

  const dirty = !subjectMetaDraftsEqual(draft, committed)

  const revertToCommitted = useCallback(() => {
    setDraft(committed)
    setFieldErrors({})
    setSaveStatus('idle')
  }, [committed])

  useEffect(() => {
    return registerOnLeaveEditMode(revertToCommitted)
  }, [registerOnLeaveEditMode, revertToCommitted])

  const handleSave = useCallback(async () => {
    const result = validateSubjectMetaDraft(draft)
    if (!result.ok) {
      setFieldErrors(result.errors)
      setSaveStatus('error')
      showToast('Fix validation errors before saving.', 'error')
      return
    }

    setFieldErrors({})
    setSaveStatus('saving')
    try {
      const saved = await saveSubjectMeta(subject.id, result.payload)
      const next = subjectToMetaDraft(saved)
      const fingerprint = subjectMetaFingerprint(saved)
      serverFingerprintRef.current = fingerprint
      pendingServerFingerprintRef.current = fingerprint
      setCommitted(next)
      setDraft(next)
      setSaveStatus('saved')
      showToast('Subject saved', 'success')
      onSaved?.()
      window.setTimeout(() => setSaveStatus('idle'), 1200)
    } catch (err) {
      setSaveStatus('error')
      const message = err instanceof Error ? err.message : 'Save failed'
      showToast(message, 'error')
    }
  }, [draft, onSaved, showToast, subject.id])

  useDirtyEditor({
    id: `subject-meta:${subject.id}`,
    label: 'Subject metadata',
    dirty,
    enabled: editable,
    save: handleSave,
  })

  if (!editable) {
    return <ViewHero subject={subject} />
  }

  return (
    <div className="mt-4 space-y-4 rounded-xl border border-slate-200/80 bg-white/60 p-4 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/40 sm:mt-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Subject metadata
        </span>
        <div className="flex items-center gap-1.5">
          {saveStatus === 'saving' && (
            <span className="text-xs text-slate-400">Saving…</span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Saved
            </span>
          )}
          <button
            type="button"
            className="rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={revertToCommitted}
            disabled={saveStatus === 'saving'}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-brand-700 disabled:opacity-40"
            onClick={() => void handleSave()}
            disabled={saveStatus === 'saving' || !dirty}
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="space-y-2">
          <label className={labelClass}>Icon</label>
          <input
            value={draft.icon}
            onChange={(e) => setDraft((d) => ({ ...d, icon: e.target.value }))}
            className={clsx(compactInputClass, 'w-20 text-center text-2xl')}
            disabled={saveStatus === 'saving'}
          />
          {fieldErrors.icon && <p className={fieldErrorClass}>{fieldErrors.icon}</p>}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>Gradient from</label>
              <input
                value={draft.gradientFrom}
                onChange={(e) => setDraft((d) => ({ ...d, gradientFrom: e.target.value }))}
                className={compactInputClass}
                disabled={saveStatus === 'saving'}
              />
              {fieldErrors.gradientFrom && (
                <p className={fieldErrorClass}>{fieldErrors.gradientFrom}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Gradient to</label>
              <input
                value={draft.gradientTo}
                onChange={(e) => setDraft((d) => ({ ...d, gradientTo: e.target.value }))}
                className={compactInputClass}
                disabled={saveStatus === 'saving'}
              />
              {fieldErrors.gradientTo && (
                <p className={fieldErrorClass}>{fieldErrors.gradientTo}</p>
              )}
            </div>
          </div>
          <span
            className="mt-2 grid h-14 w-14 place-items-center rounded-2xl text-3xl shadow-md"
            style={{
              backgroundImage: `linear-gradient(135deg, ${draft.gradientFrom}, ${draft.gradientTo})`,
            }}
          >
            {draft.icon || '❓'}
          </span>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <input
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
              className={clsx(
                ghostInputClass,
                'text-2xl font-extrabold sm:text-3xl lg:text-4xl',
              )}
              placeholder="Subject title"
              disabled={saveStatus === 'saving'}
            />
            {fieldErrors.title && <p className={fieldErrorClass}>{fieldErrors.title}</p>}
          </div>
          <div>
            <input
              value={draft.tagline}
              onChange={(e) => setDraft((d) => ({ ...d, tagline: e.target.value }))}
              className={clsx(ghostInputClass, 'text-base sm:text-lg')}
              placeholder="Tagline"
              disabled={saveStatus === 'saving'}
            />
            {fieldErrors.tagline && <p className={fieldErrorClass}>{fieldErrors.tagline}</p>}
          </div>
          <textarea
            value={draft.description}
            onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
            rows={4}
            className={clsx(inputClass, 'resize-y text-sm sm:text-base')}
            placeholder="Description"
            disabled={saveStatus === 'saving'}
          />
          {fieldErrors.description && (
            <p className={fieldErrorClass}>{fieldErrors.description}</p>
          )}
          <LevelSelect
            compact
            value={draft.level}
            onChange={(level) => setDraft((d) => ({ ...d, level }))}
            disabled={saveStatus === 'saving'}
            error={fieldErrors.level}
          />
          <div>
            <label className={labelClass}>Tags</label>
            <TagsInput
              tags={draft.tags}
              onChange={(tags) => setDraft((d) => ({ ...d, tags }))}
              disabled={saveStatus === 'saving'}
              error={fieldErrors.tags}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
