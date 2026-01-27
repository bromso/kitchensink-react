"use client"

import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import useDialogState from "@/hooks/use-dialog-state"
import { UsersActionDialog } from "./users-action-dialog"
import { UsersInviteDialog } from "./users-invite-dialog"

export function UserPrimaryActions() {
  const [open, setOpen] = useDialogState<"invite" | "add">(null)
  return (
    <>
      <div className="flex justify-end gap-2">
        <Button variant="outline" className="space-x-1" onClick={() => setOpen("invite")}>
          <span>Invite User</span> <Icon icon="tabler:mail-plus" />
        </Button>
        <Button className="space-x-1" onClick={() => setOpen("add")}>
          <span>Add User</span> <Icon icon="tabler:user-plus" />
        </Button>
      </div>

      <UsersActionDialog key="user-add" open={open === "add"} onOpenChange={() => setOpen("add")} />

      <UsersInviteDialog
        key="user-invite"
        open={open === "invite"}
        onOpenChange={() => setOpen("invite")}
      />
    </>
  )
}
