<template>
  <div class="EmptyLayout">
    <template v-if="isEditMode">
      <h2>{{ $i18n.t('locales.dashboards.dashboard.empty.editTitle') }}</h2>
      <p>{{ $i18n.t('locales.dashboards.dashboard.empty.description') }}</p>
      <curved-arrow class="my-3" />
      <div class="Box">
        <p>{{ $i18n.t('locales.dashboards.dashboard.empty.button-tip') }}</p>
        <b-button variant="danger" class="NewWidgetButton" @click="$emit('add-new-widget')"
          >+</b-button
        >
      </div>
    </template>
    <template v-else>
      <h1 class="text-secondary my-5">
        {{ $i18n.t('locales.dashboards.dashboard.empty.noWidgets') }}
      </h1>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { BButton } from 'bootstrap-vue';
import CurvedArrow from '../../components/icons/CurvedArrow.vue';

@Component({
  components: {
    BButton,
    CurvedArrow,
  },
})
export default class EmptyLayout extends Vue {
  @Prop({ default: false }) public isEditMode!: boolean;
}
</script>

<style lang="scss" scoped>
.EmptyLayout {
  padding: 3em;
}

.Box {
  padding: 3em;
  max-width: 500px;
  margin: 0 auto;
  background: #f6f7fb;
  border: 0.497396px dashed #666666;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 900;
}

.NewWidgetButton {
  border-radius: 25px;
}
</style>
