import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  ProgressContext,
  topicKey,
  type ProgressContextValue,
  type SyncStatus,
} from '../lib/progressContext'
import { flattenTopics, getSubject } from '../content/registry'
import { PROGRESS_TABLE, isSupabaseConfigured, loadSupabase } from '../lib/supabase'
import { useAuth } from '../lib/authContext'

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
  const { user } = useAuth()
  const [completed, setCompleted] = useState<Set<string>>(() => load(COMPLETED_KEY))
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => load(BOOKMARKS_KEY))
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('local')
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null)

  // Tracks the user id whose data is currently loaded, so we only merge once
  // per login and can detect logout transitions.
  const loadedUser = useRef<string | null>(null)

  // Always keep a local cache (offline + logged-out usage).
  useEffect(() => save(COMPLETED_KEY, completed), [completed])
  useEffect(() => save(BOOKMARKS_KEY, bookmarks), [bookmarks])

  // React to auth changes: load + merge on login, clear on logout.
  useEffect(() => {
    const uid = user?.id ?? null
    if (!isSupabaseConfigured) return

    if (!uid) {
      // Logged out: clear so another account on this browser can't inherit
      // the previous user's data. Deferred to avoid a synchronous effect set.
      if (loadedUser.current !== null) {
        loadedUser.current = null
        queueMicrotask(() => {
          setCompleted(new Set())
          setBookmarks(new Set())
          setSyncStatus('local')
          setLastSyncedAt(null)
        })
      }
      return
    }

    if (loadedUser.current === uid) return
    loadedUser.current = uid

    let cancelled = false
    void loadSupabase()?.then(async (sb) => {
      const { data } = await sb
        .from(PROGRESS_TABLE)
        .select('completed,bookmarks')
        .eq('user_id', uid)
        .maybeSingle()
      if (cancelled) return
      const remoteCompleted: string[] = data?.completed ?? []
      const remoteBookmarks: string[] = data?.bookmarks ?? []
      // Union remote with whatever the user did locally before/while logged
      // in, so nothing is lost when an account is first used on a device.
      setCompleted((prev) => new Set([...prev, ...remoteCompleted]))
      setBookmarks((prev) => new Set([...prev, ...remoteBookmarks]))
      setSyncStatus('synced')
      setLastSyncedAt(Date.now())
    })
    return () => {
      cancelled = true
    }
  }, [user?.id])

  // Push to the cloud (debounced) whenever logged-in data changes.
  useEffect(() => {
    const uid = user?.id ?? null
    if (!isSupabaseConfigured || !uid || loadedUser.current !== uid) return
    const handle = setTimeout(() => {
      setSyncStatus('syncing')
      void loadSupabase()?.then(async (sb) => {
        const { error } = await sb.from(PROGRESS_TABLE).upsert({
          user_id: uid,
          completed: [...completed],
          bookmarks: [...bookmarks],
          updated_at: new Date().toISOString(),
        })
        if (error) {
          console.warn('Progress sync failed:', error.message)
          setSyncStatus('error')
        } else {
          setSyncStatus('synced')
          setLastSyncedAt(Date.now())
        }
      })
    }, 600)
    return () => clearTimeout(handle)
  }, [completed, bookmarks, user?.id])

  const toggle = useCallback((setter: typeof setCompleted, key: string) => {
    setter((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const clearCompleted = useCallback(() => setCompleted(new Set()), [])
  const clearBookmarks = useCallback(() => setBookmarks(new Set()), [])

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
      clearCompleted,
      clearBookmarks,
      syncStatus,
      lastSyncedAt,
    }),
    [completed, bookmarks, toggle, clearCompleted, clearBookmarks, syncStatus, lastSyncedAt],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
