FROM node:22 AS dev

WORKDIR /backend

COPY package.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV DATABASE_URL="postgresql://postgres:postgres@gazin-tech-db:5432/gazin-tech?schema=public"

EXPOSE 3000

CMD ["pnpm", "start"]
