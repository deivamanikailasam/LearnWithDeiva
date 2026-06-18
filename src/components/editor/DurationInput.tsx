import clsx from 'clsx'
import {
  durationPartsToMinutes,
  formatDuration,
  subtreeMinutes,
  topicMinutes,
} from '../../lib/duration'
import { compactInputClass, fieldErrorClass, labelClass } from '../../lib/form-styles'
import type { Difficulty, Topic } from '../../types/content'

interface DurationInputProps {
  useLevelDefault: boolean
  days: number
  hours: number
  minutes: number
  level: Difficulty
  onUseLevelDefaultChange: (value: boolean) => void
  onDaysChange: (value: number) => void
  onHoursChange: (value: number) => void
  onMinutesChange: (value: number) => void
  disabled?: boolean
  readOnlyComputed?: Pick<Topic, 'level' | 'hours' | 'subtopics'>
  error?: string
}

function DurationField({
  label,
  value,
  max,
  disabled,
  onChange,
}: {
  label: string
  value: number
  max: number
  disabled?: boolean
  onChange: (value: number) => void
}) {
  return (
    <label className="flex min-w-0 items-center gap-1">
      <input
        type="number"
        min={0}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          const raw = e.target.value
          if (raw === '') {
            onChange(0)
            return
          }
          const parsed = parseInt(raw, 10)
          if (!Number.isNaN(parsed)) onChange(Math.min(max, Math.max(0, parsed)))
        }}
        className={clsx(compactInputClass, 'w-11 tabular-nums text-center')}
        aria-label={`Duration ${label}`}
      />
      <span className="shrink-0 text-[10px] font-medium uppercase text-slate-400">
        {label}
      </span>
    </label>
  )
}

export function DurationInput({
  useLevelDefault,
  days,
  hours,
  minutes,
  level,
  onUseLevelDefaultChange,
  onDaysChange,
  onHoursChange,
  onMinutesChange,
  disabled,
  readOnlyComputed,
  error,
}: DurationInputProps) {
  if (readOnlyComputed) {
    return (
      <div className="min-w-0">
        <span className={labelClass}>Duration</span>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          ⏱️ {formatDuration(subtreeMinutes(readOnlyComputed))}
          <span className="ml-1 text-xs text-slate-400">(from subtopics)</span>
        </p>
      </div>
    )
  }

  const previewMinutes = useLevelDefault
    ? topicMinutes({ level, hours: undefined })
    : durationPartsToMinutes(days, hours, minutes)

  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className={labelClass}>Duration</span>
        <span className="text-[10px] tabular-nums text-slate-400">
          {formatDuration(previewMinutes)}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onUseLevelDefaultChange(!useLevelDefault)}
          className={clsx(
            'shrink-0 rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide transition',
            useLevelDefault
              ? 'border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300'
              : 'border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          Default
        </button>
        <div
          className={clsx(
            'flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900',
            useLevelDefault && 'pointer-events-none opacity-40',
          )}
        >
          <DurationField
            label="d"
            value={days}
            max={365}
            disabled={disabled || useLevelDefault}
            onChange={onDaysChange}
          />
          <span className="text-slate-300 dark:text-slate-600">:</span>
          <DurationField
            label="h"
            value={hours}
            max={23}
            disabled={disabled || useLevelDefault}
            onChange={onHoursChange}
          />
          <span className="text-slate-300 dark:text-slate-600">:</span>
          <DurationField
            label="m"
            value={minutes}
            max={59}
            disabled={disabled || useLevelDefault}
            onChange={onMinutesChange}
          />
        </div>
      </div>
      {error && <p className={fieldErrorClass}>{error}</p>}
    </div>
  )
}
