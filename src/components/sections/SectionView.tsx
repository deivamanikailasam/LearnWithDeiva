import { Suspense, lazy } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import type {
  ApplicationsSection,
  BestPracticesSection,
  CaseStudiesSection,
  CaseStudyItem,
  ChartsSection,
  CheatSheetGroup,
  CodeSection,
  ConnectionsSection,
  CoursePrepSection,
  DiagramsSection,
  Difficulty,
  ExamPrepSection,
  ExplanationSection,
  ImagesSection,
  InterviewQuestionsSection,
  MasterySection,
  MaterialsSection,
  MistakesSection,
  MisconceptionsSection,
  ExamplesSection,
  OriginsSection,
  PitfallItem,
  ProjectItem,
  ProjectsSection,
  QAItem,
  QuestionPattern,
  QuestionPatternsSection,
  ReferencesSection,
  ResourceItem,
  ScenarioItem,
  ScenarioQuestionsSection,
  SectionKey,
  SynonymItem,
  SynonymsSection,
  TopicSections,
  TradeoffsSection,
} from '../../types/content'
import { paths } from '../../lib/paths'
import { Markdown } from '../Markdown'
import { CodeBlock } from '../CodeBlock'
import { Collapsible } from './Collapsible'
import { QuizItem } from './QuizItem'

// Heavy rendering libs are split out and only fetched when a topic actually
// has a diagram or chart section to show.
const Mermaid = lazy(() => import('../Mermaid'))
const Chart = lazy(() => import('../Chart'))

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
  reference: '🔗',
}

/* --------------------------- individual views --------------------------- */

