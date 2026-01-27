import { gql } from "@apollo/client"

/**
 * Supabase GraphQL queries for Campaigns (Projects)
 * These queries fetch real data from Supabase (no @client directive)
 */

// Fragment for common project fields - using snake_case to match Supabase
export const PROJECT_FIELDS = gql`
  fragment ProjectFields on projects {
    id
    nodeId
    name
    description
    created_at
    updated_at
    organization_id
  }
`

// Fragment for common asset fields - using snake_case to match Supabase
export const ASSET_FIELDS = gql`
  fragment AssetFields on assets {
    id
    nodeId
    name
    asset_type
    workflow_status
    file_url
    project_id
    created_at
    updated_at
  }
`

// Get all projects (campaigns) with pagination
export const GET_PROJECTS = gql`
  ${PROJECT_FIELDS}
  query GetProjects($first: Int = 20, $after: Cursor) {
    projectsCollection(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...ProjectFields
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

// Get a single project by ID
export const GET_PROJECT_BY_ID = gql`
  ${PROJECT_FIELDS}
  query GetProjectById($id: UUID!) {
    projectsCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          ...ProjectFields
        }
      }
    }
  }
`

// Get all assets for a project
export const GET_PROJECT_ASSETS = gql`
  ${ASSET_FIELDS}
  query GetProjectAssets($projectId: UUID!, $first: Int = 50, $after: Cursor) {
    assetsCollection(
      filter: { project_id: { eq: $projectId } }
      first: $first
      after: $after
    ) {
      edges {
        cursor
        node {
          ...AssetFields
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

// Get all assets (for overview page)
export const GET_ALL_ASSETS = gql`
  ${ASSET_FIELDS}
  query GetAllAssets($first: Int = 20, $after: Cursor) {
    assetsCollection(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...AssetFields
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

// Get projects with their asset counts
export const GET_PROJECTS_WITH_STATS = gql`
  ${PROJECT_FIELDS}
  query GetProjectsWithStats($first: Int = 20, $after: Cursor) {
    projectsCollection(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...ProjectFields
          assetsCollection {
            edges {
              node {
                id
              }
            }
          }
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

// Create a new project (campaign)
export const CREATE_PROJECT = gql`
  ${PROJECT_FIELDS}
  mutation CreateProject($objects: [projectsInsertInput!]!) {
    insertIntoprojectsCollection(objects: $objects) {
      records {
        ...ProjectFields
      }
    }
  }
`

// Update an existing project
export const UPDATE_PROJECT = gql`
  ${PROJECT_FIELDS}
  mutation UpdateProject($id: UUID!, $set: projectsUpdateInput!) {
    updateprojectsCollection(filter: { id: { eq: $id } }, set: $set) {
      records {
        ...ProjectFields
      }
    }
  }
`

// Delete a project
export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: UUID!) {
    deleteFromprojectsCollection(filter: { id: { eq: $id } }) {
      records {
        id
      }
    }
  }
`
