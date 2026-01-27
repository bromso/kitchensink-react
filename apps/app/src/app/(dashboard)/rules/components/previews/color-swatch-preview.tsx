"use client"

import { BlurFade } from "@repo/ui/components/blur-fade"
import type { AssetDetail } from "@/data/mock/assets"

interface ColorSwatchPreviewProps {
  asset: AssetDetail | null
  className?: string
}

export function ColorSwatchPreview({ asset, className }: ColorSwatchPreviewProps) {
  const colors = asset?.metadata?.colors || []

  if (!asset || colors.length === 0) return null

  return (
    <BlurFade key={asset.id} className={className} duration={0.4} delay={0.1} direction="up">
      <div className="grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {colors.map((color, index) => (
          <BlurFade
            key={color.hex}
            delay={0.1 + index * 0.05}
            duration={0.3}
            direction="up"
            className="flex flex-col items-center gap-2"
          >
            <div
              className="h-20 w-20 rounded-xl shadow-lg ring-1 ring-black/5"
              style={{ backgroundColor: color.hex }}
            />
            <div className="text-center">
              <p className="text-sm font-medium">{color.name}</p>
              <p className="text-muted-foreground font-mono text-xs">{color.hex}</p>
            </div>
          </BlurFade>
        ))}
      </div>
    </BlurFade>
  )
}
