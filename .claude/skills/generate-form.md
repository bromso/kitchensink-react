# Generate Form Skill

Generate complete forms with validation using React Hook Form and Zod. Use this skill when creating new forms in the dashboard app or any app that needs form handling.

## When to Use

- Creating new forms (settings, profile, data entry)
- Adding form validation
- Building multi-step forms
- Implementing form submissions

## Required Imports

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { Button } from "@repo/ui/components/button"
```

## Complete Form Template

```tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { Button } from "@repo/ui/components/button"

// 1. Define the schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
})

// 2. Infer the type
type FormValues = z.infer<typeof formSchema>

export function ExampleForm() {
  // 3. Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  // 4. Handle submission
  async function onSubmit(values: FormValues) {
    try {
      // Handle form submission
      console.log(values)
    } catch (error) {
      // Handle error
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormDescription>
                Your display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  )
}
```

## Common Zod Schemas

### Text Fields

```tsx
z.string().min(1, "Required")
z.string().min(2, "Too short").max(100, "Too long")
z.string().email("Invalid email")
z.string().url("Invalid URL")
z.string().regex(/^[a-z]+$/, "Lowercase letters only")
```

### Numbers

```tsx
z.coerce.number().min(0, "Must be positive")
z.coerce.number().int("Must be a whole number")
z.coerce.number().min(1).max(100)
```

### Optional Fields

```tsx
z.string().optional()
z.string().nullable()
z.string().nullish() // null | undefined
```

### Select/Enum

```tsx
z.enum(["admin", "user", "guest"], {
  errorMap: () => ({ message: "Select a role" })
})
```

### Checkbox/Boolean

```tsx
z.boolean().refine((val) => val === true, "You must agree")
```

### Arrays

```tsx
z.array(z.string()).min(1, "Select at least one")
```

### Dates

```tsx
z.coerce.date()
z.string().datetime()
```

### Complex Validation

```tsx
const schema = z.object({
  password: z.string().min(8, "Password must be 8+ characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
```

## Form Field Components

### Select

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select"

<FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Role</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Textarea

```tsx
import { Textarea } from "@repo/ui/components/textarea"

<FormField
  control={form.control}
  name="bio"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Bio</FormLabel>
      <FormControl>
        <Textarea placeholder="Tell us about yourself" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Checkbox

```tsx
import { Checkbox } from "@repo/ui/components/checkbox"

<FormField
  control={form.control}
  name="terms"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>Accept terms</FormLabel>
        <FormDescription>
          You agree to our Terms of Service.
        </FormDescription>
      </div>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Switch

```tsx
import { Switch } from "@repo/ui/components/switch"

<FormField
  control={form.control}
  name="notifications"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <FormLabel className="text-base">Notifications</FormLabel>
        <FormDescription>
          Receive email notifications.
        </FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
    </FormItem>
  )}
/>
```

## Error Handling

```tsx
async function onSubmit(values: FormValues) {
  try {
    await submitData(values)
    toast.success("Saved successfully")
  } catch (error) {
    if (error instanceof ApiError) {
      // Set field-specific errors from API
      form.setError("email", { message: error.message })
    } else {
      // Set root error for general failures
      form.setError("root", { message: "Something went wrong" })
    }
  }
}

// Display root error
{form.formState.errors.root && (
  <p className="text-sm text-destructive">
    {form.formState.errors.root.message}
  </p>
)}
```

## Loading States

```tsx
<Button type="submit" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Saving...
    </>
  ) : (
    "Save"
  )}
</Button>
```

## Form Reset

```tsx
// Reset to default values
form.reset()

// Reset to specific values
form.reset({ name: "New Name", email: "new@email.com" })

// Reset after successful submission
async function onSubmit(values: FormValues) {
  await submitData(values)
  form.reset()
}
```
