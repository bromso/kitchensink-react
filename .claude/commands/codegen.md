# GraphQL Code Generation

Generate TypeScript types from GraphQL schema.

## Instructions

Run GraphQL code generation for the app:

```bash
cd apps/app && bunx graphql-codegen
```

After running, report:
- Success or failure status
- Generated files in `apps/app/src/gql/`
- Any type errors or schema issues that need attention

If codegen fails, check:
1. Schema validity in `apps/app/src/data/schema/`
2. GraphQL operations in component files
3. Codegen configuration in `apps/app/codegen.ts` or similar
