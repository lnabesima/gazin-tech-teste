FROM node:22 AS builder

WORKDIR /frontend

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22 AS production

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/package.json ./package.json

ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_URL=http://localhost:5001/api/v1

EXPOSE 3000

CMD ["npm", "start"]
