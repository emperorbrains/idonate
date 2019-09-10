<template>
  <div class="card rounded-0">
    <div class="card-header bg-white border-bottom" :id="'heading-' + tierIndex">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <div class="mb-1 d-flex align-items-center">
            <h5 class="font-weight-bold mb-0 mr-3">Tier - {{ tierIndex + 1 }}</h5>

            <input
              type="text"
              class="form-control rounded-pill"
              placeholder="Enter tier name here"
              style="max-width: 180px;"
              :value="tier.name"
              @change="event => updateTierName(event.target.value)"
            >
          </div>

          <div>
            <span class="text-muted">{{ tier.sponsors.length }} Sponsors</span>
          </div>
        </div>

        <div>
          <button
            class="btn btn-link text-dark"
            type="button"
            style="font-size: 28px;"
            @click="toggleTier"
            v-b-toggle="'collapse-' + tierIndex"
          >
            <i class="fa" :class="{'fa-chevron-up': isTierOpen, 'fa-chevron-down': !isTierOpen}"></i>
          </button>
        </div>
      </div>
    </div>

    <b-collapse :id="'collapse-' + tierIndex">
      <div class="card-body d-flex flex-wrap">
        <sponsor-component
          class="sponsor mb-3 mx-2"
          v-for="(sponsor, index) in tier.sponsors"
          :index="index"
          :key="index"
          :tierIndex="tierIndex + 1"
          :sponsor="sponsor"
          @delete-sponsor="sponsor => deleteSponsor(sponsor.id)"
          @update-sponsor="sponsor => updateSponsor(sponsor, index)"
        ></sponsor-component>

        <div class="sponsor sponsor-add mx-2">
          <div class="image-placeholder bg-light border rounded mb-3" @click="addSponsor">
            <p class="font-weight-bold text-muted">Upload Image</p>
            <img src="@/assets/icons/add-image.svg">
          </div>

          <p class="tip text-muted mb-0">Recommended formats: (.JPG) &amp; (.PNG)</p>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ISponsor from '@/api/interface/ISponsor';
import ITier from '@/api/interface/ITier';
import BaseVue from '@/api/core/BaseVue';
import ApiUtils from '@/api/util/ApiUtils';

import SponsorComponent from './Fields/SponsorComponent.vue';

@Component({
  components: {
    SponsorComponent,
  },
})
export default class EventTierComponent extends BaseVue {
  @Prop(Object) public readonly tier!: ITier;
  @Prop(Number) public readonly tierIndex!: number;

  private isTierOpen: boolean = false;
  private pendingUpdates: string[] = [];

  private deleteArrayValue(arr: string[], value: any) {
    return arr.filter((id) => id !== value);
  }

  private addSponsor() {
    this.$emit('add-sponsor', this.tierIndex);
  }

  private deleteSponsor(sponsorId: string) {
    this.pendingUpdates = this.deleteArrayValue(this.pendingUpdates, sponsorId);
    this.$emit('delete-sponsor', { sponsorId, tierIndex: this.tierIndex });
  }

  // private deleteSponsor(sponsorIndex: number) {
  //   this.$emit('delete-sponsor', { sponsorIndex, tierIndex: this.index });
  // }

  private updateSponsor(sponsor: ISponsor, index: number) {
    this.pendingUpdates.push(sponsor.id);
    this.$emit('update-sponsor', {
      sponsor,
      sponsorIndex: index,
      tierIndex: this.tierIndex,
    });
  }

  private updateTierName(name: string) {
    this.$emit('update-tier-name', name);
  }

  private toggleTier() {
    // If we are closing the tier, save all pending changes
    if (this.isTierOpen) {
      // console.log('tier', JSON.stringify(this.tier))
      const uniquePendingUpdates = [...(new Set(this.pendingUpdates))];   //Make unique
      console.log('this.pendingUpdates', uniquePendingUpdates);
      for (const pending of uniquePendingUpdates) {
        console.log(pending);
        const sponsor = this.tier.sponsors.filter((x) => x.id === pending);
        if (ApiUtils.hasValue(sponsor) && sponsor.length > 0) {
          const currentSponsor = sponsor[0];
          const mutation = {
            tierIndex: this.tierIndex,
            name: currentSponsor.name,
            webUrl: currentSponsor.webUrl,
          };

          this.api.updateSponsor(this.$route.params.eventId, currentSponsor.id, mutation)
            .then((res) => {
              const sponsorId = this.handleSuccess(res, 'event.createSponsor.sponsor.id', 'event.createSponsor.error');
              this.pendingUpdates = this.deleteArrayValue(this.pendingUpdates, sponsorId);
            }).catch(this.handleFailure);
        }
      }
    }
    this.isTierOpen = !this.isTierOpen;

  }
}
</script>

<style lang="scss" scoped>
.sponsor {
  width: 220px;

  &.sponsor-add {
    .image-placeholder {
      padding: 32px 50px;
      text-align: center;

      img {
        height: 38px;
        width: 38px;
      }
    }

    .tip {
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>
