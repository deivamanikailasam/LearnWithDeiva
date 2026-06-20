import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import clsx from 'clsx'
import type { Topic, TopicMeta } from '../../types/content'
import { saveTopicMeta, type SaveStatus } from '../../lib/content-api'
import {
  metaDraftsEqual,
  topicMetaFingerprint,
  topicToMetaDraft,
  topicToMetaDraftFromSaved,
  validateTopicMetaDraft,
  type TopicMetaDraft,
} from '../../lib/content-validation'
import { useEditMode } from '../../lib/editModeContext'
import { useToast } from '../../lib/toastContext'
import { useDirtyEditor } from '../../lib/useDirtyEditor'
import { formatDuration, subtreeMinutes } from '../../lib/duration'
import {
  isTopicEffectivelyOptionalInTree,
} from '../../lib/topic-status'
import { fieldErrorClass, ghostInputClass, labelClass } from '../../lib/form-styles'
import { topicLevelStyles } from '../../lib/topic-level-styles'
import { DurationInput } from './DurationInput'
import { LevelSelect } from './LevelSelect'
import { TagsInput } from './TagsInput'

interface EditableTopicHeaderProps {
  subjectId: string
  topic: Topic
  isSubSubtopic: boolean
  editable: boolean
  /** Ancestors from root → direct parent; used for inherited optional status. */
  topicAncestors?: Topic[]
  onSaved?: (saved: TopicMeta) => void
  actions?: ReactNode
  completedLine?: ReactNode
}

