export const VALID_CATEGORIES = [
  "logotype",
  "palette",
  "typography",
  "iconography",
  "imagery",
  "illustrator",
] as const

export type Category = (typeof VALID_CATEGORIES)[number]

export type PreviewType = "image" | "color-swatch" | "font-specimen" | "icon-grid"
export type CanvasBackground = "dot-grid" | "solid" | "checkered"

export interface CategoryConfig {
  id: Category
  label: string
  subtitle: string
  icon: string
  previewType: PreviewType
  canvasBackground: CanvasBackground
  metadataFields: string[]
}

export const categoryConfigs: Record<Category, CategoryConfig> = {
  logotype: {
    id: "logotype",
    label: "Logotype",
    subtitle: "Logos and brand marks",
    icon: "ph:shapes-fill",
    previewType: "image",
    canvasBackground: "dot-grid",
    metadataFields: ["type", "date", "dimensions", "format"],
  },
  palette: {
    id: "palette",
    label: "Palette",
    subtitle: "Color system and themes",
    icon: "ph:palette-fill",
    previewType: "color-swatch",
    canvasBackground: "dot-grid",
    metadataFields: ["type", "date", "colorCount"],
  },
  typography: {
    id: "typography",
    label: "Typography",
    subtitle: "Fonts and text styles",
    icon: "ph:text-aa-fill",
    previewType: "font-specimen",
    canvasBackground: "dot-grid",
    metadataFields: ["fontFamily", "fontWeight", "format"],
  },
  iconography: {
    id: "iconography",
    label: "Iconography",
    subtitle: "Icons and symbols",
    icon: "ph:star-fill",
    previewType: "icon-grid",
    canvasBackground: "dot-grid",
    metadataFields: ["iconCount", "style", "format"],
  },
  imagery: {
    id: "imagery",
    label: "Imagery",
    subtitle: "Photos and graphics",
    icon: "ph:image-fill",
    previewType: "image",
    canvasBackground: "dot-grid",
    metadataFields: ["dimensions", "format", "date"],
  },
  illustrator: {
    id: "illustrator",
    label: "Illustrator",
    subtitle: "Illustrations and artwork",
    icon: "ph:paint-brush-fill",
    previewType: "image",
    canvasBackground: "dot-grid",
    metadataFields: ["style", "dimensions", "format"],
  },
}

export function getCategoryConfig(id: Category): CategoryConfig {
  return categoryConfigs[id]
}

export function isValidCategory(id: string): id is Category {
  return VALID_CATEGORIES.includes(id as Category)
}

export function getAllCategories(): CategoryConfig[] {
  return VALID_CATEGORIES.map((id) => categoryConfigs[id])
}

/**
 * Maps app category to brand guideline category for Supabase queries
 * App categories: logotype, palette, typography, iconography, imagery, illustrator
 * Guideline categories: ColorPalette, Imagery, LogoUsage, ToneVoice, Typography, Other
 */
export type GuidelineCategory =
  | "ColorPalette"
  | "Imagery"
  | "LogoUsage"
  | "ToneVoice"
  | "Typography"
  | "Other"

const categoryToGuidelineMap: Record<Category, GuidelineCategory> = {
  logotype: "LogoUsage",
  palette: "ColorPalette",
  typography: "Typography",
  iconography: "Other",
  imagery: "Imagery",
  illustrator: "Imagery",
}

export function getGuidelineCategoryForAssetCategory(category: Category): GuidelineCategory {
  return categoryToGuidelineMap[category]
}
