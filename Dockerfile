FROM node:20.13.1 AS base

RUN npm install -g pnpm@8

FROM base AS depencencies
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

FROM base AS build
WORKDIR /usr/src/app
COPY . ./
COPY --from=depencencies /usr/src/app/node_modules ./node_modules
RUN pnpm run build
RUN pnpm prune --prod 

FROM node:20.13.1-alpine3.19 AS deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/main.js"]