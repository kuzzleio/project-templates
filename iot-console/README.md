# frontend

## Project setup

`npm i @kuzzleio/kuzzle-application-builder`
`npm i @kuzzleio/iot-console @kuzzleio/dashboard-builder`

## Troubleshooting

### Vue packages version mismatch:

Message:
```
Vue packages version mismatch:

- vue@2.6.14 (/home/aschen/projets/kuzzleio/project-scaffold/iot-console/node_modules/vue/dist/vue.runtime.common.js)
- vue-template-compiler@2.7.8 (/home/aschen/projets/kuzzleio/project-scaffold/iot-console/node_modules/vue-template-compiler/package.json)

This may cause things to work incorrectly. Make sure to use the same version for both.
If you are using vue-loader@>=10.0, simply update vue-template-compiler.
If you are using vue-loader@<10.0 or vueify, re-installing vue-loader/vueify should bump vue-template-compiler to the latest.
```

Install correct version of `vue-template-compiler` to match `vue` version: `npm i vue-template-compiler@2.6.14`