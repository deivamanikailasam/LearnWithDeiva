import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Topic } from '../../types/content'
import { collectSubtreeIds, invalidateSubjectCache, invalidateTopicDocumentCache } from '../../content/data'
import { deleteTopic, reorderTopics } from '../../lib/content-api'
import { addLabelForDepth } from '../../lib/content-validation'
import { formatDuration, subtreeMinutes } from '../../lib/duration'
import { isEffectivelyOptional } from '../../lib/topic-status'
import { topicLevelStyles } from '../../lib/topic-level-styles'
import {
  CONTENT_GAP_CARD_CLASS,
  isContentGapHighlighted,
} from '../../lib/audit-sub-subtopic-content'
import { paths } from '../../lib/paths'
import { useProgress } from '../../lib/progressContext'
import { ConfirmDialog } from '../ConfirmDialog'
import { CreateTopicDialog } from './CreateTopicDialog'

function sectionCount(topic: Topic): number {
  return topic.contentSectionCount
}

interface SortableTopicListProps {
  subjectId: string
  topics: Topic[]
  parentId?: string
  parentDepth?: number
  parentOptional?: boolean
  currentTopicId?: string
  defaultExpanded?: boolean
  depth: number
  onTreeChange?: () => void
  contentGapTopicIds?: ReadonlySet<string> | null
}

function topicsOrderKey(topics: Topic[]): string {
  return topics.map((t) => t.id).join('\0')
}

function SortableTopicRow({
  subjectId,
  topic,
  currentTopicId,
  depth,
  parentOptional = false,
  defaultExpanded,
  onTreeChange,
  onDeleteRequest,
  contentGapTopicIds,
}: {
  subjectId: string
  topic: Topic
  currentTopicId?: string
  depth: number
  parentOptional?: boolean
  defaultExpanded: boolean
  onTreeChange?: () => void
  onDeleteRequest: (topic: Topic) => void
  contentGapTopicIds?: ReadonlySet<string> | null
}) {
  const { isComplete, isBookmarked } = useProgress()
  const hasChildren = topic.subtopics.length > 0
  const effectivelyOptional = isEffectivelyOptional(topic, parentOptional)
  const [expanded, setExpanded] = useState(defaultExpanded)
  const isActive = topic.id === currentTopicId
  const done = isComplete(subjectId, topic.id)
  const bookmarked = isBookmarked(subjectId, topic.id)
  const sections = sectionCount(topic)
  const contentGap = depth === 0 && isContentGapHighlighted(contentGapTopicIds, topic.id)

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: topic.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li ref={setNodeRef} style={style} className={clsx(isDragging && 'z-10')}>
      <div className="flex items-stretch gap-1.5 sm:gap-2">
        <button
          type="button"
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
          className="grid w-7 shrink-0 cursor-grab place-items-center rounded-lg border border-slate-200 bg-white text-slate-400 active:cursor-grabbing dark:border-slate-700 dark:bg-slate-900"
        >
          ⠿
        </button>

        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse' : 'Expand'}
            className="grid w-7 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/40"
          >
            <span
              className={clsx(
                'text-xs transition-transform duration-200',
                expanded && 'rotate-90',
              )}
            >
              ▶
            </span>
          </button>
        ) : (
          <span className="w-7 shrink-0" aria-hidden />
        )}

        <Link
          to={paths.topic(subjectId, topic.id)}
          className={clsx(
            'flex min-w-0 flex-1 items-center justify-between gap-2 rounded-lg border px-2.5 py-2 transition hover:shadow-sm sm:px-3 sm:py-2.5',
            isActive
              ? 'border-brand-300 bg-brand-50 dark:border-brand-500/40 dark:bg-brand-500/10'
              : contentGap
                ? CONTENT_GAP_CARD_CLASS
                : done
                ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-500/30 dark:bg-emerald-500/5'
                : 'border-slate-200 bg-white hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900',
          )}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              {done && (
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500 text-[10px] text-white">
                  ✓
                </span>
              )}
              {bookmarked && (
                <span className="shrink-0 text-xs text-amber-500" title="Bookmarked">
                  ★
                </span>
              )}
              <p className="truncate text-sm font-semibold">{topic.title}</p>
            </div>
            {topic.summary && topic.summary !== topic.title && (
              <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{topic.summary}</p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <span className="chip hidden text-[10px] sm:inline-flex">
              ⏱️ {formatDuration(subtreeMinutes(topic))}
            </span>
            <span
              className={clsx(
                'chip text-[10px] capitalize',
                topicLevelStyles[topic.level] ?? '',
              )}
            >
              {topic.level}
            </span>
            {effectivelyOptional && (
              <span className="chip hidden border-slate-200 bg-slate-50 text-[10px] text-slate-600 sm:inline-flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Optional
              </span>
            )}
            {hasChildren ? (
              <span className="chip hidden text-[10px] sm:inline-flex">
                {topic.subtopics.length} sub
              </span>
            ) : sections > 0 ? (
              <span className="chip hidden text-[10px] sm:inline-flex">{sections} sec</span>
            ) : null}
          </div>
        </Link>

        <button
          type="button"
          aria-label={`Delete ${topic.title}`}
          onClick={() => onDeleteRequest(topic)}
          className="grid w-7 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-rose-500/40 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
        >
          🗑
        </button>
      </div>

      {hasChildren && expanded && (
        <div className="ml-3 mt-2 sm:ml-4">
          <SortableTopicList
            subjectId={subjectId}
            topics={topic.subtopics}
            parentId={topic.id}
            parentDepth={depth}
            parentOptional={effectivelyOptional}
            currentTopicId={currentTopicId}
            depth={depth + 1}
            onTreeChange={onTreeChange}
            contentGapTopicIds={contentGapTopicIds}
          />
        </div>
      )}
    </li>
  )
}

