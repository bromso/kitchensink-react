import { Icon } from "@iconify/react"
import { Badge } from "@repo/ui/components/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"
import { cn } from "@repo/ui/lib/utils"
import { type Dashboard3Stats, dashboard3Stats } from "../data/data"

export default function Stats() {
  return (
    <>
      {dashboard3Stats.map((stats) => (
        <StatsCard key={stats.label} {...stats} />
      ))}
    </>
  )
}

function StatsCard({ label, type, icon, stats, percentage }: Dashboard3Stats) {
  return (
    <Card className="col-span-2">
      <CardHeader className="pt-4 pb-2">
        <div className="flex w-full items-center justify-between">
          <CardTitle>{label}</CardTitle>
          <Badge variant="secondary" className="rounded-full p-1">
            {icon}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-2xl font-bold">{stats.toLocaleString()}</h2>
          <div
            className={cn("flex items-center gap-2 font-medium", {
              "text-emerald-500": type === "up",
              "text-red-500": type === "down",
            })}
          >
            <p className="text-sm">%{percentage}</p>
            {type === "up" ? (
              <Icon icon="tabler:trending-up" className="h-5 w-5" />
            ) : (
              <Icon icon="tabler:trending-down" className="h-5 w-5" />
            )}
          </div>
          <p className="text-sm tracking-tight">vs Previous 30 Days</p>
        </div>
      </CardContent>
    </Card>
  )
}
