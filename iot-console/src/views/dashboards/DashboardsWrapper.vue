<template>
  <router-view :engine="currentTenant"></router-view>
</template>

<script lang="ts">
import { KCollectionsNamespace } from '@kuzzleio/kuzzle-application-builder';
import { KTenantGetters } from '@kuzzleio/iot-console';
import Component from "vue-class-component";
import { Prop, Provide, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { kuzzle } from '../../services/kuzzle'

@Component({
  computed: {
    ...mapGetters(KCollectionsNamespace.TENANT, {
      currentTenant: KTenantGetters.SELECTED_TENANT
    })
  }
})
export default class DashboardWrapper extends Vue {
  @Provide('$kuzzle') public kuzzleSdk = kuzzle
  @Prop({ required: false }) public currentIndex!: string
}
</script>

<style>

</style>
