"use client"

import { Input } from "@repo/ui/components/input"
import { ScrollArea } from "@repo/ui/components/scroll-area"
import { cn } from "@repo/ui/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  type Category,
  getAllCategories,
  getCategoryConfig,
  isValidCategory,
} from "@/data/config/categories"
import { useAssetsByCategory } from "@/data/hooks"
import { type AssetDetail, slugify } from "@/data/mock/assets"

export interface NavItem {
  title: string
  subtitle?: string
  href: string
}

export interface BrandSidebarProps {
  /** Whether to show the sidebar */
  visible?: boolean
  /** Whether to show the search input */
  showSearch?: boolean
  /** Search placeholder text */
  searchPlaceholder?: string
  /** Custom width (default: 300px) */
  width?: number | string
  /** Additional class names */
  className?: string
  /** Callback when an asset is selected */
  onAssetSelect?: (asset: AssetDetail) => void
  /** Callback when search value changes */
  onSearchChange?: (value: string) => void
  /** Custom header content (replaces default title/subtitle) */
  headerContent?: React.ReactNode
  /** Custom footer content */
  footerContent?: React.ReactNode
}

// Generate nav items from category config
function getNavItems(): NavItem[] {
  return getAllCategories().map((config) => ({
    title: config.label,
    subtitle: config.subtitle,
    href: `/rules/${config.id}`,
  }))
}

// Get current category from pathname
function getCategoryFromPathname(pathname: string): Category | null {
  const segments = pathname.split("/")
  const categorySegment = segments[segments.length - 1]
  return isValidCategory(categorySegment) ? categorySegment : null
}

export function BrandSidebar({
  visible = true,
  showSearch = true,
  searchPlaceholder = "Search assets...",
  width = 300,
  className,
  onAssetSelect,
  onSearchChange,
  headerContent,
  footerContent,
}: BrandSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedAsset = searchParams.get("asset")

  const navItems = getNavItems()
  const currentCategory = getCategoryFromPathname(pathname)
  const categoryConfig = currentCategory ? getCategoryConfig(currentCategory) : null
  const { assets } = useAssetsByCategory(currentCategory)

  if (!visible) {
    return null
  }

  const activeItem = navItems.find((item) => pathname === item.href) || navItems[0]
  const widthStyle = typeof width === "number" ? `${width}px` : width

  const handleAssetSelect = (asset: AssetDetail) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("asset", slugify(asset.name))
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
    onAssetSelect?.(asset)
  }

  return (
    <div
      className={cn(
        "bg-muted/40 hidden h-full flex-col overflow-hidden border-r md:flex",
        className
      )}
      style={{ width: widthStyle }}
    >
      <div className="flex shrink-0 flex-col gap-3.5 border-b p-4">
        {headerContent || (
          <div className="flex w-full flex-col gap-1">
            <h2 className="text-foreground text-base font-medium">
              {categoryConfig?.label || activeItem?.title}
            </h2>
            {(categoryConfig?.subtitle || activeItem?.subtitle) && (
              <p className="text-muted-foreground text-xs">
                {categoryConfig?.subtitle || activeItem?.subtitle}
              </p>
            )}
          </div>
        )}
        {showSearch && (
          <Input
            placeholder={searchPlaceholder}
            className="h-8"
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        )}
      </div>
      <ScrollArea className="h-0 min-h-0 flex-1">
        <AssetList
          assets={assets}
          onAssetSelect={handleAssetSelect}
          selectedAsset={selectedAsset}
        />
        <div className="pb-24" />
      </ScrollArea>
      {footerContent && <div className="border-t p-4">{footerContent}</div>}
    </div>
  )
}

interface AssetListProps {
  assets: AssetDetail[]
  onAssetSelect?: (asset: AssetDetail) => void
  selectedAsset?: string | null
}

function AssetList({ assets, onAssetSelect, selectedAsset }: AssetListProps) {
  if (assets.length === 0) {
    return <div className="text-muted-foreground p-4 text-center text-sm">No assets available</div>
  }

  return (
    <>
      {assets.map((asset) => {
        const assetSlug = slugify(asset.name)
        const isSelected = selectedAsset === assetSlug

        return (
          <button
            type="button"
            key={asset.id}
            onClick={() => onAssetSelect?.(asset)}
            className={cn(
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full cursor-pointer flex-col items-start gap-2 border-b p-4 text-left text-sm leading-tight whitespace-nowrap last:border-b-0 transition-colors",
              isSelected && "bg-sidebar-accent text-sidebar-accent-foreground"
            )}
          >
            <div className="flex w-full items-center gap-2">
              <span className="font-medium">{asset.name}</span>
              <span className="ml-auto text-xs">{asset.date}</span>
            </div>
            <span className="text-muted-foreground text-xs">{asset.type}</span>
            <span className="text-muted-foreground line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
              {asset.description}
            </span>
          </button>
        )
      })}
    </>
  )
}
