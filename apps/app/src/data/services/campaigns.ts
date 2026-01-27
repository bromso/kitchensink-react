import {
  type ArtefactStatus,
  getArtefactById as getMockArtefactById,
  getArtefacts as getMockArtefacts,
  getArtefactsByCampaign as getMockArtefactsByCampaign,
  getArtefactsByStatus as getMockArtefactsByStatus,
  getCampaignById as getMockCampaignById,
  getCampaigns as getMockCampaigns,
  type Artefact as MockArtefact,
  type Campaign as MockCampaign,
} from "@/data/mock/campaigns"
import {
  GET_ALL_ASSETS,
  GET_PROJECT_ASSETS,
  GET_PROJECT_BY_ID,
  GET_PROJECTS,
} from "@/data/queries/campaigns"
import { extractNodes, extractSingleNode, fetchGraphQL } from "@/lib/graphql-server"
import type { Asset, AssetsQueryResult, Project, ProjectsQueryResult } from "@/types/database"

// Check if Supabase is configured
const USE_REAL_DATA = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Type adapters to convert between Supabase and Mock types
function projectToCampaign(project: Project): MockCampaign {
  return {
    id: project.id,
    title: project.name,
    description: project.description || "",
    status: (project.status as MockCampaign["status"]) || "draft",
    startDate: project.created_at,
    endDate: undefined,
    thumbnail: undefined,
    artefactCount: 0, // Will be populated separately if needed
    createdAt: project.created_at,
    updatedAt: project.updated_at,
  }
}

function assetToArtefact(asset: Asset): MockArtefact {
  return {
    id: asset.id,
    campaignId: asset.project_id || "",
    name: asset.name,
    type: (asset.asset_type as MockArtefact["type"]) || "brochure",
    description: asset.description || undefined,
    src: asset.file_url || asset.thumbnail_url || "",
    format: undefined,
    dimensions: undefined,
    status: mapWorkflowStatusToArtefactStatus(asset.workflow_status),
    createdAt: asset.created_at,
    updatedAt: asset.updated_at,
  }
}

function mapWorkflowStatusToArtefactStatus(workflowStatus: string | null): ArtefactStatus {
  const statusMap: Record<string, ArtefactStatus> = {
    draft: "draft",
    pending_review: "review",
    in_review: "review",
    approved: "approved",
    published: "published",
    rejected: "draft",
  }
  return statusMap[workflowStatus?.toLowerCase() || ""] || "draft"
}

/**
 * Get all campaigns (projects)
 * Uses real GraphQL data if Supabase is configured, otherwise falls back to mock data
 */
export async function getCampaigns(): Promise<MockCampaign[]> {
  if (!USE_REAL_DATA) {
    return getMockCampaigns()
  }

  const { data, error } = await fetchGraphQL<ProjectsQueryResult>(GET_PROJECTS, { first: 50 })

  if (error || !data) {
    console.error("Failed to fetch campaigns from GraphQL:", error)
    return getMockCampaigns() // Fallback to mock
  }

  const projects = extractNodes(data.projectsCollection)
  return projects.map(projectToCampaign)
}

/**
 * Get a single campaign by ID
 */
export async function getCampaignById(id: string): Promise<MockCampaign | undefined> {
  if (!USE_REAL_DATA) {
    return getMockCampaignById(id)
  }

  const { data, error } = await fetchGraphQL<ProjectsQueryResult>(GET_PROJECT_BY_ID, { id })

  if (error || !data) {
    console.error("Failed to fetch campaign from GraphQL:", error)
    return getMockCampaignById(id) // Fallback to mock
  }

  const project = extractSingleNode(data.projectsCollection)
  return project ? projectToCampaign(project) : undefined
}

/**
 * Get all artefacts (assets)
 */
export async function getArtefacts(): Promise<MockArtefact[]> {
  if (!USE_REAL_DATA) {
    return getMockArtefacts()
  }

  const { data, error } = await fetchGraphQL<AssetsQueryResult>(GET_ALL_ASSETS, { first: 100 })

  if (error || !data) {
    console.error("Failed to fetch artefacts from GraphQL:", error)
    return getMockArtefacts() // Fallback to mock
  }

  const assets = extractNodes(data.assetsCollection)
  return assets.map(assetToArtefact)
}

/**
 * Get artefacts for a specific campaign
 */
export async function getArtefactsByCampaign(campaignId: string): Promise<MockArtefact[]> {
  if (!USE_REAL_DATA) {
    return getMockArtefactsByCampaign(campaignId)
  }

  const { data, error } = await fetchGraphQL<AssetsQueryResult>(GET_PROJECT_ASSETS, {
    projectId: campaignId,
    first: 100,
  })

  if (error || !data) {
    console.error("Failed to fetch artefacts from GraphQL:", error)
    return getMockArtefactsByCampaign(campaignId) // Fallback to mock
  }

  const assets = extractNodes(data.assetsCollection)
  return assets.map(assetToArtefact)
}

/**
 * Get a single artefact by ID
 */
export async function getArtefactById(id: string): Promise<MockArtefact | undefined> {
  if (!USE_REAL_DATA) {
    return getMockArtefactById(id)
  }

  // For single artefact, we'd need a specific query - for now use mock
  // TODO: Add GET_ASSET_BY_ID query
  return getMockArtefactById(id)
}

/**
 * Get artefacts by status
 */
export async function getArtefactsByStatus(status: ArtefactStatus): Promise<MockArtefact[]> {
  if (!USE_REAL_DATA) {
    return getMockArtefactsByStatus(status)
  }

  // For now, fetch all and filter - can be optimized with server-side filtering
  const artefacts = await getArtefacts()
  return artefacts.filter((a) => a.status === status)
}

// Re-export types and constants from mock for convenience
export {
  type Artefact,
  type ArtefactStatus,
  type ArtefactType,
  artefactStatuses,
  artefactTypes,
  type Campaign,
  type CampaignStatus,
  campaignStatuses,
  type GroupedCampaigns,
  groupCampaignsByDate,
} from "@/data/mock/campaigns"
