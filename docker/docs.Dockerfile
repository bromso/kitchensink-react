# apps/docs - Documentation (port 3003)
FROM oven/bun:1 AS base
RUN apt-get update && apt-get install -y unzip && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS pruner
RUN bun add -g turbo@2.5.5
COPY . .
RUN turbo prune @repo/docs --docker

FROM base AS installer
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock ./bun.lock
RUN bun install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
# Fumadocs MDX generation
RUN bun --filter @repo/docs run postinstall
RUN bun turbo build --filter=@repo/docs

FROM oven/bun:1-slim AS runner
WORKDIR /app
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 nextjs
ENV NODE_ENV=production PORT=3003 HOSTNAME="0.0.0.0"
COPY --from=installer --chown=nextjs:nodejs /app/apps/docs/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/docs/.next/static ./apps/docs/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/docs/public ./apps/docs/public
USER nextjs
EXPOSE 3003
CMD ["bun", "run", "apps/docs/server.js"]
