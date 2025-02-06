FROM node:22-alpine AS builder

WORKDIR /frontend

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /frontend

COPY package.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/package.json ./package.json

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
