# IoT Console

This is the frontend of the IoT Platform.

## Project setup

Run `npm install` and the `npm run serve`

You need at least to authenticate with an user, you can create the admin user with:
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

Then you can create the first tenant from the interface: Administration > Tenant > Create.

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