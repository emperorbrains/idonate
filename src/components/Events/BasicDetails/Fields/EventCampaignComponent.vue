<template>
  <div>
    <div>
      <label-component for="event-campaign" text="Campaign"></label-component>
      
      <b-tooltip
        placement="right"
        target="btn-tooltip-event-campaign"
        title="Select a campaign, already defined in iDonate, to associate event ticket sales with a campaign."
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-campaign" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 mr-2 text-white">?</a>
    </div>

    <select-component
      id="event-campaign"
      defaultOptionText="-- No Campaign --"      
      v-model="eventCampaign"
      name="eventCampaign"
      :class="(errors.has('eventCampaign'))? 'input-error' : ''"
      :options="campaignOptions"
    >
    </select-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { EventApi } from '@/api/EventApi';
import BaseVue from '@/api/core/BaseVue';
import ISelect from '@/api/interface/ISelect';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';

@Component({
  components: {
    LabelComponent,
    SelectComponent,
  },
})
export default class EventCampaignComponent extends BaseVue {
  @Prop(String) public readonly value!: string;
  @Prop(Array) public readonly campaignOptions!: ISelect[];

  get eventCampaign() {
    return this.value;
  }

  set eventCampaign(value) {
    this.$emit('input', value);
  }
}
</script>
