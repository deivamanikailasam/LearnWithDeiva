import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { WindowVirtualizer } from 'virtua'
import type { Topic } from '../types/content'
import { paths } from '../lib/paths'
import { useProgress } from '../lib/progressContext'

function sectionCount(topic: Topic): number {
  return topic.sectionKeys.length
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
  defaultExpanded,
}: {
  subjectId: string
  topic: Topic
  currentTopicId?: string
  depth: number
  defaultExpanded: boolean
}) {
  const { isComplete, isBookmarked } = useProgress()
  const hasChildren = topic.subtopics.length > 0
  const [expanded, setExpanded] = useState(defaultExpanded)
  const isActive = topic.id === currentTopicId
  const done = isComplete(subjectId, topic.id)
  const bookmarked = isBookmarked(subjectId, topic.id)
  const sections = sectionCount(topic)

  return (
    <li>
      <div className="flex items-stretch gap-2">
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse' : 'Expand'}
            className="grid w-8 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/40"
          >
            <span
              className={clsx(
                'transition-transform duration-200',
                expanded && 'rotate-90',
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
          className={clsx(
            'flex flex-1 items-center justify-between gap-3 rounded-xl border p-3.5 transition hover:shadow-md',
            isActive
              ? 'border-brand-300 bg-brand-50 dark:border-brand-500/40 dark:bg-brand-500/10'
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
            <span className={clsx('chip capitalize', levelStyles[topic.level] ?? '')}>
              {topic.level}
            </span>
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

      {hasChildren && expanded && (
        <ul className="ml-4 mt-2 space-y-2 border-l border-slate-200 pl-4 dark:border-slate-800">
          {topic.subtopics.map((sub) => (
            <TopicNode
              key={sub.id}
              subjectId={subjectId}
              topic={sub}
              currentTopicId={currentTopicId}
              depth={depth + 1}
              defaultExpanded={false}
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
}: {
  subjectId: string
  topics: Topic[]
  currentTopicId?: string
  /** Expand the first level by default (used on a topic's own page). */
  defaultExpanded?: boolean
}) {
  const renderNode = (topic: Topic) => (
    <TopicNode
      key={topic.id}
      subjectId={subjectId}
      topic={topic}
      currentTopicId={currentTopicId}
      depth={0}
      defaultExpanded={defaultExpanded}
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
