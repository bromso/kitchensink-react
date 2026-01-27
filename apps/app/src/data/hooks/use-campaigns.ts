"use client"

import { useMutation, useQuery } from "@apollo/client/react"
import { useMemo, useState } from "react"
import {
  type Artefact,
  type ArtefactStatus,
  type Campaign,
  getArtefactById as getMockArtefactById,
  getArtefacts as getMockArtefacts,
  getArtefactsByCampaign as getMockArtefactsByCampaign,
  getArtefactsByStatus as getMockArtefactsByStatus,
  getCampaignById as getMockCampaignById,
  getCampaigns as getMockCampaigns,
} from "@/data/mock/campaigns"
import {
  CREATE_PROJECT,
  GET_ALL_ASSETS,
  GET_PROJECT_ASSETS,
  GET_PROJECT_BY_ID,
  GET_PROJECTS,
} from "@/data/queries/campaigns"
import type { Asset, AssetsQueryResult, Project, ProjectsQueryResult } from "@/types/database"

// Check if Supabase is configured
const USE_REAL_DATA = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Type adapters - using snake_case from Supabase schema
function projectToCampaign(project: Project): Campaign {
  return {
    id: project.id,
    title: project.name,
    description: project.description || "",
    status: (project.status as Campaign["status"]) || "draft",
    startDate: project.created_at,
    endDate: undefined,
    thumbnail: undefined,
    artefactCount: 0,
    createdAt: project.created_at,
    updatedAt: project.updated_at,
  }
}

function assetToArtefact(asset: Asset): Artefact {
  const statusMap: Record<string, ArtefactStatus> = {
    draft: "draft",
    pending_review: "review",
    in_review: "review",
    approved: "approved",
    published: "published",
    rejected: "draft",
  }

  return {
    id: asset.id,
    campaignId: asset.project_id || "",
    name: asset.name,
    type: (asset.asset_type as Artefact["type"]) || "brochure",
    description: asset.description || undefined,
    src: asset.file_url || asset.thumbnail_url || "",
    format: undefined,
    dimensions: undefined,
    status: statusMap[asset.workflow_status?.toLowerCase() || ""] || "draft",
    createdAt: asset.created_at,
    updatedAt: asset.updated_at,
  }
}

/**
 * Hook to fetch all campaigns
 */
export function useCampaigns() {
  const { data, loading, error, refetch } = useQuery<ProjectsQueryResult>(GET_PROJECTS, {
    skip: !USE_REAL_DATA,
    variables: { first: 50 },
  })

  const campaigns = useMemo(() => {
    if (!USE_REAL_DATA) {
      return getMockCampaigns()
    }

    if (!data?.projectsCollection?.edges) {
      return []
    }

    return data.projectsCollection.edges.map((edge) => projectToCampaign(edge.node))
  }, [data])

  return {
    campaigns,
    loading: USE_REAL_DATA ? loading : false,
    error,
    refetch,
    isUsingMockData: !USE_REAL_DATA,
  }
}

/**
 * Hook to fetch a single campaign by ID
 */
export function useCampaign(id: string | null) {
  const { data, loading, error, refetch } = useQuery<ProjectsQueryResult>(GET_PROJECT_BY_ID, {
    skip: !USE_REAL_DATA || !id,
    variables: { id },
  })

  const campaign = useMemo(() => {
    if (!id) return undefined

    if (!USE_REAL_DATA) {
      return getMockCampaignById(id)
    }

    const project = data?.projectsCollection?.edges?.[0]?.node
    return project ? projectToCampaign(project) : undefined
  }, [data, id])

  return {
    campaign,
    loading: USE_REAL_DATA ? loading : false,
    error,
    refetch,
    isUsingMockData: !USE_REAL_DATA,
  }
}

/**
 * Hook to fetch all artefacts
 */
export function useArtefacts() {
  const { data, loading, error, refetch } = useQuery<AssetsQueryResult>(GET_ALL_ASSETS, {
    skip: !USE_REAL_DATA,
    variables: { first: 100 },
  })

  const artefacts = useMemo(() => {
    if (!USE_REAL_DATA) {
      return getMockArtefacts()
    }

    if (!data?.assetsCollection?.edges) {
      return []
    }

    return data.assetsCollection.edges.map((edge) => assetToArtefact(edge.node))
  }, [data])

  return {
    artefacts,
    loading: USE_REAL_DATA ? loading : false,
    error,
    refetch,
    isUsingMockData: !USE_REAL_DATA,
  }
}

