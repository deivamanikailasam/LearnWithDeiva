/**
 * Learning-time estimation and formatting.
 *
 * Every topic contributes a chunk of estimated study time. When a topic sets an
 * explicit `hours` value that wins; otherwise the time is derived from its
 * difficulty level. Subject totals are the sum across all topics (computed at
 * build time in `scripts/gen-content.mjs`, which mirrors `MINUTES_BY_LEVEL`).
 */
import type { Difficulty } from '../types/content'

/** Base study time per topic, by difficulty, in minutes. */
export const MINUTES_BY_LEVEL: Record<Difficulty, number> = {
  beginner: 30,
  intermediate: 60,
  advanced: 90,
}

const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24
export const MINUTES_PER_DAY = MINUTES_PER_HOUR * HOURS_PER_DAY

export interface DurationParts {
  days: number
  hours: number
  minutes: number
}

/** Split total minutes into day / hour / minute parts (24-hour days). */
export function minutesToDurationParts(totalMinutes: number): DurationParts {
  const minutes = Math.max(0, Math.round(totalMinutes))
  return {
    days: Math.floor(minutes / MINUTES_PER_DAY),
    hours: Math.floor((minutes % MINUTES_PER_DAY) / MINUTES_PER_HOUR),
    minutes: minutes % MINUTES_PER_HOUR,
  }
}

/** Convert day / hour / minute parts to total minutes. */
export function durationPartsToMinutes(
  days: number,
  hours: number,
  minutes: number,
): number {
  const d = Math.max(0, Math.min(365, Math.floor(days)))
  const h = Math.max(0, Math.min(23, Math.floor(hours)))
  const m = Math.max(0, Math.min(59, Math.floor(minutes)))
  return d * MINUTES_PER_DAY + h * MINUTES_PER_HOUR + m
}

/** Convert day / hour / minute parts to decimal hours for `topic.json`. */
export function durationPartsToHours(
  days: number,
  hours: number,
  minutes: number,
): number {
  return Math.round((durationPartsToMinutes(days, hours, minutes) / MINUTES_PER_HOUR) * 100) / 100
}

/** Convert decimal hours from `topic.json` to day / hour / minute parts. */
export function hoursToDurationParts(hours: number | undefined): DurationParts {
  if (typeof hours !== 'number' || !Number.isFinite(hours) || hours < 0) {
    return { days: 0, hours: 0, minutes: 0 }
  }
  return minutesToDurationParts(Math.round(hours * MINUTES_PER_HOUR))
}

interface TimedNode {
  level: Difficulty
  hours?: number
  subtopics?: TimedNode[]
}

/** Estimated study time for a single topic, in minutes. */
export function topicMinutes(topic: TimedNode): number {
  if (typeof topic.hours === 'number' && topic.hours >= 0) {
    return Math.round(topic.hours * MINUTES_PER_HOUR)
  }
  return MINUTES_BY_LEVEL[topic.level] ?? MINUTES_PER_HOUR
}

/**
 * Rolled-up study time for a topic, in minutes.
 *
 * A topic that has subtopics is a pure aggregate: its time is the sum of its
 * subtopics' rolled-up time (which recurses to the leaves). A leaf topic — one
 * with no subtopics — contributes its own level-based (or explicit) time.
 */
export function subtreeMinutes(topic: TimedNode): number {
  const subs = topic.subtopics ?? []
  if (subs.length === 0) return topicMinutes(topic)
  let total = 0
  for (const sub of subs) {
    total += subtreeMinutes(sub)
  }
  return total
}

/**
 * Format a duration in minutes as `Xd Yh Zm`, dropping any leading/zero parts
 * (e.g. `90` → `1h 30m`, `1530` → `1d 1h 30m`). Returns `0m` for non-positive
 * input. Days are 24-hour days.
 */
export function formatDuration(totalMinutes: number): string {
  const minutes = Math.max(0, Math.round(totalMinutes))
  if (minutes === 0) return '0m'

  const days = Math.floor(minutes / MINUTES_PER_DAY)
  const hours = Math.floor((minutes % MINUTES_PER_DAY) / MINUTES_PER_HOUR)
  const mins = minutes % MINUTES_PER_HOUR

  const parts: string[] = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  if (mins > 0) parts.push(`${mins}m`)
  return parts.join(' ')
}
