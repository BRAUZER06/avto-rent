# syntax=docker/dockerfile:1

# --- Builder stage: установка зависимостей и билд standalone ---
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходники
COPY . ./

# Отключаем телеметрию Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Создаём папку для кэша и даём права на запись (для build)
RUN mkdir -p .next/cache && chmod -R 777 .next

# Собираем standalone
RUN npm run build

# --- Runner stage: минимальный контейнер для запуска ---
FROM node:20-alpine AS runner
WORKDIR /app

# Переменные окружения
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=5175 \
    NEXT_TELEMETRY_DISABLED=1 \
    HUSKY=0

# Создаём пользователя nextjs
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Устанавливаем только production зависимости
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Копируем build артефакты
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Создаём папку cache и даём права пользователю nextjs
RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next

# Открываем порт
EXPOSE 5175

# Меняем пользователя
USER nextjs

# Запуск standalone сервера на порту 5175
CMD ["node", "server.js"]
