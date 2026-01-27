"use client"

import type { PreviewType } from "@/data/config/categories"
import type { AssetDetail } from "@/data/mock/assets"
import { ColorSwatchPreview, FontSpecimenPreview, IconGridPreview, ImagePreview } from "./previews"

interface AssetPreviewProps {
  previewType: PreviewType
  asset: AssetDetail | null
}

export function AssetPreview({ previewType, asset }: AssetPreviewProps) {
  const previewClassName = "absolute inset-0 z-10 flex items-center justify-center"

  switch (previewType) {
    case "image":
      return <ImagePreview asset={asset} className={previewClassName} />
    case "color-swatch":
      return <ColorSwatchPreview asset={asset} className={previewClassName} />
    case "font-specimen":
      return <FontSpecimenPreview asset={asset} className={previewClassName} />
    case "icon-grid":
      return <IconGridPreview asset={asset} className={previewClassName} />
    default:
      return null
  }
}
