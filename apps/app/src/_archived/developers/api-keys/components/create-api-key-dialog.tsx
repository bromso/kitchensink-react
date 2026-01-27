"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/components/button"
import {
  Dialog,
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { useState } from "react"
import { type ControllerRenderProps, useForm } from "react-hook-form"
import { z } from "zod"
import { nofitySubmittedValues } from "@/lib/notify-submitted-values"

const formSchema = z.object({
  keyName: z.string().min(1, {
    message: "API key name is required.",
  }),
})

export function CreateApiKeyDialog() {
  const [opened, setOpened] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { keyName: "" },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    form.reset()
    nofitySubmittedValues(values)
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
        <Button variant="default" size="sm">
          Create API Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New API Key</DialogTitle>
          <DialogDescription>
            Generate a new API key to securely access and integrate with our services.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="new-api-key-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="keyName"
              render={({
                field,
              }: {
                field: ControllerRenderProps<z.infer<typeof formSchema>, "keyName">
              }) => (
                <FormItem className="space-y-2">
                  <FormLabel>API Key Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form="new-api-key-form" type="submit">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
