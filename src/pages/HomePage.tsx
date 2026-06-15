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
        <Container className="py-20 text-center">
          <span className="chip mb-5">🚀 Open · data-driven · always growing</span>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Learn any{' '}
            <span className="bg-gradient-to-r from-brand-500 to-violet-500 bg-clip-text text-transparent">
              tech subject
            </span>{' '}
            the structured way
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Roadmaps, deep explanations, code, projects, interview questions and
            case studies — organised into subjects, topics and subtopics with
            powerful search.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to={paths.subjects()} className="btn-primary">
              Browse subjects
            </Link>
            <Link to={paths.search()} className="btn-ghost">
              Search content
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-8 text-sm text-slate-500">
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
            <div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                12
              </div>
              sections / topic
            </div>
          </div>
        </Container>
      </section>

      {/* My learning */}
      {((bookmarked && bookmarked.length > 0) || completed.size > 0) && (
        <Container className="pt-14">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">📌 My learning</h2>
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
      <Container className="py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Subjects</h2>
            <p className="text-slate-500">Pick a subject to start your journey.</p>
          </div>
          <Link
            to={paths.subjects()}
            className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects?.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </Container>
    </div>
  )
}
