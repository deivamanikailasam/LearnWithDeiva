import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Roadmap, RoadmapNode, RoadmapStage, Subject, Topic } from '../../types/content'
import { flattenTopics, findTopic, getAncestors, invalidateSubjectCache } from '../../content/data'
import { createTopic, saveRoadmap, type SaveStatus } from '../../lib/content-api'
import {
  cloneRoadmap,
  isSafeTopicId,
  proposeNodeId,
  proposeStageId,
  roadmapFingerprint,
  slugifyTitle,
  validateRoadmap,
} from '../../lib/content-validation'
import { useEditMode } from '../../lib/editModeContext'
import { useToast } from '../../lib/toastContext'
import { useDirtyEditor } from '../../lib/useDirtyEditor'
import { paths } from '../../lib/paths'
import { compactInputClass, fieldErrorClass, ghostInputClass, inputClass, labelClass } from '../../lib/form-styles'
import {
  CONTENT_GAP_CARD_CLASS,
  isContentGapHighlighted,
} from '../../lib/audit-sub-subtopic-content'
import { ConfirmDialog } from '../ConfirmDialog'

function topicLabel(subject: Subject, topic: Topic): string {
  const ancestors = getAncestors(subject, topic.id)
  if (ancestors.length === 0) return topic.title
  return `${ancestors.map((a) => a.title).join(' › ')} › ${topic.title}`
}

