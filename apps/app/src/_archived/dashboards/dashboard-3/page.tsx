import dynamic from "next/dynamic"
import { Header } from "@/components/layout/header"
import Dashboard3Actions from "./components/dashboard-3-actions"
import Stats from "./components/stats"

// Dynamic imports for heavy chart components (recharts)
const Budgets = dynamic(() => import("./components/budget"), {
  ssr: true,
  loading: () => <div className="h-80 animate-pulse rounded-lg bg-muted" />,
})
const Visitors = dynamic(() => import("./components/visitors"), {
  ssr: true,
  loading: () => <div className="h-64 animate-pulse rounded-lg bg-muted" />,
})
const RadarCard = dynamic(() => import("./components/radar-card"), {
  ssr: true,
  loading: () => <div className="h-64 animate-pulse rounded-lg bg-muted" />,
})
const StackBar = dynamic(() => import("./components/stack-bar"), {
  ssr: true,
  loading: () => <div className="h-64 animate-pulse rounded-lg bg-muted" />,
})

export default function Dashboard3Page() {
  return (
    <>
      <Header />

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col items-start justify-between gap-2 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Overview Dashboard</h2>
            <p className="text-muted-foreground">Here, take a look at your sales.</p>
          </div>
          <Dashboard3Actions />
        </div>

        <div className="grid auto-rows-auto grid-cols-12 gap-5">
          <div className="col-span-12 xl:col-span-8">
            <Budgets />
          </div>
          <div className="col-span-12 lg:col-span-6 xl:col-span-4">
            <Visitors />
          </div>
          <div className="col-span-12 grid grid-cols-4 gap-5 lg:col-span-6 xl:col-span-5">
            <Stats />
          </div>
          <div className="col-span-12 lg:col-span-6 xl:col-span-4">
            <RadarCard />
          </div>
          <div className="col-span-12 lg:col-span-6 xl:col-span-3">
            <StackBar />
          </div>
        </div>
      </div>
    </>
  )
}
