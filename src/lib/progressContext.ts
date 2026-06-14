import { createContext, useContext } from 'react'

export interface ProgressContextValue {
  /** Set of "subjectId::topicId" keys for completed topics. */
  completed: Set<string>
  /** Set of "subjectId::topicId" keys for bookmarked topics. */
  bookmarks: Set<string>
  isComplete: (subjectId: string, topicId: string) => boolean
  toggleComplete: (subjectId: string, topicId: string) => void
  isBookmarked: (subjectId: string, topicId: string) => boolean
  toggleBookmark: (subjectId: string, topicId: string) => void
  completedInSubject: (subjectId: string) => number
}

export function topicKey(subjectId: string, topicId: string): string {
  return `${subjectId}::${topicId}`
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
