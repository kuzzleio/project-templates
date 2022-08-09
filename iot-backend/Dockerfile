# Builder stage
FROM kuzzleio/kuzzle-runner:16 as builder


ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

ARG KUZZLE_ENV
ENV KUZZLE_ENV=$KUZZLE_ENV

RUN npm config set @kuzzleio:registry https://packages.paas.kuzzle.io
RUN npm set //packages.paas.kuzzle.io/:_authToken $NPM_TOKEN

# Uncomment when using a vault file
# ARG KUZZLE_VAULT_KEY
# ENV KUZZLE_VAULT_KEY=$KUZZLE_VAULT_KEY
# ENV KUZZLE_SECRETS_FILE=/var/app/secrets.enc.json
# ADD ./environments/$KUZZLE_ENV/secrets.enc.json $KUZZLE_SECRETS_FILE

ADD . /var/app
ADD ./environments/$KUZZLE_ENV/kuzzlerc /var/app/.kuzzlerc

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
