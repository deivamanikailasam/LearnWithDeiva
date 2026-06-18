import { createContext, useContext } from 'react'

export interface DirtyEditorRegistration {
  label?: string
  save?: () => Promise<void>
}

export interface EditModeContextValue {
  /** Whether the user has turned on edit mode (dev only). */
  editMode: boolean
  /** True when in-browser editing is available (currently dev builds only). */
  canUseEditMode: boolean
  setEditMode: (next: boolean) => void
  toggleEditMode: () => void
  /** True when at least one editor has unsaved changes. */
  hasUnsavedChanges: boolean
  /** Human-readable labels for dirty editors (for the banner). */
  dirtyLabels: string[]
  /** Save every dirty editor that registered a save handler. */
  saveAllDirty: () => Promise<void>
  /** Register a dirty editor; returns an unregister function. */
  registerDirty: (id: string, options?: DirtyEditorRegistration) => () => void
  /** Run before edit mode turns off (after discard is confirmed). */
  registerOnLeaveEditMode: (fn: () => void) => () => void
}

export const EditModeContext = createContext<EditModeContextValue | null>(null)

export function useEditMode(): EditModeContextValue {
  const ctx = useContext(EditModeContext)
  if (!ctx) {
    throw new Error('useEditMode must be used within EditModeProvider')
  }
  return ctx
}
