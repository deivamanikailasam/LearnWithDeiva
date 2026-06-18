import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  EditModeContext,
  type DirtyEditorRegistration,
  type EditModeContextValue,
} from '../lib/editModeContext'
import { UnsavedChangesBanner } from './UnsavedChangesBanner'

const STORAGE_KEY = 'lwd-edit-mode'

function readStoredEditMode(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

type DirtyEntry = DirtyEditorRegistration & { id: string }

export function EditModeProvider({ children }: { children: ReactNode }) {
  const canUseEditMode = import.meta.env.DEV
  const [editMode, setEditModeState] = useState(
    () => canUseEditMode && readStoredEditMode(),
  )
  const [dirtySnapshot, setDirtySnapshot] = useState<string[]>([])
  const dirtyEntriesRef = useRef(new Map<string, DirtyEntry>())
  const leaveCallbacksRef = useRef(new Set<() => void>())
  const savingRef = useRef(false)

  const syncDirtySnapshot = useCallback(() => {
    setDirtySnapshot([...dirtyEntriesRef.current.keys()])
  }, [])

  useEffect(() => {
    if (!canUseEditMode) return
    localStorage.setItem(STORAGE_KEY, String(editMode))
  }, [editMode, canUseEditMode])

  const registerDirty = useCallback(
    (id: string, options?: DirtyEditorRegistration) => {
      dirtyEntriesRef.current.set(id, {
        id,
        label: options?.label ?? 'Unsaved changes',
        save: options?.save,
      })
      syncDirtySnapshot()
      return () => {
        dirtyEntriesRef.current.delete(id)
        syncDirtySnapshot()
      }
    },
    [syncDirtySnapshot],
  )

  const registerOnLeaveEditMode = useCallback((fn: () => void) => {
    leaveCallbacksRef.current.add(fn)
    return () => {
      leaveCallbacksRef.current.delete(fn)
    }
  }, [])

  const saveAllDirty = useCallback(async () => {
    if (savingRef.current || dirtyEntriesRef.current.size === 0) return
    savingRef.current = true
    try {
      const entries = [...dirtyEntriesRef.current.values()]
      await Promise.all(
        entries.map(async (entry) => {
          if (!entry.save) return
          await entry.save()
        }),
      )
    } finally {
      savingRef.current = false
    }
  }, [])

  const setEditMode = useCallback(
    (next: boolean) => {
      if (!canUseEditMode) return
      if (!next && dirtyEntriesRef.current.size > 0) {
        const ok = window.confirm(
          'You have unsaved changes. Discard them and leave edit mode?',
        )
        if (!ok) return
      }
      if (!next) {
        for (const fn of leaveCallbacksRef.current) fn()
      }
      setEditModeState(next)
    },
    [canUseEditMode],
  )

  const toggleEditMode = useCallback(() => {
    setEditMode(!editMode)
  }, [editMode, setEditMode])

  const dirtyLabels = useMemo(
    () =>
      dirtySnapshot
        .map((id) => dirtyEntriesRef.current.get(id)?.label)
        .filter((label): label is string => Boolean(label)),
    [dirtySnapshot],
  )

  useEffect(() => {
    if (!canUseEditMode || !editMode) return
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        void saveAllDirty()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [canUseEditMode, editMode, saveAllDirty])

  useEffect(() => {
    if (!canUseEditMode || dirtySnapshot.length === 0) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [canUseEditMode, dirtySnapshot.length])

  const value = useMemo<EditModeContextValue>(
    () => ({
      editMode: canUseEditMode && editMode,
      canUseEditMode,
      setEditMode,
      toggleEditMode,
      hasUnsavedChanges: dirtySnapshot.length > 0,
      dirtyLabels,
      saveAllDirty,
      registerDirty,
      registerOnLeaveEditMode,
    }),
    [
      canUseEditMode,
      editMode,
      setEditMode,
      toggleEditMode,
      dirtySnapshot.length,
      dirtyLabels,
      saveAllDirty,
      registerDirty,
      registerOnLeaveEditMode,
    ],
  )

  return (
    <EditModeContext.Provider value={value}>
      {children}
      <UnsavedChangesBanner />
    </EditModeContext.Provider>
  )
}
