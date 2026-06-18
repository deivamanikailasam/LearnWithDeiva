import clsx from 'clsx'
import { useEditMode } from '../../lib/editModeContext'

export function EditModeToggle() {
  const { editMode, canUseEditMode, toggleEditMode } = useEditMode()

  if (!canUseEditMode) return null

  return (
    <button
      type="button"
      onClick={toggleEditMode}
      aria-pressed={editMode}
      aria-label={editMode ? 'Leave edit mode' : 'Enter edit mode'}
      title={editMode ? 'View mode' : 'Edit mode'}
      className={clsx(
        'btn-ghost h-9 w-9 !px-0',
        editMode &&
          'bg-amber-50 text-amber-700 ring-1 ring-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/40',
      )}
    >
      <span className="text-lg">{editMode ? '👁' : '✎'}</span>
    </button>
  )
}
