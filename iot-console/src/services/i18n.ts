import { locales as dashboardBuilderLocales } from '@kuzzleio/dashboard-builder';
import { locales as KIoTPLocales } from '@kuzzleio/iot-console';
import { mergeLocaleMessages } from '@kuzzleio/kuzzle-application-builder';
import defaultsDeep from 'lodash/defaultsDeep';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '../locales/en.json';
import fr from '../locales/fr.json';

Vue.use(VueI18n);
const localeMessages = {
  en: defaultsDeep(en, KIoTPLocales.en, dashboardBuilderLocales.en),
  fr: defaultsDeep(fr, KIoTPLocales.fr, dashboardBuilderLocales.fr),
};

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: mergeLocaleMessages(localeMessages),
});
