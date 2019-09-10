<template>
  <div>
    <div>
      <label-component for="event-website" text="Event Website"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-website"
        title="If you have created a web page related to the event, enter the url here. This is an optional field."
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-website" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <input-component
      id="event-website"
      placeholder="Enter your event website url"
      type="URL"
      v-model="eventWebsite"
    ></input-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';

@Component({
  components: {
    InputComponent,
    LabelComponent,
  },
})
export default class EventWebsiteComponent extends Vue {
  @Prop(String) public value!: string;

  get eventWebsite() {
    return this.value;
  }

  set eventWebsite(value) {
    this.$emit('input', value);
  }
}
</script>
