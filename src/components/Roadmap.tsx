import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import type {
  Roadmap as RoadmapData,
  RoadmapNode,
  RoadmapStage,
  Subject,
  Topic,
} from '../types/content'
import { paths } from '../lib/paths'
import { findTopic, planCompletionCascade } from '../content/data'
import { useProgress } from '../lib/progressContext'
import { formatDuration, requiredSubtreeMinutes } from '../lib/duration'
import { countRequiredTopics } from '../lib/topic-status'
import { ConfirmDialog } from './ConfirmDialog'
import {
  CONTENT_GAP_CARD_CLASS,
  isContentGapHighlighted,
} from '../lib/audit-sub-subtopic-content'

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
  contentGapTopicIds,
}: {
  subject: Subject
  node: RoadmapNode
  contentGapTopicIds?: ReadonlySet<string> | null
}) {
  const subjectId = subject.id
  const { isComplete } = useProgress()
  const optional = node.status === 'optional'
  const done = node.topicId ? isComplete(subjectId, node.topicId) : false
  const contentGap = isContentGapHighlighted(contentGapTopicIds, node.topicId)
  const linked = node.topicId ? findTopic(subject, node.topicId) : undefined
  const level = linked?.level
  const subCount = linked?.subtopics.length ?? 0
  const minutes = linked ? requiredSubtreeMinutes(linked) : 0
  const inner = (
    <div
      className={clsx(
        'h-full rounded-xl border p-4 transition',
        node.topicId
          ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md'
          : 'opacity-90',
        contentGap
          ? CONTENT_GAP_CARD_CLASS
          : done
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
      {(level || subCount > 0 || minutes > 0) && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {level && (
            <span className={clsx('chip capitalize', levelStyles[level] ?? '')}>
              {level}
            </span>
          )}
          {subCount > 0 && <span className="chip">{subCount} subtopics</span>}
          {minutes > 0 && <span className="chip">⏱️ {formatDuration(minutes)}</span>}
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

function StageItem({
  subject,
  stage,
  index,
  contentGapTopicIds,
}: {
  subject: Subject
  stage: RoadmapStage
  index: number
  contentGapTopicIds?: ReadonlySet<string> | null
}) {
  const { isComplete, setCompletedKeys } = useProgress()
  const [confirmOpen, setConfirmOpen] = useState(false)

  // Stage progress is derived from the topics each node links to. Nodes
  // without a `topicId` are decorative and do not count toward completion.
  const linkedTopics = useMemo<Topic[]>(
    () =>
      stage.nodes
        .map((n) => (n.topicId ? findTopic(subject, n.topicId) : undefined))
        .filter((t): t is Topic => Boolean(t && t.status !== 'optional')),
    [subject, stage],
  )

  const completedTopicCount = linkedTopics.filter((t) =>
    isComplete(subject.id, t.id),
  ).length
  const totalTopicCount = linkedTopics.length
  const stageComplete =
    totalTopicCount > 0 && completedTopicCount === totalTopicCount

  const subtreeTotal = useMemo(
    () => linkedTopics.reduce((acc, t) => acc + countRequiredTopics([t]), 0),
    [linkedTopics],
  )
  const stageMinutes = useMemo(
    () => linkedTopics.reduce((acc, t) => acc + requiredSubtreeMinutes(t), 0),
    [linkedTopics],
  )

  const onConfirm = () => {
    const willComplete = !stageComplete
    const addKeys: string[] = []
    const removeKeys: string[] = []
    for (const t of linkedTopics) {
      const plan = planCompletionCascade(
        subject,
        t,
        willComplete,
        (id) => isComplete(subject.id, id),
      )
      addKeys.push(...plan.addKeys)
      removeKeys.push(...plan.removeKeys)
    }
    setCompletedKeys(addKeys, removeKeys)
    setConfirmOpen(false)
  }

  return (
    <li className="relative sm:pl-12">
      <span
        className={clsx(
          'absolute left-0 top-0 hidden h-8 w-8 place-items-center rounded-full text-sm font-bold text-white shadow sm:grid',
          stageComplete
            ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
            : 'bg-gradient-to-br from-brand-500 to-violet-500',
        )}
        aria-label={
          stageComplete
            ? `Stage ${index + 1} complete`
            : `Stage ${index + 1}`
        }
      >
        {stageComplete ? '✓' : index + 1}
      </span>

      <div className="mb-4 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold">{stage.title}</h3>
            {stageMinutes > 0 && (
              <span className="chip">⏱️ {formatDuration(stageMinutes)}</span>
            )}
            {totalTopicCount > 0 && (
              <span
                className={clsx(
                  'chip',
                  stageComplete &&
                    'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300',
                )}
              >
                {completedTopicCount} / {totalTopicCount} topics
              </span>
            )}
          </div>
          {stage.summary && (
            <p className="mt-0.5 text-sm text-slate-500">{stage.summary}</p>
          )}
        </div>

        {totalTopicCount > 0 && (
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className={clsx(
              'btn shrink-0 border text-sm',
              stageComplete
                ? 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/15'
                : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/10 dark:hover:text-brand-300',
            )}
            aria-pressed={stageComplete}
            title={
              stageComplete
                ? 'Stage complete — click to undo'
                : 'Mark every topic in this stage (and their subtopics) as complete'
            }
          >
            {stageComplete ? '✓ Stage complete' : 'Mark stage complete'}
          </button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stage.nodes.map((node) => (
          <NodeCard
            key={node.id}
            subject={subject}
            node={node}
            contentGapTopicIds={contentGapTopicIds}
          />
        ))}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        tone={stageComplete ? 'danger' : 'default'}
        title={stageComplete ? 'Reset this stage?' : 'Mark stage complete?'}
        message={
          stageComplete ? (
            <>
              This unmarks every topic in{' '}
              <span className="font-semibold">{stage.title}</span> ({subtreeTotal}{' '}
              {subtreeTotal === 1 ? 'topic' : 'topics'} including subtopics).
            </>
          ) : (
            <>
              This marks every topic in{' '}
              <span className="font-semibold">{stage.title}</span> as completed
              — {totalTopicCount} top-level{' '}
              {totalTopicCount === 1 ? 'topic' : 'topics'} and{' '}
              {Math.max(0, subtreeTotal - totalTopicCount)} subtopic
              {subtreeTotal - totalTopicCount === 1 ? '' : 's'} below them.
            </>
          )
        }
        confirmLabel={stageComplete ? 'Reset stage' : 'Mark stage complete'}
        onConfirm={onConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </li>
  )
}

export function Roadmap({
  subject,
  roadmap,
  contentGapTopicIds,
}: {
  subject: Subject
  roadmap: RoadmapData
  contentGapTopicIds?: ReadonlySet<string> | null
}) {
  return (
    <div>
      <ol className="relative space-y-8 sm:space-y-10">
        {/* vertical connector line */}
        <span className="absolute left-[15px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-brand-400 to-violet-400 sm:block" />
        {roadmap.stages.map((stage, idx) => (
          <StageItem
            key={stage.id}
            subject={subject}
            stage={stage}
            index={idx}
            contentGapTopicIds={contentGapTopicIds}
          />
        ))}
      </ol>
    </div>
  )
}
