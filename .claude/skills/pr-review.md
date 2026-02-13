# PR Review Skill

Create and review pull requests. Use this skill when ready to submit changes for review or when reviewing existing PRs.

## When to Use

- Ready to create a pull request
- Reviewing someone else's PR
- Checking PR status and feedback

## Creating a Pull Request

### 1. Pre-PR Checklist

Before creating a PR, verify:

```bash
# Check for uncommitted changes
git status

# Run type checking
bun turbo check-types

# Run linting
bun run lint

# Run tests (if applicable)
bun run test

# Build to catch issues
bun run build
```

### 2. Create the PR

```bash
# Push your branch
git push -u origin feature/my-feature

# Create PR with gh CLI
gh pr create --title "feat: add user settings page" --body "## Summary
- Added settings page with profile form
- Integrated with existing auth system

## Test plan
- [ ] Navigate to /settings
- [ ] Update profile information
- [ ] Verify changes persist"
```

### 3. PR Title Format

Follow conventional commits:

```
feat: add new feature
fix: resolve bug in component
docs: update README
style: format code
refactor: restructure module
test: add unit tests
chore: update dependencies
```

### 4. PR Description Template

```markdown
## Summary

Brief description of what this PR does and why.

- Bullet point of main change 1
- Bullet point of main change 2

## Changes

### Added
- New feature X

### Changed
- Modified behavior of Y

### Fixed
- Bug in Z

## Test Plan

- [ ] Manual test step 1
- [ ] Manual test step 2
- [ ] Automated tests pass

## Screenshots

(If UI changes, include before/after screenshots)

## Related Issues

Closes #123
```

## Reviewing a Pull Request

### 1. Fetch and View PR

```bash
# List open PRs
gh pr list

# View specific PR
gh pr view 123

# Checkout PR locally
gh pr checkout 123
```

### 2. Review Checklist

#### Code Quality
- [ ] Code follows project conventions
- [ ] No unnecessary complexity
- [ ] Functions/components have single responsibility
- [ ] No hardcoded values that should be config

#### Functionality
- [ ] Logic is correct
- [ ] Edge cases handled
- [ ] Error handling appropriate
- [ ] No breaking changes (or documented)

#### Security
- [ ] No sensitive data exposed
- [ ] Input validation present
- [ ] No SQL/XSS vulnerabilities
- [ ] Auth checks where needed

#### Performance
- [ ] No unnecessary re-renders
- [ ] No memory leaks
- [ ] Efficient queries/algorithms
- [ ] Large lists virtualized

#### Accessibility
- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Color contrast sufficient

#### Testing
- [ ] Tests cover main paths
- [ ] Edge cases tested
- [ ] Tests are maintainable

### 3. Leave Review

```bash
# Approve
gh pr review 123 --approve

# Request changes
gh pr review 123 --request-changes --body "Please address the following..."

# Comment without approval/rejection
gh pr review 123 --comment --body "Looks good overall, minor suggestions..."
```

### 4. Comment on Specific Lines

```bash
# View PR diff
gh pr diff 123

# Add comment via web UI or:
gh api repos/{owner}/{repo}/pulls/123/comments \
  --field body="Consider using a constant here" \
  --field path="src/components/Button.tsx" \
  --field line=42
```

## Managing PRs

### Update PR

```bash
# Fetch latest main
git fetch origin main

# Rebase on main (preferred)
git rebase origin/main

# Or merge main
git merge origin/main

# Push updates
git push --force-with-lease
```

### View PR Checks

```bash
# View CI status
gh pr checks 123

# View check details
gh run view <run-id>
```

### Merge PR

```bash
# Squash merge (preferred for clean history)
gh pr merge 123 --squash

# Regular merge
gh pr merge 123 --merge

# Rebase merge
gh pr merge 123 --rebase
```

## Common Review Comments

### Suggesting Improvements

```markdown
**Suggestion:** Consider extracting this into a custom hook for reusability.

```tsx
// Instead of:
const [data, setData] = useState(null)
useEffect(() => { fetch()... }, [])

// Consider:
const { data } = useUserData(userId)
```
```

### Requesting Clarification

```markdown
**Question:** What's the expected behavior when `userId` is undefined?
Should we show a loading state or redirect?
```

### Pointing Out Issues

```markdown
**Issue:** This could cause a memory leak if the component unmounts before the fetch completes.

Consider adding cleanup:
```tsx
useEffect(() => {
  const controller = new AbortController()
  fetch(url, { signal: controller.signal })
  return () => controller.abort()
}, [url])
```
```

### Praising Good Work

```markdown
**Nice:** Clean implementation of the debounce logic!
```

## PR Labels

Common labels to use:

- `bug` - Bug fix
- `feature` - New feature
- `breaking` - Breaking change
- `docs` - Documentation
- `needs-review` - Ready for review
- `wip` - Work in progress
- `blocked` - Blocked by something

```bash
# Add label
gh pr edit 123 --add-label "needs-review"

# Remove label
gh pr edit 123 --remove-label "wip"
```

## Draft PRs

For work in progress:

```bash
# Create as draft
gh pr create --draft --title "WIP: new feature"

# Convert draft to ready
gh pr ready 123
```

## Resolving Conflicts

```bash
# Checkout PR
gh pr checkout 123

# Fetch latest main
git fetch origin main

# Rebase
git rebase origin/main

# Resolve conflicts in each file
# Then continue
git add .
git rebase --continue

# Force push
git push --force-with-lease
```
