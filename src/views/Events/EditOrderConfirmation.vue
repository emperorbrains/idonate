<template>
  <form action="#" method="POST" enctype="multipart/form-data" @submit.prevent="updateOrderConfirmation">
    <div class="border-bottom row no-gutters">
      <div class="col">
        <div class="p-4 p-md-5">
          <h4 class="font-weight-semibold label-standard-primary mb-4 text-center text-uppercase">Order Confirmation</h4>
        
          <div class="row">
            <div class="col-md-4">
              <email-subject-component class="mb-3" v-model="event.receiptSubject"></email-subject-component>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <email-logo-component class="mb-3" v-model="event.receiptLogoImageUrl"></email-logo-component>
              <email-content-component class="mb-3" v-model="event.receiptContent"></email-content-component>
            
              <hr>
            </div>
          </div>

          <div class="row">
            <div class="col text-center">
              <a href="#" class="btn btn-grey btn-equal-width font-weight-semibold rounded-pill text-uppercase text-white mr-md-4 my-3" @click="testEmail">Test</a>
            </div>
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
            @click="$router.push({ name: 'edit-event-ticket-embed' })"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-secondary btn-save btn-sky-blue btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EmailContentComponent from '@/components/Events/OrderConfirmation/Fields/EmailContentComponent.vue';
import EmailLogoComponent from '@/components/Events/OrderConfirmation/Fields/EmailLogoComponent.vue';
import EmailSubjectComponent from '@/components/Events/OrderConfirmation/Fields/EmailSubjectComponent.vue';
import ApiUtils from '@/api/util/ApiUtils';
import ImageUtils from '@/api/util/ImageUtils';
import BaseEventVue from '@/api/core/BaseEventVue';
import EventDTO from '@/api/dto/EventDTO';
import EventModel from '@/api/model/EventModel';

@Component({
  components: {
    EmailContentComponent,
    EmailLogoComponent,
    EmailSubjectComponent,
  },
})
export default class EditOrderConfirmation extends BaseEventVue {
  private readonly PAGE: number = 7;
  private eventId = '';
  private image64: any;

  private created() {
    this.eventId = this.$route.params.eventId;

    if (this.api === null) {
      return;
    }
    this.api.getEvent(this.$route.params.eventId)
      .then((res) => {
        const eventUpdate = this.handleSuccess(res, 'data.event', this.ERROR_UPDATE_PATH);
        this.event = Object.assign(new EventDTO(), EventDTO.toOrderEmail(eventUpdate));
        this.storeEvent(eventUpdate);
        }).catch(this.handleFailure);
  }

  private testEmail() {
    this.api.sendOrderConfirmationTest(this.eventId)
      .then((res) => this.handleSuccess(res, '', 'data.event.sendOrderConfirmationTest.errors'))
      .catch(this.handleFailure);
  }

  private updateOrderConfirmation() {
    if (this.api === null) {
       return;
    }
    const evt = this.event;
    const mutation: any = {
      receiptSubject: evt.receiptSubject,
      receiptContent: evt.receiptContent,
    };
    if (ApiUtils.hasValue(this.image64)) {
       mutation.receiptLogoImage = ImageUtils.dataURItoBlob(this.image64);
    }

    this.api.updateEvent(this.eventId, mutation)
      .then((res) => {
        this.handleSuccess(res, '', 'data.errors');
        this.updateEventStepAndProceed(this.eventId, this.PAGE, 'edit-event-sponsors');
      }).catch(this.handleFailure);
  }

  private imageEvent(img: any) {
    this.image64 = img;
  }
}
</script>

<style lang="scss" scoped>
.btn-equal-width {
  max-width: 180px;
  width: 100%;
}
</style>
