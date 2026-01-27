// Asset Mock Data
// Centralized asset data with slugs and image sources

import type { Category } from "../config/categories"

// Color value for palette assets
export interface ColorValue {
  name: string
  hex: string
  rgb: string
}

// Font info for typography assets
export interface FontInfo {
  fontFamily: string
  fontWeight: string
  fontStyle?: string
  sampleText?: string
}

// Icon info for iconography assets
export interface IconInfo {
  icons: string[]
  style: string
  count: number
}

export interface AssetDetail {
  id: string
  name: string
  type: string
  date: string
  description: string
  src: string
  category: Category
  downloadUrl?: string
  metadata?: {
    // Common
    format?: string
    dimensions?: string
    fileSize?: string
    // Palette specific
    colors?: ColorValue[]
    // Typography specific
    font?: FontInfo
    // Iconography specific
    iconInfo?: IconInfo
  }
}

// Logotype Assets
export const logotypeAssets: Record<string, AssetDetail> = {
  "primary-logo": {
    id: "primary-logo",
    name: "Primary Logo",
    type: "SVG",
    date: "Today",
    description: "Main brand logo in full color",
    src: "/logos/redbull-symbol-logo.svg",
    category: "logotype",
    metadata: {
      format: "SVG",
      dimensions: "512x512",
    },
  },
  "logo-mark": {
    id: "logo-mark",
    name: "Logo Mark",
    type: "SVG",
    date: "Today",
    description: "Simplified icon version",
    src: "/logos/redbull-symbol-text-logo.svg",
    category: "logotype",
    metadata: {
      format: "SVG",
      dimensions: "256x256",
    },
  },
  wordmark: {
    id: "wordmark",
    name: "Wordmark",
    type: "SVG",
    date: "Yesterday",
    description: "Text-only logo variant",
    src: "/logos/redbull-symbol-logo.svg",
    category: "logotype",
    metadata: {
      format: "SVG",
      dimensions: "800x200",
    },
  },
  "logo-dark": {
    id: "logo-dark",
    name: "Logo Dark",
    type: "SVG",
    date: "2 days ago",
    description: "Dark mode version",
    src: "/logos/redbull-symbol-logo.svg",
    category: "logotype",
    metadata: {
      format: "SVG",
      dimensions: "512x512",
    },
  },
  "logo-light": {
    id: "logo-light",
    name: "Logo Light",
    type: "SVG",
    date: "2 days ago",
    description: "Light backgrounds version",
    src: "/logos/redbull-symbol-logo.svg",
    category: "logotype",
    metadata: {
      format: "SVG",
      dimensions: "512x512",
    },
  },
}

// Palette Assets
export const paletteAssets: Record<string, AssetDetail> = {
  "primary-colors": {
    id: "primary-colors",
    name: "Primary Colors",
    type: "Theme",
    date: "Today",
    description: "Main brand color palette with primary accent colors",
    src: "",
    category: "palette",
    metadata: {
      colors: [
        { name: "Brand Blue", hex: "#3902FF", rgb: "57, 2, 255" },
        { name: "Brand Red", hex: "#FF0040", rgb: "255, 0, 64" },
        { name: "Brand Yellow", hex: "#FFD700", rgb: "255, 215, 0" },
        { name: "Brand Black", hex: "#0A0A0A", rgb: "10, 10, 10" },
      ],
    },
  },
  "secondary-colors": {
    id: "secondary-colors",
    name: "Secondary Colors",
    type: "Theme",
    date: "Yesterday",
    description: "Supporting color palette for UI elements",
    src: "",
    category: "palette",
    metadata: {
      colors: [
        { name: "Light Gray", hex: "#F5F5F5", rgb: "245, 245, 245" },
        { name: "Medium Gray", hex: "#9CA3AF", rgb: "156, 163, 175" },
        { name: "Dark Gray", hex: "#374151", rgb: "55, 65, 81" },
        { name: "Success Green", hex: "#10B981", rgb: "16, 185, 129" },
        { name: "Warning Orange", hex: "#F59E0B", rgb: "245, 158, 11" },
        { name: "Error Red", hex: "#EF4444", rgb: "239, 68, 68" },
      ],
    },
  },
  "gradient-collection": {
    id: "gradient-collection",
    name: "Gradient Collection",
    type: "Theme",
    date: "3 days ago",
    description: "Brand gradients for backgrounds and accents",
    src: "",
    category: "palette",
    metadata: {
      colors: [
        { name: "Sunset", hex: "#FF6B6B → #FFE66D", rgb: "gradient" },
        { name: "Ocean", hex: "#667EEA → #764BA2", rgb: "gradient" },
        { name: "Forest", hex: "#11998E → #38EF7D", rgb: "gradient" },
      ],
    },
  },
}

