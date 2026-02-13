# Accessibility Audit Skill

Check components for accessibility issues. Use this skill before finalizing components or pages to ensure they meet accessibility standards.

## When to Use

- Before completing a new component
- When reviewing existing components
- When adding interactive elements
- Before shipping user-facing features

## Quick Checklist

### 1. Semantic HTML

- [ ] Use proper heading hierarchy (h1 > h2 > h3)
- [ ] Use landmarks (`<main>`, `<nav>`, `<aside>`, `<footer>`)
- [ ] Use `<button>` for actions, `<a>` for navigation
- [ ] Use lists (`<ul>`, `<ol>`) for list content
- [ ] Use `<table>` with proper headers for tabular data

### 2. Keyboard Navigation

- [ ] All interactive elements are focusable
- [ ] Focus order follows visual order
- [ ] Focus is visible (not removed with `outline: none`)
- [ ] No keyboard traps
- [ ] Skip links for long navigation
- [ ] Escape closes modals/dropdowns

### 3. ARIA Attributes

- [ ] Images have `alt` text (or `alt=""` for decorative)
- [ ] Icon buttons have accessible names
- [ ] Form inputs have labels
- [ ] Required fields are marked
- [ ] Error messages are announced

### 4. Color & Contrast

- [ ] Text contrast ratio >= 4.5:1 (3:1 for large text)
- [ ] Information not conveyed by color alone
- [ ] Focus indicators are visible
- [ ] UI works in high contrast mode

### 5. Motion & Animation

- [ ] Respects `prefers-reduced-motion`
- [ ] No auto-playing content
- [ ] Animations can be paused

## Common Fixes

### Icon Buttons

```tsx
// Bad - no accessible name
<button onClick={onClose}>
  <XIcon className="h-4 w-4" />
</button>

// Good - with sr-only text
<button onClick={onClose}>
  <XIcon className="h-4 w-4" aria-hidden="true" />
  <span className="sr-only">Close</span>
</button>

// Good - with aria-label
<button onClick={onClose} aria-label="Close dialog">
  <XIcon className="h-4 w-4" aria-hidden="true" />
</button>
```

### Images

```tsx
// Informative image
<img src="/chart.png" alt="Sales increased 25% in Q4 2024" />

// Decorative image
<img src="/decoration.svg" alt="" aria-hidden="true" />

// Complex image with description
<figure>
  <img src="/diagram.png" alt="System architecture diagram" />
  <figcaption>
    The system consists of three main components: API gateway,
    processing service, and database cluster.
  </figcaption>
</figure>
```

### Form Labels

```tsx
// Bad - no label association
<label>Email</label>
<input type="email" />

// Good - htmlFor/id association
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Good - implicit association
<label>
  Email
  <input type="email" />
</label>

// With error message
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && (
  <p id="email-error" role="alert" className="text-destructive text-sm">
    {error}
  </p>
)}
```

### Required Fields

```tsx
<label htmlFor="name">
  Name <span aria-hidden="true">*</span>
  <span className="sr-only">(required)</span>
</label>
<input id="name" required aria-required="true" />
```

### Loading States

```tsx
// Announce loading state
<button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? "Saving..." : "Save"}
</button>

// Live region for status updates
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {status}
</div>
```

### Modals/Dialogs

```tsx
// Use Radix Dialog (already accessible)
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog"

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Skip Links

```tsx
// At the top of the page
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background"
>
  Skip to main content
</a>

// Main content area
<main id="main-content" tabIndex={-1}>
  {/* Page content */}
</main>
```

### Reduced Motion

```tsx
import { useReducedMotion } from "motion/react"

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      animate={{ x: 100 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.3
      }}
    />
  )
}

// Or with CSS
// In global styles:
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Management

```tsx
// Focus trap in modal (Radix handles this)
// Manual focus management:
import { useEffect, useRef } from "react"

function Modal({ isOpen, onClose }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    }
  }, [isOpen])

  return (
    <div role="dialog" aria-modal="true">
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
    </div>
  )
}
```

### Tables

```tsx
<table>
  <caption className="sr-only">User data for Q4 2024</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td>Admin</td>
    </tr>
  </tbody>
</table>
```

## Testing Tools

### Browser Extensions

- **axe DevTools** - Automated accessibility testing
- **WAVE** - Visual accessibility evaluation
- **Accessibility Insights** - Microsoft's a11y testing

### Manual Testing

1. **Keyboard-only navigation** - Tab through the page
2. **Screen reader** - Test with VoiceOver (Mac) or NVDA (Windows)
3. **Zoom to 200%** - Content should remain usable
4. **High contrast mode** - Check visibility

### Code Analysis

```bash
# Install eslint-plugin-jsx-a11y if not present
bun add -D eslint-plugin-jsx-a11y

# The project uses Biome, but for a11y linting:
bunx eslint --ext .tsx src/ --rule 'jsx-a11y/alt-text: error'
```

## Radix Primitives

The project uses Radix UI primitives (via shadcn/ui) which are accessible by default:

- Dialog - Focus trap, escape to close, aria attributes
- DropdownMenu - Keyboard navigation, ARIA roles
- Select - Fully keyboard accessible
- Tabs - Arrow key navigation, proper ARIA
- Tooltip - Accessible descriptions
- AlertDialog - Proper focus management

**Trust Radix defaults** - Don't override aria attributes unless necessary.

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Radix Accessibility](https://www.radix-ui.com/docs/primitives/overview/accessibility)
