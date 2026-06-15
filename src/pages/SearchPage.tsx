import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'
import { Container } from '../components/Container'
import { SearchResultItem } from '../components/search/SearchResultItem'
import { searchContent } from '../lib/search'
import type { SearchDocType } from '../lib/search'
import { loadSubjectIndex } from '../content/data'
import { useAsync } from '../lib/useAsync'
import { paths } from '../lib/paths'

const typeFilters: { id: SearchDocType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'subject', label: 'Subjects' },
  { id: 'topic', label: 'Topics' },
  { id: 'section', label: 'Content' },
]

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const query = params.get('q') ?? ''

  const [type, setType] = useState<SearchDocType | 'all'>('all')
  const [subjectId, setSubjectId] = useState<string>('')

  const { data: subjects } = useAsync(() => loadSubjectIndex(), [])

  // The URL `q` param is the single source of truth (shareable / bookmarkable).
  const setQuery = (next: string) =>
    setParams(next ? { q: next } : {}, { replace: true })

  // All matches for the current query+subject; the type tabs filter this list
  // client-side and derive their badge counts from it.
  const { data: allResults = [], loading } = useAsync(
    () => searchContent(query, { subjectId: subjectId || undefined }),
    [query, subjectId],
  )

  const results =
    type === 'all' ? allResults : allResults.filter((r) => r.type === type)

  const counts = {
    all: allResults.length,
    subject: allResults.filter((r) => r.type === 'subject').length,
    topic: allResults.filter((r) => r.type === 'topic').length,
    section: allResults.filter((r) => r.type === 'section').length,
  }

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-extrabold">Search</h1>

      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-1 focus-within:border-brand-400 dark:border-slate-700 dark:bg-slate-900">
        <span className="text-slate-400">🔍</span>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search subjects, topics, code, questions…"
          className="flex-1 bg-transparent py-3 text-base outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
          {typeFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setType(f.id)}
              className={clsx(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                type === f.id
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
              )}
            >
              {f.label}
              {f.id !== 'all' && (
                <span className="ml-1 opacity-70">{counts[f.id]}</span>
              )}
            </button>
          ))}
        </div>

        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="">All subjects</option>
          {subjects?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="mt-6">
        {!query.trim() ? (
          <p className="py-10 text-center text-slate-400">
            Start typing to search across all subjects, topics and content.
          </p>
        ) : loading && results.length === 0 ? (
          <p className="py-10 text-center text-slate-400">Searching…</p>
        ) : results.length === 0 ? (
          <p className="py-10 text-center text-slate-400">
            No results found for “{query}”.
          </p>
        ) : (
          <>
            <p className="mb-3 text-sm text-slate-500">
              {results.length} result{results.length === 1 ? '' : 's'}
            </p>
            <div className="space-y-2">
              {results.map((doc) => (
                <SearchResultItem
                  key={doc.id}
                  doc={doc}
                  onClick={() => navigate(doc.url)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {!query.trim() && (
        <button
          type="button"
          onClick={() => navigate(paths.subjects())}
          className="btn-ghost mt-2"
        >
          Or browse all subjects →
        </button>
      )}
    </Container>
  )
}