// Typography Assets
export const typographyAssets: Record<string, AssetDetail> = {
  "heading-styles": {
    id: "heading-styles",
    name: "Heading Styles",
    type: "Font Family",
    date: "Today",
    description: "H1-H6 typography definitions for headlines",
    src: "",
    category: "typography",
    metadata: {
      font: {
        fontFamily: "Inter",
        fontWeight: "700",
        sampleText: "The quick brown fox jumps over the lazy dog",
      },
      format: "Variable Font",
    },
  },
  "body-text": {
    id: "body-text",
    name: "Body Text",
    type: "Font Family",
    date: "Today",
    description: "Paragraph and body copy styles",
    src: "",
    category: "typography",
    metadata: {
      font: {
        fontFamily: "Inter",
        fontWeight: "400",
        sampleText: "The quick brown fox jumps over the lazy dog",
      },
      format: "Variable Font",
    },
  },
  "display-font": {
    id: "display-font",
    name: "Display Font",
    type: "Font Family",
    date: "Yesterday",
    description: "Large display text for hero sections",
    src: "",
    category: "typography",
    metadata: {
      font: {
        fontFamily: "Cal Sans",
        fontWeight: "600",
        sampleText: "Make it bold",
      },
      format: "OTF",
    },
  },
  "monospace-code": {
    id: "monospace-code",
    name: "Monospace Code",
    type: "Font Family",
    date: "2 days ago",
    description: "Code blocks and technical content",
    src: "",
    category: "typography",
    metadata: {
      font: {
        fontFamily: "JetBrains Mono",
        fontWeight: "400",
        sampleText: "const brand = 'awesome'",
      },
      format: "Variable Font",
    },
  },
  "caption-styles": {
    id: "caption-styles",
    name: "Caption Styles",
    type: "Font Family",
    date: "3 days ago",
    description: "Small text for labels and captions",
    src: "",
    category: "typography",
    metadata: {
      font: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontStyle: "normal",
        sampleText: "Caption text example",
      },
      format: "Variable Font",
    },
  },
}

