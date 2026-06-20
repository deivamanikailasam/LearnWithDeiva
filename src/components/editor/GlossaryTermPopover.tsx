import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

export interface GlossaryPopoverState {
  term: string
  definition: string
  anchorRect: DOMRect
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function GlossaryTermPopover({
  state,
  onClose,
}: {
  state: GlossaryPopoverState | null
  onClose: () => void
}) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [placement, setPlacement] = useState<'above' | 'below'>('below')
  const [coords, setCoords] = useState({ top: 0, left: 0 })

  const reposition = useCallback(() => {
    if (!state || !popoverRef.current) return

    const popover = popoverRef.current.getBoundingClientRect()
    const padding = 12
    const gap = 8
    const { anchorRect } = state

    let top = anchorRect.bottom + gap
    let nextPlacement: 'above' | 'below' = 'below'

    if (top + popover.height > window.innerHeight - padding) {
      top = anchorRect.top - popover.height - gap
      nextPlacement = 'above'
    }

    if (top < padding) {
      top = anchorRect.bottom + gap
      nextPlacement = 'below'
    }

    const left = clamp(
      anchorRect.left + anchorRect.width / 2 - popover.width / 2,
      padding,
      window.innerWidth - popover.width - padding,
    )

    setPlacement(nextPlacement)
    setCoords({ top, left })
  }, [state])

  useLayoutEffect(() => {
    reposition()
  }, [reposition, state])

  useEffect(() => {
    if (!state) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (popoverRef.current?.contains(target)) return
      if (target instanceof Element && target.closest('[data-glossary-term]')) return
      onClose()
    }

    const onViewportChange = () => reposition()

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('mousedown', onPointerDown)
    window.addEventListener('touchstart', onPointerDown, { passive: true })
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('scroll', onViewportChange, true)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('touchstart', onPointerDown)
      window.removeEventListener('resize', onViewportChange)
      window.removeEventListener('scroll', onViewportChange, true)
    }
  }, [state, onClose, reposition])

  if (!state) return null

  return createPortal(
    <div
      ref={popoverRef}
      role="dialog"
      aria-label={`Definition of ${state.term}`}
      className={clsx(
        'fixed z-50 w-[min(calc(100vw-1.5rem),20rem)] rounded-xl border border-slate-200 bg-white p-4 shadow-xl',
        'dark:border-slate-700 dark:bg-slate-900',
        placement === 'below' ? 'glossary-popover-below' : 'glossary-popover-above',
      )}
      style={{ top: coords.top, left: coords.left, position: 'fixed' }}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
        Glossary
      </p>
      <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{state.term}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {state.definition}
      </p>
    </div>,
    document.body,
  )
}
