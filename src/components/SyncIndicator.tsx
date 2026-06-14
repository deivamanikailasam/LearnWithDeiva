import clsx from 'clsx'
import { useProgress } from '../lib/progressContext'
import { useAuth } from '../lib/authContext'

function timeAgo(ms: number): string {
  const s = Math.floor((Date.now() - ms) / 1000)
  if (s < 5) return 'just now'
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export function SyncIndicator({ className }: { className?: string }) {
  const { enabled, user } = useAuth()
  const { syncStatus, lastSyncedAt } = useProgress()

  // Without an account there's nothing to sync.
  const loggedIn = enabled && !!user

  const meta = !loggedIn
    ? { dot: 'bg-slate-400', label: 'Saved on this device', title: 'Sign in to sync across devices' }
    : syncStatus === 'syncing'
      ? { dot: 'bg-amber-400 animate-pulse', label: 'Syncing…', title: 'Saving to your account' }
      : syncStatus === 'error'
        ? { dot: 'bg-rose-500', label: 'Sync failed', title: 'Saved locally; will retry on next change' }
        : {
            dot: 'bg-emerald-500',
            label: lastSyncedAt ? `Synced ${timeAgo(lastSyncedAt)}` : 'Synced',
            title: 'Backed up to your account',
          }

  return (
    <span
      className={clsx('inline-flex items-center gap-1.5 text-xs text-slate-500', className)}
      title={meta.title}
    >
      <span className={clsx('h-2 w-2 rounded-full', meta.dot)} />
      {meta.label}
    </span>
  )
}