// Iconography Assets
export const iconographyAssets: Record<string, AssetDetail> = {
  "ui-icons": {
    id: "ui-icons",
    name: "UI Icons",
    type: "Icon Set",
    date: "Today",
    description: "Interface icons for buttons and navigation",
    src: "",
    category: "iconography",
    metadata: {
      iconInfo: {
        icons: [
          "ph:house-fill",
          "ph:gear-fill",
          "ph:user-fill",
          "ph:bell-fill",
          "ph:magnifying-glass",
          "ph:plus",
          "ph:x",
          "ph:check",
          "ph:arrow-right",
          "ph:arrow-left",
          "ph:caret-down",
          "ph:dots-three",
        ],
        style: "Phosphor Filled",
        count: 12,
      },
      format: "SVG",
    },
  },
  "brand-icons": {
    id: "brand-icons",
    name: "Brand Icons",
    type: "Icon Set",
    date: "Today",
    description: "Custom brand-specific iconography",
    src: "",
    category: "iconography",
    metadata: {
      iconInfo: {
        icons: [
          "ph:rocket-fill",
          "ph:lightning-fill",
          "ph:star-fill",
          "ph:heart-fill",
          "ph:trophy-fill",
          "ph:medal-fill",
        ],
        style: "Phosphor Filled",
        count: 6,
      },
      format: "SVG",
    },
  },
  "social-icons": {
    id: "social-icons",
    name: "Social Icons",
    type: "Icon Set",
    date: "Yesterday",
    description: "Social media platform icons",
    src: "",
    category: "iconography",
    metadata: {
      iconInfo: {
        icons: [
          "ph:twitter-logo-fill",
          "ph:instagram-logo-fill",
          "ph:facebook-logo-fill",
          "ph:linkedin-logo-fill",
          "ph:youtube-logo-fill",
          "ph:tiktok-logo-fill",
          "ph:discord-logo-fill",
          "ph:github-logo-fill",
        ],
        style: "Phosphor Filled",
        count: 8,
      },
      format: "SVG",
    },
  },
  "status-icons": {
    id: "status-icons",
    name: "Status Icons",
    type: "Icon Set",
    date: "2 days ago",
    description: "Icons for states and notifications",
    src: "",
    category: "iconography",
    metadata: {
      iconInfo: {
        icons: [
          "ph:check-circle-fill",
          "ph:x-circle-fill",
          "ph:warning-fill",
          "ph:info-fill",
          "ph:question-fill",
          "ph:clock-fill",
        ],
        style: "Phosphor Filled",
        count: 6,
      },
      format: "SVG",
    },
  },
}

// Imagery Assets
export const imageryAssets: Record<string, AssetDetail> = {
  "hero-image-1": {
    id: "hero-image-1",
    name: "Hero Image - Energy",
    type: "Photography",
    date: "Today",
    description: "High-energy action shot for homepage hero",
    src: "/ads/redbull-ad-1.webp",
    category: "imagery",
    metadata: {
      format: "WebP",
      dimensions: "1920x1080",
      fileSize: "245 KB",
    },
  },
  "hero-image-2": {
    id: "hero-image-2",
    name: "Hero Image - Adventure",
    type: "Photography",
    date: "Today",
    description: "Outdoor adventure lifestyle shot",
    src: "/ads/redbull-ad-1.webp",
    category: "imagery",
    metadata: {
      format: "WebP",
      dimensions: "1920x1080",
      fileSize: "312 KB",
    },
  },
  "product-shot-1": {
    id: "product-shot-1",
    name: "Product Shot - Can",
    type: "Product Photography",
    date: "Yesterday",
    description: "Clean product photography on white background",
    src: "/ads/redbull-ad-1.webp",
    category: "imagery",
    metadata: {
      format: "PNG",
      dimensions: "1200x1200",
      fileSize: "89 KB",
    },
  },
  "lifestyle-1": {
    id: "lifestyle-1",
    name: "Lifestyle - Sports",
    type: "Lifestyle Photography",
    date: "2 days ago",
    description: "Athletes in action with product integration",
    src: "/ads/redbull-ad-1.webp",
    category: "imagery",
    metadata: {
      format: "WebP",
      dimensions: "1600x900",
      fileSize: "198 KB",
    },
  },
  "background-pattern": {
    id: "background-pattern",
    name: "Background Pattern",
    type: "Pattern",
    date: "3 days ago",
    description: "Repeating brand pattern for backgrounds",
    src: "/ads/redbull-ad-1.webp",
    category: "imagery",
    metadata: {
      format: "SVG",
      dimensions: "Tileable",
      fileSize: "12 KB",
    },
  },
}

