import { useEffect, useMemo, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { Container } from '../components/Container'
import { Breadcrumb } from '../components/Breadcrumb'
import { Roadmap } from '../components/Roadmap'
import { TopicTree } from '../components/TopicTree'
import { ProgressBar } from '../components/ProgressBar'
import { SubjectExtraList } from '../components/sections/SubjectExtraList'
import {
  loadSubject,
  loadSubjectExtra,
  loadSubjectExtrasManifest,
  subjectLevelRange,
} from '../content/data'
import { SUBJECT_EXTRA_DESCRIPTORS } from '../content/sections'
import { paths } from '../lib/paths'
import { useAsync } from '../lib/useAsync'
import { useProgress } from '../lib/progressContext'
import { formatDuration } from '../lib/duration'

/** The currently active subject view. Extras are keyed by their descriptor. */
type View = 'roadmap' | 'topics' | (typeof SUBJECT_EXTRA_DESCRIPTORS)[number]['key']

export function SubjectPage() {
  const { subjectId = '', view } = useParams()
  const navigate = useNavigate()
  const { data: subject, loading } = useAsync(
    () => loadSubject(subjectId),
    [subjectId],
  )
  // Tiny counts manifest — drives the tab badges without pulling any bodies.
  const { data: manifest } = useAsync(
    () => loadSubjectExtrasManifest(subjectId),
    [subjectId],
  )
  const { completedInSubject } = useProgress()

  const activeExtra = useMemo(
    () => SUBJECT_EXTRA_DESCRIPTORS.find((d) => d.slug === view),
    [view],
  )

  // When the user switches tabs, bring the tab bar to the top of the viewport
  // (just below the sticky header) so the selected content is immediately
  // visible — instead of `ScrollRestoration` snapping back to the hero. We
  // skip the first render so landing on the page still shows the hero.
  const tabBarRef = useRef<HTMLDivElement>(null)
  const isInitialView = useRef(true)
  useEffect(() => {
    if (isInitialView.current) {
      isInitialView.current = false
      return
    }
    tabBarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [view])

  // Only the active category's items are fetched, and only when its tab is open.
  const { data: extraData, loading: extraLoading } = useAsync(
    () =>
      activeExtra
        ? loadSubjectExtra(subjectId, activeExtra.key)
        : Promise.resolve(undefined),
    [subjectId, activeExtra?.key],
  )

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

  // Resolve which view is active. The base route (no `view`) shows the roadmap
  // when present, otherwise the topic tree.
  const activeView: View = activeExtra
    ? activeExtra.key
    : view === 'topics'
      ? 'topics'
      : subject.roadmap
        ? 'roadmap'
        : 'topics'

  const tabs: { key: View; label: string; to: string; count?: number; hidden?: boolean }[] = [
    {
      key: 'roadmap',
      label: '🗺️ Roadmap',
      to: paths.subject(subject.id),
      hidden: !subject.roadmap,
    },
    { key: 'topics', label: '📚 All Topics', to: paths.subjectView(subject.id, 'topics') },
    ...SUBJECT_EXTRA_DESCRIPTORS.map((d) => ({
      key: d.key as View,
      label: `${d.icon} ${d.label}`,
      to: paths.subjectView(subject.id, d.slug),
      count: manifest?.counts[d.key],
    })),
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
        <Container className="py-6 sm:py-10">
          <Breadcrumb
            items={[
              { label: 'Subjects', to: paths.subjects() },
              { label: subject.title },
            ]}
          />
          <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:flex-row sm:items-center sm:gap-5">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl shadow-md sm:h-20 sm:w-20 sm:text-4xl"
              style={{
                backgroundImage: `linear-gradient(135deg, ${subject.gradient[0]}, ${subject.gradient[1]})`,
              }}
            >
              {subject.icon}
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                {subject.title}
              </h1>
              <p className="text-base text-slate-600 sm:text-lg dark:text-slate-300">
                {subject.tagline}
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-slate-600 sm:mt-5 sm:text-base dark:text-slate-400">
            {subject.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:mt-5 sm:gap-2">
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
          <div className="mt-4 max-w-md sm:mt-5">
            <ProgressBar
              value={completedInSubject(subject.id)}
              total={subject.topicCount}
            />
          </div>
        </Container>
      </section>

      {/* Tabs */}
      <Container className="py-6 sm:py-8">
        <div ref={tabBarRef} className="mb-5 scroll-mt-20 sm:mb-6">
          {/* Mobile (< sm): native dropdown — single tap surface, no horizontal scroll. */}
          <div className="relative sm:hidden">
            <label htmlFor="subject-view" className="sr-only">
              Section
            </label>
            <select
              id="subject-view"
              value={activeView}
              onChange={(e) => {
                const next = tabs.find((t) => t.key === e.target.value)
                if (next) navigate(next.to)
              }}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-slate-700 shadow-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              {tabs
                .filter((t) => !t.hidden)
                .map((t) => {
                  const count =
                    typeof t.count === 'number' && t.count > 0 ? ` (${t.count})` : ''
                  return (
                    <option key={t.key} value={t.key}>
                      {t.label}
                      {count}
                    </option>
                  )
                })}
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
            >
              ▾
            </span>
          </div>

          {/* ≥ sm: pill tab bar, wraps on multiple lines. */}
          <div className="hidden flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1 sm:flex dark:border-slate-800 dark:bg-slate-900">
            {tabs
              .filter((t) => !t.hidden)
              .map((t) => (
                <Link
                  key={t.key}
                  to={t.to}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition sm:px-4',
                    activeView === t.key
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                  )}
                >
                  <span>{t.label}</span>
                  {typeof t.count === 'number' && t.count > 0 ? (
                    <span
                      className={clsx(
                        'rounded-full px-1.5 text-xs',
                        activeView === t.key
                          ? 'bg-white/25'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800',
                      )}
                    >
                      {t.count}
                    </span>
                  ) : null}
                </Link>
              ))}
          </div>
        </div>

        {activeView === 'roadmap' && subject.roadmap ? (
          <Roadmap subject={subject} roadmap={subject.roadmap} />
        ) : activeView === 'topics' ? (
          <TopicTree subjectId={subject.id} topics={subject.topics} />
        ) : activeExtra ? (
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <span>{activeExtra.icon}</span>
              {activeExtra.label}
            </h2>
            {extraLoading && !extraData ? (
              <div className="flex min-h-[30vh] items-center justify-center">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
              </div>
            ) : (extraData?.items.length ?? 0) > 0 ? (
              <SubjectExtraList extraKey={activeExtra.key} data={extraData!} />
            ) : (
              <div className="card grid place-items-center p-12 text-center">
                <p className="text-4xl">{activeExtra.icon}</p>
                <p className="mt-3 text-lg font-semibold">
                  No {activeExtra.label.toLowerCase()} yet
                </p>
                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  Content for this section hasn’t been added yet. Check back soon.
                </p>
              </div>
            )}
          </div>
        ) : null}
      </Container>
    </div>
  )
}
