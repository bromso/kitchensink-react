import { gql } from "@apollo/client/core"

/**
 * Supabase GraphQL queries for Brand Guidelines
 * These queries fetch real data from Supabase (no @client directive)
 */

// Fragment for common brand guideline fields
export const BRAND_GUIDELINE_FIELDS = gql`
  fragment BrandGuidelineFields on brand_guidelines {
    id
    nodeId
    name
    description
    category
    guideline_definition
    is_active
    organization_id
    created_at
    updated_at
  }
`

// Get brand guidelines with optional category filter
export const GET_BRAND_GUIDELINES = gql`
  ${BRAND_GUIDELINE_FIELDS}
  query GetBrandGuidelines($first: Int = 50, $after: Cursor, $category: guideline_category) {
    brand_guidelinesCollection(
      first: $first
      after: $after
      filter: { category: { eq: $category }, is_active: { eq: true } }
      orderBy: { created_at: DescNullsLast }
    ) {
      edges {
        cursor
        node {
          ...BrandGuidelineFields
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

// Get all brand guidelines (no category filter)
export const GET_ALL_BRAND_GUIDELINES = gql`
  ${BRAND_GUIDELINE_FIELDS}
  query GetAllBrandGuidelines($first: Int = 100, $after: Cursor) {
    brand_guidelinesCollection(
      first: $first
      after: $after
      filter: { is_active: { eq: true } }
      orderBy: { created_at: DescNullsLast }
    ) {
      edges {
        cursor
        node {
          ...BrandGuidelineFields
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

// Get a single brand guideline by ID
export const GET_BRAND_GUIDELINE_BY_ID = gql`
  ${BRAND_GUIDELINE_FIELDS}
  query GetBrandGuidelineById($id: UUID!) {
    brand_guidelinesCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          ...BrandGuidelineFields
        }
      }
    }
  }
`

/**
 * Supabase GraphQL queries for User Notifications (in-app notifications)
 */

// Fragment for user notification fields
export const USER_NOTIFICATION_FIELDS = gql`
  fragment UserNotificationFields on user_notifications {
    id
    nodeId
    type
    title
    message
    link
    is_read
    user_id
    related_asset_id
    related_comment_id
    created_at
  }
`

// Get user notifications
export const GET_USER_NOTIFICATIONS = gql`
  ${USER_NOTIFICATION_FIELDS}
  query GetUserNotifications($first: Int = 20, $after: Cursor, $userId: UUID!) {
    user_notificationsCollection(
      first: $first
      after: $after
      filter: { user_id: { eq: $userId } }
      orderBy: { created_at: DescNullsLast }
    ) {
      edges {
        cursor
        node {
          ...UserNotificationFields
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

// Get unread user notifications
export const GET_UNREAD_USER_NOTIFICATIONS = gql`
  ${USER_NOTIFICATION_FIELDS}
  query GetUnreadUserNotifications($userId: UUID!) {
    user_notificationsCollection(
      filter: { user_id: { eq: $userId }, is_read: { eq: false } }
      orderBy: { created_at: DescNullsLast }
    ) {
      edges {
        cursor
        node {
          ...UserNotificationFields
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

// Mark notification as read
export const MARK_NOTIFICATION_READ = gql`
  mutation MarkNotificationRead($id: UUID!) {
    updateuser_notificationsCollection(
      filter: { id: { eq: $id } }
      set: { is_read: true }
    ) {
      records {
        id
        is_read
      }
    }
  }
`

// Mark all notifications as read for a user
export const MARK_ALL_NOTIFICATIONS_READ = gql`
  mutation MarkAllNotificationsRead($userId: UUID!) {
    updateuser_notificationsCollection(
      filter: { user_id: { eq: $userId }, is_read: { eq: false } }
      set: { is_read: true }
    ) {
      affectedCount
    }
  }
`
