import { useState } from 'react'
import type { ReactNode } from 'react'
import clsx from 'clsx'

export function Collapsible({
  title,
  badge,
  children,
  defaultOpen = false,
}: {
  title: ReactNode
  badge?: ReactNode
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <span
          className={clsx(
            'mt-0.5 shrink-0 text-brand-500 transition-transform',
            open && 'rotate-90',
          )}
        >
          ▶
        </span>
        <span className="flex-1 font-semibold">{title}</span>
        {badge}
      </button>
      {open && (
        <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-800">
          {children}
        </div>
      )}
    </div>
  )
}
