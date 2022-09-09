<template>
  <div class="DashboardListView">
    <!-- HEADER -->
    <hero
      :title="$i18n.t('locales.dashboards.list.title')"
      :description="i18n.t('locales.dashboards.list.description')"
      :actionTitle="i18n.t('locales.dashboards.list.create')"
    >
      <template v-slot:actionPrimary>
        <b-button
          data-cy="list-actionBtn"
          variant="danger"
          class="mb-4"
          :to="{ name: 'create-dashboard' }"
        >
          <div class="PlusIcon" style="display: inline-block">
            <i class="fa fa-plus" />
          </div>

          {{ i18n.t('locales.dashboards.list.create') }}
        </b-button>
      </template>
    </hero>

    <div class="Container-content">
       <!-- ACTIONS -->
      <list-action
        :currentFilter="filter"
        :displayActionToggle="false"
        @toggleListVisibility="toggleListVisibility"
        @searchChange="setFilter"
      >
        <slot name="list-action-inner">
        </slot>
      </list-action>
      <div class="DashboardList text-left">
        <DashbardListItem
          v-for="dashboard in dashboardList"
          class="mr-4"
          :key="dashboard._id"
          :label="dashboard._source.label"
          :id="dashboard._id"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import debounce from 'lodash/debounce'
import { MODULE_NAME as DASHBOARDS } from '@kuzzleio/dashboard-builder'
import { Component, Mixins } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { BaseListMixin, KTenantGetters, tenantsStoreNamespace } from '@kuzzleio/iot-console';
import DashbardListItem from './DashboardListItem.vue'

@Component({
  components: {
    DashbardListItem
  },
  computed: {
    ...mapGetters(DASHBOARDS, ['dashboardList']),
    ...mapGetters(tenantsStoreNamespace, {
      currentTenant: KTenantGetters.SELECTED_TENANT
    })
  },
  methods: {
    ...mapActions(DASHBOARDS, ['fetchDashboardList'])
  }
})
export default class DashboardList extends Mixins(BaseListMixin) {
  protected fetchDashboardList!: (payload: { index: string, filter: string }) => Promise<void>;
  protected debouncedFetch = debounce((payload) => this.fetchDashboardList(payload), 500)
  protected currentTenant!: { _id: string };
  protected filter = '';

  async mounted(): Promise<void> {
    if (!this.currentTenant) {
      // TODO show warning
      return
    }
    this.fetchDashboardList({ index: this.currentTenant._id, filter: this.filter })
  }

  setFilter(value: string): void {
    this.filter = value
    this.debouncedFetch({
    index: this.currentTenant._id,
    filter: this.filter
  })
  }
}
</script>

<style lang="scss">
</style>
