import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase is optional and loaded lazily.
 *
 * When the two public env vars are present, cloud features (login + synced
 * progress) turn on and the Supabase library is fetched as a separate chunk
 * on demand. When they're absent the library is never downloaded and the app
 * works fully using localStorage only.
 *
 * The anon key is a *public* key — it is safe to ship to the browser because
 * Row Level Security on the database enforces that users only touch their own
 * rows. Set these as build-time env vars (see .env.example).
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

/** Table that stores each user's personalised data. */
export const PROGRESS_TABLE = 'user_progress'

let clientPromise: Promise<SupabaseClient> | null = null

/**
 * Returns the shared Supabase client, creating it (and code-splitting the
 * library) on first call. Returns null when Supabase isn't configured.
 */
export function loadSupabase(): Promise<SupabaseClient> | null {
  if (!isSupabaseConfigured) return null
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(url!, anonKey!, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      }),
    )
  }
  return clientPromise
}
