"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify/react"
import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select"
import { Separator } from "@repo/ui/components/separator"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { type ControllerRenderProps, useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "@/hooks/use-toast"
import { DeleteActions } from "./delete-actions"

const formSchema = z.object({
  font: z.string({
    required_error: "Font is required.",
  }),
  company_tax_id: z.string().min(1, {
    message: "Tax ID is required.",
  }),
  company_address: z.string().min(1, {
    message: "Company address is required.",
  }),
  company_logo: z
    .instanceof(File)
    .refine(
      (file) => ["image/webp", "image/jpeg", "image/png", "image/svg+xml"].includes(file.type),
      {
        message: "Only WebP, JPEG, PNG, or SVG files are allowed",
      }
    )
    .optional(),
})

export default function GeneralForm() {
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_tax_id: "",
      company_address: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true)
    try {
      // TODO: Save to backend when settings table is available
      // For now, simulate a save operation
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Settings saved",
        description: "Your general settings have been updated successfully.",
      })
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Form {...form}>
      <div className="flex w-full flex-col items-start justify-between gap-4 rounded-lg border p-4 md:flex-row md:items-center">
        <div className="flex flex-col items-start text-sm">
          <p className="font-bold tracking-wide">Your application is currently on the free plan</p>
          <p className="text-muted-foreground font-medium">
            Paid plans offer higher usage limits, additional branches,and much more.Learn more{" "}
            <Link href="" className="underline">
              here
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Icon icon="tabler:message-2-question" />
            Chat to us
          </Button>
          <Button variant="outline">Upgrade</Button>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-8">
        <FormField
          control={form.control}
          name="company_logo"
          render={({
            field: { value, onChange, ...fieldProps },
          }: {
            field: ControllerRenderProps<z.infer<typeof formSchema>, "company_logo">
          }) => (
            <FormItem className="flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <FormLabel>Company Logo</FormLabel>
                <FormDescription>Update your company logo.</FormDescription>
                <FormMessage />
              </div>
              <div className="flex items-center gap-2">
                {value && (
                  <Image
                    alt="company-logo"
                    width={35}
                    height={35}
                    className="h-[35px] w-[35px] rounded-md object-cover"
                    src={URL.createObjectURL(value)}
                  />
                )}
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    placeholder="Company Logo"
                    accept="image/webp,image/jpeg,image/png/image/svg+xml"
                    onChange={(event) => onChange(event.target.files?.[0])}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="font"
          render={({
            field,
          }: {
            field: ControllerRenderProps<z.infer<typeof formSchema>, "font">
          }) => (
            <FormItem className="flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <FormLabel>System Font</FormLabel>
                <FormDescription>Set the font you want to use in the dashboard.</FormDescription>
                <FormMessage />
              </div>

              <div>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="manrope">Manrope</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="company_tax_id"
          render={({
            field,
          }: {
            field: ControllerRenderProps<z.infer<typeof formSchema>, "company_tax_id">
          }) => (
            <FormItem className="flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <FormLabel>Business Tax ID</FormLabel>
                <FormDescription>Tax ID of the company.</FormDescription>
                <FormMessage />
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <FormControl>
                    <Input placeholder="Business Tax ID" {...field} />
                  </FormControl>
                </div>
                <Badge variant="outline" className="py-2">
                  <Icon icon="tabler:id" className="h-5 w-5" strokeWidth={1.5} />
                </Badge>
              </div>
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="company_address"
          render={({
            field,
          }: {
            field: ControllerRenderProps<z.infer<typeof formSchema>, "company_address">
          }) => (
            <FormItem className="flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <FormLabel>Business Address</FormLabel>
                <FormDescription>Address of the company.</FormDescription>
                <FormMessage />
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <FormControl>
                    <Input placeholder="Business Address" {...field} />
                  </FormControl>
                </div>

                <Badge variant="outline" className="py-2">
                  <Icon icon="tabler:home" className="h-5 w-5" strokeWidth={1.5} />
                </Badge>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <Icon icon="tabler:loader-2" className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
      <div className="mt-10 mb-4 flex w-full flex-col items-start justify-between gap-4 rounded-lg border p-4 md:flex-row md:items-center">
        <div className="flex flex-col items-start text-sm">
          <p className="font-bold tracking-wide">Remove Account</p>
          <p className="text-muted-foreground font-medium">
            You can do &apos;Disable account&apos; to take a break from panel.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DeleteActions />
        </div>
      </div>
    </Form>
  )
}
