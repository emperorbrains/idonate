<template>
  <form action="#" method="POST" @submit.prevent="updateTicket">
    <div class="border-bottom row no-gutters">
      <div class="col-md border-right">
        <div class="border-bottom p-4 p-md-5">
          <div class="row">
            <div class="col">
              <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Ticket</h4>
            </div>

            <div class="col text-right" v-if="isTicketEditing">
              <a class="btn btn-primary btn-sm rounded-circle" href="#" v-b-modal.delete-event-ticket-modal>
                <i class="fas fa-trash"></i>
              </a>
            </div>
          </div>

          <event-ticket-name-component class="mb-3" v-model="ticket.name"></event-ticket-name-component>
          <event-ticket-promo-code-component class="mb-3" v-model="ticket.promoCodeId"></event-ticket-promo-code-component>
          <event-ticket-description-component class="mb-3" v-model="ticket.description"></event-ticket-description-component>
        </div>

        <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Ticket Price</h4>

          <event-ticket-price-free-component class="mb-3" v-model="ticket.isPriceFree"></event-ticket-price-free-component>
          <event-ticket-price-component class="mb-3" :disabled="ticket.isPriceFree" :free="ticket.isPriceFree" v-model="ticket.ticketPrice"></event-ticket-price-component>
        </div>
      </div>

      <div class="col-md">
        <div class="border-bottom p-4 p-md-5">
          <div class="row mb-4">
            <div class="col">
              <h4 class="font-weight-semibold label-standard-primary mb-0 text-uppercase">Quantities</h4>
            </div>

            <div class="col-7 d-flex align-items-center justify-content-end">
              <span class="font-weight-semibold mr-3">Remaining Tickets</span>
              <toggle-button class="mb-0" :labels="btnToggleLabels" :disabled="ticket.quantity === null" :sync="true" v-model="ticket.showRemainingQuantity"/>
            </div>
          </div>

          <event-ticket-quantity-component class="mb-3" :isDisabled="!ticket.showRemainingQuantity" v-model="ticket.quantity"></event-ticket-quantity-component>
        </div>

        <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Status And Availability</h4>

          <event-ticket-status-component class="mb-3" v-model="ticket.status"></event-ticket-status-component>
          <event-ticket-start-selling-component
            class="mb-3"
            :isDisabled="disableSellingDates"
            :isImmediate="ticket.isImmediate"
            @update-is-immediate="value => ticket.isImmediate = value"
            v-model="ticket.ticketStart"
          ></event-ticket-start-selling-component>
          <event-ticket-stop-selling-component
            class="mb-3"
            :isDisabled="disableSellingDates"
            :isEventDate="ticket.isEventDate"
            :startSellingDate="ticket.ticketStart.dateTime"
            @update-is-event-date="value => ticket.isEventDate = value"
            v-model="ticket.ticketEnd"
          ></event-ticket-stop-selling-component>
          <event-ticket-assign-survey-component class="mb-3" :surveys="surveys" v-model="ticket.surveyId"></event-ticket-assign-survey-component>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase"
            @click="$router.go(-1)"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-sky-blue btn-save btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>

    <ticket-delete-modal-component
      id="delete-event-ticket-modal"
      @confirmed="deleteTicket"
      v-if="isTicketEditing"
    ></ticket-delete-modal-component>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { ToggleButton } from 'vue-js-toggle-button';
import ISurvey from '@/api/interface/ISurvey';
import ITicketPrice from '@/api/interface/ITicketPrice';
import VeeValidate from 'vee-validate';

