<template>
  <div v-if="!$store.state.backend.waitingForConnection" id="app" data-cy="kiotp">
    <router-view :key="$route.fullPath" />
  </div>
  <k-offline v-else />
</template>

<script lang="ts">
import { Component, Provide } from 'vue-property-decorator';
import {
  KOffline,
  KConnectionMixin,
  langsProvideKey,
} from '@kuzzleio/kuzzle-application-builder';
import config from './config'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// TODO - Make host application independent from this stylesheet
// KIoTP Lib should ship with embedded styles.
import '@kuzzleio/iot-console/src/assets/style.scss'
import { kuzzle } from './services/kuzzle';
@Component({
  components: {
    KOffline,
  }
})
export default class App extends KConnectionMixin {
  @Provide(langsProvideKey) public langs = config.i18n.locales
  // WARNING - Something weird happens here. If I name this member $kuzzle
  // the value in the _provided attribute is undefined.
  // If I assign a string to this.$kuzzle, I get a TS error saying that
  // in type BackendConnectionMixins, the $kuzzle member can only be of type
  // Kuzzle. This is probably due to the type augmentation performed by
  // the Vue Plugin Kuzzle. The workaround is to name this differently.
  @Provide('$kuzzle') public k = kuzzle
}
</script>

<style lang="scss">
</style>