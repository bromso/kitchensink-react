"use client"

import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/components/drawer"
import Filters from "./filters"

export default function MobileFilterSheet() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="block lg:hidden" size="icon" variant="outline">
          <Icon icon="tabler:filter" className="m-auto" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Events/Logs Filters</DrawerTitle>
          <DrawerDescription>Select & Check Filters.</DrawerDescription>
        </DrawerHeader>
        <Filters />
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
