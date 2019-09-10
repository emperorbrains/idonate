<template>
  <b-table head-variant="light" :items="tickets" :fields="fields" responsive>
    <template slot="name" slot-scope="data">
      <router-link :to="{ name: 'edit-event-ticket', params: { ticketId: data.item.id } }" v-text="data.item.name" />
    </template>

    <template slot="quantity" slot-scope="data">
      <div @dblclick="editTicket('quantity', String(data.item.quantity), data.index)">
        <div v-if="editTicketIndex === data.index && editTicketAttribute === 'quantity'">
          <div class="custom-control custom-checkbox mb-1">
            <input
              id="ticket-quantity"
              class="custom-control-input"
              name="ticket-quantity"
              type="checkbox"
              v-model="isTicketUnlimited"
            >

            <label-component
              class="custom-control-label text-muted"
              for="ticket-quantity"
              text="No limit"
              :isBold="false"
            ></label-component>
          </div>

          <div class="d-flex align-items-center justify-content-between">
            <input
              type="text"
              class="form-control form-control-sm rounded-pill"
              :disabled="isTicketUnlimited"
              v-model="editAttributeValue"
            >

            <div class="ml-2 w-50">
              <button class="btn btn-success btn-sm mr-1" @click="updateTicketAttribute">
                <i class="fa fa-check"></i>
              </button>

              <button class="btn btn-danger btn-sm" @click="cancelAttributeEditing">
                <i class="fa fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <span v-text="data.item.quantity" v-else></span>
      </div>
    </template>

    <template slot="ticketStart" slot-scope="data">
      <div
        @dblclick="editTicket('ticketStart', new Date(data.item.ticketStart).toISOString(), data.index)"
      >
        <div
          class="d-flex align-items-center justify-content-between"
          v-if="editTicketIndex === data.index && editTicketAttribute === 'ticketStart'"
        >
          <datetime
            type="datetime"
            input-class="form-control form-control-sm rounded-pill"
            title="Start Selling Date"
            v-model="editAttributeValue"
          ></datetime>

          <div class="ml-2 w-50">
            <button class="btn btn-success btn-sm mr-1" @click="updateTicketAttribute">
              <i class="fa fa-check"></i>
            </button>

            <button class="btn btn-danger btn-sm" @click="cancelAttributeEditing">
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>

        <span v-else>{{ formatStartDate(data.item.ticketStart) }}</span>
      </div>
    </template>

    <template slot="ticketEnd" slot-scope="data">
      <div
        @dblclick="editTicket('ticketEnd', new Date(data.item.ticketEnd).toISOString(), data.index)"
      >
        <div
          class="d-flex align-items-center justify-content-between"
          v-if="editTicketIndex === data.index && editTicketAttribute === 'ticketEnd'"
        >
          <datetime
            type="datetime"
            input-class="form-control form-control-sm rounded-pill"
            title="Stop Selling Date"
            v-model="editAttributeValue"
          ></datetime>

          <div class="ml-2 w-50">
            <button class="btn btn-success btn-sm mr-1" @click="updateTicketAttribute">
              <i class="fa fa-check"></i>
            </button>

            <button class="btn btn-danger btn-sm" @click="cancelAttributeEditing">
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>

        <span v-else>{{ formatEndDate(data.item.ticketEnd) }}</span>
      </div>
    </template>

    <template slot="promoCode" slot-scope="data">
      <div @dblclick="editTicket('promoCode', data.item.promoCode, data.index)">
        <div
          class="d-flex align-items-center justify-content-between"
          v-if="editTicketIndex === data.index && editTicketAttribute === 'promoCode'"
        >
          <select-component
            :options="promoCodes"
            v-model="editAttributeValue"
          ></select-component>

          <div class="ml-2 w-50">
            <button class="btn btn-success btn-sm mr-1" @click="updateTicketAttribute">
              <i class="fa fa-check"></i>
            </button>

            <button class="btn btn-danger btn-sm" @click="cancelAttributeEditing">
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>

        <span v-text="data.item.promoCode" v-else></span>
      </div>
    </template>

    <template slot="status" slot-scope="data">
      <div @dblclick="editTicket('status', data.item.status, data.index)">
        <div
          class="d-flex align-items-center justify-content-between"
          v-if="editTicketIndex === data.index && editTicketAttribute === 'status'"
        >
          <select-component
            :options="statuses"
            v-model="editAttributeValue"
          ></select-component>

          <div class="ml-2 w-50">
            <button class="btn btn-success btn-sm mr-1" @click="updateTicketAttribute">
              <i class="fa fa-check"></i>
            </button>

            <button class="btn btn-danger btn-sm" @click="cancelAttributeEditing">
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>

        <span class="text-capitalize" v-text="data.item.status" v-else></span>
      </div>
    </template>
  </b-table>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Datetime } from 'vue-datetime';
