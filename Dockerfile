# syntax=docker/dockerfile:1
FROM node as builder
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn tsc

FROM node:slim

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080
# RUN node dist/src/main.js
CMD [ "node", "dist/src/main.js"]
# CMD [ "tail", "-f", "/dev/null"]