function ExplanationView({ data }: { data: ExplanationSection }) {
  return (
    <div>
      {data.definition && (
        <div className="mb-5 rounded-xl border-l-4 border-brand-400 bg-brand-50 p-4 dark:bg-brand-500/10">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
            Definition
          </p>
          <Markdown>{data.definition}</Markdown>
        </div>
      )}
      {data.layman && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-300">
            🧒 In plain terms
          </p>
          <Markdown>{data.layman}</Markdown>
        </div>
      )}
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

export function GlossaryTerm({ item }: { item: SynonymItem }) {
  return (
    <div className="card p-4">
      <p className="font-semibold text-brand-700 dark:text-brand-300">{item.term}</p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.definition}</p>
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

/* ----- item-level renderers (also reused by the subject-level lists) ----- */

export function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">🛠️ {item.title}</p>
        <DifficultyBadge level={item.difficulty} />
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {item.description}
      </p>
      {item.requirements?.length ? (
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-500">
          {item.requirements.map((req) => (
            <li key={req}>{req}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function InterviewQA({ item }: { item: QAItem }) {
  return (
    <Collapsible title={item.question} badge={<DifficultyBadge level={item.difficulty} />}>
      <Markdown>{item.answer}</Markdown>
      {item.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span key={t} className="chip">
              #{t}
            </span>
          ))}
        </div>
      ) : null}
    </Collapsible>
  )
}

export function ScenarioCard({ item }: { item: ScenarioItem }) {
  return (
    <div className="card p-5">
      <div className="rounded-lg border-l-4 border-brand-400 bg-brand-50 p-3 text-sm text-slate-700 dark:bg-brand-500/10 dark:text-slate-300">
        <span className="font-semibold">Scenario: </span>
        {item.scenario}
      </div>
      <p className="mt-3 font-semibold">🧩 {item.question}</p>
      <Collapsible title="Reveal answer">
        <Markdown>{item.answer}</Markdown>
      </Collapsible>
    </div>
  )
}

const caseStudyRows: { label: string; key: keyof CaseStudyItem }[] = [
  { label: 'Context', key: 'context' },
  { label: 'Problem', key: 'problem' },
  { label: 'Solution', key: 'solution' },
  { label: 'Outcome', key: 'outcome' },
]

export function CaseStudyCard({ item }: { item: CaseStudyItem }) {
  return (
    <div className="card p-5">
      <p className="text-lg font-bold">📊 {item.title}</p>
      <dl className="mt-3 space-y-3">
        {caseStudyRows.map((r) => (
          <div key={r.key}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {r.label}
            </dt>
            <dd className="text-sm text-slate-600 dark:text-slate-400">{item[r.key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function ResourceCard({ item }: { item: ResourceItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="card flex items-start gap-3 p-4"
    >
      <span className="text-xl">{materialIcons[item.type] ?? '🔗'}</span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold hover:text-brand-600 dark:hover:text-brand-400">
            {item.title}
          </span>
          <span className="chip capitalize">{item.type}</span>
        </span>
        {item.author && (
          <span className="mt-0.5 block text-xs text-slate-400">{item.author}</span>
        )}
        {item.description && (
          <span className="mt-1 block text-sm text-slate-500">{item.description}</span>
        )}
      </span>
    </a>
  )
}

export function PitfallCard({ item }: { item: PitfallItem }) {
  return (
    <div className="card p-5">
      <p className="font-semibold">⚠️ {item.title}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 dark:border-rose-500/30 dark:bg-rose-500/10">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-300">
            ✗ Avoid
          </p>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{item.avoid}</p>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-500/30 dark:bg-emerald-500/10">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
            ✓ Prefer
          </p>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{item.prefer}</p>
        </div>
      </div>
      {item.example && (
        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Example
          </p>
          <Markdown>{item.example}</Markdown>
        </div>
      )}
      {item.why && <p className="mt-3 text-sm text-slate-500">{item.why}</p>}
    </div>
  )
}

export function CheatSheetGroupCard({ group }: { group: CheatSheetGroup }) {
  return (
    <div className="card p-5">
      <p className="font-semibold">📋 {group.title}</p>
      <div className="mt-3 space-y-3">
        {group.entries.map((e, i) => (
          <div key={`${e.label}-${i}`}>
            <p className="text-sm font-medium">{e.label}</p>
            {e.code && (
              <div className="mt-1">
                <CodeBlock code={e.code} language={e.language ?? 'text'} />
              </div>
            )}
            {e.note && <p className="mt-1 text-xs text-slate-500">{e.note}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsView({ data }: { data: ProjectsSection }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.items.map((p) => (
        <ProjectCard key={p.title} item={p} />
      ))}
    </div>
  )
}

function InterviewView({ data }: { data: InterviewQuestionsSection }) {
  return (
    <div className="space-y-3">
      {data.items.map((q, i) => (
        <InterviewQA key={`${q.question}-${i}`} item={q} />
      ))}
    </div>
  )
}

function ScenarioView({ data }: { data: ScenarioQuestionsSection }) {
  return (
    <div className="space-y-3">
      {data.items.map((s, i) => (
        <ScenarioCard key={`${s.question}-${i}`} item={s} />
      ))}
    </div>
  )
}

function CaseStudiesView({ data }: { data: CaseStudiesSection }) {
  return (
    <div className="space-y-5">
      {data.items.map((c) => (
        <CaseStudyCard key={c.title} item={c} />
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

function ExamplesView({ data }: { data: ExamplesSection }) {
  return (
    <div className="space-y-4">
      {data.items.map((e, i) => (
        <div key={`${e.title}-${i}`} className="card p-5">
          <p className="font-semibold">🌍 {e.title}</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{e.scenario}</p>
          {e.explanation && (
            <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
              {e.explanation}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

/**
 * Resolve an image src. Absolute URLs (http/https/data) are used as-is; any
 * other (repo-relative) path is resolved against the app base so it works in
 * both dev (`/`) and the GitHub Pages build (`/LearnWithDeiva/`).
 */
function resolveAssetSrc(src: string): string {
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src
  return import.meta.env.BASE_URL + src.replace(/^\//, '')
}

function ImagesView({ data }: { data: ImagesSection }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {data.items.map((img, i) => (
        <figure key={`${img.src}-${i}`} className="card overflow-hidden">
          <img
            src={resolveAssetSrc(img.src)}
            alt={img.alt}
            loading="lazy"
            className="w-full object-cover"
          />
          {img.caption && (
            <figcaption className="px-4 py-3 text-sm text-slate-500">{img.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

function ConnectionsView({
  data,
  subjectId,
}: {
  data: ConnectionsSection
  subjectId?: string
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {data.items.map((c, i) => {
        const body = (
          <>
            <div className="flex items-center gap-2">
              <span className="font-semibold">🕸️ {c.title}</span>
              {c.relation && <span className="chip capitalize">{c.relation}</span>}
            </div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{c.description}</p>
          </>
        )
        return c.topicId && subjectId ? (
          <Link key={`${c.title}-${i}`} to={paths.topic(subjectId, c.topicId)} className="card p-4">
            {body}
          </Link>
        ) : (
          <div key={`${c.title}-${i}`} className="card p-4">
            {body}
          </div>
        )
      })}
    </div>
  )
}

function TradeoffsView({ data }: { data: TradeoffsSection }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/30 dark:bg-emerald-500/10">
        <p className="mb-2 font-semibold text-emerald-700 dark:text-emerald-300">✓ Advantages</p>
        <ul className="list-inside list-disc space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
          {data.advantages.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/30 dark:bg-rose-500/10">
        <p className="mb-2 font-semibold text-rose-700 dark:text-rose-300">✗ Disadvantages</p>
        <ul className="list-inside list-disc space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
          {data.disadvantages.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MistakesView({ data }: { data: MistakesSection }) {
  return (
    <div className="space-y-3">
      {data.items.map((m, i) => (
        <div key={`${m.mistake}-${i}`} className="card p-5">
          <p className="font-semibold text-rose-700 dark:text-rose-300">🚫 {m.mistake}</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">Fix: </span>
            {m.fix}
          </p>
          {m.example && (
            <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Example
              </p>
              <Markdown>{m.example}</Markdown>
            </div>
          )}
          {m.why && <p className="mt-2 text-sm text-slate-500">{m.why}</p>}
        </div>
      ))}
    </div>
  )
}

function MisconceptionsView({ data }: { data: MisconceptionsSection }) {
  return (
    <div className="space-y-3">
      {data.items.map((m, i) => (
        <div key={`${m.myth}-${i}`} className="card p-5">
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 dark:border-rose-500/30 dark:bg-rose-500/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-300">
              🤔 Myth
            </p>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{m.myth}</p>
          </div>
          <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-500/30 dark:bg-emerald-500/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
              ✓ Reality
            </p>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{m.reality}</p>
          </div>
          {m.example && (
            <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Example
              </p>
              <Markdown>{m.example}</Markdown>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function BestPracticesView({ data }: { data: BestPracticesSection }) {
  return (
    <div className="space-y-5">
      {data.items.map((p, i) => (
        <PitfallCard key={`${p.title}-${i}`} item={p} />
      ))}
    </div>
  )
}

function OriginsView({ data }: { data: OriginsSection }) {
  return (
    <div>
      <Markdown>{data.content}</Markdown>
      {data.timeline?.length ? (
        <ol className="mt-5 space-y-3 border-l-2 border-brand-200 pl-5 dark:border-brand-500/30">
          {data.timeline.map((t, i) => (
            <li key={`${t.label}-${i}`} className="relative">
              <span className="absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full bg-brand-400" />
              <p className="font-semibold">{t.label}</p>
              <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">{t.description}</p>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  )
}

const questionPatternLabels: Record<QuestionPattern, string> = {
  '5w1h': '5W1H',
  socratic: 'Socratic',
  mindmap: 'Mindmap',
  comparative: 'Comparative',
  'what-if': 'What-if',
  'cause-effect': 'Cause-effect',
  'what-breaks-this': 'What Breaks This',
}

function QuestionPatternsView({ data }: { data: QuestionPatternsSection }) {
  return (
    <div className="space-y-6">
      {data.groups.map((g, gi) => (
        <div key={`${g.pattern}-${gi}`}>
          <p className="mb-2 flex items-center gap-2 font-semibold">
            <span className="chip">{questionPatternLabels[g.pattern] ?? g.pattern}</span>
          </p>
          <div className="space-y-2">
            {g.items.map((qa, qi) => (
              <Collapsible key={`${qa.question}-${qi}`} title={qa.question}>
                <Markdown>{qa.answer}</Markdown>
              </Collapsible>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function MasteryView({ data }: { data: MasterySection }) {
  return (
    <ul className="space-y-2">
      {data.criteria.map((c, i) => (
        <li key={`${c.label}-${i}`} className="card flex items-start gap-3 p-4">
          <span className="mt-0.5 text-emerald-500">🏆</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2">
              <span className="text-sm text-slate-700 dark:text-slate-300">{c.label}</span>
              {c.level && <DifficultyBadge level={c.level} />}
            </div>
            {c.example && (
              <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Example
                </p>
                <Markdown>{c.example}</Markdown>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

const lazyFallback = (
  <div className="flex h-40 items-center justify-center">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
  </div>
)

function DiagramsView({ data }: { data: DiagramsSection }) {
  return (
    <div className="space-y-5">
      {data.items.map((d, i) => (
        <figure key={`${d.title ?? 'diagram'}-${i}`} className="card p-5">
          {d.title && <figcaption className="mb-3 font-semibold">🗺️ {d.title}</figcaption>}
          <Suspense fallback={lazyFallback}>
            <Mermaid chart={d.mermaid} />
          </Suspense>
          {d.caption && <p className="mt-3 text-sm text-slate-500">{d.caption}</p>}
        </figure>
      ))}
    </div>
  )
}

function ChartsView({ data }: { data: ChartsSection }) {
  return (
    <div className="space-y-5">
      {data.items.map((c, i) => (
        <figure key={`${c.title ?? 'chart'}-${i}`} className="card p-5">
          {c.title && <figcaption className="mb-3 font-semibold">📈 {c.title}</figcaption>}
          <Suspense fallback={lazyFallback}>
            <Chart item={c} />
          </Suspense>
          {c.caption && <p className="mt-3 text-sm text-slate-500">{c.caption}</p>}
        </figure>
      ))}
    </div>
  )
}

/* ------------------------------ dispatcher ------------------------------ */

export function SectionView({
  sectionKey,
  sections,
  subjectId,
}: {
  sectionKey: SectionKey
  sections: TopicSections
  subjectId?: string
}) {
  switch (sectionKey) {
    case 'explanation':
      return sections.explanation ? <ExplanationView data={sections.explanation} /> : null
    case 'examples':
      return sections.examples ? <ExamplesView data={sections.examples} /> : null
    case 'diagrams':
      return sections.diagrams ? <DiagramsView data={sections.diagrams} /> : null
    case 'charts':
      return sections.charts ? <ChartsView data={sections.charts} /> : null
    case 'images':
      return sections.images ? <ImagesView data={sections.images} /> : null
    case 'code':
      return sections.code ? <CodeView data={sections.code} /> : null
    case 'synonyms':
      return sections.synonyms ? <SynonymsView data={sections.synonyms} /> : null
    case 'connections':
      return sections.connections ? (
        <ConnectionsView data={sections.connections} subjectId={subjectId} />
      ) : null
    case 'applications':
      return sections.applications ? (
        <ApplicationsView data={sections.applications} />
      ) : null
    case 'tradeoffs':
      return sections.tradeoffs ? <TradeoffsView data={sections.tradeoffs} /> : null
    case 'mistakes':
      return sections.mistakes ? <MistakesView data={sections.mistakes} /> : null
    case 'misconceptions':
      return sections.misconceptions ? (
        <MisconceptionsView data={sections.misconceptions} />
      ) : null
    case 'best-practices':
      return sections['best-practices'] ? (
        <BestPracticesView data={sections['best-practices']} />
      ) : null
    case 'origins':
      return sections.origins ? <OriginsView data={sections.origins} /> : null
    case 'question-patterns':
      return sections['question-patterns'] ? (
        <QuestionPatternsView data={sections['question-patterns']} />
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
    case 'mastery':
      return sections.mastery ? <MasteryView data={sections.mastery} /> : null
    default:
      return null
  }
}
