import { useState } from 'react'
import type { FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '../../lib/authContext'

type Mode = 'signin' | 'signup'

type OAuthProvider = 'google' | 'github'

const PROVIDER_LABELS: Record<OAuthProvider, string> = {
  google: 'Google',
  github: 'GitHub',
}

// Only show social buttons for providers explicitly enabled via env, so users
// never hit "provider is not enabled" for ones that aren't configured.
const enabledProviders = (import.meta.env.VITE_OAUTH_PROVIDERS as string | undefined ?? '')
  .split(',')
  .map((p) => p.trim().toLowerCase())
  .filter((p): p is OAuthProvider => p === 'google' || p === 'github')

export function AuthModal({ onClose }: { onClose: () => void }) {
  const {
    signInWithPassword,
    signUpWithPassword,
    signInWithMagicLink,
    signInWithOAuth,
    resetPassword,
  } = useAuth()
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const run = async (fn: () => Promise<{ error: string | null; needsEmailConfirmation?: boolean }>) => {
    setBusy(true)
    setError(null)
    setNotice(null)
    const res = await fn()
    setBusy(false)
    if (res.error) {
      setError(res.error)
      return
    }
    if (res.needsEmailConfirmation) {
      setNotice('Check your inbox for a confirmation/login link.')
    } else {
      onClose()
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    run(() =>
      mode === 'signin'
        ? signInWithPassword(email, password)
        : signUpWithPassword(email, password),
    )
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h2>
          <button type="button" onClick={onClose} className="btn-ghost h-8 w-8 !px-0">
            ✕
          </button>
        </div>
        <p className="mb-5 text-sm text-slate-500">
          Save your progress and bookmarks across devices.
        </p>

        <div className="mb-4 inline-flex w-full rounded-xl border border-slate-200 p-1 dark:border-slate-800">
          {(['signin', 'signup'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m)
                setError(null)
                setNotice(null)
              }}
              className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                mode === m
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {m === 'signin' ? 'Sign in' : 'Sign up'}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-800"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-800"
          />
          <button type="submit" disabled={busy} className="btn-primary w-full">
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        {mode === 'signin' && (
          <button
            type="button"
            disabled={busy || !email}
            onClick={() => run(() => resetPassword(email))}
            className="mt-2 text-xs font-medium text-brand-600 hover:underline disabled:opacity-50 dark:text-brand-400"
          >
            Forgot password? Enter your email and tap here.
          </button>
        )}

        <button
          type="button"
          disabled={busy || !email}
          onClick={() => run(() => signInWithMagicLink(email))}
          className="btn-ghost mt-2 w-full border border-slate-200 dark:border-slate-700"
        >
          ✉️ Email me a magic link
        </button>

        {enabledProviders.length > 0 && (
          <>
            <div className="my-4 flex items-center gap-3 text-xs text-slate-400">
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              or
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            <div
              className={`grid gap-2 ${enabledProviders.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}
            >
              {enabledProviders.map((provider) => (
                <button
                  key={provider}
                  type="button"
                  disabled={busy}
                  onClick={() => run(() => signInWithOAuth(provider))}
                  className="btn-ghost border border-slate-200 dark:border-slate-700"
                >
                  {PROVIDER_LABELS[provider]}
                </button>
              ))}
            </div>
          </>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
            {error}
          </p>
        )}
        {notice && (
          <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            {notice}
          </p>
        )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