// Illustrator Assets
export const illustratorAssets: Record<string, AssetDetail> = {
  "mascot-character": {
    id: "mascot-character",
    name: "Mascot Character",
    type: "Character Design",
    date: "Today",
    description: "Brand mascot in various poses",
    src: "/ads/redbull-ad-1.webp",
    category: "illustrator",
    metadata: {
      format: "SVG",
      dimensions: "Vector",
    },
  },
  "scene-illustration": {
    id: "scene-illustration",
    name: "Scene Illustration",
    type: "Scene",
    date: "Today",
    description: "Full scene illustration for marketing",
    src: "/ads/redbull-ad-1.webp",
    category: "illustrator",
    metadata: {
      format: "SVG",
      dimensions: "1920x1080",
    },
  },
  "icon-illustrations": {
    id: "icon-illustrations",
    name: "Icon Illustrations",
    type: "Decorative Icons",
    date: "Yesterday",
    description: "Hand-drawn style decorative icons",
    src: "/ads/redbull-ad-1.webp",
    category: "illustrator",
    metadata: {
      format: "SVG",
      dimensions: "Various",
    },
  },
  "spot-illustrations": {
    id: "spot-illustrations",
    name: "Spot Illustrations",
    type: "Spot Art",
    date: "2 days ago",
    description: "Small illustrations for UI accents",
    src: "/ads/redbull-ad-1.webp",
    category: "illustrator",
    metadata: {
      format: "SVG",
      dimensions: "256x256",
    },
  },
  "infographic-elements": {
    id: "infographic-elements",
    name: "Infographic Elements",
    type: "Infographic",
    date: "3 days ago",
    description: "Data visualization illustrations",
    src: "/ads/redbull-ad-1.webp",
    category: "illustrator",
    metadata: {
      format: "SVG",
      dimensions: "Various",
    },
  },
}

// Social Media Assets (keeping existing)
export const socialMediaAssets: Record<string, AssetDetail> = {
  "instagram-story---summer-sale": {
    id: "instagram-story---summer-sale",
    name: "Instagram Story - Summer Sale",
    type: "Story Ad",
    date: "Today",
    description: "Vertical 1080x1920 summer promotion",
    src: "/ads/redbull-ad-1.webp",
    category: "imagery",
    metadata: {
      format: "WebP",
      dimensions: "1080x1920",
    },
  },
  "facebook-carousel---product-launch": {
    id: "facebook-carousel---product-launch",
    name: "Facebook Carousel - Product Launch",
    type: "Carousel",
    date: "Today",
    description: "5-image carousel for new product line",
    src: "/ads/redbull-ad-1.webp",
    category: "imagery",
    metadata: {
      format: "WebP",
      dimensions: "1080x1080",
    },
  },
  "linkedin-post---q4-report": {
    id: "linkedin-post---q4-report",
    name: "LinkedIn Post - Q4 Report",
    type: "Post",
    date: "Yesterday",
    description: "Corporate announcement graphic",
    src: "/ads/redbull-ad-1.webp",
    category: "imagery",
    metadata: {
      format: "PNG",
      dimensions: "1200x628",
    },
  },
  "tiktok-ad---brand-awareness": {
    id: "tiktok-ad---brand-awareness",
    name: "TikTok Ad - Brand Awareness",
    type: "Video Ad",
    date: "2 days ago",
    description: "15-second vertical video ad",
    src: "/ads/redbull-ad-1.webp",
    category: "imagery",
    metadata: {
      format: "MP4",
      dimensions: "1080x1920",
    },
  },
  "twitter/x-banner-update": {
    id: "twitter/x-banner-update",
    name: "Twitter/X Banner Update",
    type: "Banner",
    date: "3 days ago",
    description: "Profile header for campaign period",
    src: "/ads/redbull-ad-1.webp",
    category: "imagery",
    metadata: {
      format: "PNG",
      dimensions: "1500x500",
    },
  },
}

// Category to assets mapping
const assetsByCategory: Record<string, Record<string, AssetDetail>> = {
  logotype: logotypeAssets,
  palette: paletteAssets,
  typography: typographyAssets,
  iconography: iconographyAssets,
  imagery: imageryAssets,
  illustrator: illustratorAssets,
  "social-media": socialMediaAssets,
}

// Helper functions
export function getAssetBySlug(category: string, slug: string): AssetDetail | null {
  return assetsByCategory[category]?.[slug] ?? null
}

export function getAssetsByCategory(category: string): AssetDetail[] {
  const assets = assetsByCategory[category]
  return assets ? Object.values(assets) : []
}

export function getAllAssetsForCategory(category: Category): Record<string, AssetDetail> {
  return assetsByCategory[category] ?? {}
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-")
}

export function getAssetNameFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
