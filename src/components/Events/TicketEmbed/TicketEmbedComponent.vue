<template>
  <div>
    <div class="bg-dark px-5 py-4 text-white ticket-embed-preview" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <div>
        <h5 class="font-weight-semibold mt-5">Back to the Ballpark 2019</h5>
        <p class="mb-0 text-muted" v-if="event.ticketEmbed.showEventTime">Sat, Aug 31 2019 3:00 PM - 4:00 PM</p>
        <p class="mb-0 text-muted" v-if="event.ticketEmbed.showEventLocation">Arlington, TX, United States</p>
      </div>
    </div>

    <div
      class="d-flex align-items-center justify-content-between px-5 py-3"
      :class="{ 'bg-dark': event.ticketEmbed.theme === 'dark' }"
    >
      <div class="d-flex align-items-center justify-content-between">
        <div class="border-right pr-3">
          <h1 :class="{ 'text-light': event.ticketEmbed.theme === 'dark' }">
            $20<sup>00</sup>
          </h1>
        </div>

        <div class="pl-3" :class="{ 'text-light': event.ticketEmbed.theme === 'dark' }">
          Advanced Child
        </div>
      </div>

      <div class="text-right text-muted text-uppercase" :class="{ 'text-light': event.ticketEmbed.theme === 'dark' }">
        Closed
      </div>
    </div>

    <div class="px-5 pb-3" :class="{ 'bg-dark': event.ticketEmbed.theme === 'dark', 'text-light': event.ticketEmbed.theme === 'dark' }" v-if="event.ticketEmbed.showEventDescription">
      <p class="mb-0">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quia, ab blanditiis eveniet impedit iste praesentium repellendus doloremque reiciendis est obcaecati facilis tempora quis pariatur quae quam quisquam ullam sit.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import EventDTO from '@/api/dto/EventDTO';

@Component
export default class TickeEmbedComponent extends Vue {
  @Prop(Object) public readonly event !: EventDTO;

  get backgroundImage() {
    if (this.event.ticketEmbed.showEventImage) {
      return require('@/assets/images/demo-event-background.jpeg');
    }

    return '';
  }
}
</script>

<style lang="scss" scoped>
.ticket-embed-preview {
  position: relative;

  &::before {
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  > div {
    position: relative;
    z-index: 9;
  }
}
</style>
