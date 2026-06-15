import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { Container } from '../components/Container'
import { Breadcrumb } from '../components/Breadcrumb'
import { Roadmap } from '../components/Roadmap'
import { TopicTree } from '../components/TopicTree'
import { ProgressBar } from '../components/ProgressBar'
import { loadSubject, subjectLevelRange } from '../content/data'
import { paths } from '../lib/paths'
import { useAsync } from '../lib/useAsync'
import { useProgress } from '../lib/progressContext'
import { formatDuration } from '../lib/duration'

type Tab = 'roadmap' | 'topics'

export function SubjectPage() {
  const { subjectId = '' } = useParams()
  const { data: subject, loading } = useAsync(
    () => loadSubject(subjectId),
    [subjectId],
  )
  const { completedInSubject } = useProgress()
  const [tab, setTab] = useState<Tab>('roadmap')

  if (loading && !subject) {
    return (
      <Container className="flex min-h-[50vh] items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
      </Container>
    )
  }

  if (!subject) {
    return (
      <Container className="py-16 text-center">
        <p className="text-lg">Subject not found.</p>
        <Link to={paths.subjects()} className="btn-ghost mt-4">
          ← Back to subjects
        </Link>
      </Container>
    )
  }

  const tabs: { id: Tab; label: string; hidden?: boolean }[] = [
    { id: 'roadmap', label: '🗺️ Roadmap', hidden: !subject.roadmap },
    { id: 'topics', label: '📚 All Topics' },
  ]

  const range = subjectLevelRange(subject)
  const levelLabel = range.min === range.max ? range.min : `${range.min} – ${range.max}`

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800"
        style={{
          backgroundImage: `linear-gradient(135deg, ${subject.gradient[0]}22, ${subject.gradient[1]}11)`,
        }}
      >
        <Container className="py-10">
          <Breadcrumb
            items={[
              { label: 'Subjects', to: paths.subjects() },
              { label: subject.title },
            ]}
          />
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
            <span
              className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl text-4xl shadow-md"
              style={{
                backgroundImage: `linear-gradient(135deg, ${subject.gradient[0]}, ${subject.gradient[1]})`,
              }}
            >
              {subject.icon}
            </span>
            <div>
              <h1 className="text-3xl font-extrabold sm:text-4xl">{subject.title}</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {subject.tagline}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-slate-600 dark:text-slate-400">
            {subject.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="chip capitalize">⚡ {levelLabel}</span>
            <span className="chip">📚 {subject.topicCount} topics</span>
            {subject.estimatedMinutes ? (
              <span className="chip">⏱️ ~{formatDuration(subject.estimatedMinutes)}</span>
            ) : null}
            {subject.tags.map((t) => (
              <span key={t} className="chip">
                #{t}
              </span>
            ))}
          </div>
          <div className="mt-5 max-w-md">
            <ProgressBar
              value={completedInSubject(subject.id)}
              total={subject.topicCount}
            />
          </div>
        </Container>
      </section>

      {/* Tabs */}
      <Container className="py-8">
        <div className="mb-6 inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
          {tabs
            .filter((t) => !t.hidden)
            .map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={clsx(
                  'rounded-lg px-4 py-2 text-sm font-semibold transition',
                  tab === t.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                )}
              >
                {t.label}
              </button>
            ))}
        </div>

        {tab === 'roadmap' && subject.roadmap ? (
          <Roadmap subject={subject} roadmap={subject.roadmap} />
        ) : (
          <TopicTree subjectId={subject.id} topics={subject.topics} />
        )}
      </Container>
    </div>
  )
}
