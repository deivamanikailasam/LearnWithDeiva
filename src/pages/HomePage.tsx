import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { SubjectCard } from '../components/SubjectCard'
import { loadSubjectIndex, resolveTopicKeys } from '../content/data'
import { paths } from '../lib/paths'
import { useAsync } from '../lib/useAsync'
import { useProgress } from '../lib/progressContext'

export function HomePage() {
  const { data: subjects } = useAsync(() => loadSubjectIndex(), [])
  const { bookmarks, completed } = useProgress()

  const totalTopics = subjects?.reduce((sum, s) => sum + s.topicCount, 0) ?? 0

  const { data: bookmarked } = useAsync(
    () => resolveTopicKeys(bookmarks),
    [bookmarks],
  )

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 to-transparent dark:from-brand-500/5" />
        <Container className="py-12 text-center sm:py-16 lg:py-20">
          <span className="chip mb-4 sm:mb-5">🚀 Open · data-driven · always growing</span>
          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight xs:text-4xl sm:text-5xl lg:text-6xl">
            Learn any{' '}
            <span className="bg-gradient-to-r from-brand-500 to-violet-500 bg-clip-text text-transparent">
              tech subject
            </span>{' '}
            the structured way
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:mt-6 sm:text-lg dark:text-slate-400">
            Roadmaps, deep explanations, code, projects, interview questions and
            case studies — organised into subjects, topics and subtopics with
            powerful search.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 xs:flex-row sm:mt-8">
            <Link to={paths.subjects()} className="btn-primary w-full xs:w-auto">
              Browse subjects
            </Link>
            <Link to={paths.search()} className="btn-ghost w-full xs:w-auto">
              Search content
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500 sm:mt-10 sm:gap-8">
            <div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                {subjects?.length ?? '—'}
              </div>
              subjects
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                {totalTopics || '—'}
              </div>
              topics
            </div>
          </div>
        </Container>
      </section>

      {/* My learning */}
      {((bookmarked && bookmarked.length > 0) || completed.size > 0) && (
        <Container className="pt-10 sm:pt-14">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-bold sm:text-xl">📌 My learning</h2>
              <span className="chip">{completed.size} topics completed</span>
            </div>
            {bookmarked && bookmarked.length > 0 ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {bookmarked.map(({ subject, topic }) => (
                  <Link
                    key={`${subject.id}-${topic.id}`}
                    to={paths.topic(subject.id, topic.id)}
                    className="card p-4"
                  >
                    <p className="text-xs text-slate-400">{subject.title}</p>
                    <p className="font-semibold">★ {topic.title}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                Bookmark topics to pin them here for quick access.
              </p>
            )}
          </div>
        </Container>
      )}

      {/* Subjects */}
      <Container className="py-10 sm:py-14">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">Subjects</h2>
            <p className="text-sm text-slate-500 sm:text-base">
              Pick a subject to start your journey.
            </p>
          </div>
          <Link
            to={paths.subjects()}
            className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {subjects?.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </Container>
    </div>
  )
}
