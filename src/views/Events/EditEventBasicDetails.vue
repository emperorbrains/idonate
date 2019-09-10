<template>
  <form @submit.prevent="updateEvent">
    <div class="border-bottom row no-gutters">
      <div class="col-md border-right">
        <div class="border-bottom px-4 py-3 px-md-5 py-md-4">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Name &amp; URL</h4>

          <event-name-component class="mb-4" v-model="event.name"></event-name-component>
          <event-url-component class="mb-4" v-model="event.slug"></event-url-component>
          <event-campaign-component class="mb-4" :campaignOptions="campaignOptions" v-model="event.campaignId"></event-campaign-component>
        </div>

        <div class="px-4 py-3 px-md-5 py-md-4">
          <h4 class="datetime-label font-weight-semibold label-standard-primary mb-4 text-uppercase">Date &amp; Time</h4>

          <event-duration-component class="mb-3" v-model="event.duration"></event-duration-component>
        </div>
      </div>

      <div class="col-md">
        <div class="border-bottom px-4 py-3 px-md-5 py-md-4">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Location</h4>

          <event-location-component class="mb-3" :countryOptions="countryOptions" v-model="event.location"></event-location-component>
        </div>

        <div class="px-4 py-3 px-md-5 py-md-4">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-uppercase">Peer 2 Peer</h4>

          <event-peer-to-peer-component class="mb-3" v-model="event.p2pProgramId" :p2pOptions="p2pOptions"></event-peer-to-peer-component>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-cancel font-weight-semibold btn-lg border rounded-pill shadow-sm text-uppercase"
            @click="$router.push({ name: 'events' })"
          >Cancel</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-light btn-save font-weight-semibold btn-lg border rounded-pill shadow-sm text-uppercase w-100"
            :disabled="busy"
          >{{ busy ? 'Saving...' : 'Save And Continue' }}</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import IEventDuration from '@/api/interface/IEventDuration';
import IEventLocation from '@/api/interface/IEventLocation';
import BaseEventVue from '@/api/core/BaseEventVue';

import EventCampaignComponent from '@/components/Events/BasicDetails/Fields/EventCampaignComponent.vue';
import EventDurationComponent from '@/components/Events/BasicDetails/Fields/EventDurationComponent.vue';
import EventLocationComponent from '@/components/Events/BasicDetails/Fields/EventLocationComponent.vue';
import EventNameComponent from '@/components/Events/BasicDetails/Fields/EventNameComponent.vue';
import EventPeerToPeerComponent from '@/components/Events/BasicDetails/Fields/EventPeerToPeerComponent.vue';
import EventUrlComponent from '@/components/Events/BasicDetails/Fields/EventUrlComponent.vue';
import VeeValidate from 'vee-validate';
import clone from 'lodash';
import EventDTO from '@/api/dto/EventDTO';
import EventModel from '@/api/model/EventModel';
import ApiUtils from '@/api/util/ApiUtils';
import DateUtils from '@/api/util/DateUtils';
import TypeUtils from '@/api/util/TypeUtils';
import FormatUtils from '@/api/util/FormatUtils';
import ISelect from '@/api/interface/ISelect';
import IVueSelect from '@/api/interface/IVueSelect';

Vue.use(VeeValidate);

@Component({
  components: {
    EventCampaignComponent,
    EventDurationComponent,
    EventLocationComponent,
    EventNameComponent,
    EventPeerToPeerComponent,
    EventUrlComponent,
  },
})
export default class EditEventBasicDetails extends BaseEventVue {
  private ERROR_ORG_PATH: string = 'data.organization.createEvent.errors';
  private readonly PAGE: number = 1;
  private campaignOptions: ISelect[] = [];
  private p2pOptions: ISelect[] = [];
  private countryOptions: IVueSelect[] = [];

  get isEventEditing() {
    return this.$route.name === 'edit-event';
  }

  private created() {
    // const mm = require('moment-timezone');
    // console.log('PST', mm().tz('PST8PDT').format());
    // console.log('EST', mm().tz('EST').format());

    if (this.api === null) {
       return;
    }
    if (this.isEventEditing) {
      this.api.getEvent(this.$route.params.eventId)
        .then((res) => {
          const eventUpdate = this.handleSuccess(res, 'data.event', this.ERROR_UPDATE_PATH);
          this.event = Object.assign(new EventDTO(), EventDTO.toBasic(eventUpdate));
          this.storeEvent(eventUpdate);
          this.event.location.country = (this.event.location.country) ? this.event.location.country : 'United States';
        })
        .catch(this.handleFailure);
    } else {
      this.loadOrganization();
    }
  }

  private mounted() {
    this.campaignOptions = this.$store.getters.organization.campaigns;
    this.p2pOptions = this.$store.getters.organization.p2pPrograms;
    this.countryOptions = this.$store.getters.organization.countries;
  }

  private updateEvent() {
    const evt = this.event;
    const loc = this.event.location;
    const promises: any = [];
    const duration = DateUtils.fromDuration(evt.duration);

    const mutation = {
      name: evt.name,
      slug: FormatUtils.formatSlug(evt.slug),
      venueName: evt.location.venue,
      venueAddress: evt.locationMinusVenue,
      campaignId: TypeUtils.isUUID(evt.campaignId) ? evt.campaignId : null,
      p2pProgramId: TypeUtils.isUUID(evt.p2pProgramId) ? evt.p2pProgramId : null,
      p2pProgramPending: evt.p2pProgramId === 'create-peer-2-peer',
      eventStart: duration.start,
      eventEnd: duration.end,
    };

    this.$children.forEach((vm) => promises.push(vm.$validator.validateAll()));

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      if (this.api === null) {
         return;
      }

      this.busy = true;
      if (this.isEventEditing) {
        this.api.updateEvent(this.$route.params.eventId, mutation)
          .then((res) => {
            const errors = this.handleSuccess(res, this.ERROR_UPDATE_PATH, this.ERROR_UPDATE_PATH);
            this.busy = false;
            if (!ApiUtils.hasValue(errors)) {
              this.updateEventStepAndProceed(evt.id, this.PAGE, 'edit-event-details', { eventId: this.$route.params.eventId });
            }
          }).catch(this.handleFailure);
      } else {
        this.api.createEvent(this.$store.getters.organizationId, mutation)
          .then((res) => {
            evt.id = this.handleSuccess(res, 'data.organization.createEvent.event.id', this.ERROR_ORG_PATH);
            this.busy = false;
            if (TypeUtils.isUUID(evt.id)) {
              this.updateEventStepAndProceed(evt.id, this.PAGE, 'edit-event-details', { eventId: evt.id });
            }
          }).catch(this.handleFailure);
      }
    });
  }

}
</script>

<style lang="scss" scoped>
.btn-save {
  background: #D4D4D4;
}

@media only screen and (min-width: 1024px) {
  .datetime-label {
    margin-bottom: 105px !important;
  }
}
</style>
