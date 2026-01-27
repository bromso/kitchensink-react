"use client"

import { useMutation, useQuery } from "@apollo/client/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { GET_CURRENT_PROFILE, UPDATE_PROFILE } from "@/data/queries/users"
import { supabase } from "@/lib/supabase"
import type { Profile, ProfileQueryResult } from "@/types/database"

// Check if Supabase is configured
const USE_REAL_DATA = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// User profile type for the app
export interface UserProfile {
  id: string
  email: string
  fullName: string | null
  avatarUrl: string | null
  organizationId: string | null
  createdAt: string
  updatedAt: string
}

// Input type for updating profile (snake_case for GraphQL)
export interface UpdateProfileInput {
  full_name?: string
  avatar_url?: string
  email?: string
}

// Mock profile data
const mockProfile: UserProfile = {
  id: "mock-user-id",
  email: "user@example.com",
  fullName: "John Doe",
  avatarUrl: null,
  organizationId: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

// Type adapter from Supabase Profile to UserProfile
function profileToUserProfile(profile: Profile): UserProfile {
  return {
    id: profile.id,
    email: profile.email || "",
    fullName: profile.full_name || null,
    avatarUrl: profile.avatar_url || null,
    organizationId: profile.organization_id || null,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
  }
}

// Result types for mutations
interface UpdateProfileResult {
  updateprofilesCollection: {
    records: Profile[]
  }
}

/**
 * Hook to fetch and update the current user's profile
 * Uses Supabase auth to get the user ID, then fetches profile from GraphQL
 */
export function useCurrentProfile() {
  const [userId, setUserId] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Get the current user's ID from Supabase auth
  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUserId(session.user.id)
        }
      } catch (error) {
        console.error("Error getting session:", error)
      } finally {
        setAuthLoading(false)
      }
    }

    getUser()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null)
      setAuthLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Fetch the profile from GraphQL
  const {
    data,
    loading: queryLoading,
    error,
    refetch,
  } = useQuery<ProfileQueryResult>(GET_CURRENT_PROFILE, {
    skip: !USE_REAL_DATA || !userId,
    variables: { userId },
  })

  // Update mutation
  const [updateProfileMutation, { loading: updateLoading }] = useMutation<UpdateProfileResult>(
    UPDATE_PROFILE,
    {
      refetchQueries: userId ? [{ query: GET_CURRENT_PROFILE, variables: { userId } }] : [],
      awaitRefetchQueries: true,
    }
  )

  // Determine if we should use mock data (either Supabase not configured OR no authenticated user)
  const shouldUseMockData = !USE_REAL_DATA || (!authLoading && !userId)

  // Memoize the profile data
  const profile = useMemo<UserProfile | null>(() => {
    if (shouldUseMockData) {
      return mockProfile
    }

    if (!userId) return null

    const profileData = data?.profilesCollection?.edges?.[0]?.node
    return profileData ? profileToUserProfile(profileData) : null
  }, [data, userId, shouldUseMockData])

  // Update profile function
  const updateProfile = useCallback(
    async (input: UpdateProfileInput): Promise<UserProfile | null> => {
      // Use mock data if Supabase not configured OR no authenticated user
      if (shouldUseMockData) {
        // For mock data, just log and return updated mock
        console.log("Mock: Updating profile", input)
        return {
          ...mockProfile,
          fullName: input.full_name ?? mockProfile.fullName,
          avatarUrl: input.avatar_url ?? mockProfile.avatarUrl,
          email: input.email ?? mockProfile.email,
          updatedAt: new Date().toISOString(),
        }
      }

      if (!userId) {
        console.error("Cannot update profile: No user ID")
        return null
      }

      try {
        const result = await updateProfileMutation({
          variables: {
            id: userId,
            set: input,
          },
        })

        const updatedProfile = result.data?.updateprofilesCollection?.records?.[0]
        if (updatedProfile) {
          return profileToUserProfile(updatedProfile)
        }

        console.error("No profile returned after update")
        return null
      } catch (err) {
        console.error("Failed to update profile:", err)
        throw err
      }
    },
    [userId, updateProfileMutation, shouldUseMockData]
  )

  return {
    profile,
    loading: authLoading || (!shouldUseMockData && queryLoading),
    updating: updateLoading,
    error,
    refetch,
    updateProfile,
    isUsingMockData: shouldUseMockData,
  }
}
