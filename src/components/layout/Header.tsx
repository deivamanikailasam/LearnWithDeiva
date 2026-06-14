import { Link, NavLink } from 'react-router-dom'
import { paths } from '../../lib/paths'
import { ThemeToggle } from './ThemeToggle'
import { useSearchPalette } from '../search/searchPaletteContext'

const navItems = [
  { to: paths.home(), label: 'Home', end: true },
  { to: paths.subjects(), label: 'Subjects', end: false },
]

export function Header() {
  const { open } = useSearchPalette()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to={paths.home()} className="flex items-center gap-2 font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-white shadow-sm">
            L
          </span>
          <span className="text-lg tracking-tight">
            Learn<span className="text-brand-500">With</span>Deiva
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
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
          className="ml-auto flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400 transition hover:border-brand-300 sm:max-w-xs dark:border-slate-700 dark:bg-slate-900"
        >
          <span>🔍</span>
          <span className="flex-1 text-left">Search everything…</span>
          <kbd className="hidden rounded border border-slate-300 px-1.5 text-xs sm:inline dark:border-slate-600">
            ⌘K
          </kbd>
        </button>

        <ThemeToggle />
      </div>
    </header>
  )
}