function TopicIdCombobox({
  subject,
  value,
  onChange,
}: {
  subject: Subject
  value: string | undefined
  onChange: (topicId: string | undefined) => void
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const flat = useMemo(() => flattenTopics(subject), [subject])
  const linked = value ? flat.find((t) => t.id === value) : undefined

  const options = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = q
      ? flat.filter(
          (t) =>
            t.id.toLowerCase().includes(q) ||
            t.title.toLowerCase().includes(q) ||
            topicLabel(subject, t).toLowerCase().includes(q),
        )
      : flat
    return filtered.slice(0, 60)
  }, [flat, query, subject])

  return (
    <div className="relative">
      <label className={labelClass}>Linked topic</label>
      <input
        type="text"
        value={open ? query : linked ? topicLabel(subject, linked) : value ?? ''}
        placeholder="Search topics or leave empty"
        className={compactInputClass}
        onFocus={() => {
          setOpen(true)
          setQuery(value ?? '')
        }}
        onChange={(e) => {
          setOpen(true)
          setQuery(e.target.value)
        }}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 150)
        }}
      />
      {open && options.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <li>
            <button
              type="button"
              className="block w-full px-3 py-1.5 text-left text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(undefined)
                setQuery('')
                setOpen(false)
              }}
            >
              No linked topic
            </button>
          </li>
          {options.map((topic) => (
            <li key={topic.id}>
              <button
                type="button"
                className="block w-full px-3 py-1.5 text-left text-sm hover:bg-brand-50 dark:hover:bg-brand-500/10"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(topic.id)
                  setQuery('')
                  setOpen(false)
                }}
              >
                <span className="font-medium">{topic.title}</span>
                <span className="mt-0.5 block text-xs text-slate-400">{topic.id}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function uniqueTopicId(title: string, subject: Subject, stages: RoadmapStage[]): string {
  const used = new Set([
    ...flattenTopics(subject).map((t) => t.id),
    ...stages.flatMap((s) => s.nodes.map((n) => n.id)),
  ])
  const base = slugifyTitle(title)
  if (!used.has(base)) return base
  let n = 2
  while (used.has(`${base}-${n}`)) n += 1
  return `${base}-${n}`
}

function SortableNodeCard({
  node,
  subject,
  stages,
  onChange,
  onDelete,
  contentGapTopicIds,
}: {
  node: RoadmapNode
  subject: Subject
  stages: RoadmapStage[]
  onChange: (patch: Partial<RoadmapNode>) => void
  onDelete: () => void
  contentGapTopicIds?: ReadonlySet<string> | null
}) {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [creating, setCreating] = useState(false)
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: node.id })

  const linked = node.topicId ? findTopic(subject, node.topicId) : undefined
  const subCount = linked?.subtopics.length ?? 0
  const contentGap = isContentGapHighlighted(contentGapTopicIds, node.topicId)

  const handleCreateAndOpen = async () => {
    const title = node.title.trim()
    if (!title) {
      showToast('Enter a node title first.', 'error')
      return
    }

    const id = uniqueTopicId(title, subject, stages)
    if (!isSafeTopicId(id)) {
      showToast('Could not derive a valid topic id from the title.', 'error')
      return
    }

    setCreating(true)
    try {
      const created = await createTopic(subject.id, {
        id,
        title,
        level: 'beginner',
        summary: node.description?.trim() || undefined,
      })
      onChange({ id: created.id, topicId: created.id, title: created.title })
      showToast('Topic created. Save roadmap to keep the link.', 'success')
      invalidateSubjectCache(subject.id)
      navigate(paths.topic(subject.id, created.id))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Create failed'
      if (message.includes('already exists')) {
        onChange({ id, topicId: id })
        showToast('Topic already exists — opened.', 'info')
        invalidateSubjectCache(subject.id)
        navigate(paths.topic(subject.id, id))
      } else {
        showToast(message, 'error')
      }
    } finally {
      setCreating(false)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      className={clsx(
        'rounded-xl border p-3 dark:border-slate-800 dark:bg-slate-900',
        contentGap
          ? CONTENT_GAP_CARD_CLASS
          : 'border-slate-200 bg-white',
        isDragging && 'z-10 shadow-lg',
      )}
    >
      <div className="mb-2 flex items-start gap-2">
        <button
          type="button"
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder node"
          className="grid h-7 w-7 shrink-0 cursor-grab place-items-center rounded-md border border-slate-200 text-slate-400 active:cursor-grabbing dark:border-slate-700"
        >
          ⠿
        </button>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {linked && node.topicId ? (
              <Link
                to={paths.topic(subject.id, node.topicId)}
                className="inline-flex items-center gap-1 rounded-md bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-brand-700"
              >
                Open topic
                {subCount > 0 ? (
                  <span className="opacity-80">({subCount} subtopics)</span>
                ) : (
                  <span className="opacity-80">→ add subtopics</span>
                )}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => void handleCreateAndOpen()}
                disabled={creating}
                className="inline-flex items-center gap-1 rounded-md border border-brand-300 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 transition hover:bg-brand-100 disabled:opacity-50 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/15"
              >
                {creating ? 'Creating…' : 'Create topic & open →'}
              </button>
            )}
            {node.topicId && !linked && (
              <span className="text-xs text-amber-600 dark:text-amber-400">
                Topic &quot;{node.topicId}&quot; not found — pick one below or create.
              </span>
            )}
          </div>
          <input
            value={node.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Node title"
            className={compactInputClass}
          />
          <textarea
            value={node.description ?? ''}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Description (optional)"
            rows={2}
            className={clsx(compactInputClass, 'resize-y')}
          />
          <div className="grid gap-2 sm:grid-cols-2">
            <TopicIdCombobox
              subject={subject}
              value={node.topicId}
              onChange={(topicId) => onChange({ topicId })}
            />
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={node.status ?? 'core'}
                onChange={(e) =>
                  onChange({ status: e.target.value as RoadmapNode['status'] })
                }
                className={compactInputClass}
              >
                <option value="core">Core</option>
                <option value="optional">Optional</option>
              </select>
            </div>
          </div>
          <p className="text-[10px] text-slate-400">Node id: {node.id}</p>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="btn shrink-0 border border-rose-200 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50 dark:border-rose-500/30 dark:text-rose-400 dark:hover:bg-rose-500/10"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

function InsertStageButton({ onClick }: { onClick: () => void }) {
  return (
    <li className="relative list-none sm:pl-12">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-2 text-xs font-semibold text-slate-500 transition hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/5 dark:hover:text-brand-300"
      >
        <span aria-hidden>+</span>
        Insert stage here
      </button>
    </li>
  )
}

function StageDragPreview({ stage, index }: { stage: RoadmapStage; index: number }) {
  return (
    <div className="relative w-[min(calc(100vw-2rem),42rem)] sm:pl-12">
      <span className="absolute left-0 top-0 hidden h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-sm font-bold text-white shadow sm:grid">
        {index + 1}
      </span>
      <div className="cursor-grabbing rounded-xl border border-brand-300 bg-white p-4 shadow-xl ring-2 ring-brand-400/30 dark:border-brand-500/40 dark:bg-slate-900 dark:ring-brand-500/20">
        <p className="text-lg font-bold">{stage.title || 'Untitled stage'}</p>
        {stage.summary ? (
          <p className="mt-1 line-clamp-2 text-sm text-slate-500">{stage.summary}</p>
        ) : null}
        <p className="mt-2 text-xs text-slate-400">
          {stage.nodes.length} node{stage.nodes.length === 1 ? '' : 's'}
        </p>
      </div>
    </div>
  )
}

function SortableStageSection({
  stage,
  index,
  subject,
  stages,
  onChange,
  onDelete,
  onAddNode,
  onNodeChange,
  onNodeDelete,
  onNodeReorder,
  contentGapTopicIds,
}: {
  stage: RoadmapStage
  index: number
  subject: Subject
  stages: RoadmapStage[]
  onChange: (patch: Partial<RoadmapStage>) => void
  onDelete: () => void
  onAddNode: () => void
  onNodeChange: (nodeId: string, patch: Partial<RoadmapNode>) => void
  onNodeDelete: (nodeId: string) => void
  onNodeReorder: (orderedIds: string[]) => void
  contentGapTopicIds?: ReadonlySet<string> | null
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: stage.id })

  const handleNodeDragEnd = (event: DragEndEvent) => {
    if (isDragging) return
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = stage.nodes.findIndex((n) => n.id === active.id)
    const newIndex = stage.nodes.findIndex((n) => n.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    onNodeReorder(arrayMove(stage.nodes, oldIndex, newIndex).map((n) => n.id))
  }

  const sortableStyle = {
    transform: isDragging ? undefined : CSS.Translate.toString(transform),
    transition: isDragging ? undefined : transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={sortableStyle}
      className={clsx('relative list-none sm:pl-12', isDragging && 'opacity-40')}
    >
      <span className="absolute left-0 top-0 hidden h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-sm font-bold text-white shadow sm:grid">
        {index + 1}
      </span>

      <div
        className={clsx(
          'mb-4 rounded-xl border p-4',
          isDragging
            ? 'border-dashed border-brand-300 bg-brand-50/30 dark:border-brand-500/40 dark:bg-brand-500/5'
            : 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40',
        )}
      >
        <div className="flex items-start gap-2">
          <button
            type="button"
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            aria-label="Drag to reorder stage"
            className="grid h-8 w-8 shrink-0 cursor-grab place-items-center rounded-lg border border-slate-200 bg-white text-slate-400 active:cursor-grabbing dark:border-slate-700 dark:bg-slate-900"
          >
            ⠿
          </button>
          <div className="min-w-0 flex-1 space-y-2">
            <input
              value={stage.title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="Stage title"
              className={clsx(ghostInputClass, 'text-lg font-bold')}
            />
            <textarea
              value={stage.summary ?? ''}
              onChange={(e) => onChange({ summary: e.target.value })}
              placeholder="Stage summary (optional)"
              rows={2}
              className={clsx(inputClass, 'resize-y text-sm')}
            />
            <p className="text-[10px] text-slate-400">Stage id: {stage.id}</p>
          </div>
          <button
            type="button"
            onClick={onDelete}
            className="btn shrink-0 border border-rose-200 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50 dark:border-rose-500/30 dark:text-rose-400 dark:hover:bg-rose-500/10"
          >
            Delete stage
          </button>
        </div>
      </div>

      {isDragging ? (
        <p className="py-8 text-center text-sm text-slate-400">Dragging stage…</p>
      ) : (
        <>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleNodeDragEnd}>
            <SortableContext
              items={stage.nodes.map((n) => n.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {stage.nodes.map((node) => (
                  <SortableNodeCard
                    key={node.id}
                    node={node}
                    subject={subject}
                    stages={stages}
                    onChange={(patch) => onNodeChange(node.id, patch)}
                    onDelete={() => onNodeDelete(node.id)}
                    contentGapTopicIds={contentGapTopicIds}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <button
            type="button"
            onClick={onAddNode}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-2 text-xs font-semibold text-slate-500 transition hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/5 dark:hover:text-brand-300"
          >
            <span aria-hidden>+</span>
            Add node
          </button>
        </>
      )}
    </li>
  )
}

export function EditableRoadmap({
  subject,
  roadmap,
  contentGapTopicIds,
  onSaved,
}: {
  subject: Subject
  roadmap: Roadmap
  contentGapTopicIds?: ReadonlySet<string> | null
  onSaved?: () => void
}) {
  const { registerOnLeaveEditMode } = useEditMode()
  const { showToast } = useToast()
  const [committed, setCommitted] = useState(roadmap)
  const [draft, setDraft] = useState(() => cloneRoadmap(roadmap))
  const [status, setStatus] = useState<SaveStatus>('idle')
  const [errors, setErrors] = useState<string[]>([])
  const [deleteStageTarget, setDeleteStageTarget] = useState<RoadmapStage | null>(null)
  const [activeStageId, setActiveStageId] = useState<string | null>(null)
  const pendingServerFingerprintRef = useRef<string | null>(null)

  const dirty = roadmapFingerprint(draft) !== roadmapFingerprint(committed)

  useEffect(() => {
    const fp = roadmapFingerprint(roadmap)
    if (fp === pendingServerFingerprintRef.current) {
      pendingServerFingerprintRef.current = null
      setCommitted(roadmap)
      setDraft(cloneRoadmap(roadmap))
      return
    }
    if (dirty) return
    setCommitted(roadmap)
    setDraft(cloneRoadmap(roadmap))
  }, [roadmap, dirty])

  useEffect(() => {
    return registerOnLeaveEditMode(() => {
      setDraft(cloneRoadmap(committed))
      setErrors([])
      setStatus('idle')
    })
  }, [committed, registerOnLeaveEditMode])

  const handleSave = useCallback(async () => {
    const validated = validateRoadmap(draft)
    if (!validated.ok) {
      setErrors(validated.errors)
      setStatus('error')
      showToast('Fix validation errors before saving.', 'error')
      return
    }

    setStatus('saving')
    setErrors([])
    try {
      const saved = await saveRoadmap(subject.id, validated.payload)
      pendingServerFingerprintRef.current = roadmapFingerprint(saved)
      setCommitted(saved)
      setDraft(cloneRoadmap(saved))
      setStatus('saved')
      showToast('Roadmap saved', 'success')
      onSaved?.()
      window.setTimeout(() => setStatus('idle'), 2000)
    } catch (err) {
      setStatus('error')
      const message = err instanceof Error ? err.message : 'Save failed'
      setErrors([message])
      showToast(message, 'error')
    }
  }, [draft, onSaved, showToast, subject.id])

  useDirtyEditor({
    id: `roadmap:${subject.id}`,
    label: 'Roadmap',
    dirty,
    enabled: true,
    save: handleSave,
  })

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const updateDraft = useCallback((updater: (prev: Roadmap) => Roadmap) => {
    setDraft(updater)
    setErrors([])
    setStatus('idle')
  }, [])

  const handleStageDragStart = (event: DragStartEvent) => {
    setActiveStageId(String(event.active.id))
  }

  const handleStageDragEnd = (event: DragEndEvent) => {
    setActiveStageId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return
    updateDraft((prev) => {
      const oldIndex = prev.stages.findIndex((s) => s.id === active.id)
      const newIndex = prev.stages.findIndex((s) => s.id === over.id)
      if (oldIndex < 0 || newIndex < 0) return prev
      return { ...prev, stages: arrayMove(prev.stages, oldIndex, newIndex) }
    })
  }

  const insertStageAt = (index: number) => {
    updateDraft((prev) => {
      const title = 'New stage'
      const stage: RoadmapStage = {
        id: proposeStageId(title, prev.stages),
        title,
        nodes: [],
      }
      const stages = [...prev.stages]
      stages.splice(index, 0, stage)
      return { ...prev, stages }
    })
  }

  const activeStage = activeStageId
    ? draft.stages.find((s) => s.id === activeStageId)
    : undefined
  const activeStageIndex = activeStage
    ? draft.stages.findIndex((s) => s.id === activeStage.id)
    : -1

  const handleSaveClick = () => void handleSave()

  const handleCancel = () => {
    setDraft(cloneRoadmap(committed))
    setErrors([])
    setStatus('idle')
  }

  const confirmDeleteStage = () => {
    if (!deleteStageTarget) return
    updateDraft((prev) => ({
      ...prev,
      stages: prev.stages.filter((s) => s.id !== deleteStageTarget.id),
    }))
    setDeleteStageTarget(null)
  }

  return (
    <div>
      <div className="mb-6 space-y-3 rounded-xl border border-brand-200 bg-brand-50/40 p-4 dark:border-brand-500/30 dark:bg-brand-500/5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <label className={labelClass}>Roadmap title</label>
            <input
              value={draft.title}
              onChange={(e) => updateDraft((prev) => ({ ...prev, title: e.target.value }))}
              className={clsx(ghostInputClass, 'text-xl font-bold')}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {dirty ? (
              <>
                <button
                  type="button"
                  onClick={handleSaveClick}
                  disabled={status === 'saving'}
                  className="btn-primary text-sm"
                >
                  {status === 'saving' ? 'Saving…' : 'Save roadmap'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={status === 'saving'}
                  className="btn border border-slate-200 text-sm dark:border-slate-700"
                >
                  Cancel
                </button>
              </>
            ) : status === 'saved' ? (
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Saved
              </span>
            ) : null}
          </div>
        </div>
        {errors.length > 0 && (
          <ul className={fieldErrorClass}>
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleStageDragStart}
        onDragEnd={handleStageDragEnd}
      >
        <SortableContext
          items={draft.stages.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <ol className="relative space-y-4 sm:space-y-5">
            <span className="absolute left-[15px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-brand-400 to-violet-400 sm:block" />
            {draft.stages.length === 0 ? (
              <InsertStageButton onClick={() => insertStageAt(0)} />
            ) : (
              <>
                <InsertStageButton onClick={() => insertStageAt(0)} />
                {draft.stages.flatMap((stage, idx) => [
                  <SortableStageSection
                    key={stage.id}
                    stage={stage}
                    index={idx}
                    subject={subject}
                    stages={draft.stages}
                    onChange={(patch) =>
                      updateDraft((prev) => ({
                        ...prev,
                        stages: prev.stages.map((s) =>
                          s.id === stage.id ? { ...s, ...patch } : s,
                        ),
                      }))
                    }
                    onDelete={() => setDeleteStageTarget(stage)}
                    onAddNode={() =>
                      updateDraft((prev) => {
                        const title = 'New node'
                        const id = proposeNodeId(title, prev.stages)
                        const node: RoadmapNode = { id, title, status: 'core' }
                        return {
                          ...prev,
                          stages: prev.stages.map((s) =>
                            s.id === stage.id ? { ...s, nodes: [...s.nodes, node] } : s,
                          ),
                        }
                      })
                    }
                    onNodeChange={(nodeId, patch) =>
                      updateDraft((prev) => ({
                        ...prev,
                        stages: prev.stages.map((s) =>
                          s.id === stage.id
                            ? {
                                ...s,
                                nodes: s.nodes.map((n) =>
                                  n.id === nodeId ? { ...n, ...patch } : n,
                                ),
                              }
                            : s,
                        ),
                      }))
                    }
                    onNodeDelete={(nodeId) =>
                      updateDraft((prev) => ({
                        ...prev,
                        stages: prev.stages.map((s) =>
                          s.id === stage.id
                            ? { ...s, nodes: s.nodes.filter((n) => n.id !== nodeId) }
                            : s,
                        ),
                      }))
                    }
                    onNodeReorder={(orderedIds) =>
                      updateDraft((prev) => ({
                        ...prev,
                        stages: prev.stages.map((s) => {
                          if (s.id !== stage.id) return s
                          const byId = new Map(s.nodes.map((n) => [n.id, n]))
                          return {
                            ...s,
                            nodes: orderedIds
                              .map((id) => byId.get(id))
                              .filter((n): n is RoadmapNode => Boolean(n)),
                          }
                        }),
                      }))
                    }
                    contentGapTopicIds={contentGapTopicIds}
                  />,
                  <InsertStageButton
                    key={`insert-after-${stage.id}`}
                    onClick={() => insertStageAt(idx + 1)}
                  />,
                ])}
              </>
            )}
          </ol>
        </SortableContext>
        <DragOverlay dropAnimation={null}>
          {activeStage ? (
            <StageDragPreview stage={activeStage} index={activeStageIndex} />
          ) : null}
        </DragOverlay>
      </DndContext>

      <ConfirmDialog
        open={deleteStageTarget != null}
        tone="danger"
        title="Delete stage?"
        message={
          deleteStageTarget ? (
            <>
              Delete stage <span className="font-semibold">{deleteStageTarget.title}</span> and{' '}
              {deleteStageTarget.nodes.length} node
              {deleteStageTarget.nodes.length === 1 ? '' : 's'}?
            </>
          ) : (
            ''
          )
        }
        confirmLabel="Delete stage"
        onConfirm={confirmDeleteStage}
        onCancel={() => setDeleteStageTarget(null)}
      />
    </div>
  )
}
