import { useEffect, useState } from 'react'

export interface AsyncState<T> {
  data: T | undefined
  loading: boolean
  error: Error | undefined
}

/**
 * Run an async factory and track its loading/error/result state. The factory is
 * re-run whenever `deps` change; results from a stale run are ignored so rapid
 * navigation can't render the wrong data.
 */
export function useAsync<T>(
  factory: () => Promise<T>,
  deps: unknown[],
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: undefined,
    loading: true,
    error: undefined,
  })

  useEffect(() => {
    let alive = true
    // Reset to a loading state when deps change. This is the intended
    // data-fetching reset, not an accidental cascading render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ data: undefined, loading: true, error: undefined })
    factory()
      .then((data) => {
        if (alive) setState({ data, loading: false, error: undefined })
      })
      .catch((error: unknown) => {
        if (alive)
          setState({
            data: undefined,
            loading: false,
            error: error instanceof Error ? error : new Error(String(error)),
          })
      })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
