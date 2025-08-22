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

ENV NODE_ENV=production \
	HOSTNAME=0.0.0.0 \
	PORT=5175 \
	NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Install only production dependencies (skip husky and all install scripts)
ENV HUSKY=0
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copy build artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 5175
USER nextjs

# Run Next.js server
CMD ["npm", "run", "start"]