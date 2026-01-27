"use client"

import { useMemo } from "react"
import type { Category } from "@/data/config/categories"
import {
  type AssetDetail,
  getAllAssetsForCategory as getMockAllAssetsForCategory,
  getAssetBySlug as getMockAssetBySlug,
  getAssetsByCategory as getMockAssetsByCategory,
} from "@/data/mock/assets"

// Check if Supabase is configured
const USE_REAL_DATA = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

/**
 * Hook to get a brand asset by category and slug
 */
export function useAsset(category: string | null, slug: string | null) {
  const asset = useMemo(() => {
    if (!category || !slug) return null

    // TODO: When brand assets table is added to Supabase, implement GraphQL fetch
    // For now, always use mock data
    return getMockAssetBySlug(category, slug)
  }, [category, slug])

  return {
    asset,
    loading: false,
    error: null,
    isUsingMockData: true,
  }
}

/**
 * Hook to get all assets for a category
 */
export function useAssetsByCategory(category: string | null) {
  const assets = useMemo(() => {
    if (!category) return []

    // TODO: When brand assets table is added to Supabase, implement GraphQL fetch
    // For now, always use mock data
    return getMockAssetsByCategory(category)
  }, [category])

  return {
    assets,
    loading: false,
    error: null,
    isUsingMockData: true,
  }
}

/**
 * Hook to get all assets for a category as a record
 */
export function useAllAssetsForCategory(category: Category | null) {
  const assets = useMemo(() => {
    if (!category) return {}

    // TODO: When brand assets table is added to Supabase, implement GraphQL fetch
    // For now, always use mock data
    return getMockAllAssetsForCategory(category)
  }, [category])

  return {
    assets,
    loading: false,
    error: null,
    isUsingMockData: true,
  }
}