function SortableTopicList({
  subjectId,
  topics,
  parentId,
  parentDepth,
  parentOptional = false,
  currentTopicId,
  defaultExpanded = false,
  depth,
  onTreeChange,
  contentGapTopicIds,
}: SortableTopicListProps) {
  const orderKey = topicsOrderKey(topics)
  const [optimistic, setOptimistic] = useState<{ key: string; items: Topic[] } | null>(
    null,
  )
  const items = optimistic?.key === orderKey ? optimistic.items : topics
  const [reordering, setReordering] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Topic | null>(null)
  const [deleteBusy, setDeleteBusy] = useState(false)
  const navigate = useNavigate()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id || reordering) return

    const oldIndex = items.findIndex((t) => t.id === active.id)
    const newIndex = items.findIndex((t) => t.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return

    const next = arrayMove(items, oldIndex, newIndex)
    setOptimistic({ key: orderKey, items: next })
    setReordering(true)
    try {
      await reorderTopics(
        subjectId,
        parentId,
        next.map((t) => t.id),
      )
      setOptimistic(null)
      onTreeChange?.()
    } catch {
      setOptimistic(null)
    } finally {
      setReordering(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleteBusy(true)
    try {
      const deleted = await deleteTopic(subjectId, deleteTarget.id)
      if (currentTopicId && deleted.includes(currentTopicId)) {
        const parent = parentId ? paths.topic(subjectId, parentId) : paths.subject(subjectId)
        navigate(parent)
      }
      onTreeChange?.()
      setDeleteTarget(null)
    } finally {
      setDeleteBusy(false)
    }
  }

  const canAdd = parentDepth == null || parentDepth < 2

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => void handleDragEnd(e)}>
        <SortableContext items={items.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2">
            {items.map((topic) => (
              <SortableTopicRow
                key={topic.id}
                subjectId={subjectId}
                topic={topic}
                currentTopicId={currentTopicId}
                depth={depth}
                parentOptional={parentOptional}
                defaultExpanded={defaultExpanded}
                onTreeChange={onTreeChange}
                onDeleteRequest={setDeleteTarget}
                contentGapTopicIds={contentGapTopicIds}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {canAdd && (
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-2 text-xs font-semibold text-slate-500 transition hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/5 dark:hover:text-brand-300"
        >
          <span aria-hidden>+</span>
          {addLabelForDepth(parentDepth)}
        </button>
      )}

      <CreateTopicDialog
        open={createOpen}
        subjectId={subjectId}
        parentId={parentId}
        parentDepth={parentDepth}
        parentOptional={parentOptional}
        onClose={() => setCreateOpen(false)}
        onCreated={(topicId) => {
          invalidateSubjectCache(subjectId)
          invalidateTopicDocumentCache(subjectId, topicId)
          onTreeChange?.()
          navigate(paths.topic(subjectId, topicId))
        }}
      />

      <ConfirmDialog
        open={deleteTarget != null}
        tone="danger"
        title="Delete topic?"
        message={
          deleteTarget ? (
            <>
              Delete <span className="font-semibold">{deleteTarget.title}</span> and{' '}
              {Math.max(0, collectSubtreeIds(deleteTarget).length - 1)} nested topic
              {collectSubtreeIds(deleteTarget).length - 1 === 1 ? '' : 's'}? This cannot be
              undone.
            </>
          ) : (
            ''
          )
        }
        confirmLabel={deleteBusy ? 'Deleting…' : 'Delete'}
        onConfirm={() => void handleDelete()}
        onCancel={() => !deleteBusy && setDeleteTarget(null)}
      />
    </>
  )
}

export function EditableTopicTree({
  subjectId,
  topics,
  currentTopicId,
  defaultExpanded = false,
  onTreeChange,
  parentTopicId,
  parentDepth,
  contentGapTopicIds,
}: {
  subjectId: string
  topics: Topic[]
  currentTopicId?: string
  defaultExpanded?: boolean
  onTreeChange?: () => void
  parentTopicId?: string
  parentDepth?: number
  contentGapTopicIds?: ReadonlySet<string> | null
}) {
  return (
    <SortableTopicList
      subjectId={subjectId}
      topics={topics}
      parentId={parentTopicId}
      parentDepth={parentDepth}
      currentTopicId={currentTopicId}
      defaultExpanded={defaultExpanded}
      depth={0}
      onTreeChange={onTreeChange}
      contentGapTopicIds={contentGapTopicIds}
    />
  )
}
