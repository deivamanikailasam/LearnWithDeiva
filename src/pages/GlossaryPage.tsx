import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'
import { Container } from '../components/Container'
import { loadGlossary, searchGlossary } from '../lib/glossary'
import type { GlossaryEntry } from '../lib/glossary'
import { useAsync } from '../lib/useAsync'
import { paths } from '../lib/paths'

const ALPHABET = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

/** First-letter bucket for an entry: A–Z, or '#' for anything non-alphabetic. */
function bucketOf(term: string): string {
  const c = term.trim().charAt(0).toUpperCase()
  return c >= 'A' && c <= 'Z' ? c : '#'
}

function letterId(letter: string): string {
  return `glossary-letter-${letter === '#' ? 'symbol' : letter}`
}

export function GlossaryPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const subjectId = params.get('subject') ?? ''

  // The full list powers the subject filter, stats and the A–Z index; the
  // (debounce-free) Fuse search drives the visible results.
  const { data: all = [] } = useAsync(() => loadGlossary(), [])
  const { data: matched, loading } = useAsync(
    () => searchGlossary(query),
    [query],
  )

  const setQuery = (next: string) => {
    const p = new URLSearchParams(params)
    if (next) p.set('q', next)
    else p.delete('q')
    setParams(p, { replace: true })
  }
  const setSubject = (next: string) => {
    const p = new URLSearchParams(params)
    if (next) p.set('subject', next)
    else p.delete('subject')
    setParams(p, { replace: true })
  }

  // Distinct subjects present in the glossary, for the filter dropdown.
  const subjects = useMemo(() => {
    const m = new Map<string, { id: string; title: string; icon: string }>()
    for (const e of all) {
      if (!m.has(e.subjectId)) {
        m.set(e.subjectId, {
          id: e.subjectId,
          title: e.subjectTitle,
          icon: e.subjectIcon,
        })
      }
    }
    return [...m.values()].sort((a, b) => a.title.localeCompare(b.title))
  }, [all])

  // Apply the search + subject filter, then re-sort alphabetically so the A–Z
  // grouping stays stable regardless of Fuse's relevance order.
  const filtered = useMemo(() => {
    const base = query.trim() ? (matched ?? []) : all
    const scoped = subjectId
      ? base.filter((e) => e.subjectId === subjectId)
      : base
    return [...scoped].sort((a, b) =>
      a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }),
    )
  }, [all, matched, query, subjectId])

  // Group into A–Z (and '#') buckets and track which letters have entries so
  // the jump bar can disable empty ones.
  const { groups, available } = useMemo(() => {
    const map = new Map<string, GlossaryEntry[]>()
    for (const e of filtered) {
      const b = bucketOf(e.term)
      const list = map.get(b)
      if (list) list.push(e)
      else map.set(b, [e])
    }
    const ordered = ALPHABET.filter((l) => map.has(l)).map((l) => ({
      letter: l,
      items: map.get(l)!,
    }))
    return { groups: ordered, available: new Set(map.keys()) }
  }, [filtered])

  const jumpTo = (letter: string) => {
    document
      .getElementById(letterId(letter))
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const searching = query.trim().length > 0
  const isEmpty = all.length === 0

  return (
    <Container className="py-6 sm:py-8">
      {/* Heading + stats */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Glossary
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Every term and definition across all subjects, in one place.
          </p>
        </div>
        {!isEmpty && (
          <div className="flex gap-2.5 sm:gap-3">
            <Stat value={all.length} label="Terms" />
            <Stat value={subjects.length} label="Subjects" />
          </div>
        )}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-1 focus-within:border-brand-400 sm:px-4 dark:border-slate-700 dark:bg-slate-900">
        <span className="text-slate-400" aria-hidden>
          🔍
        </span>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms and definitions…"
          className="flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400 sm:py-3 sm:text-base"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="grid h-7 w-7 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filters + result count */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={subjectId}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none sm:w-auto dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="">All subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.icon ? `${s.icon} ` : ''}
              {s.title}
            </option>
          ))}
        </select>
        {!isEmpty && (
          <p className="text-sm text-slate-500">
            {filtered.length} term{filtered.length === 1 ? '' : 's'}
            {searching && ` for “${query}”`}
          </p>
        )}
      </div>

      {/* A–Z jump bar (browse mode only — relevance order makes it meaningless
          while searching) */}
      {!searching && !isEmpty && (
        <div className="sticky top-14 z-10 mt-4 -mx-3 flex flex-wrap gap-0.5 border-y border-slate-200 bg-slate-50/90 px-3 py-1.5 backdrop-blur sm:top-16 dark:border-slate-800 dark:bg-slate-950/90">
          {ALPHABET.map((l) => {
            const has = available.has(l)
            return (
              <button
                key={l}
                type="button"
                disabled={!has}
                onClick={() => jumpTo(l)}
                className={clsx(
                  'h-6 w-6 rounded text-xs font-semibold transition sm:h-7 sm:w-7',
                  has
                    ? 'text-slate-600 hover:bg-brand-500 hover:text-white dark:text-slate-300'
                    : 'cursor-default text-slate-300 dark:text-slate-700',
                )}
              >
                {l}
              </button>
            )
          })}
        </div>
      )}

      {/* Results */}
      <div className="mt-5">
        {isEmpty ? (
          loading ? (
            <p className="py-16 text-center text-slate-400">Loading glossary…</p>
          ) : (
            <EmptyState />
          )
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-slate-400">
            No terms match your search.
          </p>
        ) : (
          <div className="space-y-8">
            {groups.map((g) => (
              <section key={g.letter} id={letterId(g.letter)} className="scroll-mt-28">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-sm font-extrabold text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                    {g.letter}
                  </span>
                  <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                  <span className="text-xs font-medium text-slate-400">
                    {g.items.length}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {g.items.map((e) => (
                    <TermCard key={e.id} entry={e} query={query} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

/* --------------------------------- pieces -------------------------------- */

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="text-xl font-extrabold leading-none text-brand-600 dark:text-brand-400">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium text-slate-500">{label}</div>
    </div>
  )
}

function TermCard({ entry, query }: { entry: GlossaryEntry; query: string }) {
  return (
    <div className="card flex flex-col p-4">
      <p className="font-semibold text-brand-700 dark:text-brand-300">
        <Highlight text={entry.term} query={query} />
      </p>
      <p className="mt-1 flex-1 text-sm text-slate-600 dark:text-slate-400">
        <Highlight text={entry.definition} query={query} />
      </p>
      <Link
        to={entry.url}
        className="mt-3 inline-flex max-w-full items-center gap-1.5 self-start rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-brand-300"
      >
        <span aria-hidden>{entry.subjectIcon || '📚'}</span>
        <span className="truncate">{entry.subjectTitle}</span>
        {entry.topicTitle && (
          <>
            <span className="text-slate-300 dark:text-slate-600">›</span>
            <span className="truncate">{entry.topicTitle}</span>
          </>
        )}
      </Link>
    </div>
  )
}

/** Wrap case-insensitive substring matches of `query` in a subtle highlight. */
function Highlight({ text, query }: { text: string; query: string }): ReactNode {
  const q = query.trim()
  if (!q) return text
  const lower = text.toLowerCase()
  const needle = q.toLowerCase()
  const parts: ReactNode[] = []
  let i = 0
  let key = 0
  while (i < text.length) {
    const at = lower.indexOf(needle, i)
    if (at === -1) {
      parts.push(text.slice(i))
      break
    }
    if (at > i) parts.push(text.slice(i, at))
    parts.push(
      <mark
        key={key++}
        className="rounded bg-brand-100 px-0.5 text-brand-800 dark:bg-brand-500/30 dark:text-brand-100"
      >
        {text.slice(at, at + needle.length)}
      </mark>,
    )
    i = at + needle.length
  }
  return <>{parts}</>
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="text-4xl">🔤</div>
      <p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">
        The glossary is empty for now
      </p>
      <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
        Terms appear here automatically as subjects and topics add their
        “Synonyms &amp; Glossary” definitions.
      </p>
      <Link to={paths.subjects()} className="btn-ghost mt-4">
        Browse subjects →
      </Link>
    </div>
  )
}
