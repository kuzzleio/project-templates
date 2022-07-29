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
  createDashboardView,
  MapWidget,
  MapWidgetForm,
  ChartWidget,
  ChartWidgetForm,
  TableWidget,
  TableWidgetForm,
} from '@kuzzleio/dashboard-builder'

import { kuzzle } from "../services/kuzzle";
import Login from "../views/Login.vue";

export const createRouter = (
  store: Store<RootState>,
  appDefinition: AppChunk[] = []
): VueRouter => {

  appDefinition.push({
    name: 'dashboards',
    label: 'Dashboards',
    icon: (faTachometerAlt),
    vuejsRoute: {
      path: '/dashboards',
      name: 'dashboards',
      component: DashboardWrapper,
      meta: {
        breadcrumb: 'locales.nav.dashboards'
      },
      children: [
        {
          path: 'v/:dashboardId',
          name: 'dashboard-view',
          component: Dashboard,
          meta: {
            breadcrumb: 'locales.dashboards.nav.view'
          },
          props: (route: Route): { id: string } => ({
            id: route.params.dashboardId
          })
        },
        {
          path: 'new',
          name: 'create-dashboard',
          component: Dashboard,
          meta: {
            breadcrumb: 'locales.dashboards.nav.create'
          }
        },
        {
          path: '',
          name: 'dashboards',
          component: DashboardList,
          meta: {
            breadcrumb: 'locales.dashboards.nav.list'
          }
        },
      ]
    },
  });

  const appRoutes = generateRoutes(appDefinition);
  const sidebarItems = generateMenuItems(appDefinition);
  const kdbWidgets = [
    {
      name: 'map',
      label: 'Map',
      component: MapWidget,
      formComponent: MapWidgetForm,
      icon: 'map'
    },
    {
      name: 'chart',
      label: 'Chart',
      component: ChartWidget,
      formComponent: ChartWidgetForm,
      icon: 'chart-bar'
    },
    {
      name: 'table',
      label: 'Table',
      component: TableWidget,
      formComponent: TableWidgetForm,
      icon: 'table'
    },
    // You can add other custom widgets here...
  ];
  const DashboardView = createDashboardView({ customWidgets: kdbWidgets })

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
        path: "/",
        beforeEnter: createAuthenticationGuard(store, "login"),
        component: AppLayout,
        props: { navbarItems: [], sidebarItems },
        children: appRoutes,
        redirect: { name: "login" },
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
