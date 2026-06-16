import type { ReactNode } from 'react'
import clsx from 'clsx'

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={clsx(
        'mx-auto w-full max-w-[110rem] px-3 sm:px-5 lg:px-6 xl:px-8',
        className,
      )}
    >
      {children}
    </div>
  )
}
