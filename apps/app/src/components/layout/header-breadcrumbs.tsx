"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { getAssetNameFromSlug } from "@/data/mock/assets"
import { getArtefactById, getCampaignById } from "@/data/mock/campaigns"

function formatSegment(segment: string): string {
  // Handle dynamic segments like [id]
  if (segment.startsWith("[") && segment.endsWith("]")) {
    return segment.slice(1, -1).charAt(0).toUpperCase() + segment.slice(2, -1)
  }

  // Handle segments with hyphens and special characters
  return segment
    .split(/[-_&]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function HeaderBreadcrumbs() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectedAsset = searchParams.get("asset")
  const selectedCampaignId = searchParams.get("campaign")
  const selectedArtefactId = searchParams.get("artefact")

  // Get campaign and artefact data
  const campaign = selectedCampaignId ? getCampaignById(selectedCampaignId) : null
  const artefact = selectedArtefactId ? getArtefactById(selectedArtefactId) : null

  // Split pathname and filter out empty segments and route groups (parentheses)
  const segments = pathname.split("/").filter((segment) => segment && !segment.startsWith("("))

  // Check if we're on a campaigns page
  const isCampaignsPage = segments[0] === "campaigns"

  // Determine if we have dynamic context that should show as the final breadcrumb
  const hasDynamicContext = selectedAsset || (isCampaignsPage && (campaign || artefact))

  // Show "Home" on root, otherwise show full breadcrumb trail
  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`
          const isLastSegment = index === segments.length - 1
          const label = formatSegment(segment)

          return (
            <Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLastSegment && !hasDynamicContext ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}

        {/* Add asset breadcrumb if selected */}
        {selectedAsset && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{getAssetNameFromSlug(selectedAsset)}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {/* Add campaign breadcrumb if selected */}
        {isCampaignsPage && campaign && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {artefact ? (
                <BreadcrumbLink asChild>
                  <Link href={`/campaigns?campaign=${campaign.id}`}>{campaign.title}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{campaign.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* Add artefact breadcrumb if selected */}
        {isCampaignsPage && artefact && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{artefact.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
