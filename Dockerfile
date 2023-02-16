FROM node:alpine

RUN apk update && apk upgrade
RUN apk add --update --no-cache 
# openssl1.1-compat
RUN npm cache clean --force
# INSTALLING PNPM
RUN npm install -g pnpm

# ADDING GIT
RUN apk add git

WORKDIR /app

COPY ./package*.json ./
COPY prisma ./prisma/
COPY .npmrc ./
COPY .env ./

COPY . .

RUN npx prisma generate
RUN pnpm i



# FROM node:17-alpine

ENV PATH ./node_modules/.bin/:$PATH