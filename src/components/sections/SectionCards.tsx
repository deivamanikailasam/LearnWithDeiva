import clsx from 'clsx'
import type {
  CaseStudyItem,
  CheatSheetGroup,
  Difficulty,
  PitfallItem,
  ProjectItem,
  QAItem,
  ResourceItem,
  ScenarioItem,
  SynonymItem,
} from '../../types/content'
import { Markdown } from '../Markdown'
import { LazyCodeBlock } from '../LazyCodeBlock'
import { Collapsible } from './Collapsible'

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

export function GlossaryTerm({ item }: { item: SynonymItem }) {
  return (
    <div className="card p-4">
      <p className="font-semibold text-brand-700 dark:text-brand-300">{item.term}</p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.definition}</p>
    </div>
  )
}

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
                <LazyCodeBlock code={e.code} language={e.language ?? 'text'} />
              </div>
            )}
            {e.note && <p className="mt-1 text-xs text-slate-500">{e.note}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
