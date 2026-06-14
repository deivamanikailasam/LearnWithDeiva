import { Link } from 'react-router-dom'
import clsx from 'clsx'
import type { Topic } from '../types/content'
import { paths } from '../lib/paths'
import { SECTION_DESCRIPTORS } from '../content/sections'
import { useProgress } from '../lib/progressContext'

function sectionCount(topic: Topic): number {
  return SECTION_DESCRIPTORS.filter((d) => topic.sections[d.key]).length
}

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
}: {
  subjectId: string
  topic: Topic
  currentTopicId?: string
  depth: number
}) {
  const { isComplete } = useProgress()
  const isActive = topic.id === currentTopicId
  const done = isComplete(subjectId, topic.id)
  return (
    <li>
      <Link
        to={paths.topic(subjectId, topic.id)}
        className={clsx(
          'flex items-center justify-between gap-3 rounded-xl border p-4 transition hover:shadow-md',
          isActive
            ? 'border-brand-300 bg-brand-50 dark:border-brand-500/40 dark:bg-brand-500/10'
            : 'border-slate-200 bg-white hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900',
        )}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {depth > 0 && <span className="text-slate-300 dark:text-slate-600">↳</span>}
            {done && (
              <span
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-xs text-white"
                title="Completed"
              >
                ✓
              </span>
            )}
            <p className="truncate font-semibold">{topic.title}</p>
          </div>
          <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">{topic.summary}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={clsx(
              'chip capitalize',
              levelStyles[topic.level] ?? '',
            )}
          >
            {topic.level}
          </span>
          <span className="chip hidden sm:inline-flex">{sectionCount(topic)} sections</span>
        </div>
      </Link>

      {topic.subtopics.length > 0 && (
        <ul className="ml-4 mt-2 space-y-2 border-l border-slate-200 pl-4 dark:border-slate-800">
          {topic.subtopics.map((sub) => (
            <TopicNode
              key={sub.id}
              subjectId={subjectId}
              topic={sub}
              currentTopicId={currentTopicId}
              depth={depth + 1}
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
}: {
  subjectId: string
  topics: Topic[]
  currentTopicId?: string
}) {
  return (
    <ul className="space-y-3">
      {topics.map((topic) => (
        <TopicNode
          key={topic.id}
          subjectId={subjectId}
          topic={topic}
          currentTopicId={currentTopicId}
          depth={0}
        />
      ))}
    </ul>
  )
}
