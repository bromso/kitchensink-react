import { Icon } from "@iconify/react"

interface Props {
  status: boolean
}

export function WebhookStatusIcon({ status }: Props) {
  if (status) {
    return <Icon icon="lucide:circle-check" className="h-4 w-4 stroke-background fill-green-500" />
  }

  return (
    <Icon
      icon="lucide:circle-minus"
      className="h-4 w-4 fill-muted-foreground/75 stroke-background"
    />
  )
}
