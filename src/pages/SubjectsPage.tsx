import { Container } from '../components/Container'
import { SubjectCard } from '../components/SubjectCard'
import { subjects } from '../content/registry'

export function SubjectsPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-extrabold">All subjects</h1>
      <p className="mt-2 text-slate-500">
        {subjects.length} subject{subjects.length === 1 ? '' : 's'} to explore.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </Container>
  )
}
