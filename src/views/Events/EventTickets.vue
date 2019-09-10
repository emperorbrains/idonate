<template>
  <div>
    <div class="row align-items-center justify-content-between px-4 pt-4 pb-2">
      <div class="col-md"></div>

      <div class="col-md">
        <h2 class="h3 mb-0 font-weight-semibold text-center text-primary text-uppercase">Tickets</h2>
      </div>

      <div class="col-md text-right">
        <router-link :to="{ name: 'new-event-ticket' }" class="btn btn-primary rounded-standard-semi mr-md-3">+ Create New</router-link>
      </div>
    </div>

    <div class="px-4 pt-2 pb-4 border-bottom">
      <event-tickets-list-component class="table-standard" :tickets="tickets" @update-ticket="updateTicket"></event-tickets-list-component>
    </div>
  
    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase"
            @click="$router.push({ name: 'event-surveys' })"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-secondary btn-save btn-sky-blue btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
            @click="updateTicketStep"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ITicket from '@/api/interface/ITicket';
import TicketDefinitionDTO from '@/api/dto/TicketDefinitionDTO';
import ApiUtils from '@/api/util/ApiUtils';

import EventTicketsListComponent from '@/components/Events/Tickets/EventTicketsListComponent.vue';
import BaseEventVue from '@/api/core/BaseEventVue';

@Component({
  components: {
    EventTicketsListComponent,
  },
})
export default class EventTickets extends BaseEventVue {
  private readonly PAGE: number = 5;
  private tickets: any[] = [];
  private eventId = '';

  private created() {
    this.eventId = this.$route.params.eventId;

    this.api.getTicketDefinitionList(this.eventId)
      .then((res) => {
        const tkts = this.handleSuccessIgnoreError(res, 'data.event.ticketDefinitions');
        this.tickets = TicketDefinitionDTO.fromModelToDisplayList(tkts);
        const eventUpdate = this.handleSuccessIgnoreError(res, 'data.event');
        this.storeEvent(eventUpdate);
      }).catch(this.handleFailure);
  }

  private updateTicket(data: any) {
    const {index, attribute, value} = data;
    this.$set(this.tickets[index], attribute, value);
    console.log('updateTicket', attribute, value);

    const mutation: any = TicketDefinitionDTO.toModelAttribute(attribute, data.value);

    if (mutation !== null) {
      this.api.updateTicketDefinition(this.$route.params.eventId, data.ticket.id, mutation)
            .then((res) => this.handleSuccess(res, 'data.event.updateTicketDefinition.errors'))
            .catch(this.handleFailure);
    }
  }

  private updateTicketStep() {
    this.updateEventStepAndProceed(this.eventId, this.PAGE, 'edit-event-ticket-embed');
  }
}
</script>
