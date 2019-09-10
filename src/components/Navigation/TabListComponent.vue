<template>
  <nav class="nav nav-pills">
    <tab-list-item-component
      class="nav-item"
      :class="itemClass"
      v-for="(item, index) in items"
      :index="index"
      :key="item.name"
      :isActive="activeRouteIndex === index"
      :isComplete="lastConfigurationStep > index"
      :item="item"
      @click.native="clickIcon(item, index)"
    ></tab-list-item-component>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ITabItem from '@/api/interface/ITabItem';
import TypeUtils from '@/api/util/TypeUtils';
import TabListItemComponent from './TabListItemComponent.vue';

@Component({
  components: {
    TabListItemComponent,
  },
})
export default class TabListComponent extends Vue {
  @Prop(Array) public readonly items!: ITabItem[];
  @Prop({ default: '', type: String }) public readonly itemClass!: string;

  private clickIcon(item, index: number) {
    if (index < this.lastConfigurationStep) {
      this.$emit('navigate', {item, index});
    }
  }

  get lastConfigurationStep() {
    return (this.$store.getters.event.status === 'ACTIVE')
      ? 10 : TypeUtils.toInt(this.$store.getters.event.lastConfigurationStep);
  }

  get activeRouteIndex() {
    return this.items.findIndex((item: ITabItem) => {
      if (item.routeName === this.$route.name) {
        return true;
      }

      if (item.children !== undefined && item.children.length > 0) {
        return item.children.filter((child) => child.routeName === this.$route.name).length > 0;
      }

      return false;
    });
  }
}
</script>
