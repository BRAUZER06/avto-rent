# syntax=docker/dockerfile:1

# --- Builder stage: install deps and build Next.js in standalone mode ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (clean, reproducible)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- Runner stage: minimal image to run the app ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=5175

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy only the necessary runtime artifacts from the builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 5175
USER nextjs

# Run the standalone server produced by Next.js
CMD ["node", "server.js"]