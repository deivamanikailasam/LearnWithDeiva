import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { WindowVirtualizer } from 'virtua'
import type { Topic } from '../types/content'
import { paths } from '../lib/paths'
import { useProgress } from '../lib/progressContext'
import { formatDuration, subtreeMinutes } from '../lib/duration'
import { isEffectivelyOptional } from '../lib/topic-status'
import { EditableTopicTree } from './editor/EditableTopicTree'
import {
  auditReasonLabel,
  CONTENT_GAP_CARD_CLASS,
  isContentGapHighlighted,
  type AuditReason,
} from '../lib/audit-sub-subtopic-content'

function sectionCount(topic: Topic): number {
  return topic.contentSectionCount
}

/** True when any descendant (not the topic itself) is in the flagged set. */
function hasFlaggedDescendant(
  topic: Topic,
  flagged: ReadonlySet<string> | null | undefined,
): boolean {
  if (!flagged || flagged.size === 0) return false
  for (const sub of topic.subtopics) {
    if (flagged.has(sub.id) || hasFlaggedDescendant(sub, flagged)) return true
  }
  return false
}

// Above this many top-level topics the root list is windowed so only the rows
// near the viewport are mounted; below it we render plainly (identical markup).
const VIRTUALIZE_THRESHOLD = 30

const levelStyles: Record<string, string> = {
  beginner:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300',
  intermediate:
    'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300',
  advanced:
    'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300',
}

function TopicNode({
  subjectId,
  topic,
  currentTopicId,
  depth,
  parentOptional = false,
  defaultExpanded,
  contentGapTopicIds,
  contentGapReasons,
}: {
  subjectId: string
  topic: Topic
  currentTopicId?: string
  depth: number
  parentOptional?: boolean
  defaultExpanded: boolean
  contentGapTopicIds?: ReadonlySet<string> | null
  contentGapReasons?: ReadonlyMap<string, AuditReason[]> | null
}) {
  const { isComplete, isBookmarked } = useProgress()
  const hasChildren = topic.subtopics.length > 0
  const effectivelyOptional = isEffectivelyOptional(topic, parentOptional)
  const [expanded, setExpanded] = useState(defaultExpanded)
  const isActive = topic.id === currentTopicId
  const done = isComplete(subjectId, topic.id)
  const bookmarked = isBookmarked(subjectId, topic.id)
  const sections = sectionCount(topic)
  const contentGap = isContentGapHighlighted(contentGapTopicIds, topic.id)
  const reasons = contentGapReasons?.get(topic.id)
  // Auto-open branches that contain a flagged sub-subtopic so the failing leaf
  // is visible without hunting through a collapsed tree.
  const showChildren =
    hasChildren && (expanded || hasFlaggedDescendant(topic, contentGapTopicIds))

  return (
    <li>
      <div className="flex items-stretch gap-2">
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={showChildren}
            aria-label={showChildren ? 'Collapse' : 'Expand'}
            className="grid w-8 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/40"
          >
            <span
              className={clsx(
                'transition-transform duration-200',
                showChildren && 'rotate-90',
              )}
            >
              ▶
            </span>
          </button>
        ) : (
          <span className="w-8 shrink-0" aria-hidden />
        )}

        <Link
          to={paths.topic(subjectId, topic.id)}
          title={
            reasons && reasons.length > 0
              ? `Audit: ${reasons.map(auditReasonLabel).join(', ')}`
              : undefined
          }
          className={clsx(
            'flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl border p-3 transition hover:shadow-md sm:gap-3 sm:p-3.5',
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
            <div className="flex items-center gap-2">
              {done && (
                <span
                  className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-xs text-white"
                  title="Completed"
                >
                  ✓
                </span>
              )}
              {bookmarked && (
                <span className="shrink-0 text-amber-500" title="Bookmarked">
                  ★
                </span>
              )}
              <p className="truncate font-semibold">{topic.title}</p>
            </div>
            {topic.summary && topic.summary !== topic.title && (
              <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                {topic.summary}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="chip hidden sm:inline-flex">
              ⏱️ {formatDuration(subtreeMinutes(topic))}
            </span>
            <span className={clsx('chip capitalize', levelStyles[topic.level] ?? '')}>
              {topic.level}
            </span>
            {effectivelyOptional && (
              <span className="chip hidden border-slate-200 bg-slate-50 text-slate-600 sm:inline-flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Optional
              </span>
            )}
            {hasChildren ? (
              <span className="chip hidden sm:inline-flex">
                {topic.subtopics.length} sub
              </span>
            ) : sections > 0 ? (
              <span className="chip hidden sm:inline-flex">{sections} sections</span>
            ) : null}
          </div>
        </Link>
      </div>

      {showChildren && (
        <ul className="ml-2 mt-2 space-y-2 border-l border-slate-200 pl-2 sm:ml-4 sm:pl-4 dark:border-slate-800">
          {topic.subtopics.map((sub) => (
            <TopicNode
              key={sub.id}
              subjectId={subjectId}
              topic={sub}
              currentTopicId={currentTopicId}
              depth={depth + 1}
              parentOptional={effectivelyOptional}
              defaultExpanded={false}
              contentGapTopicIds={contentGapTopicIds}
              contentGapReasons={contentGapReasons}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export function TopicTree({
  subjectId,
  topics,
  currentTopicId,
  defaultExpanded = false,
  editable = false,
  onTreeChange,
  parentTopicId,
  parentDepth,
  contentGapTopicIds,
  contentGapReasons,
}: {
  subjectId: string
  topics: Topic[]
  currentTopicId?: string
  /** Expand the first level by default (used on a topic's own page). */
  defaultExpanded?: boolean
  editable?: boolean
  onTreeChange?: () => void
  /** When listing a topic's children, pass the host topic id and its depth. */
  parentTopicId?: string
  parentDepth?: number
  contentGapTopicIds?: ReadonlySet<string> | null
  contentGapReasons?: ReadonlyMap<string, AuditReason[]> | null
}) {
  if (editable) {
    return (
      <EditableTopicTree
        subjectId={subjectId}
        topics={topics}
        currentTopicId={currentTopicId}
        defaultExpanded={defaultExpanded}
        onTreeChange={onTreeChange}
        parentTopicId={parentTopicId}
        parentDepth={parentDepth}
        contentGapTopicIds={contentGapTopicIds}
      />
    )
  }

  const renderNode = (topic: Topic) => (
    <TopicNode
      key={topic.id}
      subjectId={subjectId}
      topic={topic}
      currentTopicId={currentTopicId}
      depth={0}
      defaultExpanded={defaultExpanded}
      contentGapTopicIds={contentGapTopicIds}
      contentGapReasons={contentGapReasons}
    />
  )

  // Large root lists are virtualized against the window scroll so rendering
  // cost stays flat regardless of how many top-level topics a subject has.
  if (topics.length > VIRTUALIZE_THRESHOLD) {
    return (
      <WindowVirtualizer>
        {topics.map((topic) => (
          <div key={topic.id} className="pb-2.5">
            {renderNode(topic)}
          </div>
        ))}
      </WindowVirtualizer>
    )
  }

  return <ul className="space-y-2.5">{topics.map(renderNode)}</ul>
}
