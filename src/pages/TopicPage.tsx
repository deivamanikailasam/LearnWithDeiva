import { useMemo, useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { Container } from '../components/Container'
import { Breadcrumb } from '../components/Breadcrumb'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { SectionView } from '../components/sections/SectionView'
import { EditableTopicHeader } from '../components/editor/EditableTopicHeader'
import { TopicTree } from '../components/TopicTree'
import {
  collectSubtreeIds,
  findTopic,
  flattenTopicsForNavigation,
  getAncestors,
  invalidateSubjectCache,
  invalidateSubjectIndexCache,
  loadSubject,
  loadTopicBody,
  planCompletionCascade,
  invalidateTopicDocumentCache,
} from '../content/data'
import { splitDocumentByHeading } from '../lib/split-document'
import { getTiptapSectionNav } from '../lib/split-tiptap-document'
import { emptyTopicDocument, type TopicDocument } from '../types/tiptap-document'
import type { SavedTopicDocumentResult } from '../lib/save-topic-document'
import { paths } from '../lib/paths'
import { useAsync } from '../lib/useAsync'
import { useScrollSpy } from '../lib/useScrollSpy'
import { useProgress } from '../lib/progressContext'
import { useEditMode } from '../lib/editModeContext'

const TopicDocumentEditor = lazy(() =>
  import('../components/editor/TopicDocumentEditor').then((m) => ({
    default: m.TopicDocumentEditor,
  })),
)

function TopicDocumentFallback() {
  return (
    <div className="flex min-h-[30vh] items-center justify-center">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
    </div>
  )
}

/** Count every descendant of a topic (used for the "N total" subtopics label). */
function countDescendants(topic: { subtopics: { subtopics: unknown[] }[] }): number {
  let n = 0
  for (const sub of topic.subtopics) {
    n += 1 + countDescendants(sub as never)
  }
  return n
}

function sectionNavLabel(title: string | null): string {
  return title ?? 'Overview'
}

export function TopicPage() {
  const { subjectId = '', topicId = '' } = useParams()
  const [subjectRefresh, setSubjectRefresh] = useState(0)
  const { data: subject, loading: subjectLoading } = useAsync(
    () => loadSubject(subjectId),
    [subjectId, subjectRefresh],
  )
  const topic = useMemo(
    () => (subject ? findTopic(subject, topicId) : undefined),
    [subject, topicId],
  )
  const {
    isComplete,
    setCompletedKeys,
    isBookmarked,
    toggleBookmark,
    completedAt,
  } = useProgress()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [savedDocument, setSavedDocument] = useState<TopicDocument | null>(null)
  const { editMode, canUseEditMode } = useEditMode()
  const metadataEditable = canUseEditMode && editMode

  const refreshSubject = () => {
    invalidateSubjectCache(subjectId)
    setSubjectRefresh((n) => n + 1)
  }

  const handleDocumentSaved = useCallback(
    (result: SavedTopicDocumentResult) => {
      setSavedDocument(result.document)
      if (result.duration) {
        invalidateSubjectCache(subjectId)
        invalidateSubjectIndexCache()
        setSubjectRefresh((n) => n + 1)
      }
    },
    [subjectId],
  )

  const staleTopicRetryRef = useRef<string | null>(null)

  useEffect(() => {
    staleTopicRetryRef.current = null
    setSavedDocument(null)
    invalidateTopicDocumentCache(subjectId, topicId)
  }, [topicId, subjectId])

  // After creating a topic elsewhere, the in-memory subject tree can be stale.
  useEffect(() => {
    if (subjectLoading || !subjectId || !topicId || !subject) return
    if (findTopic(subject, topicId)) return

    const retryKey = `${subjectId}::${topicId}`
    if (staleTopicRetryRef.current === retryKey) return
    staleTopicRetryRef.current = retryKey
    invalidateSubjectCache(subjectId)
    setSubjectRefresh((n) => n + 1)
  }, [subject, subjectId, topicId, subjectLoading])

  const topicDepth = useMemo(() => {
    if (!subject || !topicId || !findTopic(subject, topicId)) return -1
    return getAncestors(subject, topicId).length
  }, [subject, topicId])

  const isContentLevel = topicDepth >= 2

  const hasContent = topic?.hasContent ?? false
  const shouldLoadContent =
    isContentLevel && (hasContent || savedDocument || metadataEditable)
  const canShowDevEditor =
    metadataEditable && isContentLevel && !savedDocument

  const { data: topicBody, loading: contentLoading } = useAsync(
    () =>
      shouldLoadContent
        ? loadTopicBody(subjectId, topicId)
        : Promise.resolve(undefined),
    [subjectId, topicId, shouldLoadContent],
  )

  const resolvedTopicBody = contentLoading ? undefined : topicBody

  const tiptapDocument =
    savedDocument ??
    (resolvedTopicBody?.format === 'tiptap/v1'
      ? resolvedTopicBody.document
      : undefined)

  const contentSections = useMemo(() => {
    if (tiptapDocument) {
      return getTiptapSectionNav(tiptapDocument.doc)
    }
    if (resolvedTopicBody?.format === 'blocks') {
      return splitDocumentByHeading(resolvedTopicBody.document).map((s) => ({
        id: s.id,
        title: sectionNavLabel(s.title),
      }))
    }
    return []
  }, [tiptapDocument, resolvedTopicBody])

  const showNav = contentSections.length > 1
  const sectionIds = useMemo(
    () => contentSections.map((s) => `section-${s.id}`),
    [contentSections],
  )
  const activeId = useScrollSpy(sectionIds)

  if (subjectLoading && !subject) {
    return (
      <Container className="flex min-h-[50vh] items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
      </Container>
    )
  }

  if (!subject || !topic) {
    const staleRetryKey = `${subjectId}::${topicId}`
    const awaitingStaleRetry =
      Boolean(subject) && staleTopicRetryRef.current !== staleRetryKey
    if (subjectLoading || awaitingStaleRetry) {
      return (
        <Container className="flex min-h-[50vh] items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
        </Container>
      )
    }
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
  const isSubSubtopic = ancestors.length >= 2
  const completedTs = isComplete(subject.id, topic.id)
    ? completedAt(subject.id, topic.id)
    : undefined
  const flat = flattenTopicsForNavigation(subject)
  const idx = flat.findIndex((t) => t.id === topic.id)
  const prev = idx > 0 ? flat[idx - 1] : undefined
  const next = idx < flat.length - 1 ? flat[idx + 1] : undefined

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const renderBody = () => {
    if (!isContentLevel) return null

    if (shouldLoadContent && contentLoading && !tiptapDocument && !savedDocument) {
      return (
        <div className="flex min-h-[30vh] items-center justify-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
        </div>
      )
    }

    if (tiptapDocument) {
      return (
        <Suspense fallback={<TopicDocumentFallback />}>
          <TopicDocumentEditor
            key={`${subject.id}:${topic.id}`}
            subjectId={subject.id}
            topicId={topic.id}
            topicDocument={tiptapDocument}
            onDocumentSaved={handleDocumentSaved}
          />
        </Suspense>
      )
    }

    if (resolvedTopicBody?.format === 'blocks') {
      const sections = splitDocumentByHeading(resolvedTopicBody.document)
      return (
        <div className="space-y-10 sm:space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={`section-${s.id}`} className="scroll-mt-24">
              {s.title && (
                <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">
                  {s.title}
                </h2>
              )}
              <SectionView blocks={s.blocks} />
            </section>
          ))}
        </div>
      )
    }

    if (canShowDevEditor && !resolvedTopicBody) {
      return (
        <Suspense fallback={<TopicDocumentFallback />}>
          <TopicDocumentEditor
            key={`${subject.id}:${topic.id}`}
            subjectId={subject.id}
            topicId={topic.id}
            topicDocument={emptyTopicDocument()}
            onDocumentSaved={handleDocumentSaved}
          />
        </Suspense>
      )
    }

    return null
  }

  return (
    <Container className="py-6 sm:py-10">
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

      <header className="mt-4 sm:mt-5">
        <EditableTopicHeader
          subjectId={subject.id}
          subjectTitle={subject.title}
          topic={topic}
          topicAncestors={getAncestors(subject, topic.id)}
          isSubSubtopic={isSubSubtopic}
          prevTopic={prev}
          nextTopic={next}
          editable={metadataEditable}
          onSaved={refreshSubject}
          actions={
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className={
                  isComplete(subject.id, topic.id)
                    ? 'btn flex-1 bg-emerald-600 text-white hover:bg-emerald-700 xs:flex-initial'
                    : 'btn-ghost flex-1 border border-slate-200 xs:flex-initial dark:border-slate-700'
                }
              >
                {isComplete(subject.id, topic.id) ? '✓ Completed' : 'Mark as complete'}
              </button>
              <button
                type="button"
                onClick={() => toggleBookmark(subject.id, topic.id)}
                className="btn-ghost flex-1 border border-slate-200 xs:flex-initial dark:border-slate-700"
              >
                {isBookmarked(subject.id, topic.id) ? '★ Bookmarked' : '☆ Bookmark'}
              </button>
            </div>
          }
          completedLine={
            completedTs ? (
              <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
                ✓ Completed on {new Date(completedTs).toLocaleString()}
              </p>
            ) : undefined
          }
        />
      </header>

      <div className="mt-6 gap-8 sm:mt-8 lg:flex lg:gap-10">
        {showNav && (
          <aside className="mb-8 lg:order-2 lg:mb-0 lg:w-60 lg:shrink-0">
            <nav className="lg:sticky lg:top-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                On this page
              </p>
              <ul className="space-y-1">
                {contentSections.map((s) => {
                  const id = `section-${s.id}`
                  return (
                    <li key={s.id}>
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
                        <span className="truncate">{s.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>
        )}

        <div className="min-w-0 flex-1 lg:order-1">
          {(topic.subtopics.length > 0 || metadataEditable) && (
            <section className="mb-10">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 sm:gap-3">
                <h2 className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
                  <span>🧭</span> Subtopics
                </h2>
                {topic.subtopics.length > 0 ? (
                  <span className="text-xs text-slate-400 sm:text-sm">
                    {topic.subtopics.length} direct · {countDescendants(topic)} total
                  </span>
                ) : metadataEditable ? (
                  <span className="text-xs text-slate-400 sm:text-sm">
                    Optional — add subtopics to split this topic into sections
                  </span>
                ) : null}
              </div>
              <TopicTree
                subjectId={subject.id}
                topics={topic.subtopics}
                currentTopicId={topic.id}
                parentTopicId={topic.id}
                parentDepth={ancestors.length}
                defaultExpanded={!hasContent && topic.subtopics.length <= 12}
                editable={metadataEditable}
                onTreeChange={refreshSubject}
              />
            </section>
          )}

          {renderBody()}

          <div className="mt-10 grid gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:mt-14 sm:grid-cols-2 sm:pt-6">
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
        message={(() => {
          const subtreeSize = Math.max(0, collectSubtreeIds(topic).length - 1)
          const subPart =
            subtreeSize > 0
              ? ` and the ${subtreeSize} subtopic${subtreeSize === 1 ? '' : 's'} below it`
              : ''
          return isComplete(subject.id, topic.id) ? (
            <>
              This unmarks <span className="font-semibold">{topic.title}</span>
              {subPart}. Any parent topics will also be unmarked since they
              require all subtopics to be complete.
            </>
          ) : (
            <>
              This records <span className="font-semibold">{topic.title}</span>
              {subPart} as completed. Parent topics auto-complete when all
              their subtopics are done.
            </>
          )
        })()}
        confirmLabel={
          isComplete(subject.id, topic.id) ? 'Remove' : 'Mark complete'
        }
        onConfirm={() => {
          const willComplete = !isComplete(subject.id, topic.id)
          const plan = planCompletionCascade(
            subject,
            topic,
            willComplete,
            (id) => isComplete(subject.id, id),
          )
          setCompletedKeys(plan.addKeys, plan.removeKeys)
          setConfirmOpen(false)
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </Container>
  )
}
