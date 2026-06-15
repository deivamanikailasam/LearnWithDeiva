import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Container } from '../components/Container'
import { resolveTopicKeys } from '../content/data'
import type { Difficulty, Subject, Topic } from '../types/content'
import { paths } from '../lib/paths'
import { useAsync } from '../lib/useAsync'
import { useProgress } from '../lib/progressContext'

type View = 'day' | 'week' | 'month'

interface Entry {
  key: string
  ts: number
  subject: Subject
  topic: Topic
}

interface Placed {
  entry: Entry
  lane: number
  lanes: number
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const ROW_H = 56 // px per hour in the time grid
const BLOCK = 50 * 60 * 1000 // visual footprint of a point-in-time event

// No per-topic duration exists in the content, so learning time is estimated
// from difficulty. These are deliberately simple, transparent figures.
const HOURS_BY_LEVEL: Record<Difficulty, number> = {
  beginner: 0.5,
  intermediate: 1,
  advanced: 1.5,
}
function estHours(topic: Topic): number {
  // Prefer an explicit `hours` value from the content; otherwise estimate.
  if (typeof topic.hours === 'number' && topic.hours >= 0) return topic.hours
  return HOURS_BY_LEVEL[topic.level] ?? 1
}
function fmtHours(h: number): string {
  const v = Math.round(h * 10) / 10
  return `${Number.isInteger(v) ? v : v.toFixed(1)}h`
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}
function startOfDay(d: Date): Date {
  const c = new Date(d)
  c.setHours(0, 0, 0, 0)
  return c
}
function addDays(d: Date, n: number): Date {
  const c = new Date(d)
  c.setDate(c.getDate() + n)
  return c
}
function startOfWeek(d: Date): Date {
  return addDays(startOfDay(d), -d.getDay())
}
function hourLabel(h: number): string {
  const ampm = h < 12 ? 'AM' : 'PM'
  const hr = h % 12 === 0 ? 12 : h % 12
  return `${hr} ${ampm}`
}
function timeLabel(ts: number): string {
  return new Date(ts).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
}
function accentOf(subject: Subject): string {
  return subject.gradient?.[0] ?? '#6366f1'
}

/** Lane layout so events overlapping in time render side-by-side, Teams-style. */
function layoutDay(events: Entry[]): Placed[] {
  const sorted = [...events].sort((a, b) => a.ts - b.ts)
  const out: Placed[] = []
  let i = 0
  while (i < sorted.length) {
    const cluster = [sorted[i]]
    let clusterEnd = sorted[i].ts + BLOCK
    let j = i + 1
    while (j < sorted.length && sorted[j].ts < clusterEnd) {
      cluster.push(sorted[j])
      clusterEnd = Math.max(clusterEnd, sorted[j].ts + BLOCK)
      j++
    }
    const laneEnds: number[] = []
    const placed = cluster.map((entry) => {
      let lane = laneEnds.findIndex((end) => entry.ts >= end)
      if (lane === -1) {
        lane = laneEnds.length
        laneEnds.push(0)
      }
      laneEnds[lane] = entry.ts + BLOCK
      return { entry, lane }
    })
    placed.forEach((p) => out.push({ ...p, lanes: laneEnds.length }))
    i = j
  }
  return out
}

export function CalendarPage() {
  const { completed } = useProgress()
  const [view, setView] = useState<View>('month')
  const [anchor, setAnchor] = useState(() => startOfDay(new Date()))

  const { data: resolved } = useAsync(
    () => resolveTopicKeys(completed.keys()),
    [completed],
  )
  const entries = useMemo<Entry[]>(() => {
    if (!resolved) return []
    const out: Entry[] = []
    for (const r of resolved) {
      out.push({
        key: r.key,
        ts: completed.get(r.key) ?? 0,
        subject: r.subject,
        topic: r.topic,
      })
    }
    return out
  }, [resolved, completed])

  const byDay = useMemo(() => {
    const m = new Map<string, Entry[]>()
    for (const e of entries) {
      if (!e.ts) continue
      const k = dayKey(new Date(e.ts))
      const list = m.get(k)
      if (list) list.push(e)
      else m.set(k, [e])
    }
    for (const list of m.values()) list.sort((a, b) => a.ts - b.ts)
    return m
  }, [entries])

  const undatedCount = entries.reduce((n, e) => (e.ts ? n : n + 1), 0)

  // The actual date window the current filter covers (used for the stats —
  // distinct from the month grid which renders 42 cells spilling into
  // adjacent months).
  const period = useMemo(() => {
    if (view === 'day') {
      const s = startOfDay(anchor)
      return { start: s.getTime(), end: addDays(s, 1).getTime(), days: 1 }
    }
    if (view === 'week') {
      const s = startOfWeek(anchor)
      return { start: s.getTime(), end: addDays(s, 7).getTime(), days: 7 }
    }
    const s = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
    const e = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1)
    return {
      start: s.getTime(),
      end: e.getTime(),
      days: Math.round((e.getTime() - s.getTime()) / 86_400_000),
    }
  }, [view, anchor])

