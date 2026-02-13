# Add Animation Skill

Apply motion.dev animations to components. Use this skill when adding entrance/exit animations, micro-interactions, or page transitions.

## When to Use

- Adding entrance animations to components
- Creating hover/tap interactions
- Implementing page transitions
- Building loading animations
- Animating lists and grids

## Setup

motion.dev is available in `apps/app`, `apps/www`, and `packages/ui`.

```tsx
import { motion, AnimatePresence } from "motion/react"
```

## Basic Animations

### Fade In

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Fade Up (Most Common)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  Content
</motion.div>
```

### Scale In

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.2 }}
>
  Content
</motion.div>
```

### Slide In

```tsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.3 }}
>
  Content from left
</motion.div>
```

## Blur Fade (Project Pattern)

The project uses a BlurFade pattern for scroll-triggered animations:

```tsx
import { motion } from "motion/react"

interface BlurFadeProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function BlurFade({ children, delay = 0, className }: BlurFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Usage with staggered delays
<BlurFade delay={0.1}>First item</BlurFade>
<BlurFade delay={0.2}>Second item</BlurFade>
<BlurFade delay={0.3}>Third item</BlurFade>
```

## Staggered Children

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

<motion.ul
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item) => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

## Hover & Tap Interactions

### Button Hover

```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.1 }}
  className="..."
>
  Click me
</motion.button>
```

### Card Hover

```tsx
<motion.div
  whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
  transition={{ duration: 0.2 }}
  className="rounded-lg border bg-card p-4"
>
  Card content
</motion.div>
```

### Icon Hover

```tsx
<motion.div
  whileHover={{ rotate: 15 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <StarIcon className="h-5 w-5" />
</motion.div>
```

## Mount/Unmount Animations

Always use `AnimatePresence` for exit animations:

```tsx
import { AnimatePresence, motion } from "motion/react"

<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      Modal content
    </motion.div>
  )}
</AnimatePresence>
```

### Toast/Notification Animation

```tsx
<AnimatePresence>
  {toasts.map((toast) => (
    <motion.div
      key={toast.id}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="..."
    >
      {toast.message}
    </motion.div>
  ))}
</AnimatePresence>
```

## Page Transitions

```tsx
// In a layout or page component
<motion.main
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.main>
```

## Loading Animations

### Pulse

```tsx
<motion.div
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{ duration: 1.5, repeat: Infinity }}
  className="h-4 w-32 rounded bg-muted"
/>
```

### Spinner

```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full"
/>
```

### Dots

```tsx
const dots = [0, 1, 2]

<div className="flex gap-1">
  {dots.map((i) => (
    <motion.div
      key={i}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        delay: i * 0.1,
      }}
      className="h-2 w-2 rounded-full bg-primary"
    />
  ))}
</div>
```

## Scroll-Triggered Animations

```tsx
import { motion, useInView } from "motion/react"
import { useRef } from "react"

function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

## Transition Presets

```tsx
// Smooth ease
transition={{ duration: 0.3, ease: "easeOut" }}

// Spring (bouncy)
transition={{ type: "spring", stiffness: 300, damping: 20 }}

// Custom bezier
transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}

// Delayed
transition={{ duration: 0.3, delay: 0.1 }}
```

## Performance Tips

1. **Animate transform properties** - `x`, `y`, `scale`, `rotate` are GPU-accelerated
2. **Avoid animating layout** - Don't animate `width`, `height`, `padding`
3. **Use `layoutId`** - For shared element transitions
4. **Set `will-change`** - For complex animations
5. **Use `AnimatePresence mode="wait"`** - To prevent overlap during transitions

## Anti-Patterns

- Over-animating (keep animations subtle)
- Long durations (>0.5s feels sluggish)
- Animating on every re-render
- Blocking interactions during animations
- Ignoring reduced-motion preferences

### Respecting Reduced Motion

```tsx
import { useReducedMotion } from "motion/react"

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      Content
    </motion.div>
  )
}
```
