import { createContext, useContext } from 'react'

/**
 * Where the user's data currently lives / its sync state.
 * - `local`   — no account; stored only in this browser.
 * - `syncing` — a cloud write is in flight.
 * - `synced`  — cloud is up to date.
 * - `error`   — last cloud write failed (data is still safe locally).
 */
export type SyncStatus = 'local' | 'syncing' | 'synced' | 'error'

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
  /** Clears all completed topics (and syncs the empty state). */
  clearCompleted: () => void
  /** Clears all bookmarks (and syncs the empty state). */
  clearBookmarks: () => void
  syncStatus: SyncStatus
  /** Epoch ms of the last successful cloud sync, or null. */
  lastSyncedAt: number | null
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
