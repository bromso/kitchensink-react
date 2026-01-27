"use client"

import { useQuery } from "@apollo/client/react"
import { useMemo } from "react"
import {
  GET_ALL_BRAND_GUIDELINES,
  GET_BRAND_GUIDELINE_BY_ID,
  GET_BRAND_GUIDELINES,
} from "@/data/queries/assets"
import { Guideline_Category } from "@/gql/graphql"

// Check if Supabase is configured
const USE_REAL_DATA = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Brand Guideline type from Supabase (snake_case)
interface BrandGuidelineNode {
  id: string
  nodeId: string
  name: string
  description: string | null
  category: Guideline_Category
  guideline_definition: Record<string, unknown>
  is_active: boolean
  organization_id: string
  created_at: string
  updated_at: string
}

// App-friendly type with camelCase
export interface BrandGuideline {
  id: string
  nodeId: string
  name: string
  description: string | null
  category: Guideline_Category
  guidelineDefinition: Record<string, unknown>
  isActive: boolean
  organizationId: string
  createdAt: string
  updatedAt: string
}

interface BrandGuidelinesQueryResult {
  brand_guidelinesCollection: {
    edges: Array<{ cursor: string; node: BrandGuidelineNode }>
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string | null
      endCursor: string | null
    }
  } | null
}

// Type adapter - converts snake_case from Supabase to camelCase for app
function nodeToBrandGuideline(node: BrandGuidelineNode): BrandGuideline {
  return {
    id: node.id,
    nodeId: node.nodeId,
    name: node.name,
    description: node.description,
    category: node.category,
    guidelineDefinition: node.guideline_definition,
    isActive: node.is_active,
    organizationId: node.organization_id,
    createdAt: node.created_at,
    updatedAt: node.updated_at,
  }
}

// Mock data for when Supabase is not configured
const mockBrandGuidelines: BrandGuideline[] = [
  {
    id: "mock-1",
    nodeId: "mock-node-1",
    name: "Primary Logo Usage",
    description: "Guidelines for using the primary logo across all media",
    category: Guideline_Category.LogoUsage,
    guidelineDefinition: {
      minSize: "48px",
      clearSpace: "2x logo height",
      backgrounds: ["white", "dark"],
    },
    isActive: true,
    organizationId: "mock-org",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-2",
    nodeId: "mock-node-2",
    name: "Brand Colors",
    description: "Primary and secondary color palette specifications",
    category: Guideline_Category.ColorPalette,
    guidelineDefinition: {
      primary: "#3902FF",
      secondary: "#FF0040",
      accent: "#FFD700",
    },
    isActive: true,
    organizationId: "mock-org",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-3",
    nodeId: "mock-node-3",
    name: "Typography Standards",
    description: "Font families and sizing guidelines",
    category: Guideline_Category.Typography,
    guidelineDefinition: {
      heading: "Inter Bold",
      body: "Inter Regular",
      minSize: "14px",
    },
    isActive: true,
    organizationId: "mock-org",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

/**
 * Hook to fetch all brand guidelines
 */
export function useBrandGuidelines() {
  const { data, loading, error, refetch } = useQuery<BrandGuidelinesQueryResult>(
    GET_ALL_BRAND_GUIDELINES,
    {
      skip: !USE_REAL_DATA,
      variables: { first: 100 },
    }
  )

  const guidelines = useMemo(() => {
    if (!USE_REAL_DATA) {
      return mockBrandGuidelines
    }

    if (!data?.brand_guidelinesCollection?.edges) {
      return []
    }

    return data.brand_guidelinesCollection.edges.map((edge) => nodeToBrandGuideline(edge.node))
  }, [data])

  return {
    guidelines,
    loading: USE_REAL_DATA ? loading : false,
    error,
    refetch,
    isUsingMockData: !USE_REAL_DATA,
  }
}

/**
 * Hook to fetch brand guidelines by category
 */
export function useBrandGuidelinesByCategory(category: Guideline_Category | null) {
  const { data, loading, error, refetch } = useQuery<BrandGuidelinesQueryResult>(
    GET_BRAND_GUIDELINES,
    {
      skip: !USE_REAL_DATA || !category,
      variables: { first: 50, category },
    }
  )

  const guidelines = useMemo(() => {
    if (!category) return []

    if (!USE_REAL_DATA) {
      return mockBrandGuidelines.filter((g) => g.category === category)
    }

    if (!data?.brand_guidelinesCollection?.edges) {
      return []
    }

    return data.brand_guidelinesCollection.edges.map((edge) => nodeToBrandGuideline(edge.node))
  }, [data, category])

  return {
    guidelines,
    loading: USE_REAL_DATA ? loading : false,
    error,
    refetch,
    isUsingMockData: !USE_REAL_DATA,
  }
}

/**
 * Hook to fetch a single brand guideline by ID
 */
export function useBrandGuideline(id: string | null) {
  const { data, loading, error, refetch } = useQuery<BrandGuidelinesQueryResult>(
    GET_BRAND_GUIDELINE_BY_ID,
    {
      skip: !USE_REAL_DATA || !id,
      variables: { id },
    }
  )

  const guideline = useMemo(() => {
    if (!id) return undefined

    if (!USE_REAL_DATA) {
      return mockBrandGuidelines.find((g) => g.id === id)
    }

    const node = data?.brand_guidelinesCollection?.edges?.[0]?.node
    return node ? nodeToBrandGuideline(node) : undefined
  }, [data, id])

  return {
    guideline,
    loading: USE_REAL_DATA ? loading : false,
    error,
    refetch,
    isUsingMockData: !USE_REAL_DATA,
  }
}

// Re-export the category enum for convenience
export { Guideline_Category }
