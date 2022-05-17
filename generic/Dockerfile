# Builder stage
FROM kuzzleio/kuzzle-runner:16 as builder

ARG KUZZLE_VAULT_KEY
ENV KUZZLE_VAULT_KEY=$KUZZLE_VAULT_KEY

ADD . /var/app

WORKDIR /var/app

RUN npm install
RUN npm run build
RUN npm prune --production

# Final image
FROM node:16-stretch-slim

ARG KUZZLE_VAULT_KEY
ENV KUZZLE_VAULT_KEY=$KUZZLE_VAULT_KEY

ENV NODE_ENV=production

WORKDIR /var/app

COPY --from=builder /var/app/ .

CMD [ "node", "app.js" ]
