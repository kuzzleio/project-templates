# Builder stage
FROM kuzzleio/kuzzle-runner:16 as builder

WORKDIR /var/app

COPY . .

RUN npm install
RUN npm run build
RUN npm prune --production

# Final image
FROM node:16-stretch-slim

ARG KUZZLE_ENV="local"
ARG KUZZLE_VAULT_KEY=""

# Uncomment if you want to use the Kuzzle Vault
# See https://docs.kuzzle.io/core/2/guides/advanced/secrets-vault
# ENV KUZZLE_VAULT_KEY=$KUZZLE_VAULT_KEY
# ENV KUZZLE_SECRETS_FILE="/var/app/environments/${KUZZLE_ENV}/secrets.enc.json"

ENV NODE_ENV=production

WORKDIR /var/app

COPY --from=builder /var/app/environments/${KUZZLE_ENV}/kuzzlerc /var/app/.kuzzlerc
COPY --from=builder /var/app/ .

CMD [ "node", "app.js" ]
