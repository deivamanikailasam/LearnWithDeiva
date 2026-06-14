import { lazy, Suspense, useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { ProgressBar } from '../components/ProgressBar'
import { SyncIndicator } from '../components/SyncIndicator'
import { subjects, getTopic } from '../content/registry'
import { paths } from '../lib/paths'
import { useAuth } from '../lib/authContext'
import { useProgress } from '../lib/progressContext'

const AuthModal = lazy(() =>
  import('../components/auth/AuthModal').then((m) => ({ default: m.AuthModal })),
)

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800'

function resolveKeys(keys: Set<string>) {
  return [...keys]
    .map((key) => {
      const [subjectId, topicId] = key.split('::')
      return getTopic(subjectId, topicId)
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
}

type ResolvedTopic = NonNullable<ReturnType<typeof getTopic>>

export function AccountPage() {
  const { enabled, loading, user, signOut } = useAuth()
  const { completed, bookmarks, completedInSubject, clearCompleted, clearBookmarks } =
    useProgress()
  const [authOpen, setAuthOpen] = useState(false)

  const completedTopics = useMemo(() => resolveKeys(completed), [completed])
  const bookmarkedTopics = useMemo(() => resolveKeys(bookmarks), [bookmarks])

  const onClearCompleted = () => {
    if (completed.size === 0) return
    if (window.confirm('Clear all completed topics? This applies on every device.')) {
      clearCompleted()
    }
  }
  const onClearBookmarks = () => {
    if (bookmarks.size === 0) return
    if (window.confirm('Clear all bookmarks? This applies on every device.')) {
      clearBookmarks()
    }
  }

  // Not configured → local-only mode.
  if (!enabled) {
    return (
      <Container className="py-12">
        <PageHeading
          title="Your account"
          subtitle="Login isn’t enabled on this deployment, so your progress and bookmarks live only in this browser."
        />
        <div className="mt-8 space-y-6">
          <Stats completedCount={completed.size} bookmarkCount={bookmarks.size} />
          <Activity completedTopics={completedTopics} bookmarkedTopics={bookmarkedTopics} />
          <DangerZone
            completedCount={completedTopics.length}
            bookmarkCount={bookmarkedTopics.length}
            onClearCompleted={onClearCompleted}
            onClearBookmarks={onClearBookmarks}
          />
        </div>
      </Container>
    )
  }

  if (loading) {
    return (
      <Container className="py-24 text-center text-slate-400">Loading…</Container>
    )
  }

  // Configured but signed out → prompt to sign in.
  if (!user) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-3xl dark:bg-brand-500/10">
          👤
        </div>
        <h1 className="mt-5 text-3xl font-extrabold">Your account</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-500">
          Sign in to save your completed topics and bookmarks to your account and
          sync them across every device.
        </p>
        <button type="button" onClick={() => setAuthOpen(true)} className="btn-primary mt-6">
          Sign in / Sign up
        </button>
        {authOpen && (
          <Suspense fallback={null}>
            <AuthModal onClose={() => setAuthOpen(false)} />
          </Suspense>
        )}
      </Container>
    )
  }

  const email = user.email ?? ''

  return (
    <Container className="py-12">
      <ProfileHeader email={email} onSignOut={() => signOut()} />

      <div className="mt-6 space-y-6">
        <Stats completedCount={completed.size} bookmarkCount={bookmarks.size} />

        <SubjectProgress completedInSubject={completedInSubject} />

        <Activity completedTopics={completedTopics} bookmarkedTopics={bookmarkedTopics} />

        <div className="grid gap-6 lg:grid-cols-2">
          <ChangeEmail currentEmail={email} />
          <ChangePassword />
        </div>

        <DangerZone
          completedCount={completedTopics.length}
          bookmarkCount={bookmarkedTopics.length}
          onClearCompleted={onClearCompleted}
          onClearBookmarks={onClearBookmarks}
          deleteEmail={email}
        />
      </div>
    </Container>
  )
}

/* ----------------------------- layout helpers ---------------------------- */

function PageHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-slate-500">{subtitle}</p>}
    </div>
  )
}

