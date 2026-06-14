import { useState } from 'react'
import type { FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '../../lib/authContext'

export function SetPasswordModal() {
  const { updatePassword, dismissPasswordRecovery } = useAuth()
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const res = await updatePassword(password)
    setBusy(false)
    if (res.error) setError(res.error)
    else setDone(true)
  }

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-bold">Set a new password</h2>
          {done ? (
            <>
              <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                Your password has been updated.
              </p>
              <button
                type="button"
                onClick={dismissPasswordRecovery}
                className="btn-primary mt-4 w-full"
              >
                Continue
              </button>
            </>
          ) : (
            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <input
                type="password"
                required
                minLength={6}
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password (min 6 chars)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-800"
              />
              <button type="submit" disabled={busy} className="btn-primary w-full">
                {busy ? 'Saving…' : 'Update password'}
              </button>
              <button
                type="button"
                onClick={dismissPasswordRecovery}
                className="btn-ghost w-full"
              >
                Cancel
              </button>
              {error && (
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
