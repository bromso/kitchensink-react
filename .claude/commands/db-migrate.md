Run database migrations for the app using Drizzle Kit.

## Instructions

1. Change to app directory: `cd apps/app`
2. Run `npx drizzle-kit generate` to generate new migrations from schema changes
3. Run `npx drizzle-kit migrate` to apply pending migrations
4. Report the results

## Schema Location
- Schema file: `apps/app/src/lib/db/schema.ts`
- Database: `apps/app/dev.db` (SQLite)

## Common Operations
- **Generate**: Create migration files from schema changes
- **Migrate**: Apply pending migrations to database
- **Push**: Push schema directly (dev only, no migrations)
- **Studio**: Open Drizzle Studio to browse data

## Notes
- Always backup dev.db before running migrations in case of issues
- Schema changes should update the auth tables: user, session, account, verification
