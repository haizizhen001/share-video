FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY public/ ./public
COPY src/ ./src

RUN yarn install

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json /react-docker-example/


# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
