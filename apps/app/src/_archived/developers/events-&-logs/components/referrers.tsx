import { Icon } from "@iconify/react"
import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/card"
import { Separator } from "@repo/ui/components/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs"
import { referrers } from "../data/data"
import ViewAllReferrersDialog from "./view-all-referrers"

export default function Referrers() {
  return (
    <Card>
      <Tabs defaultValue="pages" className="space-y-0">
        <CardHeader className="px-4 py-3">
          <div className="flex items-center justify-between">
            <TabsList className="gap-2 bg-transparent">
              <TabsTrigger
                className="outline-foreground/10 data-[state=active]:bg-muted data-[state=active]:outline"
                value="pages"
              >
                Referrers
              </TabsTrigger>
              <TabsTrigger
                disabled
                className="outline-foreground/10 data-[state=active]:bg-muted data-[state=active]:outline"
                value="routes"
              >
                UTM Parameters
              </TabsTrigger>
            </TabsList>
            <h1 className="text-muted-foreground text-xs font-medium">VISITORS</h1>
          </div>
        </CardHeader>
        <Separator />
        <TabsContent value="pages">
          <CardContent className="px-4 py-3">
            <div className="flex flex-col">
              {referrers.map((referrer) => (
                <div
                  key={referrer.name}
                  className="flex cursor-pointer items-center justify-between rounded-md px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon={referrer.icon} strokeWidth={1} className="h-4 w-4" />
                    <p className="text-sm font-medium">{referrer.name}</p>
                  </div>
                  <p className="text-sm font-semibold">{referrer.visitors}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="px-4 py-3">
            <div className="m-auto">
              <ViewAllReferrersDialog />
            </div>
          </CardFooter>
        </TabsContent>
        <TabsContent value="routes">
          <CardContent className="px-4 py-3">Routes</CardContent>
        </TabsContent>
        <TabsContent value="hostnames">
          <CardContent className="px-4 py-3">Hostnames</CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
