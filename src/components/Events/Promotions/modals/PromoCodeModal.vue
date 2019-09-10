<template>
  <b-modal :id="id" ref="modal" centered hide-footer hide-header class="newModal">
    <form action="#" @submit.prevent="submitForm">
      <div class="p-1">
        <div class="mb-1 text-center">
          <h4 class="font-weight-bold mb-1">{{ typeOfModal }} Promo Code</h4>
        </div>

        <div class="mb-1">
          <label-component class="mb-0 label-name" for="promo-code" text="Promo Code"></label-component>
          <input
            id="promo-code"
            type="text"
            class="form-control promo-code"
            placeholder="Enter Promo Code (You can not change the code after the initial save.)"
            v-model="value.code"
            required
          />
        </div>

        <div class="mb-1 applies-drop-down">
          <label-component class="mb-0 label-name" for="applies-to" text="Applies To"></label-component>
          <v-select
            id="applies-to"
            placeholder="Select Ticket Type"
            :options="ticketDefinitions"
            v-model="value.ticketId"
            class="applies-to"
            required
          />
        </div>

        <div class="mb-1">
          <div>
            <label-component
              class="mb-0 label-name"
              for="discount-percentage"
              text="Discount Percentage"
            ></label-component>

            <b-tooltip
              placement="right"
              target="btn-tooltip-discount-percentage"
              title="Enter a value in Discount Percentage or Discounted Amount or Discounted Price. The other values will be calculated automatically."
            ></b-tooltip>

            <a href="#" id="btn-tooltip-discount-percentage" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
          </div>
          <div class="flex-even input-with-icon icon-left border rounded-pill mr-2 w-100">
            <input
              id="discount-percentage"
              name="discount-percentage"
              type="text"
              class="form-control border-0 pl-5 label-height"
              placeholder="Enter Discounted Percentage"
              :class="{ 'text-danger border-danger': errors.has('discount-percentage') }"
              v-validate="'required|min_value:0|max_value:100'"
              v-model="value.discountPercent"
              @keyup="keyDiscountPercentage($event)" 
              @keypress="keyValidate($event)"
              required
            />
            <span class="icon">
              <img src="@/assets/icons/percent.svg" />
            </span>
          </div>
        </div>

        <div class="mb-1">
          <div>
            <label-component class="mb-0 label-name" for="discount-amount" text="Discounted Amount"></label-component>

            <b-tooltip
              placement="right"
              target="btn-tooltip-discount-amount"
              title="Enter a value in Discount Percentage or Discounted Amount or Discounted Price. The other values will be calculated automatically."
            ></b-tooltip>

            <a href="#" id="btn-tooltip-discount-amount" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
          </div>
          <div class="flex-even input-with-icon icon-left border rounded-pill mr-2 w-100">
            <input
              id="discount-amount"
              name="discount-amount"
              type="text"
              class="form-control border-0 pl-5 label-height"
              placeholder="Enter Discounted Amount"
              :class="{ 'text-danger border-danger': errors.has('discount-amount') }"
              v-validate="'required|numeric|min_value:0'"
              v-model="value.discountFlat"
              @keyup="keyDiscountFlat($event)" 
              @keypress="keyValidate($event)"
              required
            />
            <span class="icon">
              <img src="@/assets/icons/currency.svg" />
            </span>
          </div>
        </div>

        <div class="mb-1 discount-amount">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <label-component class="mb-0 label-name" for="discount-price" text="Discounted Price"></label-component>

              <b-tooltip
                placement="right"
                target="btn-tooltip-discount-price"
                title="Enter a value in Discount Percentage or Discounted Amount or Discounted Price. The other values will be calculated automatically."
              ></b-tooltip>

              <a href="#" id="btn-tooltip-discount-price" class="btn btn-sky-blue btn-tooltip font-weight-bold rounded-circle ml-2 text-white">?</a>
            </div>

            <span class="ticket_price">(This is your new ticket price)</span>
          </div>

          <div class="flex-even input-with-icon icon-left border rounded-pill mr-2 w-100">
            <input
              id="discount-price"
              name="discount-price"
              type="text"
              class="form-control border-0 pl-5 label-height"
              placeholder="Enter Discounted Price"
              :class="{ 'text-danger border-danger': errors.has('discount-price') }"
              v-validate="'required|numeric|min_value:0'"
              v-model="value.discountAmount"
              @keyup="keyDiscountAmount($event)" 
              @keypress="keyValidate($event)"
              required
            />
            <span class="icon">
              <img src="@/assets/icons/currency.svg" />
            </span>
          </div>
        </div>

        <div class="mb-1">
          <div class="custom-control custom-checkbox">
            <input
              id="limit-checkbox"
              class="custom-control-input text-muted"
              name="date-time-type"
              type="checkbox"
              v-model="value.limit"
            />
            <label-component
              class="custom-control-label text-muted mb-0 label-name"
              for="limit-checkbox"
              text="No limit"
              :isBold="false"
            ></label-component>
          </div>
          <label-component class="mb-0 label-name" for="limit" text="Limit"></label-component>
          <input
            id="discount-price"
            class="form-control limit-ticket"
            placeholder="Enter Limit"
            v-model="value.quantity"
            type="number"
            :disabled="value.limit"            
          />
          <span
            class="num-tickets"
          >Number of tickets in total that can be purchased with the promo code.</span>
        </div>

        <div class="mb-1">
          <div class="custom-control custom-checkbox">
            <input
              id="event-start-checkbox"
              class="custom-control-input text-muted"
              name="date-time-type"
              type="checkbox"
              v-model="value.immediately"
            />
            <label-component
              class="custom-control-label text-muted mb-0 label-name"
              for="event-start-checkbox"
              text="Immediately"
              :isBold="false"
            ></label-component>
          </div>
          <label-component class="mb-0 label-name" for="start-date" text="Starts"></label-component>
          <div class="row start">
            <div class="col-6">
              <div class="border input-with-icon icon-right pl-3 rounded-pill">
                <date-picker-component
                  inputPlaceholder="Start Date"
                  v-model="value.promoStartDate"
                />

                <span class="icon">
                  <i class="far fa-calendar"></i>
                </span>
              </div>
            </div>

            <div class="col-6">
              <div class="border input-with-icon icon-right rounded-pill">
                <time-picker-component
                  input-class="form-control border-0"
                  input-placeholder="Start Time"
                  :selectedDate="value.promoStartDate"
                  v-model="value.promoStartTime"
                ></time-picker-component>

                <span class="icon">
                  <img src="@/assets/icons/clock.svg" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-2">
          <div class="custom-control custom-checkbox">
            <input
              id="event-date-checkbox"
              class="custom-control-input text-muted"
              name="date-time-type"
              type="checkbox"
              v-model="value.eventDate"
            />
            <label-component
              class="custom-control-label text-muted mb-0 label-name"
              for="event-date-checkbox"
              text="Event Date"
              :isBold="false"
            ></label-component>
          </div>
          <label-component class="mb-0 label-name" for="end-date" text="Ends"></label-component>
          <div class="row end">
            <div class="col-6">
              <div class="border input-with-icon icon-right pl-3 rounded-pill">
                <date-picker-component
                  inputPlaceholder="End Date"
                  :disableUpTo="value.promoStartDate"
                  v-model="value.promoEndDate"
                />

                <span class="icon">
                  <i class="far fa-calendar"></i>
                </span>
              </div>
            </div>

            <div class="col-6">
              <div class="border input-with-icon icon-right rounded-pill">
                <time-picker-component
                  input-class="form-control border-0"
                  input-placeholder="End Time"
                  :selectedDate="value.promoEndDate"
                  v-model="value.promoEndTime"
                ></time-picker-component>

                <span class="icon">
                  <img src="@/assets/icons/clock.svg" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col text-center">
            <button 
              type="submit" 
              class="btn btn-primary rounded-pill text-uppercase w-75"
              :disabled="busy"
            >{{ busy ? 'Saving...' : 'Save'}}</button>
          </div>

          <div class="col text-center">
            <button
              type="reset"
              class="btn btn-secondary rounded-pill text-uppercase w-75 cancel"
              @click="$refs['modal'].hide()"
            >Cancel</button>
          </div>
        </div>
      </div>
    </form>
  </b-modal>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Datetime } from 'vue-datetime';
