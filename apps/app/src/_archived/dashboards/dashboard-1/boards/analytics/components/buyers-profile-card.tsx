"use client"

import { Icon } from "@iconify/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import { type ChartConfig, ChartContainer } from "@repo/ui/components/chart"
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

const chartData = [{ month: "January", buyers: 200, fill: "var(--color-buyers)" }]

const chartConfig = {
  month: {
    label: "Month",
  },
  buyers: {
    label: "Buyers",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export default function BuyersProfileCard() {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Buyers Profile</CardTitle>
          <Icon
            icon="lucide:dots-vertical"
            className="cursor-pointer opacity-60"
            width={16}
            height={16}
          />
        </div>
        <CardDescription>Discover key insights into the buyer’s preferences</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[220px]">
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="buyers" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].buyers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Buyers
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon icon="lucide:trending-up" className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
