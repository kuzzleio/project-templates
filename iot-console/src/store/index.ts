import Vue from "vue";
import Vuex from "vuex";
import { kuzzle, observer } from "@/services/kuzzle";
import {
  alertsStoreFactory,
  createAssetsStoreModule,
  createDevicesStoreModule,
  createMeasuresStoreModule,
  RootState as KIoTPRootState,
  createTenantsStoreModule,
  StoreNamespaceTypes,
} from "@kuzzleio/iot-console";
import {
  createAuthStoreModule,
  createBackendStoreModule,
  KStoreModuleTypes,
} from "@kuzzleio/kuzzle-application-builder";

Vue.use(Vuex);

export interface RootState extends KIoTPRootState {
  strict: boolean;
}

export default new Vuex.Store<RootState>({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    [KStoreModuleTypes.BACKEND]: createBackendStoreModule<RootState>(kuzzle),
    tenants: createTenantsStoreModule<RootState>(kuzzle),
    [KStoreModuleTypes.AUTH]: createAuthStoreModule<RootState>(kuzzle),
    [StoreNamespaceTypes.ASSETS]: createAssetsStoreModule<RootState>(
      kuzzle,
      observer
    ),
    [StoreNamespaceTypes.DEVICES]: createDevicesStoreModule<RootState>(
      kuzzle,
      observer
    ),
    [StoreNamespaceTypes.MEASURES]:
      createMeasuresStoreModule<RootState>(kuzzle),
    [StoreNamespaceTypes.ALERTS]: alertsStoreFactory<RootState>(kuzzle)
  },
});
