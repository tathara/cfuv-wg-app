FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./
# COPY .nginx/nginx.conf ./.nginx/nginx.conf

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
# COPY --from=build /app/.nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
