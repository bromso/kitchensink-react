import { gql } from "@apollo/client"

/**
 * Supabase GraphQL queries for Users (Profiles)
 * These queries fetch real data from Supabase (no @client directive)
 */

// Fragment for common profile fields
export const PROFILE_FIELDS = gql`
  fragment ProfileFields on profiles {
    id
    nodeId
    email
    full_name
    avatar_url
    organization_id
    created_at
    updated_at
  }
`

// Get all profiles (users) with pagination
export const GET_PROFILES = gql`
  ${PROFILE_FIELDS}
  query GetProfiles($first: Int = 50, $after: Cursor) {
    profilesCollection(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...ProfileFields
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

// Get a single profile by ID
export const GET_PROFILE_BY_ID = gql`
  ${PROFILE_FIELDS}
  query GetProfileById($id: UUID!) {
    profilesCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          ...ProfileFields
        }
      }
    }
  }
`

// Get current user's profile (by auth user ID)
export const GET_CURRENT_PROFILE = gql`
  ${PROFILE_FIELDS}
  query GetCurrentProfile($userId: UUID!) {
    profilesCollection(filter: { id: { eq: $userId } }, first: 1) {
      edges {
        node {
          ...ProfileFields
        }
      }
    }
  }
`

// Update a profile
export const UPDATE_PROFILE = gql`
  ${PROFILE_FIELDS}
  mutation UpdateProfile($id: UUID!, $set: profilesUpdateInput!) {
    updateprofilesCollection(filter: { id: { eq: $id } }, set: $set) {
      records {
        ...ProfileFields
      }
    }
  }
`
