# Multi-stage Dockerfile for Next.js (NOVA NEXUS) on Google Cloud Run
# Compatible with Next.js 16+ standalone output

FROM node:20-alpine AS base

# Step 1: Install dependencies only when needed
FROM base AS deps
# Install libc6-compat for Alpine glibc compatibility with native packages
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package management manifests
COPY package.json package-lock.json ./
RUN npm ci

# Step 2: Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Support optional Google Maps API Key passed at build-time if needed
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

RUN npm run build

# Step 3: Production runner image, copy minimal artifacts and run Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create dedicated non-root system group and user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets and standalone server package
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Run application as non-root user for security compliance
USER nextjs

EXPOSE 3000

# Start Next.js standalone Node server
CMD ["node", "server.js"]
