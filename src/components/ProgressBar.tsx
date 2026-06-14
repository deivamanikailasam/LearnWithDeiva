export function ProgressBar({
  value,
  total,
  showLabel = true,
}: {
  value: number
  total: number
  showLabel?: boolean
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-xs text-slate-500">
          {value} / {total} topics · {pct}%
        </p>
      )}
    </div>
  )
}
