import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if env vars are present (prevents build errors)
const isConfigured = supabaseUrl && supabaseAnonKey

export function createClient(): SupabaseClient {
  if (!isConfigured) {
    // Return a mock client that throws helpful errors when methods are called
    const throwNotConfigured = () => {
      throw new Error(
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
      )
    }
    return {
      auth: {
        getSession: throwNotConfigured,
        signInWithPassword: throwNotConfigured,
        signInWithOAuth: throwNotConfigured,
        signOut: throwNotConfigured,
        signUp: throwNotConfigured,
        resetPasswordForEmail: throwNotConfigured,
        updateUser: throwNotConfigured,
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        getUser: throwNotConfigured,
      },
    } as unknown as SupabaseClient
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Default client for use in components
export const supabase = createClient()

// Helper to get current session token
export async function getSupabaseAccessToken(): Promise<string | null> {
  if (!isConfigured) return null
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.access_token ?? null
}

// Sign in with email/password
export async function signInWithSupabase(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

// Sign out
export async function signOutFromSupabase() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error
  }
}

// Subscribe to auth state changes
export function onAuthStateChange(callback: (session: { access_token: string } | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session ? { access_token: session.access_token } : null)
  })
}
