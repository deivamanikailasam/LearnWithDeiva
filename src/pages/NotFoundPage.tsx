import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../components/Container'
import { paths } from '../lib/paths'
import { useAuth } from '../lib/authContext'

// Supabase appends auth tokens to the redirect URL (e.g. after confirming a
// signup email or a magic link). With HashRouter that lands here on the
// catch-all route, so instead of a scary 404 we show a brief "completing
// sign-in" state and send the user home once the session is ready.
const AUTH_PARAMS =
  /access_token=|refresh_token=|[?&]code=|error_description=|[#&?]type=(signup|recovery|magiclink|email_change|email|invite)/i

function urlHasAuthParams() {
  if (typeof window === 'undefined') return false
  return AUTH_PARAMS.test(window.location.hash) || AUTH_PARAMS.test(window.location.search)
}

export function NotFoundPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [completingAuth] = useState(urlHasAuthParams)

  useEffect(() => {
    if (!completingAuth) return
    // Once Supabase has processed the tokens (session present) go home.
    if (user) {
      navigate(paths.home(), { replace: true })
      return
    }
    // Fallback: even if the link was already used / errored, don't strand the
    // user on a 404 — head home after a short grace period.
    const timer = window.setTimeout(() => navigate(paths.home(), { replace: true }), 4000)
    return () => window.clearTimeout(timer)
  }, [completingAuth, user, navigate])

  if (completingAuth) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
        <h1 className="mt-5 text-xl font-bold">Completing sign-in…</h1>
        <p className="mt-2 text-slate-500">Hang tight, taking you to your account.</p>
      </Container>
    )
  }

  return (
    <Container className="py-24 text-center">
      <p className="text-7xl font-extrabold text-brand-500">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-500">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link to={paths.home()} className="btn-primary mt-6">
        Back home
      </Link>
    </Container>
  )
}
