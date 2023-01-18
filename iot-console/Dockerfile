# Build step
FROM kuzzleio/kuzzle-runner:14 as builder

ARG VUE_APP_BACKEND
ENV VUE_APP_BACKEND=$VUE_APP_BACKEND

WORKDIR /app
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# Server step
FROM nginx:stable-alpine as production-stage

COPY --from=builder /app/.nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
