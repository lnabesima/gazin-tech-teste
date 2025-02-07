FROM node:22-alpine AS builder

WORKDIR /backend

COPY package.json package-lock.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /backend

COPY --from=builder /backend/node_modules ./node_modules
COPY --from=builder /backend/prisma ./prisma
COPY --from=builder /backend/dist ./dist
COPY --from=builder /backend/package.json ./

ENV PORT=5001
ENV DATABASE_URL="postgresql://postgres:postgres@gazin-tech-db:5432/gazin-tech?schema=public"

EXPOSE 5001

CMD ["node", "dist/main.js"]
