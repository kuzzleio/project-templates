<template>
  <router-view :engine="currentTenant" :current-index="currentIndex" />
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator';
import { KCollectionsNamespace, Tenant } from '@kuzzleio/kuzzle-application-builder';
import { KTenantGetters } from '@kuzzleio/iot-console';
import { mapGetters } from 'vuex';
import { kuzzle } from '../../services/kuzzle';

@Component({
  computed: {
    ...mapGetters(KCollectionsNamespace.TENANT, {
      currentTenant: KTenantGetters.SELECTED_TENANT,
    }),
  },
})
export default class DashboardWrapper extends Vue {
  @Provide('$kuzzle') public kuzzleSdk = kuzzle;
  @Prop({ required: false }) public currentIndex!: string;

  public currentTenant!: Tenant | undefined;
}
</script>
