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
 * Get a brand asset by category and slug
 * Currently uses mock data. When brand assets are added to Supabase,
 * this function will be updated to fetch from GraphQL.
 */
export async function getAssetBySlug(category: string, slug: string): Promise<AssetDetail | null> {
  // TODO: When brand assets table is added to Supabase, implement GraphQL fetch
  // For now, always use mock data
  return getMockAssetBySlug(category, slug)
}

/**
 * Get all assets for a category
 */
export async function getAssetsByCategory(category: string): Promise<AssetDetail[]> {
  // TODO: When brand assets table is added to Supabase, implement GraphQL fetch
  // For now, always use mock data
  return getMockAssetsByCategory(category)
}

/**
 * Get all assets for a category as a record
 */
export async function getAllAssetsForCategory(
  category: Category
): Promise<Record<string, AssetDetail>> {
  // TODO: When brand assets table is added to Supabase, implement GraphQL fetch
  // For now, always use mock data
  return getMockAllAssetsForCategory(category)
}

// Re-export types
export type { AssetDetail, ColorValue, FontInfo, IconInfo } from "@/data/mock/assets"