function Panel({
  title,
  icon,
  description,
  action,
  tone = 'default',
  children,
}: {
  title: string
  icon?: ReactNode
  description?: string
  action?: ReactNode
  tone?: 'default' | 'danger'
  children: ReactNode
}) {
  const base =
    tone === 'danger'
      ? 'rounded-2xl border border-rose-200 bg-rose-50/60 p-6 shadow-sm dark:border-rose-500/30 dark:bg-rose-500/5'
      : 'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900'
  const iconBg =
    tone === 'danger'
      ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300'
      : 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300'
  return (
    <section className={base}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {icon && (
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg ${iconBg}`}>
              {icon}
            </span>
          )}
          <div>
            <h2
              className={`text-lg font-bold leading-tight ${tone === 'danger' ? 'text-rose-700 dark:text-rose-300' : ''}`}
            >
              {title}
            </h2>
            {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

/* ------------------------------- sections -------------------------------- */

function ProfileHeader({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const initials = email.split('@')[0].slice(0, 2).toUpperCase() || '?'
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white shadow-inner">
          {initials}
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold tracking-tight">Your account</h1>
          <p className="truncate text-sm text-slate-500">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:justify-end">
        <SyncIndicator />
        <button
          type="button"
          onClick={onSignOut}
          className="btn-ghost border border-slate-200 dark:border-slate-700"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

function Stats({
  completedCount,
  bookmarkCount,
}: {
  completedCount: number
  bookmarkCount: number
}) {
  const totalTopics = subjects.reduce((sum, s) => sum + s.topicCount, 0)
  const items = [
    { icon: '✓', label: 'Topics completed', value: completedCount },
    { icon: '★', label: 'Bookmarks', value: bookmarkCount },
    { icon: '📚', label: 'Topics available', value: totalTopics },
  ]
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((i) => (
        <div
          key={i.label}
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-xl dark:bg-brand-500/10">
            {i.icon}
          </span>
          <div className="min-w-0">
            <div className="text-2xl font-extrabold leading-none text-brand-600 dark:text-brand-400">
              {i.value}
            </div>
            <div className="mt-1 truncate text-xs font-medium text-slate-500">{i.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SubjectProgress({
  completedInSubject,
}: {
  completedInSubject: (subjectId: string) => number
}) {
  return (
    <Panel title="Progress by subject" icon="🗺️">
      <div className="grid gap-4 sm:grid-cols-2">
        {subjects.map((s) => (
          <Link key={s.id} to={paths.subject(s.id)} className="card p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl">{s.icon}</span>
              <span className="font-semibold">{s.title}</span>
            </div>
            <ProgressBar value={completedInSubject(s.id)} total={s.topicCount} />
          </Link>
        ))}
      </div>
    </Panel>
  )
}

function TopicLinkList({ items, empty }: { items: ResolvedTopic[]; empty: string }) {
  if (items.length === 0)
    return (
      <p className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-400 dark:border-slate-700">
        {empty}
      </p>
    )
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map(({ subject, topic }) => (
        <Link
          key={`${subject.id}-${topic.id}`}
          to={paths.topic(subject.id, topic.id)}
          className="card flex items-center justify-between gap-2 p-3"
        >
          <span className="min-w-0">
            <span className="block text-xs text-slate-400">{subject.title}</span>
            <span className="block truncate font-medium">{topic.title}</span>
          </span>
          <span className="shrink-0 text-slate-300">→</span>
        </Link>
      ))}
    </div>
  )
}

function Activity({
  completedTopics,
  bookmarkedTopics,
}: {
  completedTopics: ResolvedTopic[]
  bookmarkedTopics: ResolvedTopic[]
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel
        title="Completed topics"
        icon="✓"
        action={<span className="chip">{completedTopics.length}</span>}
      >
        <TopicLinkList items={completedTopics} empty="No topics completed yet." />
      </Panel>
      <Panel
        title="Bookmarks"
        icon="★"
        action={<span className="chip">{bookmarkedTopics.length}</span>}
      >
        <TopicLinkList items={bookmarkedTopics} empty="No bookmarks yet." />
      </Panel>
    </div>
  )
}

function Feedback({ error, success }: { error?: string | null; success?: string | null }) {
  if (error)
    return (
      <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
        {error}
      </p>
    )
  if (success)
    return (
      <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
        {success}
      </p>
    )
  return null
}

function ChangeEmail({ currentEmail }: { currentEmail: string }) {
  const { updateEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setDone(false)
    if (email.trim().toLowerCase() === currentEmail.trim().toLowerCase()) {
      setError('That is already your current email.')
      return
    }
    setBusy(true)
    const res = await updateEmail(email.trim())
    setBusy(false)
    if (res.error) setError(res.error)
    else {
      setDone(true)
      setEmail('')
    }
  }

  return (
    <Panel
      title="Change email"
      icon="✉️"
      description={`Current: ${currentEmail}`}
    >
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="New email address"
          className={inputClass}
        />
        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? 'Sending…' : 'Update email'}
        </button>
        <Feedback
          error={error}
          success={
            done
              ? 'Check your inbox — confirm the link sent to your new address to finish the change.'
              : null
          }
        />
      </form>
    </Panel>
  )
}

function ChangePassword() {
  const { updatePassword } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setDone(false)
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setBusy(true)
    const res = await updatePassword(password)
    setBusy(false)
    if (res.error) setError(res.error)
    else {
      setDone(true)
      setPassword('')
      setConfirm('')
    }
  }

  return (
    <Panel title="Change password" icon="🔒" description="Use at least 6 characters.">
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          className={inputClass}
        />
        <input
          type="password"
          required
          minLength={6}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm new password"
          className={inputClass}
        />
        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? 'Updating…' : 'Update password'}
        </button>
        <Feedback error={error} success={done ? 'Password updated successfully.' : null} />
      </form>
    </Panel>
  )
}

function DangerZone({
  completedCount,
  bookmarkCount,
  onClearCompleted,
  onClearBookmarks,
  deleteEmail,
}: {
  completedCount: number
  bookmarkCount: number
  onClearCompleted: () => void
  onClearBookmarks: () => void
  deleteEmail?: string
}) {
  const dangerBtn =
    'btn border border-rose-300 bg-white text-rose-700 hover:bg-rose-100 disabled:opacity-50 dark:border-rose-500/40 dark:bg-transparent dark:text-rose-300 dark:hover:bg-rose-500/10'
  return (
    <Panel
      tone="danger"
      title="Danger zone"
      icon="⚠️"
      description="These actions apply on every device and can’t be undone."
    >
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onClearCompleted}
          disabled={completedCount === 0}
          className={dangerBtn}
        >
          Clear completed ({completedCount})
        </button>
        <button
          type="button"
          onClick={onClearBookmarks}
          disabled={bookmarkCount === 0}
          className={dangerBtn}
        >
          Clear bookmarks ({bookmarkCount})
        </button>
        {deleteEmail && <DeleteAccountButton email={deleteEmail} />}
      </div>
    </Panel>
  )
}

function DeleteAccountButton({ email }: { email: string }) {
  const { deleteAccount } = useAuth()
  const [open, setOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const confirmed = typed.trim().toLowerCase() === email.trim().toLowerCase()

  const onDelete = async () => {
    if (!confirmed) return
    setBusy(true)
    setError(null)
    const res = await deleteAccount()
    setBusy(false)
    if (res.error) {
      setError(res.error)
      return
    }
    // On success the user is signed out and the page re-renders to the much
    // shorter signed-out view; reset scroll so there's no blank gap below.
    setOpen(false)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          setTyped('')
          setError(null)
        }}
        className="btn bg-rose-600 text-white hover:bg-rose-700"
      >
        Delete account
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm"
            onClick={() => !busy && setOpen(false)}
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <div
                className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400">
                  Delete account
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  This permanently removes your account and all synced data. To
                  confirm, type your email <span className="font-semibold">{email}</span>{' '}
                  below.
                </p>
                <input
                  type="email"
                  autoFocus
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  placeholder="Type your email to confirm"
                  className={`mt-4 ${inputClass} focus:border-rose-400 focus:ring-rose-500/20`}
                />
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={busy}
                    className="btn-ghost flex-1 border border-slate-200 dark:border-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onDelete}
                    disabled={!confirmed || busy}
                    className="btn flex-1 bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
                  >
                    {busy ? 'Deleting…' : 'Delete forever'}
                  </button>
                </div>
                {error && (
                  <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
