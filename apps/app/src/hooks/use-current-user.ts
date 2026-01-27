"use client"

import { useQuery } from "@apollo/client/react"
import type { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { GET_CURRENT_PROFILE } from "@/data/queries/users"
import { supabase } from "@/lib/supabase"
import type { ProfileQueryResult } from "@/types/database"

export interface CurrentUser {
  id: string
  email: string
  name: string
  avatar: string
}

/**
 * Hook to get the current authenticated user
 * Combines Supabase auth with profile data from the database
 * Listens to auth state changes and updates automatically
 */
export function useCurrentUser() {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Fetch profile data from GraphQL when we have an authenticated user
  const { data: profileData, loading: profileLoading } = useQuery<ProfileQueryResult>(
    GET_CURRENT_PROFILE,
    {
      skip: !authUser?.id,
      variables: { userId: authUser?.id },
    }
  )

  useEffect(() => {
    // Get initial session
    const getInitialUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setAuthUser(session.user)
        }
      } catch (error) {
        console.error("Error getting session:", error)
      } finally {
        setAuthLoading(false)
      }
    }

    getInitialUser()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAuthUser(session.user)
      } else {
        setAuthUser(null)
      }
      setAuthLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Combine auth user with profile data
  const user = authUser ? formatUser(authUser, profileData) : null
  const loading = authLoading || (!!authUser && profileLoading)

  return { user, loading }
}

/**
 * Format Supabase user to our CurrentUser type
 * Combines auth metadata with profile data from database
 */
function formatUser(user: User, profileData: ProfileQueryResult | undefined): CurrentUser {
  const metadata = user.user_metadata || {}
  const profile = profileData?.profilesCollection?.edges?.[0]?.node

  // Prioritize profile data from database, then fall back to auth metadata
  const name =
    profile?.full_name ||
    metadata.full_name ||
    metadata.name ||
    metadata.preferred_username ||
    user.email?.split("@")[0] ||
    "User"

  // Try to get avatar from profile, then auth metadata
  const avatar =
    profile?.avatar_url ||
    metadata.avatar_url ||
    metadata.picture ||
    // Generate a fallback avatar using initials
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`

  return {
    id: user.id,
    email: user.email || "",
    name,
    avatar,
  }
}
