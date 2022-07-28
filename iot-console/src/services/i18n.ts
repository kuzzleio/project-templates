import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { mergeLocaleMessages } from '@kuzzleio/kuzzle-application-builder'

import defaultsDeep from 'lodash/defaultsDeep'

// The locales of the app
import en from '../locales/en.json'
import fr from '../locales/fr.json'

// The locales of the IoT Console
import { locales as KIoTPLocales } from '@kuzzleio/iot-console'

// Install the VueI18n plugin
Vue.use(VueI18n)

// Merge all the locale messages
const localeMessages = {
  en: defaultsDeep(en, KIoTPLocales.en),
  fr: defaultsDeep(fr, KIoTPLocales.fr)
}

// Instantiate VueI18n
export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: mergeLocaleMessages(localeMessages)
})
