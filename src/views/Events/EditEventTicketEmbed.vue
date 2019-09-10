<template>
  <form action="#" method="POST" @submit.prevent="updateEventTicketEmbed">
    <div class="d-none d-md-block">
      <div class="row">
        <div class="col-md">
          <div class="pt-5 pb-2 px-md-5">
            <h4 class="font-weight-semibold mb-4 text-center text-primary text-uppercase">Ticket Embed</h4>
          </div>
        </div>

        <div class="col-md">
          <div class="pt-5 pb-2 px-md-5">
            <h4 class="font-weight-semibold mb-4 text-center text-primary text-uppercase">Button</h4>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md">
          <div class="px-md-5 mb-4 text-center">
            <p class="mb-0">Add the ticket widget to your site to display a preview of your event's available tickets. This allows attendees to start their transaction before confirming on the event page. A button may also be added to your site which links to your event page.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="border-bottom row no-gutters">
      <div class="col-md border-right">
        <div class="p-4 p-md-5">
          <div class="d-md-none">
            <h4 class="font-weight-semibold mb-4 text-center text-primary text-uppercase">Ticket Widget</h4>

            <p class="text-muted">Add the Ticket Widget to your site or blog to display a preview of your event's available tickets and allow attendees to start their transaction on your site before confirming the order on Picatic.</p>  
          </div>
          
          <event-time-component class="mb-1" v-model="event.ticketEmbed.showEventTime"></event-time-component>
          <event-location-component class="mb-1" v-model="event.ticketEmbed.showEventLocation"></event-location-component>
          <event-image-component class="mb-1" v-model="event.ticketEmbed.showEventImage"></event-image-component>
          <event-ticket-description-component class="mb-3" v-model="event.ticketEmbed.showEventDescription"></event-ticket-description-component>
          <event-theme-component @copy-preview-code="copyPreviewCode" v-model="event.ticketEmbed.theme"></event-theme-component>
        </div>

        <div class="ticket-embed-wrapper">
          <ticket-embed-component :event="event"></ticket-embed-component>

          <img class="icon" src="@/assets/icons/enlarge.svg" v-b-modal.ticket-embed-modal>
        </div>
      </div>

      <div class="col-md">
        <div class="p-4 p-md-5">
          <h4 class="d-md-none font-weight-semibold mb-4 text-center text-primary text-uppercase">Button</h4>

          <event-button-text-component class="mb-3" v-model="event.ticketEmbed.buttonText"></event-button-text-component>
          <event-button-size-component class="mb-3" v-model="event.ticketEmbed.buttonSize"></event-button-size-component>
          <event-button-background-color-component class="mb-3" v-model="event.ticketEmbed.buttonBgColor"></event-button-background-color-component>
          <event-button-text-color-component class="mb-5" v-model="event.ticketEmbed.buttonTextColor"></event-button-text-color-component>
        
          <div class="d-flex align-items-center justify-content-center text-center">
            <button
              class="btn btn-rounded"
              :class="buttonSize"
              :style="{ 'background-color': event.ticketEmbed.buttonBgColor, 'color': event.ticketEmbed.buttonTextColor }"
              v-text="event.ticketEmbed.buttonText"
            ></button>

            <span
              class="copy-event-ticket-preview-code d-flex align-items-center justify-content-center ml-4 rounded-circle text-primary"
              placement="right"
              title="Copy Code"
              @click="copyButtonCode"
              v-b-tooltip.hover
            >
              <i class="far fa-copy"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase"
            @click="$router.push({ name: 'event-tickets' })"
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

    <ticket-embed-modal-component id="ticket-embed-modal" :event="event"></ticket-embed-modal-component>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EventButtonBackgroundColorComponent from '@/components/Events/TicketEmbed/Fields/EventButtonBackgroundColorComponent.vue';
import EventButtonSizeComponent from '@/components/Events/TicketEmbed/Fields/EventButtonSizeComponent.vue';
import EventButtonTextColorComponent from '@/components/Events/TicketEmbed/Fields/EventButtonTextColorComponent.vue';
import EventButtonTextComponent from '@/components/Events/TicketEmbed/Fields/EventButtonTextComponent.vue';
import EventImageComponent from '@/components/Events/TicketEmbed/Fields/EventImageComponent.vue';
import EventLocationComponent from '@/components/Events/TicketEmbed/Fields/EventLocationComponent.vue';
import EventThemeComponent from '@/components/Events/TicketEmbed/Fields/EventThemeComponent.vue';
import EventTicketDescriptionComponent from '@/components/Events/TicketEmbed/Fields/EventTicketDescriptionComponent.vue';
import EventTimeComponent from '@/components/Events/TicketEmbed/Fields/EventTimeComponent.vue';
import TicketEmbedComponent from '@/components/Events/TicketEmbed/TicketEmbedComponent.vue';
import TicketEmbedModalComponent from '@/components/Events/TicketEmbed/TicketEmbedModalComponent.vue';
import BaseEventVue from '@/api/core/BaseEventVue';
import EventDTO from '@/api/dto/EventDTO';

@Component({
  components: {
    EventButtonBackgroundColorComponent,
    EventButtonSizeComponent,
    EventButtonTextComponent,
    EventButtonTextColorComponent,
    EventImageComponent,
    EventLocationComponent,
    EventThemeComponent,
    EventTicketDescriptionComponent,
    EventTimeComponent,
    TicketEmbedComponent,
    TicketEmbedModalComponent,
  },
})
export default class EditEventTicketEmbed extends BaseEventVue {
  private readonly PAGE: number = 6;
  private eventId: string = '';

  private created() {
    this.eventId = this.$route.params.eventId;

    this.api.getTicketEmbed(this.eventId)
      .then((res) => {
        const tktEmbed = this.handleSuccess(res, 'data.event', 'data.event.errors');
        // Malith: Might want to remove __typename globally (via ApolloLink) or from a higher level if this is a recurring issue
        // delete tktEmbed.__typename;
        // Hakeem (Prosoft): I'm handling these differently using a DTO to pull the fields I need. The specific issue
        // here is that ticketEmbeds can be null.
        this.event.ticketEmbed = Object.assign(new EventDTO().ticketEmbed, EventDTO.toEmbed(tktEmbed));
        this.storeEvent(tktEmbed);
      }).catch(this.handleFailure);
  }

  get buttonSize() {
    if (this.event.ticketEmbed.buttonSize === 'small') {
      return 'btn-sm';
    } else if (this.event.ticketEmbed.buttonSize === 'large') {
      return 'btn-lg';
    }
  }

  private copyButtonCode() {
    // Copy button code...
  }

  private copyPreviewCode() {
    // Copy preview code...
  }

  private updateEventTicketEmbed() {
    if (this.api === null) {
       return;
    }
    const evt = this.event;
    const mutation = {
      ticketEmbedSettings: evt.ticketEmbed,
    };

    this.api.updateEvent(this.eventId, mutation)
      .then((res) => {
          this.handleSuccess(res, '', 'data.errors');
          this.updateEventStepAndProceed(this.eventId, this.PAGE, 'edit-order-confirmation');
      }).catch(this.handleFailure);
  }
}
</script>

<style lang="scss" scoped>
.copy-event-ticket-preview-code {
  border: 2px solid var(--primary);
  cursor: pointer;
  margin-top: -3px;
  height: 40px;
  width: 40px;
}

.ticket-embed-wrapper {
  position: relative;

  .icon {
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 15px;
  }
}
</style>