  const stats = useMemo(() => {
    const inRange = entries.filter(
      (e) => e.ts && e.ts >= period.start && e.ts < period.end,
    )
    const hours = inRange.reduce((h, e) => h + estHours(e.topic), 0)
    const activeDays = new Set(inRange.map((e) => dayKey(new Date(e.ts)))).size

    // Current streak is global (not tied to the filter): consecutive days
    // ending today, with a 1-day grace so a not-yet-active today doesn't break
    // yesterday's streak.
    let streak = 0
    const cursor = startOfDay(new Date())
    if (!byDay.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1)
    while (byDay.has(dayKey(cursor))) {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    }

    return {
      completed: inRange.length,
      hours,
      avg: period.days ? hours / period.days : 0,
      activeDays,
      streak,
    }
  }, [entries, period, byDay])

  // Days currently visible (1 for day, 7 for week, 42 for month grid).
  const days = useMemo(() => {
    if (view === 'day') return [anchor]
    if (view === 'week') {
      const s = startOfWeek(anchor)
      return Array.from({ length: 7 }, (_, i) => addDays(s, i))
    }
    const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
    const gridStart = addDays(first, -first.getDay())
    return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i))
  }, [view, anchor])

  const title = useMemo(() => {
    if (view === 'day')
      return anchor.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    if (view === 'week') {
      const s = startOfWeek(anchor)
      const e = addDays(s, 6)
      const sameMonth = s.getMonth() === e.getMonth()
      const sM = MONTHS[s.getMonth()].slice(0, 3)
      const eM = MONTHS[e.getMonth()].slice(0, 3)
      return sameMonth
        ? `${sM} ${s.getDate()} – ${e.getDate()}, ${e.getFullYear()}`
        : `${sM} ${s.getDate()} – ${eM} ${e.getDate()}, ${e.getFullYear()}`
    }
    return `${MONTHS[anchor.getMonth()]} ${anchor.getFullYear()}`
  }, [view, anchor])

  const step = (dir: number) => {
    if (view === 'day') setAnchor((a) => addDays(a, dir))
    else if (view === 'week') setAnchor((a) => addDays(a, dir * 7))
    else setAnchor((a) => new Date(a.getFullYear(), a.getMonth() + dir, 1))
  }
  const goToday = () => setAnchor(startOfDay(new Date()))
  const openDay = (d: Date) => {
    setAnchor(startOfDay(d))
    setView('day')
  }

  return (
    <Container className="py-8">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goToday}
            className="rounded-lg border border-slate-200 px-3.5 py-1.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Today
          </button>
          <div className="flex items-center gap-1">
            <NavBtn label="Previous" onClick={() => step(-1)}>
              ‹
            </NavBtn>
            <NavBtn label="Next" onClick={() => step(1)}>
              ›
            </NavBtn>
          </div>
          <h1 className="text-lg font-bold tracking-tight sm:text-xl">{title}</h1>
        </div>

        <ViewSwitcher view={view} onChange={setView} />
      </div>

      <StatsBar stats={stats} view={view} />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {view === 'month' ? (
          <MonthGrid
            days={days}
            anchorMonth={anchor.getMonth()}
            byDay={byDay}
            onOpenDay={openDay}
          />
        ) : (
          <TimeGrid days={days} byDay={byDay} onOpenDay={openDay} />
        )}
      </div>

      {undatedCount > 0 && (
        <p className="mt-3 text-xs text-slate-400">
          {undatedCount} completed item{undatedCount === 1 ? '' : 's'} have no recorded
          time and aren’t shown on the calendar.
        </p>
      )}
    </Container>
  )
}

/* ---------------------------------- stats --------------------------------- */

