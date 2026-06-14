import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  ProgressContext,
  topicKey,
  type ProgressContextValue,
} from '../lib/progressContext'
import { flattenTopics, getSubject } from '../content/registry'

const COMPLETED_KEY = 'lwd-completed'
const BOOKMARKS_KEY = 'lwd-bookmarks'

function load(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as unknown
    return Array.isArray(arr) ? new Set(arr.filter((x) => typeof x === 'string')) : new Set()
  } catch {
    return new Set()
  }
}

function save(key: string, set: Set<string>) {
  try {
    localStorage.setItem(key, JSON.stringify([...set]))
  } catch {
    /* storage unavailable */
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(() => load(COMPLETED_KEY))
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => load(BOOKMARKS_KEY))

  useEffect(() => save(COMPLETED_KEY, completed), [completed])
  useEffect(() => save(BOOKMARKS_KEY, bookmarks), [bookmarks])

  const toggle = useCallback(
    (setter: typeof setCompleted, key: string) => {
      setter((prev) => {
        const next = new Set(prev)
        if (next.has(key)) next.delete(key)
        else next.add(key)
        return next
      })
    },
    [],
  )

  const value = useMemo<ProgressContextValue>(
    () => ({
      completed,
      bookmarks,
      isComplete: (s, t) => completed.has(topicKey(s, t)),
      toggleComplete: (s, t) => toggle(setCompleted, topicKey(s, t)),
      isBookmarked: (s, t) => bookmarks.has(topicKey(s, t)),
      toggleBookmark: (s, t) => toggle(setBookmarks, topicKey(s, t)),
      // Count only topics that currently exist, so the number stays in sync
      // with the content whenever topics/subtopics are added or removed
      // (and stale localStorage keys never inflate the total).
      completedInSubject: (s) => {
        const subject = getSubject(s)
        if (!subject) return 0
        return flattenTopics(subject).reduce(
          (n, t) => (completed.has(topicKey(s, t.id)) ? n + 1 : n),
          0,
        )
      },
    }),
    [completed, bookmarks, toggle],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
