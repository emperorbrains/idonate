<template>
  <div>
    <div class="p-4">
      <h2 class="h4 mb-0 font-weight-semibold text-primary text-uppercase">Sponsors</h2>
    </div>

    <div class="accordion" id="sponsors">
      <event-tier-component
        v-for="(tier, index) in tiers"
        :tierIndex="index"
        :key="index"
        :tier="tier"
        @add-sponsor="addSponsor"
        @delete-sponsor="deleteSponsor"
        @update-sponsor="updateSponsor"
        @update-tier-name="name => updateTierName(name, index)"
      ></event-tier-component>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="px-5 py-3">
          <a
            href="#"
            class="btn btn-light btn-back btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase"
            @click="$router.push({ name: 'edit-order-confirmation' })"
          >Back</a>
        </div>
      </div>

      <div class="col-md text-right">
        <div class="px-5 py-3">
          <button
            type="submit"
            class="btn btn-sky-blue btn-save btn-lg border font-weight-semibold rounded-pill shadow-sm text-uppercase w-100"
            @click="updateSponsorStep"
          >Save &amp; Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ISponsor from '@/api/interface/ISponsor';
import ITier from '@/api/interface/ITier';
import EventModel from '@/api/model/EventModel';
import SponsorDTO from '@/api/dto/SponsorDTO';
import BaseEventVue from '@/api/core/BaseEventVue';

import EventTierComponent from '@/components/Events/Sponsors/EventTierComponent.vue';

@Component({
  components: {
    EventTierComponent,
  },
})
export default class EditEventSponsors extends BaseEventVue {
  private readonly PAGE: number = 8;
  private tiers: ITier[] = [];
  private eventId = '';

  private created() {
    this.eventId = this.$route.params.eventId;
    this.loadSponsors();
  }

  private loadSponsors() {
    this.api.getSponsors(this.$route.params.eventId)
      .then((res) => {
        const event = this.handleSuccessIgnoreError(res, 'data.event');
        this.tiers = SponsorDTO.fromModel(event);
        this.storeEvent(event);
        }).catch(this.handleFailure);
  }

  private addSponsor(index: number) {
    const sponsor: ISponsor = {
      id: '',
      imageUrl: '',
      name: '',
      webUrl: '',
    };

    console.info('addSponsor' + JSON.stringify(index));
    this.tiers[index].sponsors.push(sponsor);
  }

  private deleteSponsor(data: string) {
//  console.info('tierIndex' + JSON.stringify(tierIndex));
//  console.info('sponsorIndex' + JSON.stringify(sponsorIndex));
    console.info('data' + JSON.stringify(data));
    this.loadSponsors();
  }

  private updateSponsor(data: any) {
    const {sponsor, sponsorIndex, tierIndex} = data;
    this.$set(this.tiers[tierIndex].sponsors, sponsorIndex, sponsor);

// console.log(JSON.stringify(sponsor), JSON.stringify(tierIndex));
//     const mutation = {
//       tierIndex: sponsorIndex + 1,
//       image: sponsor.image,
//       name: sponsor.name,
//       webUrl: sponsor.link,
//     };

// console.log(JSON.stringify(sponsor));
//     if (sponsor.id !== '' || sponsor.id !== undefined) {
//     //   console.info('createSponsor' + JSON.stringify(data));
//     //   this.api.createSponsor(this.eventId, mutation)
//     //     .then((res) => sponsor.id = this.handleSuccess(res, 'event.createSponsor.sponsor.id', 'event.createSponsor.error'))
//     //     .catch(this.handleFailure);
//     // } else {
//       console.info('updateSponsor' + JSON.stringify(data));
//       this.api.updateSponsor(this.eventId, sponsor.id, mutation)
//         .then((res) => this.handleSuccess(res, '', 'event.updateSponsor.error'))
//         .catch(this.handleFailure);
//     }

  }

  private updateTierName(name: string, index: number) {

    console.info('updateTierName' + JSON.stringify(name) + '--' + index);
    this.$set(this.tiers[index], 'name', name);
  }

  private updateSponsorStep() {
    const mutation = {
      lastConfigurationStep: this.PAGE,
      sponsorTier1Name: this.tiers[0].name,
      sponsorTier2Name: this.tiers[1].name,
      sponsorTier3Name: this.tiers[2].name,
    };
    // Do some processing...
    this.api.updateEvent(this.$route.params.eventId, mutation)
      .then((res) => this.updateEventStepAndProceed(this.eventId, this.PAGE, 'edit-event-settings'))
      .catch(this.handleFailure);
    }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 768px) {
  .btn-back {
    width: 100%;
  }
}
</style>
