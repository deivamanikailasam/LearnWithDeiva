import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Session, SupabaseClient, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, loadSupabase } from '../lib/supabase'
import { AuthContext, type AuthContextValue, type AuthResult } from '../lib/authContext'

function redirectUrl() {
  return `${window.location.origin}${import.meta.env.BASE_URL}`
}

const disabled: AuthResult = { error: 'Login is not configured on this site.' }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<SupabaseClient | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [passwordRecovery, setPasswordRecovery] = useState(false)

  useEffect(() => {
    const promise = loadSupabase()
    if (!promise) return
    let unsub: (() => void) | undefined
    void promise.then((sb) => {
      setClient(sb)
      sb.auth.getSession().then(({ data }) => {
        setSession(data.session)
        setUser(data.session?.user ?? null)
        setLoading(false)
      })
      const { data: sub } = sb.auth.onAuthStateChange((event, next) => {
        setSession(next)
        setUser(next?.user ?? null)
        setLoading(false)
        if (event === 'PASSWORD_RECOVERY') setPasswordRecovery(true)
      })
      unsub = () => sub.subscription.unsubscribe()
    })
    return () => unsub?.()
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    if (!isSupabaseConfigured) {
      return {
        enabled: false,
        loading: false,
        user: null,
        session: null,
        passwordRecovery: false,
        signInWithPassword: async () => disabled,
        signUpWithPassword: async () => disabled,
        signInWithMagicLink: async () => disabled,
        signInWithOAuth: async () => disabled,
        resetPassword: async () => disabled,
        updatePassword: async () => disabled,
        updateEmail: async () => disabled,
        dismissPasswordRecovery: () => {},
        deleteAccount: async () => disabled,
        signOut: async () => {},
      }
    }
    // Resolve the client lazily so methods work even if clicked very early.
    const getClient = async () => client ?? (await loadSupabase())!
    return {
      enabled: true,
      loading,
      user,
      session,
      passwordRecovery,
      signInWithPassword: async (email, password) => {
        const sb = await getClient()
        const { error } = await sb.auth.signInWithPassword({ email, password })
        return { error: error?.message ?? null }
      },
      signUpWithPassword: async (email, password) => {
        const sb = await getClient()
        const { data, error } = await sb.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl() },
        })
        return {
          error: error?.message ?? null,
          needsEmailConfirmation: !error && !data.session,
        }
      },
      signInWithMagicLink: async (email) => {
        const sb = await getClient()
        const { error } = await sb.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: redirectUrl() },
        })
        return { error: error?.message ?? null, needsEmailConfirmation: !error }
      },
      signInWithOAuth: async (provider) => {
        const sb = await getClient()
        const { error } = await sb.auth.signInWithOAuth({
          provider,
          options: { redirectTo: redirectUrl() },
        })
        return { error: error?.message ?? null }
      },
      resetPassword: async (email) => {
        const sb = await getClient()
        const { error } = await sb.auth.resetPasswordForEmail(email, {
          redirectTo: redirectUrl(),
        })
        return { error: error?.message ?? null, needsEmailConfirmation: !error }
      },
      updatePassword: async (password) => {
        const sb = await getClient()
        const { error } = await sb.auth.updateUser({ password })
        return { error: error?.message ?? null }
      },
      updateEmail: async (email) => {
        const sb = await getClient()
        const { error } = await sb.auth.updateUser(
          { email },
          { emailRedirectTo: redirectUrl() },
        )
        return { error: error?.message ?? null, needsEmailConfirmation: !error }
      },
      dismissPasswordRecovery: () => setPasswordRecovery(false),
      deleteAccount: async () => {
        const sb = await getClient()
        // `delete_user` is a SECURITY DEFINER function that removes the caller's
        // own auth.users row (see README). Cascades delete their progress data.
        const { error } = await sb.rpc('delete_user')
        if (!error) await sb.auth.signOut()
        return { error: error?.message ?? null }
      },
      signOut: async () => {
        const sb = await getClient()
        await sb.auth.signOut()
      },
    }
  }, [client, loading, user, session, passwordRecovery])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
