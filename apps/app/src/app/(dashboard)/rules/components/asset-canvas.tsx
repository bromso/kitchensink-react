"use client"

import DotGrid from "@repo/ui/components/dot-grid"
import GradientBlur from "@repo/ui/components/gradient-blur"
import { cn } from "@repo/ui/lib/utils"
import type { CanvasBackground } from "@/data/config/categories"

interface AssetCanvasProps {
  backgroundType?: CanvasBackground
  children: React.ReactNode
  className?: string
}

export function AssetCanvas({
  backgroundType = "dot-grid",
  children,
  className,
}: AssetCanvasProps) {
  return (
    <div className={cn("relative flex-1 overflow-hidden", className)}>
      {/* Background based on type */}
      {backgroundType === "dot-grid" && (
        <DotGrid
          className="absolute inset-0"
          dotSize={3}
          gap={24}
          baseColor="#e5e5e5"
          activeColor="#3902FF"
          proximity={120}
          shockRadius={200}
        />
      )}

      {backgroundType === "solid" && <div className="bg-muted/30 absolute inset-0" />}

      {backgroundType === "checkered" && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
              linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
              linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
        />
      )}

      {/* Content */}
      {children}

      {/* Gradient blur overlay */}
      <GradientBlur height="16%" className="z-20" />
    </div>
  )
}
