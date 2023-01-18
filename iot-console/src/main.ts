import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { formatDate, formatDateTime, formatSvg } from '@kuzzleio/iot-console';
import {
  BootstrapVue,
  BootstrapVueIcons,
  ModalPlugin,
  ToastPlugin,
  VBModal,
  VBToggle,
} from 'bootstrap-vue';
import { VBTooltip } from 'bootstrap-vue/src/directives/tooltip';
import VueBreadcrumbs from 'vue-2-breadcrumbs';
import VueRouter from 'vue-router';
import i18n from './services/i18n';
import App from './App.vue';
import store from './store';
import { createRouter } from './router';
import { appDefinition } from './appDefinition';

// BOOTSTRAP DIRECTIVEs
Vue.directive('b-modal', VBModal);
Vue.directive('b-toggle', VBToggle);
Vue.directive('b-tooltip', VBTooltip);

// VUE PLUGINS
Vue.use(VueRouter);
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);
Vue.use(VueBreadcrumbs);
Vue.use(BootstrapVueIcons);
Vue.use(BootstrapVue);

// VUE FILTERS
Vue.filter('formatDateTime', formatDateTime);
Vue.filter('formatDate', formatDate);
Vue.filter('formatSvg', formatSvg);

Vue.config.productionTip = false;

const router = createRouter(store, appDefinition);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
