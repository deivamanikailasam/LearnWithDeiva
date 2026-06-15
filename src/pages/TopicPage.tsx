import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { Container } from '../components/Container'
import { Breadcrumb } from '../components/Breadcrumb'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { SectionView } from '../components/sections/SectionView'
import { TopicTree } from '../components/TopicTree'
import {
  findTopic,
  flattenTopics,
  getAncestors,
  loadSubject,
  loadTopicSections,
} from '../content/data'
import type { TopicSections } from '../types/content'
import { SECTION_DESCRIPTORS } from '../content/sections'
import { paths } from '../lib/paths'
import { useAsync } from '../lib/useAsync'
import { useScrollSpy } from '../lib/useScrollSpy'
import { useProgress } from '../lib/progressContext'
import { formatDuration, subtreeMinutes } from '../lib/duration'

/** Count every descendant of a topic (used for the "N total" subtopics label). */
function countDescendants(topic: { subtopics: { subtopics: unknown[] }[] }): number {
  let n = 0
  for (const sub of topic.subtopics) {
    n += 1 + countDescendants(sub as never)
  }
  return n
}

export function TopicPage() {
  const { subjectId = '', topicId = '' } = useParams()
  const { data: subject, loading: subjectLoading } = useAsync(
    () => loadSubject(subjectId),
    [subjectId],
  )
  const topic = useMemo(
    () => (subject ? findTopic(subject, topicId) : undefined),
    [subject, topicId],
  )
  const { isComplete, toggleComplete, isBookmarked, toggleBookmark, completedAt } =
    useProgress()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const available = useMemo(
    () =>
      topic
        ? SECTION_DESCRIPTORS.filter((d) => topic.sectionKeys.includes(d.key))
        : [],
    [topic],
  )
  const sectionIds = useMemo(() => available.map((d) => `section-${d.key}`), [available])
  const activeId = useScrollSpy(sectionIds)

  const hasSections = available.length > 0
  const { data: sections, loading: sectionsLoading } = useAsync(
    () =>
      hasSections
        ? loadTopicSections(subjectId, topicId)
        : Promise.resolve({} as TopicSections),
    [subjectId, topicId, hasSections],
  )

  if (subjectLoading && !subject) {
    return (
      <Container className="flex min-h-[50vh] items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
      </Container>
    )
  }

  if (!subject || !topic) {
    return (
      <Container className="py-16 text-center">
        <p className="text-lg">Topic not found.</p>
        <Link to={paths.subject(subjectId)} className="btn-ghost mt-4">
          ← Back to subject
        </Link>
      </Container>
    )
  }

  const ancestors = getAncestors(subject, topic.id)
  const completedTs = isComplete(subject.id, topic.id)
    ? completedAt(subject.id, topic.id)
    : undefined
  const flat = flattenTopics(subject)
  const idx = flat.findIndex((t) => t.id === topic.id)
  const prev = idx > 0 ? flat[idx - 1] : undefined
  const next = idx < flat.length - 1 ? flat[idx + 1] : undefined

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Container className="py-10">
      <Breadcrumb
        items={[
          { label: 'Subjects', to: paths.subjects() },
          { label: subject.title, to: paths.subject(subject.id) },
          ...ancestors.map((a) => ({
            label: a.title,
            to: paths.topic(subject.id, a.id),
          })),
          { label: topic.title },
        ]}
      />

      <header className="mt-5">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{topic.title}</h1>
        <p className="mt-2 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
          {topic.summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="chip capitalize">⚡ {topic.level}</span>
          <span className="chip">⏱️ {formatDuration(subtreeMinutes(topic))}</span>
          {topic.tags.map((t) => (
            <span key={t} className="chip">
              #{t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className={
              isComplete(subject.id, topic.id)
                ? 'btn bg-emerald-600 text-white hover:bg-emerald-700'
                : 'btn-ghost border border-slate-200 dark:border-slate-700'
            }
          >
            {isComplete(subject.id, topic.id) ? '✓ Completed' : 'Mark as complete'}
          </button>
          <button
            type="button"
            onClick={() => toggleBookmark(subject.id, topic.id)}
            className="btn-ghost border border-slate-200 dark:border-slate-700"
          >
            {isBookmarked(subject.id, topic.id) ? '★ Bookmarked' : '☆ Bookmark'}
          </button>
        </div>
        {completedTs && (
          <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
            ✓ Completed on {new Date(completedTs).toLocaleString()}
          </p>
        )}
      </header>

      <div className="mt-8 gap-10 lg:flex">
        {/* Sticky section navigator */}
        {hasSections && (
        <aside className="mb-8 lg:order-2 lg:mb-0 lg:w-60 lg:shrink-0">
          <nav className="lg:sticky lg:top-24">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              On this page
            </p>
            <ul className="space-y-1">
              {available.map((d) => {
                const id = `section-${d.key}`
                return (
                  <li key={d.key}>
                    <button
                      type="button"
                      onClick={() => scrollTo(id)}
                      className={clsx(
                        'flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm transition',
                        activeId === id
                          ? 'bg-brand-50 font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
                      )}
                    >
                      <span>{d.icon}</span>
                      <span className="truncate">{d.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>
        )}

        {/* Sections */}
        <div className="min-w-0 flex-1 lg:order-1">
          {topic.subtopics.length > 0 && (
            <section className="mb-10">
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <span>🧭</span> Subtopics
                </h2>
                <span className="text-sm text-slate-400">
                  {topic.subtopics.length} direct · {countDescendants(topic)} total
                </span>
              </div>
              <TopicTree
                subjectId={subject.id}
                topics={topic.subtopics}
                defaultExpanded={!hasSections && topic.subtopics.length <= 12}
              />
            </section>
          )}

          {hasSections && sectionsLoading && !sections ? (
            <div className="flex min-h-[30vh] items-center justify-center">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
            </div>
          ) : (
            <div className="space-y-12">
              {available.map((d) => (
                <section key={d.key} id={`section-${d.key}`} className="scroll-mt-24">
                  <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                    <span>{d.icon}</span>
                    {d.label}
                  </h2>
                  <SectionView sectionKey={d.key} sections={sections ?? {}} />
                </section>
              ))}
            </div>
          )}

          {/* Prev / next */}
          <div className="mt-14 grid gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 sm:grid-cols-2">
            {prev ? (
              <Link to={paths.topic(subject.id, prev.id)} className="card p-4">
                <span className="text-xs text-slate-400">← Previous</span>
                <p className="font-semibold">{prev.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={paths.topic(subject.id, next.id)}
                className="card p-4 text-right sm:col-start-2"
              >
                <span className="text-xs text-slate-400">Next →</span>
                <p className="font-semibold">{next.title}</p>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        tone={isComplete(subject.id, topic.id) ? 'danger' : 'default'}
        title={
          isComplete(subject.id, topic.id)
            ? 'Remove completion?'
            : 'Mark as complete?'
        }
        message={
          isComplete(subject.id, topic.id) ? (
            <>
              This removes <span className="font-semibold">{topic.title}</span> from
              your completed list.
            </>
          ) : (
            <>
              This records <span className="font-semibold">{topic.title}</span> as
              completed with the current date and time.
            </>
          )
        }
        confirmLabel={
          isComplete(subject.id, topic.id) ? 'Remove' : 'Mark complete'
        }
        onConfirm={() => {
          toggleComplete(subject.id, topic.id)
          setConfirmOpen(false)
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </Container>
  )
}
