"use client"

import { Icon } from "@iconify/react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/animate-ui/components/radix/dialog"
import { Button } from "@repo/ui/components/button"
import { ButtonGroup } from "@repo/ui/components/button-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"

interface ActionBarProps {
  onDownload?: () => void
  onCopy?: () => void
  onDelete?: () => void
  disabled?: boolean
  className?: string
}

export function ActionBar({
  onDownload,
  onCopy,
  onDelete,
  disabled = false,
  className,
}: ActionBarProps) {
  return (
    <div className={className}>
      <ButtonGroup>
        <ButtonGroup>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={onDownload} disabled={disabled}>
                  <Icon icon="lucide:download" className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download asset</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={onCopy} disabled={disabled}>
                  <Icon icon="lucide:copy" className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy to clipboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ButtonGroup>
        <ButtonGroup>
          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={disabled}>
                      <Icon icon="lucide:trash-2" className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Delete asset</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>Delete asset</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this asset? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive" onClick={onDelete}>
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  )
}
