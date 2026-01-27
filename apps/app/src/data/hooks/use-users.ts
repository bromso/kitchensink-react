"use client"

import { useQuery } from "@apollo/client/react"
import { useMemo } from "react"
import type { User, UserStatus } from "@/app/(dashboard)/users/data/schema"
import { getUsers as getMockUsers } from "@/app/(dashboard)/users/data/users"
import { GET_PROFILE_BY_ID, GET_PROFILES } from "@/data/queries/users"
import type { Profile, ProfilesQueryResult } from "@/types/database"

// Check if Supabase is configured
const USE_REAL_DATA = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Type adapter - convert Supabase profile to app User type
function profileToUser(profile: Profile): User {
  // Parse full_name into first and last name
  const fullName = profile.full_name || ""
  const nameParts = fullName.trim().split(/\s+/)
  const firstName = nameParts[0] || ""
  const lastName = nameParts.slice(1).join(" ") || ""

  return {
    id: profile.id,
    firstName,
    lastName,
    email: profile.email || "",
    phoneNumber: "",
    status: "active", // Default status since profiles table doesn't have status column
    role: "manager", // Default role since profiles table doesn't have role column
    createdAt: new Date(profile.created_at),
    lastLoginAt: new Date(profile.updated_at),
    updatedAt: new Date(profile.updated_at),
  }
}

/**
 * Hook to fetch all users
 */
export function useUsers() {
  const { data, loading, error, refetch } = useQuery<ProfilesQueryResult>(GET_PROFILES, {
    skip: !USE_REAL_DATA,
    variables: { first: 100 },
  })

  const users = useMemo(() => {
    if (!USE_REAL_DATA) {
      return getMockUsers()
    }

    if (!data?.profilesCollection?.edges) {
      return []
    }

    return data.profilesCollection.edges.map((edge) => profileToUser(edge.node))
  }, [data])

  return {
    users,
    loading: USE_REAL_DATA ? loading : false,
    error,
    refetch,
    isUsingMockData: !USE_REAL_DATA,
  }
}

/**
 * Hook to fetch a single user by ID
 */
export function useUser(id: string | null) {
  const { data, loading, error, refetch } = useQuery<ProfilesQueryResult>(GET_PROFILE_BY_ID, {
    skip: !USE_REAL_DATA || !id,
    variables: { id },
  })

  const user = useMemo(() => {
    if (!id) return undefined

    if (!USE_REAL_DATA) {
      const users = getMockUsers()
      return users.find((u) => u.id === id)
    }

    const profile = data?.profilesCollection?.edges?.[0]?.node
    return profile ? profileToUser(profile) : undefined
  }, [data, id])

  return {
    user,
    loading: USE_REAL_DATA ? loading : false,
    error,
    refetch,
    isUsingMockData: !USE_REAL_DATA,
  }
}

/**
 * Hook to fetch users by status
 */
export function useUsersByStatus(status: UserStatus | null) {
  const { users, loading, error, refetch, isUsingMockData } = useUsers()

  const filteredUsers = useMemo(() => {
    if (!status) return users
    return users.filter((u) => u.status === status)
  }, [users, status])

  return {
    users: filteredUsers,
    loading,
    error,
    refetch,
    isUsingMockData,
  }
}
