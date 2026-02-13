# Frontend Design Skill

Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when building web components, pages, or applications.

## When to Use

- Building new UI components
- Creating pages or layouts
- Designing user interfaces
- Implementing visual features

## Design System Foundation

This project uses **shadcn/ui + Radix primitives + Tailwind CSS**. All shared components live in `packages/ui`.

### Component Imports

```tsx
// Always import from the shared UI package
import { Button } from "@repo/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"
import { cn } from "@repo/ui/lib/utils"
```

### Adding New Components

```bash
bunx shadcn@latest add <component> -c packages/ui
```

## Design Principles

### 1. Visual Hierarchy

- Use size, weight, and spacing to establish hierarchy
- Primary actions should be visually prominent
- Secondary elements recede but remain accessible

### 2. Spacing System

Use Tailwind's spacing scale consistently:
- `gap-1` (4px) - Tight groupings
- `gap-2` (8px) - Related elements
- `gap-4` (16px) - Standard spacing
- `gap-6` (24px) - Section spacing
- `gap-8+` (32px+) - Major sections

### 3. Typography

```tsx
// Headings
<h1 className="text-4xl font-bold tracking-tight">Page Title</h1>
<h2 className="text-2xl font-semibold">Section Title</h2>
<h3 className="text-lg font-medium">Subsection</h3>

// Body text
<p className="text-muted-foreground">Secondary text</p>
<p className="text-sm text-muted-foreground">Small helper text</p>
```

### 4. Color Usage

```tsx
// Semantic colors (prefer these)
className="bg-background text-foreground"      // Default
className="bg-muted text-muted-foreground"     // Subdued
className="bg-primary text-primary-foreground" // Actions
className="bg-destructive text-destructive-foreground" // Danger

// Accent for highlights
className="bg-accent text-accent-foreground"
```

### 5. Responsive Design

Mobile-first approach with Tailwind breakpoints:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>

<div className="flex flex-col sm:flex-row gap-4">
  {/* Stack on mobile, row on larger */}
</div>
```

### 6. Dark Mode

All colors automatically support dark mode via CSS variables. Avoid hardcoded colors:

```tsx
// Good - uses CSS variables
className="bg-card text-card-foreground border-border"

// Bad - hardcoded colors
className="bg-white text-gray-900 border-gray-200"
```

## Animation Integration

Use motion.dev for animations (available in apps/app, apps/www, packages/ui):

```tsx
import { motion } from "motion/react"

// Entrance animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

See `add-animation` skill for detailed animation patterns.

## Component Patterns

### Cards

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

### Data Display

```tsx
<div className="rounded-lg border bg-card">
  <div className="p-4 border-b">
    <h3 className="font-medium">Section Title</h3>
  </div>
  <div className="p-4">
    {/* Content */}
  </div>
</div>
```

### Empty States

```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <IconComponent className="h-12 w-12 text-muted-foreground mb-4" />
  <h3 className="text-lg font-medium">No items yet</h3>
  <p className="text-sm text-muted-foreground mt-1 mb-4">
    Get started by creating your first item.
  </p>
  <Button>Create Item</Button>
</div>
```

### Loading States

```tsx
import { Skeleton } from "@repo/ui/components/skeleton"

<div className="space-y-4">
  <Skeleton className="h-8 w-48" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>
```

## Accessibility Requirements

1. **Color contrast** - Minimum 4.5:1 for text
2. **Focus indicators** - All interactive elements must show focus
3. **Semantic HTML** - Use proper heading levels, landmarks
4. **ARIA labels** - Label icons and non-text controls
5. **Keyboard navigation** - All actions reachable via keyboard

## Anti-Patterns to Avoid

- Hardcoded colors instead of CSS variables
- Inconsistent spacing
- Missing hover/focus states
- Overuse of animations
- Ignoring mobile viewports
- Text over images without sufficient contrast
- Icon-only buttons without labels