function StatsBar({
  stats,
  view,
}: {
  stats: {
    completed: number
    hours: number
    avg: number
    activeDays: number
    streak: number
  }
  view: View
}) {
  const noun = view === 'day' ? 'day' : view === 'week' ? 'week' : 'month'
  const items = [
    { icon: '✓', value: stats.completed, label: `Completed this ${noun}` },
    { icon: '⏱️', value: fmtHours(stats.hours), label: `Hours this ${noun}` },
    { icon: '📊', value: fmtHours(stats.avg), label: 'Avg hrs / day' },
    { icon: '🗓️', value: stats.activeDays, label: `Active days this ${noun}` },
    {
      icon: '🔥',
      value: stats.streak === 1 ? '1 day' : `${stats.streak} days`,
      label: 'Current streak',
    },
  ]
  return (
    <div className="mb-5 flex flex-wrap gap-3">
      {items.map((i) => (
        <div
          key={i.label}
          style={{ flex: '1 1 160px', minWidth: 150 }}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-lg dark:bg-brand-500/10">
            {i.icon}
          </span>
          <div className="min-w-0">
            <div className="text-xl font-extrabold leading-none text-brand-600 dark:text-brand-400">
              {i.value}
            </div>
            <div className="mt-1 truncate text-xs font-medium text-slate-500">
              {i.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* --------------------------------- toolbar -------------------------------- */

function NavBtn({
  children,
  label,
  onClick,
}: {
  children: ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-lg text-xl leading-none text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {children}
    </button>
  )
}

function ViewSwitcher({
  view,
  onChange,
}: {
  view: View
  onChange: (v: View) => void
}) {
  const opts: View[] = ['day', 'week', 'month']
  return (
    <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800/60">
      {opts.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={clsx(
            'rounded-lg px-3.5 py-1.5 text-sm font-semibold capitalize transition',
            view === o
              ? 'bg-white text-brand-600 shadow-sm dark:bg-slate-900 dark:text-brand-300'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300',
          )}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------- month view ------------------------------- */

function MonthGrid({
  days,
  anchorMonth,
  byDay,
  onOpenDay,
}: {
  days: Date[]
  anchorMonth: number
  byDay: Map<string, Entry[]>
  onOpenDay: (d: Date) => void
}) {
  const todayKey = dayKey(new Date())
  const cols = { gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }
  return (
    <div>
      <div
        className="grid border-b border-slate-200 dark:border-slate-800"
        style={cols}
      >
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400"
          >
            {w}
          </div>
        ))}
      </div>
      <div className="grid" style={cols}>
        {days.map((date, i) => {
          const k = dayKey(date)
          const inMonth = date.getMonth() === anchorMonth
          const isToday = k === todayKey
          const events = byDay.get(k) ?? []
          return (
            <div
              key={k}
              style={{ minHeight: 118 }}
              className={clsx(
                'flex flex-col gap-1 border-b border-r border-slate-100 p-2 dark:border-slate-800/70',
                i % 7 === 6 && 'border-r-0',
                !inMonth && 'bg-slate-50/60 dark:bg-slate-950/30',
              )}
            >
              <button
                type="button"
                onClick={() => onOpenDay(date)}
                style={{ height: 28, width: 28 }}
                className={clsx(
                  'grid shrink-0 place-items-center rounded-full text-sm font-semibold transition',
                  isToday
                    ? 'bg-brand-500 text-white'
                    : inMonth
                      ? 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                      : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
                )}
              >
                {date.getDate()}
              </button>
              <div className="flex flex-col gap-1">
                {events.slice(0, 3).map((e) => (
                  <EventPill key={e.key} entry={e} />
                ))}
                {events.length > 3 && (
                  <button
                    type="button"
                    onClick={() => onOpenDay(date)}
                    style={{ fontSize: 11 }}
                    className="w-full rounded px-1.5 text-left font-semibold text-slate-500 hover:text-brand-600"
                  >
                    +{events.length - 3} more
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function EventPill({ entry }: { entry: Entry }) {
  const accent = accentOf(entry.subject)
  return (
    <Link
      to={paths.topic(entry.subject.id, entry.topic.id)}
      title={`${entry.topic.title} · ${timeLabel(entry.ts)}`}
      className="flex items-center gap-1.5 rounded-md px-1.5 py-0.5 font-medium text-slate-700 transition hover:brightness-95 dark:text-slate-100"
      style={{
        fontSize: 11,
        backgroundColor: `${accent}22`,
        borderLeft: `3px solid ${accent}`,
      }}
    >
      <span className="truncate">{entry.topic.title}</span>
    </Link>
  )
}

/* --------------------------- day / week time grid -------------------------- */

function TimeGrid({
  days,
  byDay,
  onOpenDay,
}: {
  days: Date[]
  byDay: Map<string, Entry[]>
  onOpenDay: (d: Date) => void
}) {
  const todayKey = dayKey(new Date())

  // Dynamic hour range based on the events in view, so the grid isn't a wall
  // of empty rows. Falls back to a sensible work-day window.
  const { startHour, endHour } = useMemo(() => {
    let min = 23
    let max = 0
    let any = false
    for (const d of days) {
      for (const e of byDay.get(dayKey(d)) ?? []) {
        const h = new Date(e.ts).getHours()
        any = true
        if (h < min) min = h
        if (h > max) max = h
      }
    }
    if (!any) return { startHour: 7, endHour: 19 }
    const s = Math.max(0, min - 1)
    let en = Math.min(23, max + 1)
    if (en - s < 5) en = Math.min(23, s + 5)
    return { startHour: s, endHour: en }
  }, [days, byDay])

  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)
  const gridHeight = hours.length * ROW_H
  const now = new Date()
  const nowTop =
    (now.getHours() - startHour + now.getMinutes() / 60) * ROW_H

  return (
    <div className="overflow-x-auto">
      <div style={days.length > 1 ? { minWidth: 680 } : undefined}>
        {/* day headers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <div className="w-16 shrink-0" />
          <div
            className="grid flex-1"
            style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}
          >
            {days.map((d) => {
              const isToday = dayKey(d) === todayKey
              return (
                <button
                  key={dayKey(d)}
                  type="button"
                  onClick={() => onOpenDay(d)}
                  className="flex flex-col items-center gap-1 border-l border-slate-100 py-2 transition hover:bg-slate-50 dark:border-slate-800/70 dark:hover:bg-slate-800/40"
                >
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {WEEKDAYS[d.getDay()]}
                  </span>
                  <span
                    className={clsx(
                      'grid h-8 w-8 place-items-center rounded-full text-sm font-bold',
                      isToday
                        ? 'bg-brand-500 text-white'
                        : 'text-slate-700 dark:text-slate-200',
                    )}
                  >
                    {d.getDate()}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* time grid */}
        <div className="flex">
          {/* hour gutter */}
          <div className="w-16 shrink-0">
            {hours.map((h) => (
              <div
                key={h}
                style={{ height: ROW_H }}
                className="relative"
              >
                <span
                  style={{ top: -8, right: 8 }}
                  className="absolute text-xs text-slate-400"
                >
                  {hourLabel(h)}
                </span>
              </div>
            ))}
          </div>

          {/* day columns */}
          <div
            className="grid flex-1"
            style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}
          >
            {days.map((d) => {
              const k = dayKey(d)
              const placed = layoutDay(byDay.get(k) ?? [])
              const isToday = k === todayKey
              return (
                <div
                  key={k}
                  className="relative border-l border-slate-100 dark:border-slate-800/70"
                  style={{ height: gridHeight }}
                >
                  {hours.map((h, idx) => (
                    <div
                      key={h}
                      style={{ top: idx * ROW_H }}
                      className="absolute inset-x-0 border-t border-slate-100 dark:border-slate-800/70"
                    />
                  ))}

                  {isToday && nowTop >= 0 && nowTop <= gridHeight && (
                    <div
                      className="pointer-events-none absolute inset-x-0 z-10 flex items-center"
                      style={{ top: nowTop }}
                    >
                      <span className="h-2 w-2 rounded-full bg-rose-500" />
                      <span className="h-px flex-1 bg-rose-500" />
                    </div>
                  )}

                  {placed.map(({ entry, lane, lanes }) => {
                    const date = new Date(entry.ts)
                    const top =
                      (date.getHours() - startHour + date.getMinutes() / 60) * ROW_H
                    const accent = accentOf(entry.subject)
                    return (
                      <Link
                        key={entry.key}
                        to={paths.topic(entry.subject.id, entry.topic.id)}
                        title={`${entry.topic.title} · ${timeLabel(entry.ts)}`}
                        className="absolute overflow-hidden rounded-md px-2 py-1 text-xs text-slate-800 shadow-sm transition hover:z-20 hover:shadow-md dark:text-slate-100"
                        style={{
                          top: top + 1,
                          height: ROW_H - 6,
                          left: `calc(${(lane / lanes) * 100}% + 2px)`,
                          width: `calc(${100 / lanes}% - 4px)`,
                          backgroundColor: `${accent}26`,
                          borderLeft: `3px solid ${accent}`,
                        }}
                      >
                        <span className="block truncate font-semibold">
                          {entry.topic.title}
                        </span>
                        <span
                          style={{ fontSize: 11 }}
                          className="block truncate text-slate-500 dark:text-slate-400"
                        >
                          {timeLabel(entry.ts)} · {entry.subject.title}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
