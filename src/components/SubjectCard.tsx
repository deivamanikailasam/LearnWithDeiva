import { Link } from 'react-router-dom'
import type { Subject } from '../types/content'
import { paths } from '../lib/paths'
import { useProgress } from '../lib/progressContext'
import { ProgressBar } from './ProgressBar'

export function SubjectCard({ subject }: { subject: Subject }) {
  const { completedInSubject } = useProgress()
  const done = completedInSubject(subject.id)
  return (
    <Link
      to={paths.subject(subject.id)}
      className="card group flex flex-col gap-4 p-5 animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-2xl shadow-sm"
          style={{
            backgroundImage: `linear-gradient(135deg, ${subject.gradient[0]}, ${subject.gradient[1]})`,
          }}
        >
          {subject.icon}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold group-hover:text-brand-600 dark:group-hover:text-brand-400">
            {subject.title}
          </h3>
          <p className="text-sm text-slate-500">{subject.tagline}</p>
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
        {subject.description}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        <span className="chip capitalize">{subject.level}</span>
        <span className="chip">{subject.topicCount} topics</span>
        {subject.estimatedHours ? (
          <span className="chip">~{subject.estimatedHours}h</span>
        ) : null}
      </div>

      {done > 0 && <ProgressBar value={done} total={subject.topicCount} />}
    </Link>
  )
}
