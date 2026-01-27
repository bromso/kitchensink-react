import { Icon } from "@iconify/react"

export const dashboard3Stats = [
  {
    label: "Session",
    icon: <Icon icon="tabler:clipboard-data" className="h-4 w-4 text-blue-500" />,
    stats: 6132,
    percentage: 90,
    type: "up",
  },
  {
    label: "Page Views",
    icon: <Icon icon="tabler:eye" className="h-4 w-4 text-indigo-500" />,
    stats: 11236,
    percentage: 40,
    type: "down",
  },
  {
    label: "Average",
    icon: <Icon icon="tabler:file-barcode" className="h-4 w-4 text-orange-500" />,
    stats: 46,
    percentage: 22,
    type: "up",
  },
  {
    label: "Bounce Rate",
    icon: <Icon icon="tabler:speedometer" className="h-4 w-4 text-red-500" />,
    stats: 6132,
    percentage: 30,
    type: "down",
  },
] as const

export type Dashboard3Stats = (typeof dashboard3Stats)[number]
