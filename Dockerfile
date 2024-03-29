# https://cli.vuejs.org/guide/deployment.html#docker-nginx

FROM node:lts as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN BUILD_PATH=/app/dist npm run build

FROM nginx:alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
