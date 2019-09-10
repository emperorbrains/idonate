<template>
  <div>
    <div>
      <label-component for="event-donation" text="Event Donation Form"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-donation"
        title="Select an online giving embed, already defined in iDonate, to be added to the event page so ticket purchasers may also make donations."
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-donation" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <select-component
      id="event-donation"
      defaultOptionText="---No Embed---"
      :options="embedOptions"
      v-model="eventEmbed"
    ></select-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import { EventApi } from '@/api/EventApi';
import BaseVue from '@/api/core/BaseVue';
import ISelect from '@/api/interface/ISelect';

@Component({
  components: {
    LabelComponent,
    SelectComponent,
  },
})
export default class EventEmbedsComponent extends Vue {
  @Prop({ default: '', type: String }) public readonly value!: string;
  @Prop(Array) public readonly embedOptions!: ISelect[];

  get eventEmbed() {
    return this.value;
  }

  set eventEmbed(value) {
    this.$emit('input', value);
  }
}
</script>
