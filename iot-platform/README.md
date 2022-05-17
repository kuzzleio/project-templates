# Kuzzle IoT Platform

## Installation and run

Requirement:
 - Node.js >= 14
 - NPM >= 6
 - Docker
 - Docker-Compose

First, install [Kourou](https://github.com/kuzzleio/kourou), the Kuzzle CLI: `npm install -g kourou`


### Docker

First, you need then to install dependencies: `npm run docker npm install`

Then, start your application with `npm run docker:dev`

### Standalone

First, you need to login to our private package repository:

```
npm login --scope=@kuzzleio --registry=https://packages.app.kuzzle.io
# Username: <username>
# Password: <licence-key>
# Email: (this IS public): <email>
```

Then, you need then to install dependencies: `npm install`

You also need to start Kuzzle additional service: `npm run services`

Finally, start your application with `npm run dev`

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

## Troubleshooting

### NODE_MODULE_VERSION mismatch

This message indicate that you may try to run your Kuzzle application with a different Node.js version from the one you used to build the application.

Try to rebuild dependencies from inside your Docker container with: `npm run docker npm rebuild`

**Symptoms:**
```
kiotp_node_2     | > kuzzle-iot-platform@1.0.0 dev /var/app
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
