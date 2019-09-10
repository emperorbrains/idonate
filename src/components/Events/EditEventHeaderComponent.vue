<template>
  <div class="bg-white px-4 px-md-5 py-3 shadow-sm">
    <div class="align-middle d-inline-block w-50">
      <h2 class="h5 font-weight-semibold mb-0 text-dark">
        <router-link :to="{ name: 'events' }" class="text-dark">Events Dashboard</router-link> / <router-link :to="{ name: 'event-sales' }" class="mr-1 text-dark">Manage Event</router-link>
        <span class="text-muted">/ {{eventTitle}}</span>
      </h2>
    </div>

    <div class="align-middle d-inline-block w-50 text-right">
      <button class="btn btn-outline-primary font-weight-semibold mr-2 rounded-pill text-uppercase" type="button" v-b-modal.event-help-modal>Event Help</button>
      <button class="btn btn-outline-primary font-weight-semibold mr-2 rounded-pill text-uppercase" type="button" :disabled="!isPreviewable" @click="clickPreview">Preview</button>
    </div>

    <event-archive-confirmation-modal-component id="event-archive-confirmation-modal" @archive-event="archiveEvent"></event-archive-confirmation-modal-component>
    <event-help-modal-component id="event-help-modal" ></event-help-modal-component>
    <event-preview-modal-component id="event-preview-modal" :preview="preview" :organizationName="organizationName"></event-preview-modal-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EventArchiveConfirmationModalComponent from './EventArchiveConfirmationModalComponent.vue';
import EventHelpModalComponent from './EventHelpModalComponent.vue';
import EventPreviewModalComponent from './EventPreviewModalComponent.vue';
import ApiUtils from '@/api/util/ApiUtils.vue';
import BaseVue from '@/api/core/BaseVue';
import EventPreviewDTO from '@/api/dto/EventPreviewDTO';

@Component({
  components: {
    EventArchiveConfirmationModalComponent,
    EventHelpModalComponent,
    EventPreviewModalComponent,
  },
})
export default class EditEventHeaderComponent extends BaseVue {
  public preview = {};

  get organizationName() {
    return this.$store.getters.organization.name;
  }
  get eventTitle() {
    return (this.$route.name === 'new-event')
      ? 'Event Creation'
      : (this.$store.getters.event.name !== undefined ? this.$store.getters.event.name : 'Event Edit');
  }

  get isPreviewable() {
    return (this.$route.name === 'new-event') ? false : true;
  }

  get isPublishable() {
    if (this.$route.name === 'new-event') {
      return false;
    } else if (this.$route.name === 'edit-event') {
      return false;
    }

    return true;
  }

  private archiveEvent() {
    // Do something ...
  }


  private clickPreview() {
    this.api.previewEvent(this.$route.params.eventId)
      .then((res) => {
        const eventUpdate = this.handleSuccessIgnoreError(res, 'data.event');
        this.preview = EventPreviewDTO.toPreview(eventUpdate, eventUpdate.ticketDefinitions);
    });

    this.$bvModal.show('event-preview-modal');
  }
}
</script>

<style lang="scss" scoped>
.btn {
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.15em;
}
</style>