import { isEmpty } from 'lodash';
import vSelect from 'vue-select';
import IComplementaryTicket from '@/api/interface/IComplementaryTicket';

import DatePickerComponent from '@/components/FormElements/DatePickerComponent.vue';
import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import TimePickerComponent from '@/components/FormElements/TimePickerComponent.vue';

import FormatUtils from '@/api/util/FormatUtils';
import ApiUtils from '@/api/util/ApiUtils';
import TypeUtils from '@/api/util/TypeUtils';
import BaseEventVue from '@/api/core/BaseEventVue';
import PromoCodeModel from '@/api/model/PromoCodeModel';
import PromoCodeDTO from '@/api/dto/PromoCodeDTO';
import * as EventConstants from '@/api/EventConstants';
import TicketDefinitionDTO from '@/api/dto/TicketDefinitionDTO';
import moment from 'moment';

@Component({
  components: {
    DatePickerComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    Datetime,
    vSelect,
    TimePickerComponent,
  },
})
export default class PromoCodeModal extends BaseEventVue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly type!: string;
  @Prop(String) public readonly id!: string;
  @Prop() public readonly item!: any;
  @Prop(Object) public value!: any;
  @Prop(Number) public itemIndex!: number;

  // private promo: PromoCodeDTO = new PromoCodeDTO();
  private eventId: string = '';
  private promoCodeId: string = '';
  private ticketDefinitions: any[] = [];

  // Added back because it was causing an error
  get typeOfModal() {
    this.busy = false;
    return this.isNewModal ? 'New' : 'Edit';
  }

  get isNewModal() {
    return (this.type === 'new');
  }

  private mounted() {
    this.eventId = this.$route.params.eventId;
    if (this.isNewModal) {
      this.value.promoStartDate = moment().format(); // 'HELLO';
      this.value.promoEndDate = moment().format();
      console.log('zxc', this.value.promoEndDate);
    }
    if (this.api === null) {
       return;
     }

    this.api.getTicketDefinitions(this.eventId)
      .then((res) => {
        const data = this.handleSuccessIgnoreError(res, 'data.event.ticketDefinitions');
        this.ticketDefinitions = TicketDefinitionDTO.toOptionsList(data, false, true);
      });
  }

  private getTicketPrice() {
    return TypeUtils.toFloatPath(this.value, 'ticketId.price');
  }

  @Watch('value.ticketId')
  private initialize() {
    const price = this.getTicketPrice();
    this.keyDiscountPercentage(0);
  }

  private keyValidate(val) {
    return FormatUtils.isNumber(val);
  }

  private keyDiscountPercentage(val) {
    const price = this.getTicketPrice();
    const pct = TypeUtils.toFloat(this.value.discountPercent) / 100;
    this.value.discountFlat = (price * pct).toFixed(2);
    this.value.discountAmount = (price - this.value.discountFlat).toFixed(2);
  }

  private keyDiscountFlat(val) {
    const price = this.getTicketPrice();
    const flat = TypeUtils.toFloat(this.value.discountFlat);
    this.value.discountPercent = ((flat * 100) / price).toFixed(2);
    this.value.discountAmount = (price - flat).toFixed(2);
  }

  private keyDiscountAmount(val) {
    const price = this.getTicketPrice();
    const amount = TypeUtils.toFloat(this.value.discountAmount);
    this.value.discountPercent = ((price - amount) * 100 / price).toFixed(2);
    this.value.discountFlat = (price - amount).toFixed(2);
  }



  private submitForm() {
    const promises: any = [];

    this.$children.forEach((vm) => promises.push(vm.$validator.validateAll()));

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      if (this.api === null) {
        return;
      }
      this.busy = true;

      if (this.type === 'new') {
        this.api.createPromoCode(this.$route.params.eventId, PromoCodeDTO.toModel(this.value))
          .then((res) => {
            const promoId = this.handleSuccess(res, 'data.event.createPromoCode.promoCode.id', 'data.event.createPromoCode.errors');
            console.log('promoId', promoId);
            this.updateTicketPromoCode(promoId);
            this.$emit('addNewPromoCode', this.value);
          }).catch(this.handleFailure);
      } else if (this.type === 'edit') {
        this.api.updatePromoCode(this.$route.params.eventId, this.value.id, PromoCodeDTO.toModel(this.value))
          .then((res) => {
            this.updateEventDontProceed(res, 'data.event.updatePromoCode.errors');
            this.updateTicketPromoCode(this.value.id);
            this.$emit('editPromoCode', this.itemIndex, this.value);
          }).catch(this.handleFailure);
      }
    });
  }


  private updateTicketPromoCode(promoCodeId: string) {
    this.api.updateTicketDefinition(this.$route.params.eventId, this.value.ticketId.code, TicketDefinitionDTO.toModelPromoCode(promoCodeId))
      .then((res) => {
        this.handleSuccess(res, 'data.event.updateTicketDefinition.errors');
        this.$refs.modal.hide();
      }).catch(this.handleFailure);
  }

  @Watch('value.immediately')
  private monitorImmediatelyCheck(immediately: boolean) {
    console.log('immediately', immediately);
    if (immediately) {
      this.value.promoStartDate = moment().format();
      this.$emit('updatePromoCode', {
        key: 'startDate',
        value: new Date().toISOString(),
      });
    } else {
      this.value.promoStartDate = '';
      this.value.promoStartTime = '';
    }
  }
}
</script>

