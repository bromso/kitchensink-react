import { supabase } from "./supabase"

// Sign in with email and password
export const signIn = {
  email: async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: { message: error.message } }
    }

    return { data, error: null }
  },

  social: async ({
    provider,
    callbackURL,
  }: {
    provider: "google" | "github" | "apple"
    callbackURL: string
  }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(callbackURL)}`,
      },
    })

    if (error) {
      throw new Error(error.message)
    }

    return data
  },
}

// Sign up with email and password
export const signUp = {
  email: async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })

    if (error) {
      return { error: { message: error.message } }
    }

    return { data, error: null }
  },
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}

// Forget password - sends reset email
export async function forgetPassword({ email, redirectTo }: { email: string; redirectTo: string }) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}${redirectTo}`,
  })

  if (error) {
    return { error: { message: error.message } }
  }

  return { error: null }
}

// Reset password with new password
export async function resetPassword({ password }: { password: string }) {
  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: { message: error.message } }
  }

  return { error: null }
}

// Hook to get current session (legacy - use useCurrentUser instead)
export function useSession() {
  // This is a simple implementation - for a full React hook,
  // you'd want to use supabase.auth.onAuthStateChange
  return {
    data: null, // Will be populated by auth state listener
    isPending: false,
  }
}

// Get current session
export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    return { session: null, error }
  }
  return { session: data.session, error: null }
}

// Get current user
export async function getUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    return { user: null, error }
  }
  return { user: data.user, error: null }
}
