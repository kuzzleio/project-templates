# Builder stage
FROM kuzzleio/kuzzle-runner:16 as builder

ARG KUZZLE_VAULT_KEY
ENV KUZZLE_VAULT_KEY=$KUZZLE_VAULT_KEY

ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

RUN echo $NPM_TOKEN

RUN npm config set @kuzzleio:registry https://packages.paas.kuzzle.io
RUN npm set //packages.paas.kuzzle.io/:_authToken $NPM_TOKEN

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

COPY --from=builder /var/app/dist .

CMD [ "node", "app.js" ]
