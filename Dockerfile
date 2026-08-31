FROM node:20-slim AS deps
WORKDIR /my-app
COPY package.json package-lock.json .
RUN npm ci

FROM node:20-slim AS builder
WORKDIR /my-app
COPY --from=deps /my-app/node_modules ./node_modules
COPY . .
RUN apt-get update && apt-get install -y openssl
RUN ./node_modules/.bin/prisma generate
ARG NEXT_PUBLIC_RAZORPAY_KEY_ID
ENV NEXT_PUBLIC_RAZORPAY_KEY_ID=$NEXT_PUBLIC_RAZORPAY_KEY_ID
RUN npm run build

FROM node:20-slim
WORKDIR /my-app
ENV NODE_ENV=production
COPY --from=builder /my-app/public ./public
COPY --from=builder /my-app/.next/standalone .
COPY --from=builder /my-app/.next/static ./.next/static
RUN apt-get update && apt-get install -y openssl
EXPOSE 3000
CMD ["node", "server.js"]