"use client"

import { Button } from "@repo/ui/components/button"
import { ButtonGroup } from "@repo/ui/components/button-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"

export type ZoomLevel = "fit" | "fill" | "100"

interface ZoomControlsProps {
  currentZoom?: ZoomLevel
  onZoomChange?: (zoom: ZoomLevel) => void
  className?: string
}

export function ZoomControls({ currentZoom = "fit", onZoomChange, className }: ZoomControlsProps) {
  const handleZoomChange = (zoom: ZoomLevel) => {
    onZoomChange?.(zoom)
  }

  return (
    <div className={className}>
      <ButtonGroup>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={currentZoom === "fit" ? "default" : "outline"}
                size="sm"
                onClick={() => handleZoomChange("fit")}
              >
                Fit
              </Button>
            </TooltipTrigger>
            <TooltipContent>Fit to view</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={currentZoom === "fill" ? "default" : "outline"}
                size="sm"
                onClick={() => handleZoomChange("fill")}
              >
                Fill
              </Button>
            </TooltipTrigger>
            <TooltipContent>Fill container</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={currentZoom === "100" ? "default" : "outline"}
                size="sm"
                onClick={() => handleZoomChange("100")}
              >
                100%
              </Button>
            </TooltipTrigger>
            <TooltipContent>Original size</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ButtonGroup>
    </div>
  )
}
