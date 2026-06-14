import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  message: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'default' | 'danger'
  onConfirm: () => void
  onCancel: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  const confirmClass =
    tone === 'danger'
      ? 'btn flex-1 bg-rose-600 text-white hover:bg-rose-700'
      : 'btn-primary flex-1'

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {message}
          </div>
          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="btn-ghost flex-1 border border-slate-200 dark:border-slate-700"
            >
              {cancelLabel}
            </button>
            <button type="button" onClick={onConfirm} className={confirmClass} autoFocus>
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
