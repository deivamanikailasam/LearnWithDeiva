import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { SearchPaletteContext } from './searchPaletteContext'

const SearchPalette = lazy(() =>
  import('./SearchPalette').then((m) => ({ default: m.SearchPalette })),
)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  // Global Ctrl/Cmd+K shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen])

  return (
    <SearchPaletteContext.Provider value={value}>
      {children}
      {isOpen && (
        <Suspense fallback={null}>
          <SearchPalette onClose={close} />
        </Suspense>
      )}
    </SearchPaletteContext.Provider>
  )
}
