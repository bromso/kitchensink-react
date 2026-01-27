"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select"
import { Separator } from "@repo/ui/components/separator"
import dynamic from "next/dynamic"
import Link from "next/link"
import { DateRangePicker } from "@/components/date-range-picker"
import { nofitySubmittedValues } from "@/lib/notify-submitted-values"

// Dynamic imports for heavy chart components (recharts)
const ApiRequestsChart = dynamic(
  () => import("./components/api-requests-chart").then((mod) => mod.ApiRequestsChart),
  {
    ssr: false,
    loading: () => <div className="h-32 flex-1 animate-pulse rounded-lg bg-muted" />,
  }
)
const ApiResponseTimeChart = dynamic(
  () => import("./components/api-response-time-chart").then((mod) => mod.ApiResponseTimeChart),
  {
    ssr: false,
    loading: () => <div className="h-32 flex-1 animate-pulse rounded-lg bg-muted" />,
  }
)
const TotalVisitorsChart = dynamic(
  () => import("./components/total-visitors-chart").then((mod) => mod.TotalVisitorsChart),
  {
    ssr: false,
    loading: () => <div className="col-span-2 h-64 animate-pulse rounded-lg bg-muted" />,
  }
)
const RecentActivity = dynamic(() => import("./components/recent-activity"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-lg bg-muted" />,
})

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Developers</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold">Web Overview</h2>
            <p className="text-muted-foreground text-sm">
              Build, manage, and optimize developer workflows seamlessly.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-fit gap-2 text-sm">
                <SelectValue placeholder="Server" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Server</SelectLabel>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DateRangePicker
              onUpdate={(values) => nofitySubmittedValues(values)}
              initialDateFrom="2023-01-01"
              initialDateTo="2023-12-31"
              align="start"
              locale="en-GB"
              showCompare={false}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <div className="flex basis-2/3 flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            <ApiRequestsChart className="flex-1" />
            <Separator className="sm:hidden" />
            <ApiResponseTimeChart className="flex-1" />
          </div>
          <Separator />
          <TotalVisitorsChart className="col-span-2" />
        </div>
        <Separator className="lg:hidden" />
        <div className="flex flex-1 flex-col">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
