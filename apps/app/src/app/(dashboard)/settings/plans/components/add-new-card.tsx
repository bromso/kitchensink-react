"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import { Calendar } from "@repo/ui/components/calendar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover"
import { cn } from "@repo/ui/lib/utils"
import { format } from "date-fns"
import { useState } from "react"
import { type ControllerRenderProps, useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  card_number: z.string().min(1, {
    message: "Card Number is required.",
  }),
  cardholder_name: z.string().min(1, {
    message: "Card Holder Name is required.",
  }),
  expireDate: z.coerce.date({ required_error: "Expire Date is required." }),
  cvv: z.string().min(1, {
    message: "CVV is required.",
  }),
  billing_address: z.string().min(1, {
    message: "Billing Address is required.",
  }),
})

type AddNewCardFormValues = z.infer<typeof formSchema>

export function AddNewCard() {
  const [opened, setOpened] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      card_number: "",
      cardholder_name: "",
      cvv: "",
      billing_address: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    form.reset()
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    setOpened(false)
  }

  return (
    <Dialog
      open={opened}
      onOpenChange={() => {
        form.reset()
        setOpened((prev) => !prev)
      }}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="link"
          className="flex items-center gap-1 font-semibold text-blue-600"
        >
          <Icon icon="tabler:plus" />
          <span className="text-xs">Add New Card</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <Icon icon="tabler:credit-card" /> New Payment
          </DialogTitle>
          <DialogDescription>
            Ensure accurate information to process the transaction smoothly.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add-new-card-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-6 gap-5"
          >
            <FormField
              control={form.control}
              name="cardholder_name"
              render={({
                field,
              }: {
                field: ControllerRenderProps<AddNewCardFormValues, "cardholder_name">
              }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Card Holder</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Holder Name" {...field} />
                  </FormControl>
                  <FormDescription>Fill Card Holder Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="card_number"
              render={({
                field,
              }: {
                field: ControllerRenderProps<AddNewCardFormValues, "card_number">
              }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Card Number" {...field} />
                  </FormControl>
                  <FormDescription>Fill Card Number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expireDate"
              render={({
                field,
              }: {
                field: ControllerRenderProps<AddNewCardFormValues, "expireDate">
              }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Expire Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div
                          className={cn(
                            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <Icon icon="radix-icons:calendar" />
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Pick Expire Date.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({
                field,
              }: {
                field: ControllerRenderProps<AddNewCardFormValues, "cvv">
              }) => (
                <FormItem className="col-span-3">
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="CVV No" {...field} />
                  </FormControl>
                  <FormDescription>Fill CVV No</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billing_address"
              render={({
                field,
              }: {
                field: ControllerRenderProps<AddNewCardFormValues, "billing_address">
              }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Billing Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Billing Address" {...field} />
                  </FormControl>
                  <FormDescription>Fill Billing Address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="add-new-card-form">
            Submit <Icon icon="tabler:credit-card-pay" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