/**
 * Hook to fetch artefacts for a specific campaign
 */
export function useCampaignArtefacts(campaignId: string | null) {
  const { data, loading, error, refetch } = useQuery<AssetsQueryResult>(GET_PROJECT_ASSETS, {
    skip: !USE_REAL_DATA || !campaignId,
    variables: { projectId: campaignId, first: 100 },
  })

  const artefacts = useMemo(() => {
    if (!campaignId) return []

    if (!USE_REAL_DATA) {
      return getMockArtefactsByCampaign(campaignId)
    }

    if (!data?.assetsCollection?.edges) {
      return []
    }

    return data.assetsCollection.edges.map((edge) => assetToArtefact(edge.node))
  }, [data, campaignId])

  return {
    artefacts,
    loading: USE_REAL_DATA ? loading : false,
    error,
    refetch,
    isUsingMockData: !USE_REAL_DATA,
  }
}

/**
 * Hook to fetch artefacts by status
 */
export function useArtefactsByStatus(status: ArtefactStatus | null) {
  const { artefacts, loading, error, refetch, isUsingMockData } = useArtefacts()

  const filteredArtefacts = useMemo(() => {
    if (!status) return []

    if (isUsingMockData) {
      return getMockArtefactsByStatus(status)
    }

    return artefacts.filter((a) => a.status === status)
  }, [artefacts, status, isUsingMockData])

  return {
    artefacts: filteredArtefacts,
    loading,
    error,
    refetch,
    isUsingMockData,
  }
}

/**
 * Hook to fetch a single artefact by ID
 */
export function useArtefact(id: string | null) {
  const { artefacts, loading, error, refetch, isUsingMockData } = useArtefacts()

  const artefact = useMemo(() => {
    if (!id) return undefined

    if (isUsingMockData) {
      return getMockArtefactById(id)
    }

    return artefacts.find((a) => a.id === id)
  }, [artefacts, id, isUsingMockData])

  return {
    artefact,
    loading,
    error,
    refetch,
    isUsingMockData,
  }
}

// Mutation types
interface CreateProjectInput {
  name: string
  description?: string
  status?: string
  organizationId?: string
}

interface CreateProjectResult {
  insertIntoProjectsCollection: {
    records: Project[]
  }
}

/**
 * Hook to create a new campaign (project)
 */
export function useCreateCampaign() {
  const [createProjectMutation, { loading, error }] = useMutation<CreateProjectResult>(
    CREATE_PROJECT,
    {
      refetchQueries: [{ query: GET_PROJECTS, variables: { first: 50 } }],
      awaitRefetchQueries: true,
    }
  )
  const [mutationError, setMutationError] = useState<Error | null>(null)

  const createCampaign = async (input: CreateProjectInput): Promise<Campaign | null> => {
    setMutationError(null)

    if (!USE_REAL_DATA) {
      // For mock data, just log and return a fake campaign
      console.log("Mock: Creating campaign", input)
      const mockCampaign: Campaign = {
        id: `mock-${Date.now()}`,
        title: input.name,
        description: input.description || "",
        status: "draft",
        startDate: new Date().toISOString(),
        endDate: undefined,
        thumbnail: undefined,
        artefactCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return mockCampaign
    }

    try {
      const result = await createProjectMutation({
        variables: {
          objects: [
            {
              name: input.name,
              description: input.description || null,
              status: input.status || "draft",
            },
          ],
        },
      })

      const createdProject = result.data?.insertIntoProjectsCollection?.records?.[0]
      if (createdProject) {
        return projectToCampaign(createdProject)
      }

      // If no project was returned, it might be an RLS policy issue
      const errorMsg =
        "No project returned - this may be due to Row Level Security policies. Please ensure you are authenticated."
      console.error(errorMsg)
      setMutationError(new Error(errorMsg))
      return null
    } catch (err) {
      console.error("Failed to create campaign:", err)
      setMutationError(err instanceof Error ? err : new Error(String(err)))
      throw err
    }
  }

  return {
    createCampaign,
    loading,
    error: error || mutationError,
    isUsingMockData: !USE_REAL_DATA,
  }
}
