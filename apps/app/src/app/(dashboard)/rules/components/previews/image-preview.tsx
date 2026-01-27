"use client"

import { BlurFade } from "@repo/ui/components/blur-fade"
import Image from "next/image"
import type { AssetDetail } from "@/data/mock/assets"

interface ImagePreviewProps {
  asset: AssetDetail | null
  className?: string
}

export function ImagePreview({ asset, className }: ImagePreviewProps) {
  if (!asset) return null

  return (
    <BlurFade key={asset.id} className={className} duration={0.4} delay={0.1} direction="up">
      <Image
        src={asset.src}
        alt={asset.name}
        width={360}
        height={360}
        priority
        className="object-contain"
      />
    </BlurFade>
  )
}
