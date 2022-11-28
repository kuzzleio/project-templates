import VueRouter from "vue-router";
// In this example we use the `KIoTCViews` chunk, but you can use any other chunk,
// as explained above.
import { KIoTPBase as AppLayout, RootState } from "@kuzzleio/iot-console";
import {
  AppChunk,
  createAuthenticationGuard,
  createOnlineGuard,
  generateMenuItems,
  generateRoutes,
  KPageNotFound,
} from "@kuzzleio/kuzzle-application-builder";
import { Store } from "vuex";
import {
  chunk as dashboardBuilderChunk,
} from '../views/dashboards/appChunks'

import { kuzzle } from "../services/kuzzle";
import Login from "../views/Login.vue";

export const createRouter = (
  store: Store<RootState>,
  appDefinition: AppChunk[] = []
): VueRouter => {

  appDefinition.unshift(dashboardBuilderChunk);

  const appRoutes = generateRoutes(appDefinition);
  const sidebarItems = generateMenuItems(appDefinition);

  const router = new VueRouter({
    base: process.env.BASE_URL,
    mode: "history",
    routes: [
      {
        path: "/login",
        name: "login",
        component: Login,
      },
      {
        name: "home",
        path: "/",
        beforeEnter: createAuthenticationGuard(store, "login"),
        component: AppLayout,
        props: { navbarItems: [], sidebarItems },
        children: appRoutes,
        redirect: '/assets',
        meta: {
          breadcrumb: "locales.nav.home",
        }
      },
      {
        path: "*",
        component: KPageNotFound,
      },
    ],
  });

  router.beforeEach(createOnlineGuard<RootState>(store, kuzzle));

  return router;
};
