# Update Dependencies Skill

Safely update project dependencies. Use this skill when maintaining dependencies, checking for updates, or upgrading packages.

## When to Use

- Regular dependency maintenance
- Security vulnerability fixes
- Upgrading to new major versions
- Checking for outdated packages

## Check for Outdated Packages

```bash
# Check all workspaces
bun outdated

# Check specific workspace
bun --filter @repo/app outdated
```

## Update Strategies

### 1. Patch Updates (Safe)

Update patch versions (x.x.PATCH) - bug fixes only:

```bash
# Update all patch versions
bun update

# Update specific package patch
bun update react
```

### 2. Minor Updates (Usually Safe)

Update minor versions (x.MINOR.x) - new features, backwards compatible:

```bash
# Update to latest minor
bun update package-name@latest

# Check what would change
bun update --dry-run
```

### 3. Major Updates (Requires Testing)

Major versions may have breaking changes:

```bash
# Check current version
bun pm ls package-name

# Update to specific major
bun add package-name@5

# Update to latest
bun add package-name@latest
```

## Update Workflow

### Step 1: Audit Current State

```bash
# List all outdated
bun outdated

# Check for security vulnerabilities
bun audit
```

### Step 2: Create Update Branch

```bash
git checkout -b chore/update-deps
```

### Step 3: Update Dependencies

```bash
# Update all packages
bun update

# Or update specific package
bun add package-name@latest
```

### Step 4: Test Changes

```bash
# Type check
bun turbo check-types

# Lint
bun run lint

# Build all apps
bun run build

# Run tests
bun run test
```

### Step 5: Review Changes

```bash
# Check what changed
git diff bun.lockb

# Review package.json changes
git diff package.json
git diff apps/*/package.json
git diff packages/*/package.json
```

### Step 6: Commit and PR

```bash
git add .
git commit -m "chore: update dependencies"
git push -u origin chore/update-deps
gh pr create --title "chore: update dependencies"
```

## Common Update Scenarios

### Update Next.js

```bash
# Update Next.js across all apps
bun --filter @repo/www add next@latest
bun --filter @repo/app add next@latest
bun --filter @repo/docs add next@latest
bun --filter @repo/legal add next@latest

# Update related packages
bun add -D @types/node@latest
```

**Check:** Review Next.js changelog for breaking changes.

### Update React

```bash
# Update React and React DOM
bun add react@latest react-dom@latest
bun add -D @types/react@latest @types/react-dom@latest
```

**Check:** Ensure all React dependencies are compatible.

### Update TypeScript

```bash
# Update TypeScript
bun add -D typescript@latest

# Update in config package
cd packages/typescript-config
bun add -D typescript@latest
```

**Check:** Run `bun turbo check-types` to verify no new errors.

### Update Tailwind CSS

```bash
# Update Tailwind and related
bun add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

**Check:** Verify styles still apply correctly.

### Update shadcn/ui Components

```bash
# Update shadcn CLI
bunx shadcn@latest diff

# Update specific components that have changes
bunx shadcn@latest add button --overwrite -c packages/ui
```

### Update Biome

```bash
# Update Biome
bun add -D @biomejs/biome@latest

# Check for config changes
bunx biome migrate
```

### Update Motion (framer-motion)

```bash
# Update motion
bun add motion@latest
```

**Check:** Review animation behavior for any changes.

## Handling Breaking Changes

### 1. Read the Changelog

```bash
# View package changelog
gh release view --repo vercel/next.js

# Or check npm
open https://www.npmjs.com/package/next?activeTab=versions
```

### 2. Create Migration Plan

For major updates with breaking changes:

1. Read migration guide
2. List all breaking changes
3. Identify affected files
4. Update incrementally
5. Test after each change

### 3. Incremental Updates

For large updates, go version by version:

```bash
# Instead of 12.0 -> 15.0
# Do 12.0 -> 13.0 -> 14.0 -> 15.0
bun add next@13
# test
bun add next@14
# test
bun add next@15
# test
```

## Monorepo Considerations

### Workspace Dependencies

Ensure versions are consistent across workspaces:

```bash
# Check for version mismatches
bun pm ls --all | grep "react"
```

### Internal Package Updates

When updating `packages/ui`:

```bash
# Update the package
cd packages/ui
bun add @radix-ui/react-dialog@latest

# Rebuild
bun run build

# Test in consuming apps
bun --filter @repo/app dev
```

## Pinning Versions

For stability, consider pinning:

```json
// package.json
{
  "dependencies": {
    // Pinned exact version
    "critical-package": "1.2.3",
    // Allow patch updates
    "stable-package": "~1.2.3",
    // Allow minor updates (default)
    "flexible-package": "^1.2.3"
  }
}
```

## Rollback

If updates cause issues:

```bash
# Restore lockfile
git checkout bun.lockb

# Reinstall
bun install

# Or revert specific package
bun add package-name@previous-version
```

## Automation

Consider setting up Dependabot or Renovate for automated updates:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      dependencies:
        patterns:
          - "*"
```

## Security Updates

For urgent security fixes:

```bash
# Check for vulnerabilities
bun audit

# Update vulnerable packages
bun audit fix

# If fix not available, consider alternatives
```
