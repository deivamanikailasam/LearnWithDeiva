import { useCallback, useState } from 'react'
import type { GlossaryPopoverState } from './GlossaryTermPopover'

function readGlossaryTarget(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null
  const el = target.closest('[data-glossary-term]')
  return el instanceof HTMLElement ? el : null
}

export function useGlossaryTermPopover() {
  const [popover, setPopover] = useState<GlossaryPopoverState | null>(null)

  const closePopover = useCallback(() => {
    setPopover(null)
  }, [])

  const openFromElement = useCallback((element: HTMLElement) => {
    const definition = element.getAttribute('data-definition')?.trim()
    if (!definition) return

    setPopover({
      term: element.textContent?.trim() || 'Term',
      definition,
      anchorRect: element.getBoundingClientRect(),
    })
  }, [])

  const onContainerClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const target = readGlossaryTarget(event.target)
      if (!target) return
      event.preventDefault()
      event.stopPropagation()
      openFromElement(target)
    },
    [openFromElement],
  )

  const onContainerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      const target = readGlossaryTarget(event.target)
      if (!target) return
      event.preventDefault()
      openFromElement(target)
    },
    [openFromElement],
  )

  return {
    popover,
    closePopover,
    onContainerClick,
    onContainerKeyDown,
  }
}
