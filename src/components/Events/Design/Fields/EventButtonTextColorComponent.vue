<template>
  <div>
    <div class="mb-2">
      <label-component class="mb-2" for="event-button-text-color" text="Button Text Color"></label-component>
    
      <b-tooltip
        placement="right"
        target="btn-tooltip-event-button-text-color"
        title="Click the color picker to select a color for the text displayed inside the button. You may also enter the 6 digit code representative of the desired color."
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-button-text-color" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <div class="row no-gutters border rounded-pill shadow">
      <div class="col-sm">
        <p class="mt-3 mb-0 ml-3">Pick Your Color</p>
      </div>

      <div class="col-sm p-2 text-center d-flex align-items-center">
        <input-component
          class="w-100"
          input-class="input-color"
          type="color"
          v-model="eventButtonTextColor"
        />
      </div>

      <div class="col-sm p-2">
        <input-component
          id="event-button-text-color"
          class="w-100"
          placeholder="#000000"
          v-model="eventButtonTextColor"
        ></input-component>
      </div>
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
export default class EventButtonTextComponent extends Vue {
  @Prop(String) public readonly value!: string;

  get eventButtonTextColor() {
    return this.value;
  }

  set eventButtonTextColor(value) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 576px) {
  .row {
    border: none !important;
    box-shadow: none !important; 
  }
}
</style>
