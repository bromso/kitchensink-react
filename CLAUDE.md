# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development (all apps):**
```bash
bun dev              # Start all apps in parallel via Turborepo
```

**Development (single app):**
```bash
bun --filter @repo/www dev    # Marketing site on :3000
bun --filter @repo/app dev    # Main app on :3001
bun --filter @repo/legal dev  # Legal docs on :3002
bun --filter @repo/docs dev   # Documentation on :3003
```

**Build & Lint:**
```bash
bun run build         # Build all apps
bun run lint          # Lint all apps (Biome)
bun run format        # Format all files (Biome)
bun run lint:fix      # Auto-fix lint issues
```

**Single app build/lint:**
```bash
bun --filter @repo/app build
bun --filter @repo/app lint
```

## Architecture

**Monorepo Structure:**
- **Turborepo** for build orchestration
- **Bun workspaces** for package management
- **Biome** for linting/formatting (not ESLint/Prettier)

**Apps:**
- `apps/www` - Marketing/landing site (Next.js 15 with Turbopack)
- `apps/app` - Main dashboard application (Next.js 15, authentication, GraphQL)
- `apps/legal` - Legal documentation (Fumadocs + Next.js 16)
- `apps/docs` - Product documentation (Fumadocs + Next.js 16)

**Packages:**
- `packages/ui` - Shared shadcn/ui components built on Radix primitives
- `packages/typescript-config` - Shared TypeScript configuration

## Key Technical Details

**UI Components (Centralized in packages/ui):**

All shadcn/ui components live in `packages/ui`. Apps import from `@repo/ui`:
```tsx
import { Button } from "@repo/ui/components/button"
import { cn } from "@repo/ui/lib/utils"
```

Add new shadcn components to the shared package:
```bash
bunx shadcn@latest add <component> -c packages/ui
```

**Important:** Never add shadcn components directly to apps. Always add to `packages/ui` so all apps can share them.

**Authentication (apps/app):**
- Uses `better-auth` with Drizzle ORM adapter
- Local SQLite database (`dev.db`) for development
- Social auth configured via env vars (GOOGLE_CLIENT_ID, GITHUB_CLIENT_ID)

**State Management (apps/app):**
- Apollo Client with local-only resolvers (no backend required)
- Mock data in `apps/app/src/data/mock/`
- GraphQL resolvers in `apps/app/src/data/resolvers/`

**App Routing (apps/app):**
- `(auth)` - Authentication pages
- `(dashboard)` - Protected dashboard routes
- `(errors)` - Error pages
- `(quiz)` - Quiz/onboarding flow

**Animations (motion.dev):**
Available in `apps/app`, `apps/www`, and `packages/ui`:
```tsx
import { motion, AnimatePresence } from "motion/react"
```
Use for page transitions, micro-interactions, and component animations.

## Code Style

- Biome handles all formatting and linting
- Double quotes for strings
- No semicolons (ASI)
- 2-space indentation
- 100 character line width

## Project-Specific Patterns

### GraphQL Development (apps/app)
When working with GraphQL:
1. Schema types: `apps/app/src/data/schema/typeDefs.ts`
2. Resolvers: `apps/app/src/data/resolvers/`
3. Mock data: `apps/app/src/data/mock/`
4. Always update all three when adding new data types

### Component Development
When creating new UI components:
1. Check if the component exists in `packages/ui/src/components/` first
2. If not, add via shadcn: `bunx shadcn@latest add <name> -c packages/ui`
3. Import in any app: `import { Component } from "@repo/ui/components/component"`
4. App-specific components (forms, layouts) stay in `apps/<app>/src/components/`

### Form Patterns
Use React Hook Form with Zod for all forms:
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
```

### File Naming Conventions
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Types: PascalCase with `.types.ts` suffix when separate
- Pages: lowercase with hyphens (e.g., `user-settings/page.tsx`)

## Common Tasks

### Adding a New Dashboard Feature
1. Create route in `apps/app/src/app/(dashboard)/`
2. Add GraphQL types/resolvers if data needed
3. Create mock data for development
4. Add navigation link in sidebar config

### Updating Authentication
- Auth config: `apps/app/src/lib/auth.ts`
- Auth client: `apps/app/src/lib/auth-client.ts`
- Middleware: `apps/app/src/middleware.ts`

### Adding Documentation
- Product docs: `apps/docs/content/docs/`
- Legal docs: `apps/legal/content/docs/`
- Format: MDX with Fumadocs frontmatter

## Troubleshooting

### Build Failures
1. Check TypeScript errors: `bun turbo check-types`
2. Check lint errors: `bun run lint`
3. Clear cache: `rm -rf .turbo && bun run build`

### Module Resolution Issues
1. Ensure @repo/ui exports the component
2. Check `packages/ui/package.json` exports field
3. Restart dev server after package changes

## Slash Commands

The following custom commands are available:
- `/dev [app]` - Start development server (all, www, app, legal, docs)
- `/lint-fix` - Run Biome lint and format with auto-fix
- `/add-component <name>` - Add a shadcn/ui component to packages/ui
- `/new-page <group> <name>` - Create a new page in apps/app
- `/db-migrate` - Generate and apply Drizzle migrations
- `/typecheck` - Run TypeScript checks across all apps
