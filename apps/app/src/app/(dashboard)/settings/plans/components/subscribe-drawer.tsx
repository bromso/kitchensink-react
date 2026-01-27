"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select"
import { Separator } from "@repo/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet"
import { cn } from "@repo/ui/lib/utils"
import { allCountries as countryRegionData } from "country-region-data"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { type CountryRegion, filterCountries } from "@/lib/filter-countries"
import { nofitySubmittedValues } from "@/lib/notify-submitted-values"
import { type Plan, paymentAcc } from "../data/data"
import { AddNewCard } from "./add-new-card"

interface Props {
  plan: Plan
}

const formSchema = z.object({
  country: z.string({
    required_error: "Select Country",
  }),
  zip_code: z.string().min(1, {
    message: "Fill Zip Code",
  }),
  payment_method: z.string({
    required_error: "Select Payment Method",
  }),
})

export default function SubscribeDrawer({ plan }: Props) {
  const [countries, setCountries] = useState<CountryRegion[]>([])

  useEffect(() => {
    setCountries(filterCountries(countryRegionData, [], [], []))
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zip_code: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    nofitySubmittedValues(values)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="ml-auto w-fit">Start Subscribe</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Summary</SheetTitle>
          <SheetDescription>Start on {format(new Date(), "yyyy-MMM-dd")}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id="payment-subscribe-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-8"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <p>Monthly</p>
                <p className="font-bold tracking-tight">${plan.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p>Estimated Tax</p>
                <p className="font-bold tracking-tight">$0.00</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm">
              <p>Total after trial</p>
              <p className="font-bold tracking-tight">${plan.price.toLocaleString()}</p>
            </div>
            <Separator />

            <h2 className="text-md font-bold">Billing Address</h2>

            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
              <FormField
                control={form.control}
                name="country"
                render={({
                  field,
                }: {
                  field: { value: string; onChange: (value: string) => void }
                }) => (
                  <FormItem className="w-full">
                    <FormLabel>Country</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {countries.map(({ countryName, countryShortCode }) => (
                          <SelectItem key={countryShortCode} value={countryShortCode}>
                            {countryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip_code"
                render={({
                  field,
                }: {
                  field: { value: string; onChange: (value: string) => void }
                }) => (
                  <FormItem className="w-full">
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Zip Code"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <p className="text-muted-foreground text-[13px] leading-none font-medium">
              *Ensure the details match your billing address for smooth and accurate processing.*
            </p>

            <Separator />

            <div className="flex items-center justify-between">
              <h2 className="text-md font-bold">Payment Method</h2>
              <AddNewCard />
            </div>

            <FormField
              control={form.control}
              name="payment_method"
              render={({
                field,
              }: {
                field: { value: string; onChange: (value: string) => void }
              }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {paymentAcc.map((payment) => (
                        <FormItem key={payment.type} className="flex items-center">
                          <FormControl>
                            <RadioGroupItem className="peer sr-only" value={payment.type} />
                          </FormControl>
                          <FormLabel className="w-full cursor-pointer rounded-md border px-4 py-4 outline outline-gray-800 peer-data-[state=checked]:border-blue-600">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={cn(
                                    "h-3 w-3 rounded-full outline outline-offset-[2px]",
                                    form.getValues().payment_method === payment.type &&
                                      "bg-blue-600 outline-blue-500"
                                  )}
                                />
                                <div className="flex flex-col items-start">
                                  <p className="text-xs font-semibold">{payment.name}</p>
                                  <p className="text-muted-foreground text-xs">
                                    ****
                                    {payment.card.toLocaleString().slice(5)}
                                  </p>
                                </div>
                              </div>
                              {payment.icon && <Icon icon={payment.icon} width={20} height={20} />}
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter>
          <Button
            form="payment-subscribe-form"
            type="submit"
            className="mt-5 w-full bg-blue-600 font-semibold tracking-tight text-white hover:bg-blue-700"
          >
            Start Subscription
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
