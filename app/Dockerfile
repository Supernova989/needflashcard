FROM node:12.16.2-alpine AS build
MAINTAINER ismak@eml.cc
RUN mkdir -p /app
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --silent
COPY . .
RUN npm run build
# Serve static files from "build"
FROM nginx:1.20-alpine
COPY --from=build /app/build/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
