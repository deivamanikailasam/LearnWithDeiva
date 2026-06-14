import { createContext, useContext } from 'react'

export interface SearchPaletteContextValue {
  open: () => void
  close: () => void
  isOpen: boolean
}

export const SearchPaletteContext =
  createContext<SearchPaletteContextValue | null>(null)

export function useSearchPalette(): SearchPaletteContextValue {
  const ctx = useContext(SearchPaletteContext)
  if (!ctx) throw new Error('useSearchPalette must be used within SearchProvider')
  return ctx
}
