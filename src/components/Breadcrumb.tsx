import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm text-slate-500"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <Fragment key={`${item.label}-${i}`}>
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-brand-600 dark:hover:text-brand-400">
                {item.label}
              </Link>
            ) : (
              <span
                className={isLast ? 'text-slate-700 dark:text-slate-300' : undefined}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast && <span className="text-slate-300 dark:text-slate-600">/</span>}
          </Fragment>
        )
      })}
    </nav>
  )
}
