"use client"

import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import { useState } from "react"
import type { Task } from "../data/schema"
import { TasksDetailDialog } from "./tasks-detail-dialog"

interface Props {
  currentRow: Task
}

export function TaskDetailViewer({ currentRow }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="ghost" size="icon" className="size-7" onClick={() => setOpen(true)}>
        <Icon icon="tabler:eye" />
        <span className="sr-only">Open Task Detail</span>
      </Button>

      <TasksDetailDialog
        key="task-detail"
        open={open}
        onOpenChange={setOpen}
        currentRow={currentRow}
      />
    </>
  )
}
