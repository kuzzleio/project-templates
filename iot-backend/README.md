# Kuzzle IoT Backend

## Installation and run

Requirement:
 - Node.js >= 14
 - NPM >= 6
 - Docker
 - Docker-Compose

First, install [Kourou](https://github.com/kuzzleio/kourou), the Kuzzle CLI: `npm install -g kourou`

### First setup of your local PaaS environment

You need to initialize your PaaS project information for this repository:

```bash
kourou paas:init <paas-project-name>
```

Then, you can login to the PaaS. This will also activate your license to download private packages.

Execute this command and follow the instructions:

```bash
kourou paas:login
```

_Under the hood, this command will create a `.npmrc` file to save your authentication to our private registry._

### Install dependencies

You can now install the dependencies with the following command:

```bash
npm run docker npm install
```

_You should always manipulate NPM from inside the container to avoid futur problems_

### Initialize local data

Once you are done, you can run the project by using `npm run docker:dev`.

Then, you will need to create the first administrator:

```bash
kourou security:createUser '{
  content: {
    profileIds: ["admin"]
  },
  credentials: {
    local: {
      username: "admin",
      password: "admin"
    }
  }
}'
```

Finally, you need to create the first tenant. If it's not already done, rename accordingly the example tenant group `example_public_lightning` in the `./application-builder/tenant-example-public-lightning` file.

You can now create the first tenant:

```bash
# replace "example_public_lightning" with the name of your tenant group
kourou multi-tenancy/tenant:create -a name=kuzzle -a group=example_public_lightning
```

## Manipulating NPM through Docker

It's important to install NPM packages from inside the container to avoid Node.js mismatch errors.

Those errors may appear when
 - the Node.js version installed on your computer is not the same as the one used in our Docker containers
 - your computer use a different version of the GLIBC
 - your computer use a different CPU architecture (e.g. MacOS use Darwin)

To prevent those errors, you can use the following commands
 - `npm run docker` run any command into the container context (e.g. `npm run docker ls`)
 - `npm run docker npm install` run a standard `npm install` (e.g. `npm run npm install axios`)
 - `npm run docker npm rebuild` run a standard `npm rebuild`
 - etc.

## Building production image

You can build a production image with the provided Dockerfile.

This Dockerfile take 2 build arguments:
 - `NPM_TOKEN`: your access token for private package repository
 - `KUZZLE_VAULT_KEY`: optionnal [Vault Key]()

```bash
docker build --build-arg NPM_TOKEN=<auth-token> -t <image-name> .
```

## Adding the Vault to the project

First, read the [official guide](https://docs.kuzzle.io/core/2/guides/advanced/secrets-vault/) to understand the secret vault.

You will need to generate a vault key for each environment.

It's recommended to follow this format: `kv_<project>_<environment>_<random-password>`

Then you will need to encrypt the secrets files located in `environments/<environment>/secrets.json` by using the corresponding vault keys.

Finally, look for every occurence of the following comment `Uncomment when using a vault file` and uncomment the related lines.

### Build PaaS compatible image

To be compatible with the PaaS and allowed to be deployed, the image must follow this convention:

Format: `harbor.paas.kuzzle.io/<project-name>/<name>:<version>`

Example: `harbor.paas.kuzzle.io/kuzzle-iot-monitor/platform:1.4.2`

Complete build example:

```
docker build --build-arg NPM_TOKEN=<auth-token> -t harbor.paas.kuzzle.io/kuzzle-iot-monitor/platform:1.4.2 .
```

## Troubleshooting

### NODE_MODULE_VERSION mismatch

This message indicate that you may try to run your Kuzzle application with a different Node.js version from the one you used to build the application.

Try to rebuild dependencies from inside your Docker container with: `npm run docker npm rebuild`

**Symptoms:**
```
kiotp_node_2     | > kuzzle-iot-backend@1.0.0 dev /var/app
kiotp_node_2     | > NODE_ENV=development ergol start.ts -c ergol.config.json
kiotp_node_2     |
kiotp_node_2     | Debugger listening on ws://0.0.0.0:9229/58d23bb2-d8fb-4fc0-b328-df52eaa27273
kiotp_node_2     | For help, see: https://nodejs.org/en/docs/inspector
kiotp_node_2     | Error: The module '/var/app/node_modules/murmurhash-native/lib/Release/murmurhash.node'
kiotp_node_2     | was compiled against a different Node.js version using
kiotp_node_2     | NODE_MODULE_VERSION 93. This version of Node.js requires
kiotp_node_2     | NODE_MODULE_VERSION 83. Please try re-compiling or re-installing
kiotp_node_2     | the module (for instance, using `npm rebuild` or `npm install`).
```

### Error: Integrity checksum failed when using sha512: wanted sha512-BBB..== but got sha512-AAA..==

