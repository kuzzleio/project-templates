<template>
  <div class="DashboardListView">
    <!-- HEADER -->
    <div class="Hero">
      <b-col class="text-left" cols="12" lg="8" md="8">
        <!-- TITLE -->
        <div class="Hero-title text-left">
          <h3 v-if="!isEditMode" class="font-weight-bold">
            {{ dashboardLabel }}
          </h3>
          <BFormInput
            v-else
            v-model="dashboardLabel"
            class="LabelInput"
            :placeholder="
              $i18n.t('locales.dashboards.dashboard.labelPlaceholder')
            "
          />
        </div>

        <!-- DESCRIPTION -->
        <p class="Hero-description">
          {{ $i18n.t("locales.dashboards.dashboard.description") }}
        </p>
      </b-col>

      <b-col
        class="Hero-action text-right"
        cols="12"
        lg="2"
        md="2"
        align-self="end"
      >
        <template v-if="isEditMode">
          <b-button variant="danger" class="mb-4" @click="openNewWidgetModal">
            <div class="PlusIcon" style="display: inline-block">
              <i class="fa fa-plus" />
            </div>

            {{ $i18n.t("locales.dashboards.dashboard.add-widget") }}
          </b-button>
        </template>
        <template v-else>
          <b-button variant="danger" class="mb-2" @click="isEditMode = true">
            {{ $i18n.t("locales.dashboards.dashboard.edit") }}
          </b-button>
        </template>
      </b-col>
    </div>

    <div class="Container-content">
      <template v-if="isBusy">
        <b-spinner />
      </template>
      <template v-else>
        <DashboardView
          v-show="layout.length > 0"
          new-widget-modal-class="Modal"
          :dashboardId="id"
          :engineIndex="engineIndex"
          :isEditMode="isEditMode"
          :new-widget-description="
            $i18n.t('locales.dashboards.new-widget.description')
          "
          :propLayout="layout"
          @change="onLayoutChange"
          @error="handleError"
        />
        <EmptyLayout
          v-if="layout.length === 0"
          :isEditMode="isEditMode"
          @add-new-widget="openNewWidgetModal"
        />
      </template>
    </div>

    <div class="Footer text-left">
      <template v-if="isEditMode">
        <b-button
          variant="danger"
          :disabled="!Boolean(dashboardLabel)"
          @click="saveDashboard"
        >
          {{ $i18n.t("locales.dashboards.dashboard.save") }}
        </b-button>
      </template>
      <template v-else>
        <b-button variant="outline-danger" @click="promptDeleteDashboard">
          <!--  -->
          {{ $i18n.t("locales.dashboards.dashboard.delete") }}
        </b-button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Mixins } from "vue-property-decorator";
import { BCol, BFormInput, BButton, BSpinner } from "bootstrap-vue";
import {
  KWidgetSpec,
  fetchDashboardDetails,
  createDashboard,
  updateDashboard,
  EVENT_OPEN_NEW_WIDGET_MODAL,
  MODULE_NAME as DASHBOARDS,
} from "@kuzzleio/dashboard-builder";
import EmptyLayout from "./EmptyLayout.vue";
import { mapActions, mapGetters } from "vuex";
import { KCollectionsNamespace } from "@kuzzleio/kuzzle-application-builder";
import { kuzzle } from "../../services/kuzzle";
import { DashboardView } from "./factories";
import { AbstractVueMixin, KTenantGetters } from "@kuzzleio/iot-console";

@Component({
  components: {
    EmptyLayout,
    DashboardView,
    BCol,
    BFormInput,
    BButton,
    BSpinner,
  },
  computed: {
    ...mapGetters(KCollectionsNamespace.TENANT, {
      engine: KTenantGetters.SELECTED_TENANT,
    }),
  },
  methods: {
    ...mapActions(DASHBOARDS, ["deleteDashboard"]),
  },
})
export default class Dashboard extends Mixins(AbstractVueMixin) {
  @Prop({ required: false }) protected id!: string;

  protected engine!: { _id: string };
  protected isBusy = false;
  protected isEditMode = false;
  protected dashboardLabel = "";
  protected layout: KWidgetSpec[] = [];

  protected get engineIndex(): string {
    return this.engine._id;
  }

  created() {
    this.isEditMode = !this.id;
  }

  async mounted(): Promise<void> {
    if (this.id) {
      await this.fetchDashboardDetails();
    }
  }

  protected deleteDashboard!: (payload: {
    index: string;
    id: string;
  }) => Promise<void>;

  protected onLayoutChange(layout: KWidgetSpec[]): void {
    this.layout = layout;
  }

  async fetchDashboardDetails(): Promise<void> {
    // this.setBusy()
    try {
      const dashboard = await fetchDashboardDetails(
        kuzzle,
        this.engineIndex,
        this.id
      );
      this.dashboardLabel = dashboard._source.label;
      this.layout = dashboard._source.layout || [];
    } catch (error) {
      console.error(error);
    }
    // this.unsetBusy()
  }

  async saveDashboard(): Promise<void> {
    try {
      if (!this.id) {
        const res = await createDashboard(
          kuzzle,
          this.engineIndex,
          this.dashboardLabel,
          this.layout
        );
        this.isEditMode = false;
        this.$router.push({
          name: "dashboard-view",
          params: {
            engineIndex: this.engineIndex,
            dashboardId: res.result._id,
          },
        });
      } else {
        await updateDashboard(
          kuzzle,
          this.engineIndex,
          this.id,
          this.dashboardLabel,
          this.layout
        );
        this.isEditMode = false;
      }
    } catch (error) {
      this.handleError(error as Error);
    }
  }

  async onDashboardIdChanged(dashboardId: string): Promise<void> {
    if (!dashboardId) {
      this.layout = [];
      this.dashboardLabel = "";
      return;
    }

    this.isEditMode = false;
    await this.fetchDashboardDetails();
  }

  handleError(error: Error): void {
    console.error(error);
    // this.showError( error.message, this.$i18n.t('locales.dashboards.errors.defaultTitle'))
  }

  openNewWidgetModal(): void {
    this.$root.$emit(EVENT_OPEN_NEW_WIDGET_MODAL);
  }

  async promptDeleteDashboard(): Promise<void> {
    // NOTE. For some mysterious reason, BootstrapVue type augmentation
    // (i.e. this.$bvModal and this.$bvToast) doesn't work on this project.
    // Typescript will fail compiling saying that $bvModal doesn't exist
    // on type Dashboard (nor Vue, btw). Accessing $bvModal through the
    // prototype works around the type-check.
    const response = await Vue.prototype.$bvModal.msgBoxConfirm(
      this.$i18n.t("locales.dashboards.deletePrompt") as string
    );

    if (response) {
      // this.setBusy()
      await this.deleteDashboard({ index: this.engineIndex, id: this.id });
      // this.unsetBusy()
      this.$router.push({ name: "dashboards" });
    }
  }
}
</script>

<style lang="scss">
.DashboardListView {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.LabelInput {
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  font-weight: 700;
  border-color: transparent;
  color: #212529;
  padding: 0;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  height: auto;

  &:focus {
    color: inherit;
    background-color: inherit;
    border: inherit;
    border-color: inherit;
    box-shadow: none;
  }
}

.Footer {
  position: sticky;
  bottom: 0;
  padding: 1em;
  background-color: #fff;
  width: 100%;
  box-shadow: 0px -10px 20px -10px rgb(189, 189, 189);
}
</style>
