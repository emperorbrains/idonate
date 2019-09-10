<template>
  <div>
    <div class="mb-2">
      <label-component for="event-survey" text="Assign Survey"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-event-survey"
        title="Select a survey already defined in this event to be added to this ticket. This is optional."
      ></b-tooltip>

      <a href="#" id="btn-tooltip-event-survey" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <select-component
      id="event-survey"
      name="event-survey"
      :class="(errors.has('event-survey')) ? 'input-error' : ''"
      defaultOptionText="-- No Survey --"
      :options="options"
      v-model="eventSurvey"
    ></select-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import ISurvey from '@/api/interface/ISurvey';

@Component({
  components: {
    LabelComponent,
    SelectComponent,
  },
})
export default class EventTicketAssignSurveyComponent extends Vue {
  @Prop(Array) public readonly surveys!: ISurvey[];
  @Prop(String) public readonly value!: string;

  get options() {
    return this.surveys.map((survey) => {
      return {
        text: survey.name,
        value: survey.id,
      };
    });
  }

  get eventSurvey() {
    return this.value;
  }

  set eventSurvey(value) {
    this.$emit('input', value);
  }
}
</script>
