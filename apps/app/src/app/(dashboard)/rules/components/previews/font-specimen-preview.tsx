"use client"

import { BlurFade } from "@repo/ui/components/blur-fade"
import type { AssetDetail } from "@/data/mock/assets"

interface FontSpecimenPreviewProps {
  asset: AssetDetail | null
  className?: string
}

const SAMPLE_SIZES = [
  { size: 48, label: "Display" },
  { size: 32, label: "Heading" },
  { size: 24, label: "Subheading" },
  { size: 16, label: "Body" },
  { size: 14, label: "Small" },
]

export function FontSpecimenPreview({ asset, className }: FontSpecimenPreviewProps) {
  const fontInfo = asset?.metadata?.font

  const sampleText = fontInfo?.sampleText || "The quick brown fox jumps over the lazy dog"

  if (!asset || !fontInfo) return null

  return (
    <BlurFade key={asset.id} className={className} duration={0.4} delay={0.1} direction="up">
      <div className="flex flex-col gap-8 p-8">
        {/* Font name header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{fontInfo.fontFamily}</h2>
          <p className="text-muted-foreground text-sm">
            {fontInfo.fontWeight}
            {fontInfo.fontStyle && ` · ${fontInfo.fontStyle}`}
          </p>
        </div>

        {/* Size specimens */}
        <div className="flex flex-col gap-6">
          {SAMPLE_SIZES.map(({ size, label }, index) => (
            <BlurFade
              key={size}
              delay={0.1 + index * 0.05}
              duration={0.3}
              direction="right"
              className="flex items-baseline gap-4"
            >
              <span className="text-muted-foreground w-24 shrink-0 text-right text-xs">
                {label} · {size}px
              </span>
              <span
                style={{
                  fontSize: `${size}px`,
                  fontFamily: fontInfo.fontFamily,
                  fontWeight: fontInfo.fontWeight === "Bold" ? 700 : 400,
                  fontStyle: fontInfo.fontStyle === "Italic" ? "italic" : "normal",
                }}
                className="truncate"
              >
                {sampleText}
              </span>
            </BlurFade>
          ))}
        </div>

        {/* Character set */}
        <BlurFade delay={0.4} duration={0.3} direction="up">
          <div className="border-t pt-6">
            <p className="text-muted-foreground mb-4 text-xs uppercase tracking-wide">
              Character Set
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{
                fontFamily: fontInfo.fontFamily,
                fontWeight: fontInfo.fontWeight === "Bold" ? 700 : 400,
              }}
            >
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789 !@#$%^&*()
            </p>
          </div>
        </BlurFade>
      </div>
    </BlurFade>
  )
}
