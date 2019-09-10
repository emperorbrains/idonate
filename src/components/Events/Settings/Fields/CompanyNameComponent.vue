<template>
  <div>
    <div class="mb-2">
      <label-component for="company-name" text="Guest Details"></label-component>

      <b-tooltip
        placement="right"
        target="btn-tooltip-company-name"
        title="Select if company name should be entered during ticket purchase."
      ></b-tooltip>

      <a href="#" id="btn-tooltip-company-name" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
    </div>

    <v-select
      class="company-dropdown"
      placeholder="Choose Guest List"
      multiple
      :options="options"
      v-model="selectedOptions"
    />

    <div class="company-details mt-3">
      <!-- <p class="font-weight-bold mb-1 mx-1" v-if="show('company-name')">Company Name</p>
      <p class="mb-1" v-if="show('salutation') || show('first-name') || show('last-name')"><span class="mx-1" v-if="show('salutation')">Saluation</span> <span class="mx-1" v-if="show('first-name')">Johnathan</span> <span class="mx-1" v-if="show('last-name')">Hills</span></p>
      <p class="mb-1 mx-1" v-if="show('email-address')">johnathan@gmail.com</p>
      <p class="mb-1 mx-1" v-if="show('phone')">347-928-4777</p>
      <p class="mb-1" v-if="show('address-1') || show('city') || show('state') || show('country') || show('zip')"><span class="mx-1" v-if="show('address-1')">3501 Briercliff Road Queens</span> <span class="mx-1" v-if="show('city')">NY</span> <span class="mx-1" v-if="show('zip')">11101</span></p> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import vSelect from 'vue-select';

import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import ApiUtils from '@/api/util/ApiUtils';
import * as EventConstants from '@/api/EventConstants';

@Component({
  components: {
    LabelComponent,
    vSelect,
  },
})
export default class CompanyNameComponent extends Vue {
  @Prop(Array) public readonly value !: [];

  private options = EventConstants.COMPANY_NAME_OPTIONS;

  get selectedOptions() {
    return ApiUtils.hasValue(this.value) ? this.value : [];
  }

  set selectedOptions(value) {
    this.$emit('input', value);
  }

  private show(value) {
    return ''; // !!(this.selectedOptions.findIndex((option: any) => option.value === value) !== -1);
  }
}
</script>

<style lang="scss" scoped>
.company-details p {
  font-size: 12px;
  line-height: 15px;

  &:not(.font-weight-bold) {
    font-weight: 500;
  }
}
</style>

<style lang="scss">
.company-dropdown {
  .vs__dropdown-toggle {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right .75rem center/8px 10px;
    border-color: #ced4da;
    border-radius: 50px;

    .vs__actions {
      display: none;
    }
  }

  .vs__search {
    margin: 10px 0 5px;
    padding-left: 15px;
  }

  input {
    font-size: .9rem;
    font-weight: 400;
    line-height: 1.6;
    color: #495057;
  }
}
</style>
