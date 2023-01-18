<template>
  <div class="DashboardListView">
    <!-- HEADER -->
    <hero
      :title="$i18n.t('locales.dashboards.list.title')"
      :description="i18n.t('locales.dashboards.list.description')"
      :action-title="i18n.t('locales.dashboards.list.create')"
    >
      <template #actionPrimary>
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
        :current-filter="filter"
        :display-action-toggle="false"
        @searchChange="setFilter"
      >
        <slot name="list-action-inner" />
      </list-action>
      <div class="DashboardList text-left">
        <DashbardListItem
          v-for="dashboard in dashboardList"
          :id="dashboard._id"
          :key="dashboard._id"
          class="mr-4"
          :label="dashboard._source.label"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { BaseListMixin, KTenantGetters, tenantsStoreNamespace } from '@kuzzleio/iot-console';
import { MODULE_NAME as DASHBOARDS, DashboardsState } from '@kuzzleio/dashboard-builder';
import debounce from 'lodash/debounce';
import DashbardListItem from '../../components/dashboards/DashboardListItem.vue';

@Component({
  components: {
    DashbardListItem,
  },
  computed: {
    ...mapGetters(DASHBOARDS, ['dashboardList']),
    ...mapGetters(tenantsStoreNamespace, {
      currentTenant: KTenantGetters.SELECTED_TENANT,
    }),
  },
  methods: {
    ...mapActions(DASHBOARDS, ['fetchDashboardList']),
  },
})
export default class DashboardList extends Mixins(BaseListMixin) {
  protected fetchDashboardList!: (payload: { index: string; filter: string }) => Promise<void>;
  protected currentTenant!: { _id: string };
  public dashboardList!: DashboardsState['dashboardList'];
  public filter = '';

  public debouncedSetFilter = debounce(this.setFilter, 600);

  @Watch('filter', { immediate: true })
  filterUpdated() {
    if (!this.currentTenant) {
      return;
    }
    this.fetchDashboardList({ index: this.currentTenant._id, filter: this.filter });
  }

  setFilter(value: string) {
    this.filter = value;
  }
}
</script>
