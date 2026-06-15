import { Container } from '../components/Container'
import { SubjectCard } from '../components/SubjectCard'
import { loadSubjectIndex } from '../content/data'
import { useAsync } from '../lib/useAsync'

export function SubjectsPage() {
  const { data: subjects, loading } = useAsync(() => loadSubjectIndex(), [])

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="text-2xl font-extrabold sm:text-3xl">All subjects</h1>
      <p className="mt-1.5 text-sm text-slate-500 sm:mt-2 sm:text-base">
        {subjects
          ? `${subjects.length} subject${subjects.length === 1 ? '' : 's'} to explore.`
          : 'Loading subjects…'}
      </p>
      {loading && !subjects ? (
        <SubjectGridSkeleton />
      ) : (
        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {subjects?.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      )}
    </Container>
  )
}

function SubjectGridSkeleton() {
  return (
    <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800/40"
        />
      ))}
    </div>
  )
}
