"use client"

import { Icon } from "@iconify/react"
import { BlurFade } from "@repo/ui/components/blur-fade"
import type { AssetDetail } from "@/data/mock/assets"

interface IconGridPreviewProps {
  asset: AssetDetail | null
  className?: string
}

export function IconGridPreview({ asset, className }: IconGridPreviewProps) {
  const iconInfo = asset?.metadata?.iconInfo

  if (!asset || !iconInfo) return null

  return (
    <BlurFade key={asset.id} className={className} duration={0.4} delay={0.1} direction="up">
      <div className="flex flex-col gap-6 p-8">
        {/* Icon set header */}
        <div className="text-center">
          <h2 className="text-xl font-semibold">{asset.name}</h2>
          <p className="text-muted-foreground text-sm">
            {iconInfo.count} icons · {iconInfo.style}
          </p>
        </div>

        {/* Icon grid */}
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
          {iconInfo.icons.map((icon, index) => (
            <BlurFade
              key={icon}
              delay={0.1 + index * 0.02}
              duration={0.3}
              direction="up"
              className="bg-background hover:bg-muted group flex flex-col items-center gap-2 rounded-lg p-3 transition-colors"
            >
              <Icon
                icon={icon}
                className="text-foreground h-6 w-6 transition-transform group-hover:scale-110"
              />
              <span className="text-muted-foreground max-w-full truncate text-[10px]">
                {icon.split(":")[1]}
              </span>
            </BlurFade>
          ))}
        </div>
      </div>
    </BlurFade>
  )
}
