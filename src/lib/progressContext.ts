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
  /**
   * Map of "subjectId::topicId" → completion timestamp (epoch ms). A timestamp
   * of `0` means the completion time is unknown (e.g. migrated legacy data).
   */
  completed: Map<string, number>
  /** Set of "subjectId::topicId" keys for bookmarked topics. */
  bookmarks: Set<string>
  isComplete: (subjectId: string, topicId: string) => boolean
  toggleComplete: (subjectId: string, topicId: string) => void
  /** Epoch ms when the topic was marked complete, or undefined if not/unknown. */
  completedAt: (subjectId: string, topicId: string) => number | undefined
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
