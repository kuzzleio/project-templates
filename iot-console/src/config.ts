import { KuzzleProtocol } from "vue-plugin-kuzzle";

export default {
  backends: {
    production: {
      host: "api.iot-console.app.kuzzle.io",
      protocol: KuzzleProtocol.WEBSOCKET,
      options: {
        port: 443,
        sslConnection: true,
      },
    },
    local: {
      host: "localhost",
      protocol: KuzzleProtocol.WEBSOCKET,
      options: {
        port: 7512,
        sslConnection: false,
      },
    },
  },
  i18n: {
    locales: {
      en: "English",
      fr: "Français",
    },
  },
  customizations: {
    index: "customizations",
    collection: "config",
  },
};
