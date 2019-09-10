<template>
  <div>
    <div>
      <label-component for="event-url" text="Custom Url"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-url"
        title="Customize the event page url by entering the end of the url. The customization appears after the /. EX: www.webpage.com/CustomURLValue"
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-url" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <div class="event-url-wrapper">
      <span class="static">{{baseURL}}</span>

      <input-component
        id="event-url"
        placeholder="Enter your event URL"
        :showCharsCount="true"
        v-model="eventURL"
        name="eventURL" 
        inputClass="event-url"
        :class="(errors.has('eventURL'))? 'input-error' : ''"
        v-validate="'required|max:80'"
      ></input-component>
    </div>
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
export default class EventUrlComponent extends Vue {
  @Prop(String) public readonly value!: string;

  get baseURL() {
    return this.$store.getters.eventsPublicBaseUrl;
  }
  get eventURL() {
    return this.value;
  }

  set eventURL(value) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss">
.event-url-wrapper {
  position: relative;

  .static {
    background: #F5F5F5;
    border-radius: 30px;
    font-size: 12px;
    font-weight: 500;
    padding: 5px 10px;
    position: absolute;
    top: 6px;
    left: 7px;
    z-index: 9;
  }

  .event-url {
    padding-left: 330px;
  }
}
</style>
