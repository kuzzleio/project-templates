<template>
  <div class="EmptyLayout">
    <template v-if="isEditMode">
    <h2>{{ $i18n.t('locales.dashboards.dashboard.empty.editTitle') }}</h2>
    <p>{{ $i18n.t('locales.dashboards.dashboard.empty.description') }}</p>
    <div class="Box">
      <p>{{ $i18n.t('locales.dashboards.dashboard.empty.button-tip') }}</p>
      <b-button
        variant="danger"
        class="NewWidgetButton"
        @click="$emit('add-new-widget')"
      >+</b-button>
    </div>
  </template>
  <template v-else>
    <h1 class="text-secondary my-5">{{ $i18n.t('locales.dashboards.dashboard.empty.noWidgets') }}</h1>
  </template>
  </div>
</template>

<script lang="ts">
import {
  BButton
} from 'bootstrap-vue'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  components: {
    BButton
  }
})
export default class EmptyLayout extends Vue {
  @Prop({ default: false }) protected isEditMode!: boolean
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
  background: #F6F7FB;
  border: 0.497396px dashed #666666;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 900;
}

.NewWidgetButton {
  border-radius: 25px;
}
</style>
