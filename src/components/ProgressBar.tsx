import { formatDuration } from '../lib/duration'

export function ProgressBar({
  value,
  total,
  totalMinutes,
  showLabel = true,
}: {
  value: number
  total: number
  /**
   * Total estimated study time for the whole subject, in minutes. When
   * provided, the label shows a prorated "~Xh left" alongside the topic count
   * and percentage.
   */
  totalMinutes?: number
  showLabel?: boolean
}) {
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0
  const isComplete = total > 0 && value >= total
  const remainingFraction =
    total > 0 ? Math.max(0, total - value) / total : 0
  const remainingMinutes =
    typeof totalMinutes === 'number' && totalMinutes > 0
      ? Math.round(totalMinutes * remainingFraction)
      : null

  return (
    <div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {value} / {total}
            </span>{' '}
            topics
            <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {pct}%
            </span>
          </span>
          {remainingMinutes !== null && (
            <span
              className={
                isComplete
                  ? 'inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400'
                  : 'inline-flex items-center gap-1'
              }
            >
              <span aria-hidden>{isComplete ? '✓' : '⏱️'}</span>
              {isComplete ? 'Complete' : `~${formatDuration(remainingMinutes)} left`}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
