FROM node:21-alpine as builder

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci

COPY app/ app/
COPY next.config.js ./
COPY postcss.config.js ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./

ARG UPDATE_TOKEN
ARG NEXT_PUBLIC_CONTENTFUL_SPACE_ID
ARG NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

RUN npm run build

# Production
FROM node:21-alpine

COPY --from=builder /app /app
WORKDIR /app

ENTRYPOINT [ "/app/node_modules/.bin/next" ]
CMD [ "start", "-H", "0.0.0.0", "--port", "9000" ]
