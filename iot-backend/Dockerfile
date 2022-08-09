# Builder stage
FROM kuzzleio/kuzzle-runner:16 as builder

ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

# ARG KUZZLE_VAULT_KEY
# ENV KUZZLE_VAULT_KEY=$KUZZLE_VAULT_KEY

WORKDIR /var/app

COPY . .

RUN npm config set @kuzzleio:registry https://packages.paas.kuzzle.io
RUN npm set //packages.paas.kuzzle.io/:_authToken $NPM_TOKEN

RUN npm i
RUN npm run build
RUN npm prune --production

# Final image
FROM node:16-stretch-slim

# ARG KUZZLE_VAULT_KEY
# ENV KUZZLE_VAULT_KEY=$KUZZLE_VAULT_KEY

ENV NODE_ENV=production

WORKDIR /var/app

COPY --from=builder /var/app/dist .
COPY --from=builder /var/app/node_modules ./../node_modules

CMD [ "node", "app.js" ]