<style scoped>
button.btn.btn-secondary.btn-lg.rounded-pill.text-uppercase.w-100.cancel {
  background: #cecece;
  border: none;
}
.row.start,
.row.end {
  margin-left: -15px;
  margin-right: -15px;
}
span.ticket_price {
  color: #a09e9ede;
  font-size: 12px;
}
span.num-tickets {
  font-size: 10px;
  text-align: center;
  display: block;
  color: #9a9999de;
}
label.custom-control-label.text-muted {
  float: right;
  font-size: 13px;
}
.text-muted {
  color: #b7b7b7 !important;
}
.modal-content {
  border-radius: 1.3rem !important;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
}
.applies-drop-down {
  border-radius: 20px !important;
}
.vs__dropdown-toggle {
  border-radius: 30px;
  padding: 6px;
  height: 25px;
}
.label-height {
  height: 32px;
  font-size: 13px;
}
.promo-code {
  border-radius: 50px;
  font-size: 12px;
}
.limit-ticket {
  height: 32px;
  border-radius: 50px;
  margin-bottom: 2px;
  font-size: 13px;
}
input.vs__search {
  height: 18px;
}
.label-name {
  font-size: 13px;
}
.input-with-icon.icon-right .icon {
  color: #c4c4c4;
  right: 15px;
  top: 8px;
}

.input-with-icon.icon-left .icon {
  color: #c4c4c4;
  top: 4px;
}

.input-with-icon .icon img {
  height: 12px;
  width: 12px;
  opacity: 0.4;
}
.custom-control {
  min-height: 0px;
}
</style>
<style>
.applies-to .vs__dropdown-toggle {
  border-radius: 30px !important;
  padding: 6px;
  height: 32px;
}
.modal-content {
  border-radius: 1.3rem !important;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3) !important;
}
div#promo-code-modal span.vs__selected {
  margin-top: -4px;
  height: 25px;
  padding: 5px;
  font-size: 12px;
}
.vs__dropdown-toggle .vs__actions .vs__clear {
  display: none !important;
}

.applies-to .vs__search {
  margin-top: 0 !important;
}
</style>
