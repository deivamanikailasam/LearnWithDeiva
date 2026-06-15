import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  ProgressContext,
  topicKey,
  type ProgressContextValue,
  type SyncStatus,
} from '../lib/progressContext'
import { PROGRESS_TABLE, isSupabaseConfigured, loadSupabase } from '../lib/supabase'
import { useAuth } from '../lib/authContext'

const COMPLETED_KEY = 'lwd-completed'
const BOOKMARKS_KEY = 'lwd-bookmarks'

/**
 * Compact on-the-wire format.
 *
 * In memory each item is a `"subjectId::topicId"` key. Persisting one such
 * string per item repeats the subject id on every entry, which adds up fast
 * when a user marks many subtopics/sub-subtopics. Instead we serialise one
 * entry *per subject*: `"subjectId:topicId1,topicId2,…"`. Subject and topic ids
 * only ever use `[a-z0-9-]`, so `:` and `,` are safe separators.
 *
 * Completed topics additionally carry the moment they were finished, appended
 * as `@<epoch-seconds-in-base36>` (e.g. `peft@s3k1f`). Seconds + base36 keep
 * each timestamp to ~6 chars instead of a 13-digit millisecond number.
 *
 * Legacy `"subjectId::topicId"` entries (with or without a timestamp) are still
 * decoded for backward compatibility.
 */
function encodeKeys(set: Set<string>): string[] {
  const bySubject = new Map<string, string[]>()
  for (const key of set) {
    const sep = key.indexOf('::')
    if (sep === -1) continue
    const subjectId = key.slice(0, sep)
    const topicId = key.slice(sep + 2)
    if (!subjectId || !topicId) continue
    const list = bySubject.get(subjectId)
    if (list) list.push(topicId)
    else bySubject.set(subjectId, [topicId])
  }
  return [...bySubject].map(([s, ids]) => `${s}:${ids.join(',')}`)
}

function decodeKeys(value: unknown): Set<string> {
  const set = new Set<string>()
  if (!Array.isArray(value)) return set
  for (const el of value) {
    if (typeof el !== 'string' || !el) continue
    if (el.includes('::')) {
      set.add(el) // legacy full key
      continue
    }
    const sep = el.indexOf(':')
    if (sep === -1) continue
    const subjectId = el.slice(0, sep)
    if (!subjectId) continue
    for (const id of el.slice(sep + 1).split(',')) {
      if (id) set.add(`${subjectId}::${id}`)
    }
  }
  return set
}

function encodeStamp(ms: number): string {
  return ms ? Math.floor(ms / 1000).toString(36) : ''
}

function decodeStamp(s: string): number {
  const secs = parseInt(s, 36)
  return Number.isFinite(secs) ? secs * 1000 : 0
}

/** Like `encodeKeys`, but each topic id keeps its completion timestamp. */
function encodeCompleted(map: Map<string, number>): string[] {
  const bySubject = new Map<string, string[]>()
  for (const [key, ts] of map) {
    const sep = key.indexOf('::')
    if (sep === -1) continue
    const subjectId = key.slice(0, sep)
    const topicId = key.slice(sep + 2)
    if (!subjectId || !topicId) continue
    const stamp = encodeStamp(ts)
    const entry = stamp ? `${topicId}@${stamp}` : topicId
    const list = bySubject.get(subjectId)
    if (list) list.push(entry)
    else bySubject.set(subjectId, [entry])
  }
  return [...bySubject].map(([s, ids]) => `${s}:${ids.join(',')}`)
}

function decodeCompleted(value: unknown): Map<string, number> {
  const map = new Map<string, number>()
  if (!Array.isArray(value)) return map
  for (const el of value) {
    if (typeof el !== 'string' || !el) continue
    if (el.includes('::')) {
      // legacy "subjectId::topicId" (no timestamp)
      const at = el.indexOf('@')
      if (at === -1) map.set(el, 0)
      else map.set(el.slice(0, at), decodeStamp(el.slice(at + 1)))
      continue
    }
    const sep = el.indexOf(':')
    if (sep === -1) continue
    const subjectId = el.slice(0, sep)
    if (!subjectId) continue
    for (const part of el.slice(sep + 1).split(',')) {
      if (!part) continue
      const at = part.indexOf('@')
      if (at === -1) map.set(`${subjectId}::${part}`, 0)
      else map.set(`${subjectId}::${part.slice(0, at)}`, decodeStamp(part.slice(at + 1)))
    }
  }
  return map
}