import EventTicketAssignSurveyComponent from '@/components/Events/Tickets/Fields/EventTicketAssignSurveyComponent.vue';
import EventTicketDescriptionComponent from '@/components/Events/Tickets/Fields/EventTicketDescriptionComponent.vue';
import EventTicketNameComponent from '@/components/Events/Tickets/Fields/EventTicketNameComponent.vue';
import EventTicketPriceFreeComponent from '@/components/Events/Tickets/Fields/EventTicketPriceFreeComponent.vue';
import EventTicketPriceComponent from '@/components/Events/Tickets/Fields/EventTicketPriceComponent.vue';
import EventTicketPromoCodeComponent from '@/components/Events/Tickets/Fields/EventTicketPromoCodeComponent.vue';
import EventTicketQuantityComponent from '@/components/Events/Tickets/Fields/EventTicketQuantityComponent.vue';
import EventTicketStartSellingComponent from '@/components/Events/Tickets/Fields/EventTicketStartSellingComponent.vue';
import EventTicketStatusComponent from '@/components/Events/Tickets/Fields/EventTicketStatusComponent.vue';
import EventTicketStopSellingComponent from '@/components/Events/Tickets/Fields/EventTicketStopSellingComponent.vue';
import TicketDeleteModalComponent from '@/components/Events/Tickets/TicketDeleteModalComponent.vue';
import BaseEventVue from '@/api/core/BaseEventVue';
import TicketDefinitionDTO from '@/api/dto/TicketDefinitionDTO';

@Component({
  components: {
    EventTicketAssignSurveyComponent,
    EventTicketDescriptionComponent,
    EventTicketNameComponent,
    EventTicketPriceFreeComponent,
    EventTicketPriceComponent,
    EventTicketPromoCodeComponent,
    EventTicketQuantityComponent,
    EventTicketStartSellingComponent,
    EventTicketStatusComponent,
    EventTicketStopSellingComponent,
    TicketDeleteModalComponent,
    ToggleButton,
  },
})
export default class EditEventTicket extends BaseEventVue {
  get disableSellingDates() {
    return this.ticket.status === 'CLOSED';
  }

  get isTicketEditing() {
    return this.$route.name === 'edit-event-ticket';
  }

  private readonly PAGE: number = 5;  // Same as parent
  private ticketId;
  private eventId;
  private ticket = new TicketDefinitionDTO();
  private surveys: any = [];

  private btnToggleLabels = {
    checked: 'ON',
    unchecked: 'OFF',
  };

  @Watch('ticket.quantity', { immediate: true })
  public monitorTicketQuantity(quantity) {
    if (quantity === 'unlimited') {
      this.ticket.showRemainingQuantity = false;
    }
  }

  private created() {
    if (this.api === null) {
       return;
    }
    this.eventId = this.$route.params.eventId;
    this.api.getSurveyList(this.eventId)
        .then((res) => {
          this.surveys = this.handleSuccessIgnoreError(res, 'data.event.surveys');
          // tslint:disable-next-line: no-console
          console.log(JSON.stringify(this.surveys));
        }).catch(this.handleFailure);

    if (this.isTicketEditing) {
      this.ticketId = this.$route.params.ticketId;
      this.api.getTicketDefinition(this.ticketId)
      .then((res) => {
        const tkt = this.handleSuccessIgnoreError(res, 'data.ticketDefinition');
        this.ticket = TicketDefinitionDTO.fromModel(tkt);
      }).catch(this.handleFailure);
    } else {
      this.ticket = new TicketDefinitionDTO();
      this.ticket.status = (this.ticket.status) ? this.ticket.status : 'OPEN';
      this.ticket.isImmediate = (this.ticket.isImmediate) ? this.ticket.isImmediate : true;
      this.ticket.isEventDate = true;
    }
  }

  private updateTicket() {
    const promises: any = [];
    const that = this;
    const tkt = this.ticket;

    this.$children.forEach((vm) => promises.push(vm.$validator.validateAll()));

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      // Do some processing...
      if (this.isTicketEditing) {
          this.api.updateTicketDefinition(this.eventId, this.ticketId, TicketDefinitionDTO.toModel(tkt))
            .then((res) => success(res, 'data.event.updateTicketDefinition.errors'))
            .catch(this.handleFailure);
      } else {
          this.api.createTicketDefinition(this.eventId, TicketDefinitionDTO.toModel(tkt))
            .then((res) => success(res, 'data.event.createTicketDefinition.errors'))
            .catch(this.handleFailure);
      }

      function success(res, errorPath) {
          that.handleSuccess(res, '', errorPath);
          that.updateEventStepAndProceed(that.eventId, that.PAGE, 'event-tickets');
      }
    });
  }

  private deleteTicket() {
    this.api.deleteTicketDefinition(this.eventId, this.ticketId)
    .then((res) => this.updateEventAndProceed('event-tickets', res, 'data.event.deleteTicketDefinition.errors'))
    .catch(this.handleFailure);
  }
}
</script>
