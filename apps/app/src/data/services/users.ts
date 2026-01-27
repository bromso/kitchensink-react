import type { User } from "@/app/(dashboard)/users/data/schema"
import { getUsers as getMockUsers } from "@/app/(dashboard)/users/data/users"
import { GET_PROFILE_BY_ID, GET_PROFILES } from "@/data/queries/users"
import { extractNodes, extractSingleNode, fetchGraphQL } from "@/lib/graphql-server"
import type { Profile, ProfilesQueryResult } from "@/types/database"

// Check if Supabase is configured
const USE_REAL_DATA = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Type adapters to convert between Supabase and app types
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
    phoneNumber: "", // Not in Supabase profile
    status: "active", // Default status since profiles table doesn't have status column
    role: "manager", // Default role since profiles table doesn't have role column
    createdAt: new Date(profile.created_at),
    lastLoginAt: new Date(profile.updated_at), // Using updated_at as proxy for lastLogin
    updatedAt: new Date(profile.updated_at),
  }
}

/**
 * Get all users (profiles)
 * Uses real GraphQL data if Supabase is configured, otherwise falls back to mock data
 */
export async function getUsers(): Promise<User[]> {
  if (!USE_REAL_DATA) {
    return getMockUsers()
  }

  const { data, error } = await fetchGraphQL<ProfilesQueryResult>(GET_PROFILES, { first: 100 })

  if (error || !data) {
    console.error("Failed to fetch users from GraphQL:", error)
    return getMockUsers() // Fallback to mock
  }

  const profiles = extractNodes(data.profilesCollection)
  return profiles.map(profileToUser)
}

/**
 * Get a single user by ID
 */
export async function getUserById(id: string): Promise<User | undefined> {
  if (!USE_REAL_DATA) {
    const users = getMockUsers()
    return users.find((u) => u.id === id)
  }

  const { data, error } = await fetchGraphQL<ProfilesQueryResult>(GET_PROFILE_BY_ID, { id })

  if (error || !data) {
    console.error("Failed to fetch user from GraphQL:", error)
    const users = getMockUsers()
    return users.find((u) => u.id === id)
  }

  const profile = extractSingleNode(data.profilesCollection)
  return profile ? profileToUser(profile) : undefined
}

// Re-export types
export type { User, UserStatus } from "@/app/(dashboard)/users/data/schema"
export { userListSchema } from "@/app/(dashboard)/users/data/schema"
