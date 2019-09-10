<template>
  <div>
    <tab-list-component itemClass="event-tab-item" :items="tabs" @navigate="handleNavigation"></tab-list-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ITabItem from '@/api/interface/ITabItem';

import TabListComponent from '@/components/Navigation/TabListComponent.vue';

@Component({
  components: {
    TabListComponent,
  },
})
export default class EditEventTabsComponent extends Vue {
  private tabs: ITabItem[] = [
    {
      routeName: 'new-event',
      name: 'Details',
      children: [
        {
          routeName: 'edit-event',
        },
        {
          routeName: 'new-event',
        },
      ],
    },
    {
      routeName: 'edit-event-details',
      name: 'Additional Details',
    },
    {
      routeName: 'edit-event-design',
      name: 'Design',
    },
    {
      routeName: 'event-surveys',
      name: 'Surveys',
      children: [
        {
          routeName: 'edit-event-survey',
        },
        {
          routeName: 'new-event-survey',
        },
      ],
    },
    {
      routeName: 'event-tickets',
      name: 'Tickets',
      children: [
        {
          routeName: 'edit-event-ticket',
        },
        {
          routeName: 'new-event-ticket',
        },
      ],
    },
    {
      routeName: 'edit-event-ticket-embed',
      name: 'Ticket Embeds',
    },
    {
      routeName: 'edit-order-confirmation',
      name: 'Order Confirmation',
    },
    {
      routeName: 'edit-event-sponsors',
      name: 'Sponsors',
    },
    {
      routeName: 'edit-event-settings',
      name: 'Settings',
    },
  ];

  private handleNavigation({ item, index }) {
    const activeRouteIndex = this.tabs.findIndex((tItem: ITabItem) => {
      if (tItem.routeName === this.$route.name) {
        return true;
      }

      if (tItem.children !== undefined && tItem.children.length > 0) {
        return tItem.children.filter((child) => child.routeName === this.$route.name).length > 0;
      }

      return false;
    });

    const isRouteNew = this.$route.name === 'new-event';
    if (index >= activeRouteIndex && isRouteNew) {
      console.log('Dont navigate on new');
      return;
    }

    let routeName = item.routeName;

    if (this.$route.name === 'new-event' && routeName === 'new-event') {
      return;
    }

    if (item.routeName === 'new-event') {
      routeName = 'edit-event';
    }

    this.$router.push({ name: routeName });
  }
}
</script>

<style lang="scss">
.event-tab-item {
  max-width: 105px;
  position: relative;
  width: 100%;

  &:not(:last-child) {
    &::before {
      background-color: var(--primary);
      content: "";
      display: block;
      height: 5px;
      position: absolute;
      left: 78px;
      top: 25px;
      width: 50%;
    }
  }
}
</style>
