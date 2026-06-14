import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../lib/authContext'
import { paths } from '../../lib/paths'
import { SyncIndicator } from '../SyncIndicator'

const AuthModal = lazy(() =>
  import('./AuthModal').then((m) => ({ default: m.AuthModal })),
)

export function UserMenu() {
  const { enabled, loading, user, signOut } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Cloud auth not configured → render nothing (app still works locally).
  if (!enabled) return null
  if (loading) return <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

  if (!user) {
    return (
      <>
        <button type="button" onClick={() => setModalOpen(true)} className="btn-primary !py-1.5">
          Sign in
        </button>
        {modalOpen && (
          <Suspense fallback={null}>
            <AuthModal onClose={() => setModalOpen(false)} />
          </Suspense>
        )}
      </>
    )
  }

  const initial = (user.email ?? '?').charAt(0).toUpperCase()

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-sm font-bold text-white"
        title={user.email ?? 'Account'}
      >
        {initial}
      </button>
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 z-40 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <p className="truncate px-2 pt-1.5 text-xs text-slate-400">{user.email}</p>
            <div className="px-2 pb-2 pt-1">
              <SyncIndicator />
            </div>
            <Link
              to={paths.account()}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Account & progress
            </Link>
            <button
              type="button"
              onClick={async () => {
                setMenuOpen(false)
                await signOut()
              }}
              className="w-full rounded-lg px-2 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