import ITicket from '@/api/interface/ITicket';
import TicketDefinitionDTO from '@/api/dto/TicketDefinitionDTO';
import * as EventConstants from '@/api/EventConstants';
import { EventApi } from '@/api/EventApi';
import BaseVue from '@/api/core/BaseVue';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import ApiUtils from '@/api/util/ApiUtils';
import moment from 'moment';

@Component({
  components: {
    Datetime,
    InputComponent,
    LabelComponent,
    SelectComponent,
  },
})
export default class EventTicketsListComponent extends BaseVue {
  @Prop(Array) public readonly tickets!: TicketDefinitionDTO[];

  private editAttributeValue: string = '';
  private editTicketAttribute: string = '';
  private editTicketIndex: number = -1;

  private fields = [
    {
      key: 'name',
      label: 'Ticket Name',
    },
    {
      key: 'quantity',
      label: 'Qty',
    },
    {
      key: 'ticketStart',
      label: 'Start Selling',
      formatter: this.formatStartDate,
    },
    {
      key: 'ticketEnd',
      label: 'Stop Selling',
      formatter: this.formatEndDate,
    },
    {
      key: 'promoCode.code',
      label: 'Promo Code',
      // sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      // sortable: true,
    },
  ];

  private promoCodes = [];
  private statuses = EventConstants.STATUSES;
  private isTicketUnlimited: boolean = false;

  private created() {
    if (this.api === null) {
      return;
    }
    if (this.$route.params.eventId) {
      this.api.getPromoCodesList(this.$route.params.eventId)
        .then((res: any) => this.promoCodes = res.data.event.promoCodes);
    }
  }

  private formatStartDate(val) {
    try {
      return moment(val).format('MM-DD-YYYY LT');
    } catch {
      return '*';
    }
  }

  private formatEndDate(val) {
    try {
      const dt: string = val === null ? this.$store.getters.event.eventStart : val;
      return moment(dt).format('MM-DD-YYYY LT');
    } catch {
      return '*';
    }
  }
  private cancelAttributeEditing() {
    this.editTicketAttribute = '';
    this.editAttributeValue = '';
    this.editTicketIndex = -1;
  }

  private editTicket(attribute: string, value: string, ticketIndex: number) {
    // this.editAttributeValue = value;
    this.editTicketAttribute = attribute;
    this.editTicketIndex = ticketIndex;
  }

  private updateTicketAttribute() {
    const data = {
      index: this.editTicketIndex,
      attribute: this.editTicketAttribute,
      value: this.editAttributeValue,
      ticket: this.tickets[this.editTicketIndex],
    };

    this.$emit('update-ticket', data);

    this.cancelAttributeEditing();
  }

  @Watch('isTicketUnlimited')
  private monitorTicketUnlimited(isTicketUnlimited: boolean) {
    if (this.editTicketIndex === -1) {
      return;
    }

    const prevTicketQuantity = this.tickets[this.editTicketIndex].quantity;
    const newTicketQuantity = isTicketUnlimited
      ? 'unlimited'
      : false  // prevTicketQuantity !== 'unlimited'
      ? prevTicketQuantity
      : 1;

    this.editAttributeValue = String(newTicketQuantity);
  }

  @Watch('editTicketAttribute', { immediate: true })
  private monitorTicketLimit(attribute: string) {
    if (attribute !== 'quantity') {
      return;
    }

    const ticketLimit = this.tickets[this.editTicketIndex].quantity;
    this.isTicketUnlimited = false; // ticketLimit === 'unlimited';
  }
}
</script>
