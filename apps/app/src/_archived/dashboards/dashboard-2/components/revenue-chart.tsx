"use client"

import { Icon } from "@iconify/react"
import { Badge } from "@repo/ui/components/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export default function RevenueChart() {
  return (
    <Card className="h-full">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle>Revenue</CardTitle>
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold text-black dark:text-white">$14,324</p>
            <Badge
              variant="secondary"
              className="bg-opacity-20 rounded-xl bg-emerald-500 px-[5px] py-[2px] text-[10px] leading-none"
            >
              <div className="flex items-center gap-[2px] text-emerald-500">
                <Icon icon="lucide:arrow-up-right" className="h-3 w-3" />
                <p className="text-[8px]">+10%</p>
              </div>
            </Badge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%_-_106px)] px-4">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />

              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="desktop" barSize={20} fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" barSize={20} fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
