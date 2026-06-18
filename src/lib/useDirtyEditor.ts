import { useEffect, useRef } from 'react'
import { useEditMode } from './editModeContext'

export function useDirtyEditor({
  id,
  label,
  dirty,
  enabled,
  save,
}: {
  id: string
  label: string
  dirty: boolean
  enabled: boolean
  save: () => Promise<void>
}) {
  const { registerDirty } = useEditMode()
  const saveRef = useRef(save)
  saveRef.current = save

  useEffect(() => {
    if (!enabled || !dirty) return
    return registerDirty(id, {
      label,
      save: () => saveRef.current(),
    })
  }, [dirty, enabled, id, label, registerDirty])
}
