<template>
  <div>
    <div class="mb-2">
      <label-component class="mb-0" for="ticket-promo-code" text="Promo Code (If any)"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-ticket-promo-code"
        title="Select a Promocode to assign it to the ticket and offer a discounted ticket price."
      ></b-tooltip>

      <a href="#" id="btn-tooltip-ticket-promo-code" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <select-component
      id="ticket-promo-code"
      defaultOptionText="Select Promocode"
      :options="promoCodes"
      v-model="ticketPromoCode"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import BaseVue from '@/api/core/BaseVue';

@Component({
  components: {
    LabelComponent,
    SelectComponent,
  },
})
export default class EventTicketPromoCodeComponent extends BaseVue {
  @Prop({ default: '', type: String }) public readonly value !: string;

  private promoCodes = [];

  constructor() {
    super();
    console.info('constructor');
  }

  private mounted() {
     if (this.api === null) {
       return;
     }
     this.api.getPromoCodesList(this.$route.params.eventId)
     .then((res: any) =>  this.promoCodes = this.handleSuccessIgnoreError(res, 'data.event.promoCodes'));
  }

  get ticketPromoCode() {
    return this.value;
  }

  set ticketPromoCode(value) {
    this.$emit('input', value);
  }
}
</script>
