import { Link } from 'react-router-dom'
import type { SubjectIndexEntry } from '../types/content'
import { paths } from '../lib/paths'
import { useProgress } from '../lib/progressContext'
import { formatDuration } from '../lib/duration'
import { ProgressBar } from './ProgressBar'

export function SubjectCard({ subject }: { subject: SubjectIndexEntry }) {
  const { completedInSubject } = useProgress()
  const done = completedInSubject(subject.id)
  return (
    <Link
      to={paths.subject(subject.id)}
      className="card group flex flex-col gap-3 p-4 sm:gap-4 sm:p-5 animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xl shadow-sm sm:h-12 sm:w-12 sm:text-2xl"
          style={{
            backgroundImage: `linear-gradient(135deg, ${subject.gradient[0]}, ${subject.gradient[1]})`,
          }}
        >
          {subject.icon}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold sm:text-lg group-hover:text-brand-600 dark:group-hover:text-brand-400">
            {subject.title}
          </h3>
          <p className="line-clamp-2 text-xs text-slate-500 sm:text-sm">
            {subject.tagline}
          </p>
        </div>
      </div>

      <p className="line-clamp-2 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
        {subject.description}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-1.5 sm:gap-2">
        <span className="chip">{subject.topicCount} topics</span>
        {subject.estimatedMinutes ? (
          <span className="chip">~{formatDuration(subject.estimatedMinutes)}</span>
        ) : null}
      </div>

      <ProgressBar
        value={done}
        total={subject.topicCount}
        totalMinutes={subject.estimatedMinutes}
      />
    </Link>
  )
}
