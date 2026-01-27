# apps/legal - Legal (port 3002)
FROM oven/bun:1 AS base
RUN apt-get update && apt-get install -y unzip && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS pruner
RUN bun add -g turbo@2.5.5
COPY . .
RUN turbo prune @repo/legal --docker

FROM base AS installer
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock ./bun.lock
RUN bun install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
# Fumadocs MDX generation
RUN bun --filter @repo/legal run postinstall
RUN bun turbo build --filter=@repo/legal

FROM oven/bun:1-slim AS runner
WORKDIR /app
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 nextjs
ENV NODE_ENV=production PORT=3002 HOSTNAME="0.0.0.0"
COPY --from=installer --chown=nextjs:nodejs /app/apps/legal/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/legal/.next/static ./apps/legal/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/legal/public ./apps/legal/public
USER nextjs
EXPOSE 3002
CMD ["bun", "run", "apps/legal/server.js"]
