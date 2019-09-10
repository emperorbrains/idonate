<template>
  <div class="bg-white px-4 px-md-5 py-3 shadow-sm">
    <div class="align-middle d-inline-block w-50">
      <p class="font-weight-semibold mb-0 text-dark">
        <router-link :to="{ name: 'events' }" class="text-dark">Events Dashboard</router-link> / Manage Event
        <router-link :to="{ name: 'edit-event', params: { eventId: storedEvent.id } }" class="text-muted">/ {{ storedEvent.name }}</router-link>
      </p>
    </div>

    <div class="align-middle d-inline-block w-50 text-right">
      <button class="btn btn-outline-primary btn-standard font-weight-semibold mr-2 rounded-pill text-uppercase" type="button" v-b-modal.event-help-modal>Event Help</button>
      <button class="btn btn-outline-primary btn-standard font-weight-semibold mr-2 rounded-pill text-uppercase" type="button" @click="clickPreview">{{previewOrVisit}}</button>
    </div>

    <event-help-modal-component id="event-help-modal"></event-help-modal-component>
    <event-preview-modal-component id="event-preview-modal" :event="storedEvent" :preview="preview" :organizationName="organizationName"></event-preview-modal-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import EventPreviewModalComponent from './EventPreviewModalComponent.vue';
import EventHelpModalComponent from './EventHelpModalComponent.vue';
import BaseEventVue from '@/api/core/BaseEventVue';
import EventPreviewDTO from '@/api/dto/EventPreviewDTO';


@Component({
  components: {
    EventPreviewModalComponent,
    EventHelpModalComponent,
  },
})
export default class EventHeaderComponent extends BaseEventVue {
    // @Prop(Object) public readonly event!: object;
    public preview: any = {};


    get organizationName() {
      return this.$store.getters.organization.name;
    }

    private archiveEvent() {
    // Do something ...
    }

    get previewOrVisit() {
      return this.$store.getters.event.status === 'ACTIVE' ? 'VISIT PAGE' : 'PREVIEW';
    }


    private clickPreview() {
      console.log('Router');

      this.api.previewEvent(this.$route.params.eventId)
        .then((res) => {
          const eventUpdate = this.handleSuccessIgnoreError(res, 'data.event');
          this.preview = EventPreviewDTO.toPreview(eventUpdate, eventUpdate.ticketDefinitions);
          if (this.preview.status === 'ACTIVE') {
            const url = this.$store.getters.eventsPublicBaseUrl + 'events/' + this.preview.id + '/preview';

            window.open(url);
            this.$bvModal.hide('event-preview-modal');
          }
      });

      this.$bvModal.show('event-preview-modal');
    }
}
</script>
