#Stage 1
FROM node:alpine AS development

ENV NODE_ENV development

WORKDIR /app

COPY ./package*.json /app

RUN npm install

COPY . .

CMD ["npm","start"]

# Stage 2

FROM node:alpine AS builder

ENV NODE_ENV production

WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf