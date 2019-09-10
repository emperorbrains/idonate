<template>
  <div>
    <div id="main" class="site-content">
      <div class="row no-gutters">
        <div class="col-md">
          <div>
            <event-header-component></event-header-component>

            <div class="px-4 px-md-5 py-4 py-md-5">
              <event-tabs-component class="mb-5"></event-tabs-component>

              <div class="border overflow-hidden rounded-standard shadow-standard">
                <form action="#" method="POST" enctype="multipart/form-data" @submit.prevent="updateEmailConfiguration">
                  <div class="border-bottom row no-gutters">
                    <div class="col">
                      <div class="p-4 p-md-5">
                        <h4 class="font-weight-semibold label-standard-primary mb-4 text-center text-uppercase">Email Updates</h4>
                      
                        <div class="row">
                          <div class="col-md-4">
                            <email-subject-component class="mb-3" v-model="event.receiptSubject"></email-subject-component>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col">
                            <email-logo-component class="mb-3" v-model="event.receiptLogoImageUrl" @input="imageEvent"></email-logo-component>
                            <email-content-component class="mb-3" v-model="event.receiptContent"></email-content-component>
                          
                            <hr>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col text-center">
                            <a href="#" class="btn btn-grey btn-equal-width font-weight-semibold rounded-pill text-uppercase text-white mr-md-4 my-3" 
                            @click="sendEmailTest"
                            :disabled="busy">{{ busy ? 'Sending...' : 'Test'}}</a>
                            <a href="#" class="btn btn-primary btn-equal-width font-weight-semibold rounded-pill text-uppercase my-3" 
                            @click="sendEmail"
                            :disabled="busy">{{ busy ? 'Sending...' : 'Send'}}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="bg-light p-3">
                    <p class="mb-0 font-weight-bold">The maximum send limit is 250. If your list exceeds 250 unique email addresses we recommend using <a href="#">MailChimp</a>.</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EmailContentComponent from '@/components/Events/EmailUpdates/Fields/EmailContentComponent.vue';
import EmailLogoComponent from '@/components/Events/EmailUpdates/Fields/EmailLogoComponent.vue';
import EmailSubjectComponent from '@/components/Events/EmailUpdates/Fields/EmailSubjectComponent.vue';
import EventHeaderComponent from '@/components/Events/EventHeaderComponent.vue';
import EventTabsComponent from '@/components/Events/EventTabsComponent.vue';
import BaseEventVue from '@/api/core/BaseEventVue';
import EventDTO from '@/api/dto/EventDTO';
import EventModel from '@/api/model/EventModel';
import ApiUtils from '@/api/util/ApiUtils';
import ImageUtils from '@/api/util/ImageUtils';

@Component({
  components: {
    EmailContentComponent,
    EmailLogoComponent,
    EmailSubjectComponent,
    EventHeaderComponent,
    EventTabsComponent,
  },
})
export default class EditEventEmailUpdates extends BaseEventVue {
  private image64: any;
  private eventId: string = '';

  private created() {
   // Important. Next line is used to determine routing [Don't remove]
    this.event.id = this.$route.params.eventId;

    // this.api.getEvent(this.$route.params.eventId)
    //   .then((res) => {
    //     const eventUpdate = this.handleSuccess(res, 'data.event', this.ERROR_UPDATE_PATH);
    //     this.event = Object.assign(new EventDTO(), EventDTO.toOrderEmail(eventUpdate));
    //     this.storeEvent(eventUpdate);
    //     }).catch(this.handleFailure);
  }

  private sendEmail() {
    this.busy = true;
    this.api.sendEmail(this.event.id, this.getMutation())
     .then((res) => {
       this.handleMessage(res);
       this.$msgbox('Email sent.');
       this.busy = false;
     }).catch(this.handleFailure);
  }

  private sendEmailTest() {
    this.busy = true;
    this.api.sendEmailTest(this.event.id, this.getMutation())
    .then((res) => {
       this.handleMessage(res);
       this.$msgbox('Test email sent.');
       this.busy = false;
     }).catch(this.handleFailure);
  }

  private getMutation() {
    const evt = this.event;
    const mutation: any = {
      subject: evt.receiptSubject,
      content: evt.receiptContent,
    };
    if (ApiUtils.hasValue(this.image64)) {
       mutation.emailLogoImage = ImageUtils.dataURItoBlob(this.image64);
    }
    return mutation;
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
