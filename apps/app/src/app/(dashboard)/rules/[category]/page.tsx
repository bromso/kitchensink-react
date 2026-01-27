"use client"

import { AnimatePresence, motion } from "motion/react"
import { notFound, usePathname, useRouter, useSearchParams } from "next/navigation"
import { use } from "react"
import { type Category, getCategoryConfig, isValidCategory } from "@/data/config/categories"
import { useAsset } from "@/data/hooks"
import { ActionBar } from "../components/action-bar"
import { AssetCanvas } from "../components/asset-canvas"
import { AssetDetailsPanel } from "../components/asset-details-panel"
import { AssetPreview } from "../components/asset-preview"
import { ZoomControls } from "../components/zoom-controls"

interface Props {
  params: Promise<{ category: string }>
}

export default function CategoryPage({ params }: Props) {
  const { category } = use(params)

  if (!isValidCategory(category)) {
    notFound()
  }

  return <CategoryPageClient category={category} />
}

function CategoryPageClient({ category }: { category: Category }) {
  const config = getCategoryConfig(category)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const selectedAssetSlug = searchParams.get("asset")
  const { asset: assetData } = useAsset(category, selectedAssetSlug)

  const handleClosePanel = () => {
    router.push(pathname, { scroll: false })
  }

  const handleDownload = () => {
    if (assetData?.downloadUrl) {
      window.open(assetData.downloadUrl, "_blank")
    }
  }

  const handleCopy = () => {
    if (assetData?.src) {
      navigator.clipboard.writeText(assetData.src)
    }
  }

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete asset:", assetData?.id)
  }

  return (
    <div className="relative flex h-full min-h-full w-full overflow-hidden">
      {/* Main content area */}
      <AssetCanvas backgroundType={config.canvasBackground}>
        {/* Zoom controls - top center */}
        <ZoomControls className="absolute left-1/2 top-4 z-20 -translate-x-1/2" />

        {/* Action bar - bottom center */}
        <ActionBar
          className="absolute bottom-4 left-1/2 z-100 -translate-x-1/2"
          onDownload={handleDownload}
          onCopy={handleCopy}
          onDelete={handleDelete}
          disabled={!assetData}
        />

        {/* Asset preview */}
        <AssetPreview previewType={config.previewType} asset={assetData} />
      </AssetCanvas>

      {/* Right-side inline panel */}
      <AnimatePresence>
        {assetData && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="bg-background h-full w-[400px] border-l"
          >
            <AssetDetailsPanel asset={assetData} onClose={handleClosePanel} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
