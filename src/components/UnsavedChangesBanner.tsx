import clsx from 'clsx'
import { useEditMode } from '../lib/editModeContext'

export function UnsavedChangesBanner() {
  const { editMode, canUseEditMode, hasUnsavedChanges, dirtyLabels, saveAllDirty } =
    useEditMode()

  if (!canUseEditMode || !editMode || !hasUnsavedChanges) return null

  const label =
    dirtyLabels.length === 1
      ? dirtyLabels[0]
      : `${dirtyLabels.length} unsaved edits`

  return (
    <>
      <div className="h-14" aria-hidden />
      <div
        className={clsx(
          'fixed inset-x-0 bottom-0 z-50 border-t border-amber-300/80 bg-amber-50/95 px-4 py-3 shadow-lg backdrop-blur',
          'dark:border-amber-500/30 dark:bg-amber-950/90',
        )}
        role="status"
      >
        <div className="mx-auto flex w-full max-w-[110rem] flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 text-sm">
            <span className="font-semibold text-amber-900 dark:text-amber-100">
              Unsaved changes
            </span>
            <span className="ml-2 text-amber-800/80 dark:text-amber-200/80">{label}</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="hidden rounded border border-amber-300/80 px-1.5 py-0.5 text-[10px] font-medium text-amber-800 sm:inline dark:border-amber-500/40 dark:text-amber-200">
              ⌘S
            </kbd>
            <button
              type="button"
              onClick={() => void saveAllDirty()}
              className="rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-amber-700"
            >
              Save all
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
