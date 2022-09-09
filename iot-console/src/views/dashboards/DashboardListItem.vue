<template>
  <router-link :to="{ name: 'dashboard-view', params: { dashboardId: id } }">
    <div class="DashboardListItem">
      <div class="d-flex flex-row align-items-center mt-4 ml-4">
        <div class="Icon mr-2"> </div>
        <h4 class="Label font-weight-bold flex-grow-1">{{ label }}</h4>
      </div>
      <div class="SubMenuIcon"></div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({})
export default class DashboardListItem extends Vue {
  @Prop({ required: true }) protected label!: string
  @Prop({ required: true }) protected id!: string
}
</script>

<style lang="scss" scoped>
.DashboardListItem {
  display: inline-block;
  position: relative;
  background-color: #F6F7FB;
  border: 1px solid #E1E1E1;
  border-radius: 4px;
  min-height: 190px;
  width: 330px;
}

.Decoration {
  position: absolute;
  bottom: 0;
}

.Label {
  color: #002835;
  margin-bottom: 0;
}

.Icon {
  background: #DAEDF6;
  border-radius: 12px;
  height: 36px;
  width: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
