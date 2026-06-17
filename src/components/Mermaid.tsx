import { useEffect, useRef, useState } from 'react'

/** Singleton mermaid import so the heavy lib is fetched at most once. */
let mermaidPromise: Promise<typeof import('mermaid')['default']> | null = null
function getMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((m) => m.default)
  }
  return mermaidPromise
}

let idCounter = 0

/**
 * Renders a Mermaid diagram from its source. Re-renders when the source or the
 * app theme (the `dark` class on <html>) changes. The lib is dynamically
 * imported so it stays out of the main bundle.
 */
export function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState<string | null>(null)
  const baseId = useRef(`mermaid-${idCounter++}`)

  useEffect(() => {
    let cancelled = false

    const render = async () => {
      try {
        const mermaid = await getMermaid()
        const isDark = document.documentElement.classList.contains('dark')
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: isDark ? 'dark' : 'default',
        })
        const { svg } = await mermaid.render(`${baseId.current}-${Date.now()}`, chart)
        if (!cancelled) {
          setSvg(svg)
          setError(null)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to render diagram')
        }
      }
    }

    render()

    const observer = new MutationObserver(render)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [chart])

  if (error) {
    return (
      <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
        Diagram could not be rendered: {error}
      </p>
    )
  }

  return (
    <div
      className="flex justify-center overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default Mermaid
