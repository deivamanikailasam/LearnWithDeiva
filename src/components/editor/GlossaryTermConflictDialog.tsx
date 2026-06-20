import { createPortal } from 'react-dom'

export function GlossaryTermConflictDialog({
  open,
  term,
  existingDefinition,
  variant = 'conflict',
  onAcceptExisting,
  onUseDifferent,
  onWriteDifferentDefinition,
  onCancel,
}: {
  open: boolean
  term: string
  existingDefinition: string
  variant?: 'available' | 'conflict'
  onAcceptExisting: () => void
  onUseDifferent: () => void
  onWriteDifferentDefinition?: () => void
  onCancel: () => void
}) {
  if (!open) return null

  const isAvailable = variant === 'available'

  return createPortal(
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-slate-900/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="glossary-conflict-title"
          className="w-full max-w-lg rounded-2xl border border-amber-200 bg-white p-6 shadow-2xl dark:border-amber-500/30 dark:bg-slate-900"
          onClick={(event) => event.stopPropagation()}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-300">
            {isAvailable ? 'Global glossary match' : 'Different definition'}
          </p>
          <h2 id="glossary-conflict-title" className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
            “{term}” {isAvailable ? 'is already in the global glossary' : 'has a different definition'}
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            {isAvailable
              ? 'Reuse the existing global definition here, or write a new one with a different meaning or label.'
              : 'This term already has a global definition that differs from what you wrote. Reuse the global definition, or choose a unique label and write your own.'}
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Global definition</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {existingDefinition}
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={onCancel} className="btn-ghost border border-slate-200 dark:border-slate-700">
              Cancel
            </button>
            <div className="ml-auto flex flex-wrap gap-2">
              {isAvailable && onWriteDifferentDefinition && (
                <button type="button" onClick={onWriteDifferentDefinition} className="btn-ghost">
                  Write a different definition
                </button>
              )}
              <button type="button" onClick={onUseDifferent} className="btn-ghost">
                {isAvailable ? 'Use a different term label' : 'Use a different term'}
              </button>
              <button type="button" onClick={onAcceptExisting} className="btn-primary">
                Use global definition
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
