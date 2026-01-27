// Dashboard 1 Stats (Overview board)
export type Dashboard1Stats = {
  label: string
  description: string
  stats: number
  type: "up" | "down"
  percentage: number
  chartData: {
    [x: string]: PropertyKey
    value: number
  }[]
  strokeColor: string
  icon: string
}

// Icon names for Iconify
const IconGift = "mdi:gift"
const IconMenuOrder = "mdi:reorder-horizontal"
const IconSubscript = "mdi:format-subscript"

export const dashboard1Stats: Dashboard1Stats[] = [
  {
    label: "New Subscriptions",
    description: "Total number of new subscriptions",
    stats: 4682,
    type: "up",
    percentage: 15.54,
    chartData: [
      { month: "Monday", value: 200 },
      { month: "Tuesday", value: 305 },
      { month: "Webnesday", value: 237 },
      { month: "Thursday", value: 73 },
      { month: "Friday", value: 209 },
      { month: "Saturday", value: 10 },
      { month: "Sunday", value: 214 },
    ],
    strokeColor: "var(--chart-1)",
    icon: IconSubscript,
  },
  {
    label: "New Orders",
    description: "Total number of new orders",
    stats: 1226,
    type: "down",
    percentage: 40.2,
    chartData: [
      { month: "Monday", value: 186 },
      { month: "Tuesday", value: 305 },
      { month: "Webnesday", value: 237 },
      { month: "Thursday", value: 73 },
      { month: "Friday", value: 209 },
      { month: "Saturday", value: 214 },
      { month: "Sunday", value: 214 },
    ],
    strokeColor: "var(--chart-2)",
    icon: IconMenuOrder,
  },
  {
    label: "Avg Order Revenue",
    description: "Average order of revenue",
    stats: 1080,
    type: "up",
    percentage: 10.8,
    chartData: [
      { month: "Monday", value: 50 },
      { month: "Tuesday", value: 125 },
      { month: "Webnesday", value: 240 },
      { month: "Thursday", value: 93 },
      { month: "Friday", value: 209 },
      { month: "Saturday", value: 150 },
      { month: "Sunday", value: 300 },
    ],
    strokeColor: "#6366f1",
    icon: IconGift,
  },
]

// Dashboard 3 Stats (static data with React elements replaced by icon names)
export type Dashboard3StatData = {
  label: string
  iconName: string
  iconColor: string
  stats: number
  percentage: number
  type: "up" | "down"
}

export const dashboard3Stats: Dashboard3StatData[] = [
  {
    label: "Session",
    iconName: "tabler:clipboard-data",
    iconColor: "text-blue-500",
    stats: 6132,
    percentage: 90,
    type: "up",
  },
  {
    label: "Page Views",
    iconName: "tabler:eye",
    iconColor: "text-indigo-500",
    stats: 11236,
    percentage: 40,
    type: "down",
  },
  {
    label: "Average",
    iconName: "tabler:file-barcode",
    iconColor: "text-orange-500",
    stats: 46,
    percentage: 22,
    type: "up",
  },
  {
    label: "Bounce Rate",
    iconName: "tabler:speedometer",
    iconColor: "text-red-500",
    stats: 6132,
    percentage: 30,
    type: "down",
  },
]