function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return new Set()
    return decodeKeys(JSON.parse(raw))
  } catch {
    return new Set()
  }
}

function loadCompleted(key: string): Map<string, number> {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return new Map()
    return decodeCompleted(JSON.parse(raw))
  } catch {
    return new Map()
  }
}

function saveSet(key: string, set: Set<string>) {
  try {
    localStorage.setItem(key, JSON.stringify(encodeKeys(set)))
  } catch {
    /* storage unavailable */
  }
}

function saveCompleted(key: string, map: Map<string, number>) {
  try {
    localStorage.setItem(key, JSON.stringify(encodeCompleted(map)))
  } catch {
    /* storage unavailable */
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [completed, setCompleted] = useState<Map<string, number>>(() =>
    loadCompleted(COMPLETED_KEY),
  )
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => loadSet(BOOKMARKS_KEY))
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('local')
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null)

  // Tracks the user id whose data is currently loaded, so we only merge once
  // per login and can detect logout transitions.
  const loadedUser = useRef<string | null>(null)

  // Always keep a local cache (offline + logged-out usage).
  useEffect(() => saveCompleted(COMPLETED_KEY, completed), [completed])
  useEffect(() => saveSet(BOOKMARKS_KEY, bookmarks), [bookmarks])

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
          setCompleted(new Map())
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
      const remoteCompleted = decodeCompleted(data?.completed)
      const remoteBookmarks = decodeKeys(data?.bookmarks)
      // Union remote with whatever the user did locally before/while logged
      // in, so nothing is lost when an account is first used on a device. For
      // completion timestamps, keep the earliest known (first time finished).
      setCompleted((prev) => {
        const merged = new Map(prev)
        for (const [key, ts] of remoteCompleted) {
          const existing = merged.get(key)
          if (existing === undefined || existing === 0) merged.set(key, ts)
          else if (ts && ts < existing) merged.set(key, ts)
        }
        return merged
      })
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
          completed: encodeCompleted(completed),
          bookmarks: encodeKeys(bookmarks),
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

  const toggleBookmarkKey = useCallback((key: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const toggleCompleteKey = useCallback((key: string) => {
    setCompleted((prev) => {
      const next = new Map(prev)
      if (next.has(key)) next.delete(key)
      else next.set(key, Date.now())
      return next
    })
  }, [])

  const clearCompleted = useCallback(() => setCompleted(new Map()), [])
  const clearBookmarks = useCallback(() => setBookmarks(new Set()), [])

  // Per-subject completed counts, derived in a single pass whenever the
  // completed set changes. Listing surfaces (e.g. the subjects grid) can render
  // a progress bar per card with an O(1) lookup instead of each card rescanning
  // every completed key.
  const completedCountsBySubject = useMemo(() => {
    const counts = new Map<string, number>()
    for (const key of completed.keys()) {
      const sep = key.indexOf('::')
      if (sep === -1) continue
      const subjectId = key.slice(0, sep)
      counts.set(subjectId, (counts.get(subjectId) ?? 0) + 1)
    }
    return counts
  }, [completed])

  const value = useMemo<ProgressContextValue>(
    () => ({
      completed,
      bookmarks,
      isComplete: (s, t) => completed.has(topicKey(s, t)),
      toggleComplete: (s, t) => toggleCompleteKey(topicKey(s, t)),
      completedAt: (s, t) => completed.get(topicKey(s, t)) || undefined,
      isBookmarked: (s, t) => bookmarks.has(topicKey(s, t)),
      toggleBookmark: (s, t) => toggleBookmarkKey(topicKey(s, t)),
      // Completed topic count per subject, via the precomputed map (O(1)).
      // Kept content-free so this app-wide provider never has to load any topic
      // data; ProgressBar clamps to 100% so a rare stale localStorage key can't
      // overflow the bar.
      completedInSubject: (s) => completedCountsBySubject.get(s) ?? 0,
      clearCompleted,
      clearBookmarks,
      syncStatus,
      lastSyncedAt,
    }),
    [
      completed,
      bookmarks,
      completedCountsBySubject,
      toggleCompleteKey,
      toggleBookmarkKey,
      clearCompleted,
      clearBookmarks,
      syncStatus,
      lastSyncedAt,
    ],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
