import { Icon } from "@iconify/react"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"
import type { UserStatProps } from "../data/data"
import { userStats } from "../data/data"

export function UsersStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {userStats.map((stats) => (
        <UserStat key={stats.title} {...stats} />
      ))}
    </div>
  )
}

const UserStat = (props: UserStatProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-4 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          {props.icon && (
            <span className="h-4 w-4 flex items-center">
              <props.icon />
            </span>
          )}
          {props.title}
        </CardTitle>
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger>
              <Icon icon="tabler:info-circle" />
              <span className="sr-only">More Info</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{props.desc}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-2xl font-bold">{props.stat}</div>
        <p className="text-muted-foreground text-xs">{props.statDesc}</p>
      </CardContent>
    </Card>
  )
}
