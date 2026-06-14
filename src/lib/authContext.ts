import { createContext, useContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

export interface AuthResult {
  error: string | null
  /** True when an action needs the user to check their email (signup/magic link). */
  needsEmailConfirmation?: boolean
}

export interface AuthContextValue {
  /** Whether cloud auth is available at all (Supabase configured). */
  enabled: boolean
  loading: boolean
  user: User | null
  session: Session | null
  /** True after the user follows a password-recovery email link. */
  passwordRecovery: boolean
  signInWithPassword: (email: string, password: string) => Promise<AuthResult>
  signUpWithPassword: (email: string, password: string) => Promise<AuthResult>
  signInWithMagicLink: (email: string) => Promise<AuthResult>
  signInWithOAuth: (provider: 'google' | 'github') => Promise<AuthResult>
  /** Sends a password-reset email. */
  resetPassword: (email: string) => Promise<AuthResult>
  /** Sets a new password for the current (recovering) session. */
  updatePassword: (password: string) => Promise<AuthResult>
  /** Changes the account email (sends a confirmation link to verify it). */
  updateEmail: (email: string) => Promise<AuthResult>
  dismissPasswordRecovery: () => void
  /** Permanently deletes the current user's account (via a DB function). */
  deleteAccount: () => Promise<AuthResult>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
