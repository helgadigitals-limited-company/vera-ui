# syntax=docker/dockerfile:1.6

# -------------------------------
# Base image with pnpm via Corepack
# -------------------------------
FROM --platform=$BUILDPLATFORM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate
WORKDIR /app
RUN apk add --no-cache libc6-compat

# -------------------------------
# Build stage
# -------------------------------
FROM base AS build

# Copy manifests first for better caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ui/package.json packages/ui/
COPY packages/docs/package.json packages/docs/

# Copy source.config.ts before install (needed by fumadocs-mdx postinstall)
COPY packages/docs/source.config.ts packages/docs/
COPY packages/docs/vite-env.d.ts packages/docs/

# Set environment for Next.js specific MDX generation
ENV FUMADOCS_RUNTIME=next

# Install workspace deps (cached)
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --frozen-lockfile

# Copy remaining source
COPY . .

# 🔑 Build UI package and pack it
RUN cd packages/ui && \
    pnpm build && \
    pnpm pack --pack-destination ../docs

# 🔑 Replace workspace dependency with local tarball in docs
RUN cd packages/docs && \
    UI_TGZ=$(ls *.tgz | head -n 1) && \
    echo "Found UI package tarball: $UI_TGZ" && \
    pnpm add ./$(basename "$UI_TGZ")

# 🔨 Build docs app
RUN cd packages/docs && pnpm build

# -------------------------------
# Runtime stage
# -------------------------------
FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Copy standalone Next.js server (already has prod node_modules)
COPY --from=build /app/packages/docs/.next/standalone ./
COPY --from=build /app/packages/docs/.next/static ./.next/static
COPY --from=build /app/packages/docs/public ./public

# ✅ Also ship UI tarball into runtime for debugging / reinstallation
RUN mkdir -p ./vendor
COPY --from=build /app/packages/docs/*.tgz ./vendor/

EXPOSE 3000
CMD ["node", "packages/docs/server.js"]
