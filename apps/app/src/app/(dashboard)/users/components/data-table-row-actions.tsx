"use client"

import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import type { Row } from "@tanstack/react-table"
import Link from "next/link"
import useDialogState from "@/hooks/use-dialog-state"
import type { User } from "../data/schema"
import { UsersActionDialog } from "./users-action-dialog"
import { UsersDeactivateDialog } from "./users-deactivate-dialog"

interface Props {
  row: Row<User>
}

export function DataTableRowActions({ row }: Props) {
  const [open, setOpen] = useDialogState<"edit" | "deactivate">(null)
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
            <Icon icon="radix-icons:dots-horizontal" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/users/${row.original.id}`}>
              View Detail
              <DropdownMenuShortcut>
                <Icon icon="tabler:checklist" />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen("edit")}>
            Edit
            <DropdownMenuShortcut>
              <Icon icon="tabler:edit" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen("deactivate")} className="text-red-500!">
            Deactivate
            <DropdownMenuShortcut>
              <Icon icon="tabler:trash" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UsersActionDialog
        key={`user-edit-${row.original.id}`}
        open={open === "edit"}
        onOpenChange={() => setOpen("edit")}
        currentRow={row.original}
      />

      <UsersDeactivateDialog
        key={`user-deactivate-${row.original.id}`}
        open={open === "deactivate"}
        onOpenChange={() => setOpen("deactivate")}
        currentRow={row.original}
      />
    </>
  )
}
