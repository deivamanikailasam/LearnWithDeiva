import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { search } from '../../lib/search'
import { paths } from '../../lib/paths'
import { SearchResultItem } from './SearchResultItem'

const LIMIT = 8

export function SearchPalette({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => search(query, { limit: LIMIT }), [query])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const go = (url: string) => {
    onClose()
    navigate(url)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    // total selectable rows = results + the "view all" row (when there's a query)
    const total = results.length + (query.trim() ? 1 : 0)
    if (total === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a + 1) % total)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a - 1 + total) % total)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (active < results.length) {
        go(results[active].url)
      } else {
        go(paths.search(query.trim()))
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
          <span className="text-slate-400">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onKeyDown}
            placeholder="Search subjects, topics, code, questions…"
            className="flex-1 bg-transparent py-4 text-base outline-none placeholder:text-slate-400"
          />
          <kbd className="hidden rounded border border-slate-300 px-1.5 text-xs text-slate-400 sm:inline dark:border-slate-600">
            Esc
          </kbd>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {!query.trim() && (
            <p className="p-6 text-center text-sm text-slate-400">
              Type to search across everything. Use ↑ ↓ to navigate, ↵ to open.
            </p>
          )}
          {query.trim() && results.length === 0 && (
            <p className="p-6 text-center text-sm text-slate-400">
              No results for “{query}”.
            </p>
          )}
          {results.map((doc, i) => (
            <div key={doc.id} className="mb-1" onMouseEnter={() => setActive(i)}>
              <SearchResultItem doc={doc} active={i === active} onClick={() => go(doc.url)} />
            </div>
          ))}
          {query.trim() && (
            <button
              type="button"
              onMouseEnter={() => setActive(results.length)}
              onClick={() => go(paths.search(query.trim()))}
              className={`mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                active === results.length
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                  : 'text-brand-600 hover:bg-slate-100 dark:text-brand-400 dark:hover:bg-slate-800'
              }`}
            >
              See all results for “{query.trim()}” →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