function ViewHeader({
  topic,
  topicAncestors = [],
  isSubSubtopic,
  actions,
  completedLine,
}: {
  topic: Topic
  topicAncestors?: Topic[]
  isSubSubtopic: boolean
  actions?: ReactNode
  completedLine?: ReactNode
}) {
  const effectivelyOptional = isTopicEffectivelyOptionalInTree(topic, topicAncestors)
  return (
    <>
      <h1 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">{topic.title}</h1>
      {!isSubSubtopic && topic.summary && (
        <p className="mt-2 max-w-3xl text-base text-slate-600 sm:text-lg dark:text-slate-400">
          {topic.summary}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2">
        <span
          className={clsx(
            'chip capitalize',
            topicLevelStyles[topic.level] ?? '',
          )}
        >
          ⚡ {topic.level}
        </span>
        {effectivelyOptional && (
          <span className="chip border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Optional
          </span>
        )}
        <span className="chip">⏱️ {formatDuration(subtreeMinutes(topic))}</span>
        {topic.tags.map((t) => (
          <span key={t} className="chip">
            #{t}
          </span>
        ))}
      </div>
      {actions}
      {completedLine}
    </>
  )
}

export function EditableTopicHeader({
  subjectId,
  topic,
  isSubSubtopic,
  editable,
  topicAncestors = [],
  onSaved,
  actions,
  completedLine,
}: EditableTopicHeaderProps) {
  const { registerOnLeaveEditMode } = useEditMode()
  const { showToast } = useToast()
  const isParent = topic.subtopics.length > 0
  const statusInheritedFromParent = topicAncestors.some((a) => a.status === 'optional')
  const allowStatus = !statusInheritedFromParent

  const [committed, setCommitted] = useState(() => topicToMetaDraft(topic))
  const [draft, setDraft] = useState(committed)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [saveError, setSaveError] = useState<string | null>(null)

  const committedRef = useRef(committed)
  const serverFingerprintRef = useRef(topicMetaFingerprint(topic))
  const pendingServerFingerprintRef = useRef<string | null>(null)

  useEffect(() => {
    committedRef.current = committed
  }, [committed])

  // Sync from reloaded subject tree — skip stale responses after a save.
  useEffect(() => {
    const fingerprint = topicMetaFingerprint(topic)
    if (pendingServerFingerprintRef.current) {
      if (fingerprint !== pendingServerFingerprintRef.current) return
      pendingServerFingerprintRef.current = null
    }
    if (fingerprint === serverFingerprintRef.current) return
    serverFingerprintRef.current = fingerprint
    const next = topicToMetaDraft(topic)
    setCommitted(next)
    setDraft(next)
    setFieldErrors({})
    setSaveStatus('idle')
    setSaveError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync draft from reloaded topic
  }, [topic.id, topic.title, topic.summary, topic.level, topic.hours, topic.tags, topic.status])

  const dirty = !metaDraftsEqual(draft, committed)

  const revertToCommitted = useCallback(() => {
    setDraft(committedRef.current)
    setFieldErrors({})
    setSaveStatus('idle')
    setSaveError(null)
  }, [])

  useEffect(() => {
    return registerOnLeaveEditMode(revertToCommitted)
  }, [registerOnLeaveEditMode, revertToCommitted])

  const applyCommitted = useCallback((next: TopicMetaDraft, savedFingerprint: string) => {
    setCommitted(next)
    setDraft(next)
    committedRef.current = next
    serverFingerprintRef.current = savedFingerprint
    pendingServerFingerprintRef.current = savedFingerprint
  }, [])

  const handleSave = useCallback(async () => {
    const result = validateTopicMetaDraft(draft, {
      includeSummary: !isSubSubtopic,
      durationEditable: !isParent,
      allowStatus,
    })
    if (!result.ok) {
      setFieldErrors(result.errors)
      showToast('Fix validation errors before saving.', 'error')
      return
    }

    setFieldErrors({})
    setSaveStatus('saving')
    setSaveError(null)
    try {
      const saved = await saveTopicMeta(subjectId, topic.id, result.payload)
      const next = topicToMetaDraftFromSaved(saved)
      const fingerprint = topicMetaFingerprint(saved)
      applyCommitted(next, fingerprint)
      setSaveStatus('saved')
      showToast('Topic saved', 'success')
      onSaved?.(saved)
      window.setTimeout(() => setSaveStatus('idle'), 1200)
    } catch (err) {
      setSaveStatus('error')
      const message = err instanceof Error ? err.message : 'Save failed'
      setSaveError(message)
      showToast(message, 'error')
    }
  }, [
    applyCommitted,
    draft,
    isParent,
    isSubSubtopic,
    allowStatus,
    onSaved,
    showToast,
    subjectId,
    topic.id,
  ])

  useDirtyEditor({
    id: `topic-meta:${subjectId}:${topic.id}`,
    label: 'Topic metadata',
    dirty,
    enabled: editable,
    save: handleSave,
  })

  if (!editable) {
    return (
      <ViewHeader
        topic={topic}
        topicAncestors={topicAncestors}
        isSubSubtopic={isSubSubtopic}
        actions={actions}
        completedLine={completedLine}
      />
    )
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200/80 bg-white/60 p-3 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/40 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Metadata
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
            {saveStatus === 'error' && saveError && (
              <span className="max-w-[12rem] truncate text-xs text-red-600 dark:text-red-400">
                {saveError}
              </span>
            )}
            <button
              type="button"
              className="rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              onClick={revertToCommitted}
              disabled={saveStatus === 'saving'}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => void handleSave()}
              disabled={saveStatus === 'saving' || !dirty}
            >
              Save
            </button>
          </div>
        </div>

        <input
          id="topic-title"
          type="text"
          value={draft.title}
          onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
          className={clsx(
            ghostInputClass,
            'text-2xl font-extrabold sm:text-3xl lg:text-4xl',
            'border-b border-transparent pb-1 focus:border-brand-400 dark:focus:border-brand-500',
          )}
          placeholder="Topic title"
          disabled={saveStatus === 'saving'}
        />
        {fieldErrors.title && <p className={fieldErrorClass}>{fieldErrors.title}</p>}

        {!isSubSubtopic && (
          <textarea
            id="topic-summary"
            rows={2}
            value={draft.summary}
            onChange={(e) => setDraft((d) => ({ ...d, summary: e.target.value }))}
            className={clsx(
              ghostInputClass,
              'mt-2 max-w-3xl resize-none text-base text-slate-600 sm:text-lg dark:text-slate-400',
              'border-b border-transparent focus:border-slate-300 dark:focus:border-slate-600',
            )}
            placeholder="Short summary (optional)"
            disabled={saveStatus === 'saving'}
          />
        )}
        {fieldErrors.summary && <p className={fieldErrorClass}>{fieldErrors.summary}</p>}

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <LevelSelect
            compact
            value={draft.level}
            onChange={(level) => setDraft((d) => ({ ...d, level }))}
            disabled={saveStatus === 'saving'}
            error={fieldErrors.level}
          />
          {allowStatus ? (
            <div>
              <label htmlFor="topic-status" className={labelClass}>
                Status
              </label>
              <select
                id="topic-status"
                value={draft.status}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    status: e.target.value as TopicMetaDraft['status'],
                  }))
                }
                className={clsx(
                  ghostInputClass,
                  'w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900',
                )}
                disabled={saveStatus === 'saving'}
              >
                <option value="core">Core</option>
                <option value="optional">Optional</option>
              </select>
              <p className="mt-1 text-[10px] text-slate-400">
                Optional cascades to all subtopics and sub-subtopics.
              </p>
            </div>
          ) : statusInheritedFromParent ? (
            <div>
              <label className={labelClass}>Status</label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Optional (inherited from parent)
              </p>
            </div>
          ) : (
            <DurationInput
              useLevelDefault={draft.useLevelDefault}
              days={draft.durationDays}
              hours={draft.durationHours}
              minutes={draft.durationMinutes}
              level={draft.level}
              onUseLevelDefaultChange={(useLevelDefault) =>
                setDraft((d) => ({ ...d, useLevelDefault }))
              }
              onDaysChange={(durationDays) =>
                setDraft((d) => ({ ...d, durationDays }))
              }
              onHoursChange={(durationHours) =>
                setDraft((d) => ({ ...d, durationHours }))
              }
              onMinutesChange={(durationMinutes) =>
                setDraft((d) => ({ ...d, durationMinutes }))
              }
              disabled={saveStatus === 'saving'}
              readOnlyComputed={isParent ? topic : undefined}
              error={fieldErrors.duration}
            />
          )}
        </div>

        {allowStatus ? (
          <DurationInput
            useLevelDefault={draft.useLevelDefault}
            days={draft.durationDays}
            hours={draft.durationHours}
            minutes={draft.durationMinutes}
            level={draft.level}
            onUseLevelDefaultChange={(useLevelDefault) =>
              setDraft((d) => ({ ...d, useLevelDefault }))
            }
            onDaysChange={(durationDays) =>
              setDraft((d) => ({ ...d, durationDays }))
            }
            onHoursChange={(durationHours) =>
              setDraft((d) => ({ ...d, durationHours }))
            }
            onMinutesChange={(durationMinutes) =>
              setDraft((d) => ({ ...d, durationMinutes }))
            }
            disabled={saveStatus === 'saving'}
            readOnlyComputed={isParent ? topic : undefined}
            error={fieldErrors.duration}
          />
        ) : null}

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
      {actions}
      {completedLine}
    </>
  )
}
