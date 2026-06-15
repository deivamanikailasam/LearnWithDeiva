import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { paths } from '../../lib/paths'
import { ThemeToggle } from './ThemeToggle'
import { useSearchPalette } from '../search/searchPaletteContext'
import { UserMenu } from '../auth/UserMenu'
import { useAuth } from '../../lib/authContext'

const AuthModal = lazy(() =>
  import('../auth/AuthModal').then((m) => ({ default: m.AuthModal })),
)

const navItems = [
  { to: paths.home(), label: 'Home', end: true },
  { to: paths.subjects(), label: 'Subjects', end: false },
  { to: paths.calendar(), label: 'Calendar', end: false },
  { to: paths.account(), label: 'Account', end: false },
]

export function Header() {
  const { open } = useSearchPalette()
  const { enabled, user, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  // Lock body scroll while the mobile drawer is open so the page underneath
  // doesn't move when the user scrolls the menu.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="-ml-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden className="text-xl leading-none">
            {menuOpen ? '✕' : '☰'}
          </span>
        </button>

        <Link
          to={paths.home()}
          className="flex shrink-0 items-center gap-2 font-extrabold"
        >
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-white shadow-sm sm:h-9 sm:w-9">
            L
          </span>
          <span className="hidden text-base tracking-tight xs:inline sm:text-lg">
            Learn<span className="text-brand-500">With</span>Deiva
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={open}
          aria-label="Search everything"
          className="ml-auto flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-sm text-slate-400 transition hover:border-brand-300 sm:flex-1 sm:max-w-[14rem] sm:px-3 lg:max-w-xs dark:border-slate-700 dark:bg-slate-900"
        >
          <span aria-hidden>🔍</span>
          <span className="hidden flex-1 text-left sm:inline">
            Search everything…
          </span>
          <kbd className="hidden rounded border border-slate-300 px-1.5 text-xs lg:inline dark:border-slate-600">
            ⌘K
          </kbd>
        </button>

        <ThemeToggle />
        <UserMenu />
      </div>

      {/* Mobile slide-down drawer */}
      <div
        id="mobile-nav"
        className={clsx(
          'lg:hidden overflow-hidden border-t border-slate-200 bg-white transition-[max-height,opacity] duration-200 dark:border-slate-800 dark:bg-slate-950',
          menuOpen
            ? 'max-h-[28rem] opacity-100'
            : 'pointer-events-none max-h-0 opacity-0',
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-3 py-3 sm:px-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Auth quick-action — supplements the Account link above */}
          {enabled && (
            <>
              <div className="my-2 border-t border-slate-200 dark:border-slate-800" />
              {user ? (
                <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                  <span
                    aria-hidden
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-xs font-bold text-white"
                  >
                    {(user.email ?? '?').charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </span>
                  <button
                    type="button"
                    onClick={async () => {
                      setMenuOpen(false)
                      await signOut()
                    }}
                    className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    setAuthOpen(true)
                  }}
                  className="btn-primary w-full"
                >
                  Sign in / Sign up
                </button>
              )}
            </>
          )}
        </nav>
      </div>

      {authOpen && (
        <Suspense fallback={null}>
          <AuthModal onClose={() => setAuthOpen(false)} />
        </Suspense>
      )}
    </header>
  )
}
