<template>
  <div>
    <div class="mb-2">
      <label-component for="ticket-status" text="Status*"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-ticket-status"
        title="Select the ticket status: open, closed, or hidden. Open tickets can be purchased on the event page. Closed tickets can no longer be purchased. Hidden tickets are still open, but not shown on the event page."
      ></b-tooltip>

      <a href="#" id="btn-tooltip-ticket-status" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>
    
    <select-component
      id="ticket-status"
      name="ticket-status"
      :class="(errors.has('ticket-status')) ? 'input-error' : ''"
      defaultOptionText="-- Status of Ticket --"
      :options="statusList"
      v-model="ticketStatus"
      v-validate="'required'"
    ></select-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';

@Component({
  components: {
    LabelComponent,
    SelectComponent,
  },
})
export default class EventTicketStatusComponent extends Vue {
  @Prop(String) public readonly value!: string;

  private statusList = [
    {
      text: 'Open',
      value: 'OPEN',
    },
    {
      text: 'Hidden',
      value: 'HIDDEN',
    },
    {
      text: 'Closed',
      value: 'CLOSED',
    },
  ];

  get ticketStatus() {
    return this.value;
  }

  set ticketStatus(value) {
    this.$emit('input', value);
  }
}
</script>
