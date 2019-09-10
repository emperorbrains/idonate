<template>
  <datepicker
    input-class="form-control border-0 bg-transparent pl-0"
    :disabled-dates="disabledDates"
    :placeholder="inputPlaceholder"
    v-model="date"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

@Component({
  components: {
    Datepicker,
  },
})
export default class DatePickerComponent extends Vue {
  @Prop({ default: 'Select Date', type: String }) public readonly inputPlaceholder!: string;
  @Prop({ default: '', type: String }) public readonly disableUpTo!: string;
  @Prop(String) public readonly value!: string;

  get date() {
    return this.value;
  }

  set date(selectedDate) {
    console.log('selectedDate', selectedDate );
    this.$emit('input', moment(selectedDate).format());
  }

  get disabledDates() {
    const dates = {
      to: new Date(moment().format('YYYY/MM/DD')),
    };

    if (this.disableUpTo.length > 1) {
      dates.to = new Date(moment(this.disableUpTo).format('YYYY/MM/DD'));
    }

    return dates;
  }
}
</script>
