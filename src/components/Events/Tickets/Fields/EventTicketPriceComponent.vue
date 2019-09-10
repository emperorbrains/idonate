<template>
  <div class="row">
    <div class="col-sm">
      <div class="mb-2">
        <label-component class="mb-0" for="ticket-price" text="Ticket Price *"></label-component>

        <b-tooltip
          placement="right"
          target="btn-tooltip-ticket-price"
          title="Enter the total price paid by the ticket purchaser for one ticket of this type."
        />

        <a href="#" id="btn-tooltip-ticket-price" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
      </div>

      <div
        class="flex-even input-with-icon icon-left border rounded-pill mr-2"
        :class="{ 'border-danger': errors.has('ticket-price') }"
      >
        <input
          id="ticket-price"
          name="ticket-price"
          type="text"
          class="form-control border-0 pl-5"
          :class="{ 'text-danger': errors.has('ticket-price') }"
          placeholder="Enter Ticket Price"
          :disabled="disabled"
          v-validate="`${free ? '' : 'required|decimal:2|min_value:0' }`"
          v-model="ticketPrice"
        >

        <span class="icon">
          <img src="@/assets/icons/currency-circle.svg">
        </span>
      </div>
    </div>

    <div class="col-sm">
      <div class="mb-2">
        <label-component class="mb-0" for="ticket-fair-market-price" text="Fair Market Value"></label-component>

        <b-tooltip
          placement="right"
          target="btn-tooltip-ticket-fair-market-price"
          title="Enter the value of something, such as a meal, provided to the purchaser as part of the ticket purchase. This field is optional."
        />

        <a href="#" id="btn-tooltip-ticket-fair-market-price" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
      </div>

      <div
        class="flex-even input-with-icon icon-left border rounded-pill mr-2"
        :class="{ 'border-danger': errors.has('ticket-fair-market-price') }"
      >
        <input
          id="ticket-fair-market-value"
          name="ticket-fair-market-price"
          type="text"
          class="form-control border-0 pl-5"
          :class="{ 'text-danger': errors.has('ticket-fair-market-price') }"
          placeholder="Enter Fair Market Value"
          :disabled="disabled"
          v-validate="'decimal:2|min_value:0'"
          v-model="ticketFairMarketValue"
        >

        <span class="icon">
          <img src="@/assets/icons/currency-circle.svg">
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ITicketPrice from '@/api/interface/ITicketPrice';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    LabelComponent,
  },
})
export default class EventTicketPriceComponent extends Vue {
  @Prop(Boolean) public readonly disabled!: boolean;
  @Prop(Boolean) public readonly free!: boolean;
  @Prop([Object, String]) public readonly value!: ITicketPrice;

  get ticketPrice() {
    return this.value.price;
  }

  set ticketPrice(value) {
    const data: ITicketPrice = {
      price: value,
      fairMarketValue: this.value.fairMarketValue,
    };

    this.$emit('input', data);
  }

  get ticketFairMarketValue() {
    return this.value.fairMarketValue;
  }

  set ticketFairMarketValue(value) {
    const data: ITicketPrice = {
      price: this.value.price,
      fairMarketValue: value,
    };

    this.$emit('input', data);
  }
}
</script>
