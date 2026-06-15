import { Link } from 'react-router-dom'
import clsx from 'clsx'
import type {
  Roadmap as RoadmapData,
  RoadmapNode,
  Subject,
} from '../types/content'
import { paths } from '../lib/paths'
import { findTopic } from '../content/data'
import { useProgress } from '../lib/progressContext'

const levelStyles: Record<string, string> = {
  beginner:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300',
  intermediate:
    'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300',
  advanced:
    'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300',
}

function NodeCard({
  subject,
  node,
}: {
  subject: Subject
  node: RoadmapNode
}) {
  const subjectId = subject.id
  const { isComplete } = useProgress()
  const optional = node.status === 'optional'
  const done = node.topicId ? isComplete(subjectId, node.topicId) : false
  const linked = node.topicId ? findTopic(subject, node.topicId) : undefined
  const level = linked?.level
  const subCount = linked?.subtopics.length ?? 0
  const inner = (
    <div
      className={clsx(
        'h-full rounded-xl border p-4 transition',
        node.topicId
          ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md'
          : 'opacity-90',
        done
          ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10'
          : optional
            ? 'border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50'
            : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 font-semibold">
          {done && (
            <span
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-xs text-white"
              title="Completed"
            >
              ✓
            </span>
          )}
          {node.title}
        </p>
        {optional ? (
          <span className="chip">optional</span>
        ) : (
          <span className="chip border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
            core
          </span>
        )}
      </div>
      {node.description && (
        <p className="mt-1.5 text-sm text-slate-500">{node.description}</p>
      )}
      {(level || subCount > 0) && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {level && (
            <span className={clsx('chip capitalize', levelStyles[level] ?? '')}>
              {level}
            </span>
          )}
          {subCount > 0 && <span className="chip">{subCount} subtopics</span>}
        </div>
      )}
      {node.topicId && (
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
          Open topic →
        </span>
      )}
    </div>
  )

  return node.topicId ? (
    <Link to={paths.topic(subjectId, node.topicId)} className="block">
      {inner}
    </Link>
  ) : (
    inner
  )
}

export function Roadmap({
  subject,
  roadmap,
}: {
  subject: Subject
  roadmap: RoadmapData
}) {
  return (
    <div>
      {roadmap.description && (
        <p className="mb-8 max-w-2xl text-slate-600 dark:text-slate-400">
          {roadmap.description}
        </p>
      )}
      <ol className="relative space-y-10">
        {/* vertical connector line */}
        <span className="absolute left-[15px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-brand-400 to-violet-400 sm:block" />
        {roadmap.stages.map((stage, idx) => (
          <li key={stage.id} className="relative sm:pl-12">
            <span className="absolute left-0 top-0 hidden h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-sm font-bold text-white shadow sm:grid">
              {idx + 1}
            </span>
            <div className="mb-4">
              <h3 className="text-lg font-bold">{stage.title}</h3>
              {stage.summary && (
                <p className="text-sm text-slate-500">{stage.summary}</p>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stage.nodes.map((node) => (
                <NodeCard key={node.id} subject={subject} node={node} />
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
