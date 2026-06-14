import clsx from 'clsx'
import type {
  ApplicationsSection,
  CaseStudiesSection,
  CodeSection,
  CoursePrepSection,
  Difficulty,
  ExamPrepSection,
  ExplanationSection,
  InterviewQuestionsSection,
  MaterialsSection,
  ProjectsSection,
  ReferencesSection,
  ScenarioQuestionsSection,
  SectionKey,
  SynonymsSection,
  TopicSections,
} from '../../types/content'
import { Markdown } from '../Markdown'
import { CodeBlock } from '../CodeBlock'
import { Collapsible } from './Collapsible'
import { QuizItem } from './QuizItem'

const difficultyStyles: Record<Difficulty, string> = {
  beginner:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300',
  intermediate:
    'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300',
  advanced:
    'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300',
}

function DifficultyBadge({ level }: { level?: Difficulty }) {
  if (!level) return null
  return <span className={clsx('chip capitalize', difficultyStyles[level])}>{level}</span>
}

const materialIcons: Record<string, string> = {
  article: '📄',
  video: '🎬',
  book: '📕',
  course: '🎓',
  docs: '📘',
  tool: '🔧',
}

/* --------------------------- individual views --------------------------- */

function ExplanationView({ data }: { data: ExplanationSection }) {
  return (
    <div>
      <Markdown>{data.content}</Markdown>
      {data.keyPoints?.length ? (
        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-500/30 dark:bg-brand-500/10">
          <p className="mb-2 font-semibold text-brand-700 dark:text-brand-300">
            💡 Key points
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-slate-300">
            {data.keyPoints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

function CodeView({ data }: { data: CodeSection }) {
  return (
    <div className="space-y-5">
      {data.snippets.map((s, i) => (
        <div key={`${s.title}-${i}`}>
          <CodeBlock code={s.code} language={s.language} title={s.title} />
          {s.explanation && (
            <p className="mt-2 text-sm text-slate-500">{s.explanation}</p>
          )}
        </div>
      ))}
    </div>
  )
}

function SynonymsView({ data }: { data: SynonymsSection }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {data.terms.map((t) => (
        <div key={t.term} className="card p-4">
          <dt className="font-semibold text-brand-700 dark:text-brand-300">{t.term}</dt>
          <dd className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {t.definition}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function ApplicationsView({ data }: { data: ApplicationsSection }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {data.items.map((a) => (
        <div key={a.title} className="card p-4">
          <p className="font-semibold">🚀 {a.title}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {a.description}
          </p>
        </div>
      ))}
    </div>
  )
}

function MaterialsView({ data }: { data: MaterialsSection }) {
  return (
    <ul className="space-y-2">
      {data.items.map((m) => (
        <li key={m.url}>
          <a
            href={m.url}
            target="_blank"
            rel="noreferrer"
            className="card flex items-start gap-3 p-4"
          >
            <span className="text-xl">{materialIcons[m.type] ?? '🔗'}</span>
            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="font-semibold hover:text-brand-600 dark:hover:text-brand-400">
                  {m.title}
                </span>
                <span className="chip capitalize">{m.type}</span>
              </span>
              {m.description && (
                <span className="mt-1 block text-sm text-slate-500">
                  {m.description}
                </span>
              )}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function ReferencesView({ data }: { data: ReferencesSection }) {
  return (
    <ul className="space-y-2">
      {data.items.map((r) => (
        <li key={r.url} className="card p-4">
          <a
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-brand-600 hover:underline dark:text-brand-400"
          >
            {r.title}
          </a>
          {r.author && <span className="text-sm text-slate-500"> · {r.author}</span>}
          {r.note && (
            <p className="mt-1 text-sm text-slate-500">{r.note}</p>
          )}
        </li>
      ))}
    </ul>
  )
}

function ProjectsView({ data }: { data: ProjectsSection }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.items.map((p) => (
        <div key={p.title} className="card p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold">🛠️ {p.title}</p>
            <DifficultyBadge level={p.difficulty} />
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {p.description}
          </p>
          {p.requirements?.length ? (
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-500">
              {p.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function InterviewView({ data }: { data: InterviewQuestionsSection }) {
  return (
    <div className="space-y-3">
      {data.items.map((q, i) => (
        <Collapsible
          key={`${q.question}-${i}`}
          title={q.question}
          badge={<DifficultyBadge level={q.difficulty} />}
        >
          <Markdown>{q.answer}</Markdown>
          {q.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {q.tags.map((t) => (
                <span key={t} className="chip">
                  #{t}
                </span>
              ))}
            </div>
          ) : null}
        </Collapsible>
      ))}
    </div>
  )
}

function ScenarioView({ data }: { data: ScenarioQuestionsSection }) {
  return (
    <div className="space-y-3">
      {data.items.map((s, i) => (
        <div key={`${s.question}-${i}`} className="card p-5">
          <div className="rounded-lg border-l-4 border-brand-400 bg-brand-50 p-3 text-sm text-slate-700 dark:bg-brand-500/10 dark:text-slate-300">
            <span className="font-semibold">Scenario: </span>
            {s.scenario}
          </div>
          <p className="mt-3 font-semibold">🧩 {s.question}</p>
          <Collapsible title="Reveal answer">
            <Markdown>{s.answer}</Markdown>
          </Collapsible>
        </div>
      ))}
    </div>
  )
}

function CaseStudiesView({ data }: { data: CaseStudiesSection }) {
  const rows: { label: string; key: 'context' | 'problem' | 'solution' | 'outcome' }[] = [
    { label: 'Context', key: 'context' },
    { label: 'Problem', key: 'problem' },
    { label: 'Solution', key: 'solution' },
    { label: 'Outcome', key: 'outcome' },
  ]
  return (
    <div className="space-y-5">
      {data.items.map((c) => (
        <div key={c.title} className="card p-5">
          <p className="text-lg font-bold">📊 {c.title}</p>
          <dl className="mt-3 space-y-3">
            {rows.map((r) => (
              <div key={r.key}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {r.label}
                </dt>
                <dd className="text-sm text-slate-600 dark:text-slate-400">{c[r.key]}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}

function ExamPrepView({ data }: { data: ExamPrepSection }) {
  return (
    <div className="space-y-4">
      {data.items.map((item, i) => (
        <QuizItem key={`${item.question}-${i}`} item={item} index={i} />
      ))}
    </div>
  )
}

function CoursePrepView({ data }: { data: CoursePrepSection }) {
  return (
    <div className="space-y-4">
      {data.modules.map((m, i) => (
        <div key={`${m.title}-${i}`} className="card p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold">📚 {m.title}</p>
            {m.duration && <span className="chip">⏱️ {m.duration}</span>}
          </div>
          <ol className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
            {m.lessons.map((lesson, li) => (
              <li key={lesson} className="flex gap-2">
                <span className="text-slate-400">{li + 1}.</span>
                {lesson}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------ dispatcher ------------------------------ */

export function SectionView({
  sectionKey,
  sections,
}: {
  sectionKey: SectionKey
  sections: TopicSections
}) {
  switch (sectionKey) {
    case 'explanation':
      return sections.explanation ? <ExplanationView data={sections.explanation} /> : null
    case 'code':
      return sections.code ? <CodeView data={sections.code} /> : null
    case 'synonyms':
      return sections.synonyms ? <SynonymsView data={sections.synonyms} /> : null
    case 'applications':
      return sections.applications ? (
        <ApplicationsView data={sections.applications} />
      ) : null
    case 'materials':
      return sections.materials ? <MaterialsView data={sections.materials} /> : null
    case 'references':
      return sections.references ? <ReferencesView data={sections.references} /> : null
    case 'projects':
      return sections.projects ? <ProjectsView data={sections.projects} /> : null
    case 'interview-questions':
      return sections['interview-questions'] ? (
        <InterviewView data={sections['interview-questions']} />
      ) : null
    case 'scenario-questions':
      return sections['scenario-questions'] ? (
        <ScenarioView data={sections['scenario-questions']} />
      ) : null
    case 'case-studies':
      return sections['case-studies'] ? (
        <CaseStudiesView data={sections['case-studies']} />
      ) : null
    case 'exam-prep':
      return sections['exam-prep'] ? <ExamPrepView data={sections['exam-prep']} /> : null
    case 'course-prep':
      return sections['course-prep'] ? (
        <CoursePrepView data={sections['course-prep']} />
      ) : null
    default:
      return null
  }
}
