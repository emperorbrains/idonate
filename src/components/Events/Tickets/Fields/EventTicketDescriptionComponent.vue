<template>
  <div>
    <div class="mb-2">
      <label-component for="ticket-description" text="Description"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-ticket-description"
        title="Enter specific information about this ticket type."
      ></b-tooltip>

      <a href="#" id="btn-tooltip-ticket-description" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <textarea-component
      id="ticket-description"
      name="ticket-description"
      inputClass="rounded-standard-semi"
      placeholder="Enter Ticket Description"
      :showCharsCount="true"
      :class="(errors.has('ticket-description')) ? 'input-error' : ''"
      v-validate="'max:255'"
      v-model="ticketDescription"
    ></textarea-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import TextareaComponent from '@/components/FormElements/TextareaComponent.vue';

@Component({
  components: {
    LabelComponent,
    TextareaComponent,
  },
})
export default class EventTicketDescriptionComponent extends Vue {
  @Prop({ default: '<p></p>', type: String }) public value!: string;

  get ticketDescription() {
    return this.value;
  }

  set ticketDescription(value) {
    // tslint:disable-next-line: no-console
    console.log('DESCRIPTION - ' + JSON.stringify(value));
    this.$emit('input', value);
  }
}
</script>
