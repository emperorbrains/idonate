<template>
  <b-modal :id="id" ref="modal" body-class="p-0" centered hide-footer hide-header>
    <ticket-embed-component :event="event"></ticket-embed-component>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import EventDTO from '@/api/dto/EventDTO';

import TicketEmbedComponent from './TicketEmbedComponent.vue';

@Component({
  components: {
    TicketEmbedComponent,
  },
})
export default class TicketEmbedModalComponent extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(Object) public readonly event !: EventDTO;
  @Prop(String) public readonly id !: string;
}
</script>
