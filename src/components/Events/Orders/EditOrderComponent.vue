<template>
  <div>
    <form action="#" method="POST" @submit.prevent="updateOrderDetails">
      <div class="border-bottom row no-gutters">
        <div class="col-md-4 bg-primary edit-purchaser-details">
          <div class="p-3">
            <h5 class="font-weight-semibold mb-3 text-center text-uppercase text-white">Purchaser</h5>
            
            <div class="mb-3">
              <label-component class="text-white" for="event-order-first-name" text="First Name"></label-component>

              <input-component
                id="event-order-first-name"
                placeholder="Enter your first name"
                inputClass="bg-transparent text-white"
                v-model="purchaser.firstName"
                required
              ></input-component>
            </div>

            <div class="mb-3">
              <label-component class="text-white" for="event-order-last-name" text="Last Name"></label-component>
            
              <input-component
                id="event-order-last-name"
                placeholder="Enter your last name"
                inputClass="bg-transparent text-white"
                v-model="purchaser.lastName"
                required
              ></input-component>
            </div>

            <div class="mb-3">
              <label-component class="text-white" for="event-order-email" text="Email"></label-component>
            
              <input-component
                id="event-order-email"
                name="event-order-email"
                type="email"
                placeholder="Enter your email"
                :input-class="{
                  'border-danger text-danger': errors.has('event-order-email'),
                  'text-white': !errors.has('event-order-email'),
                  'bg-transparent': true
                }"
                v-validate="'email'"
                v-model="purchaser.email"
                required
              ></input-component>
            </div>

            <div class="mb-3">
              <label-component class="text-white" for="event-order-street" text="Street"></label-component>

              <input-component
                id="event-order-street"
                placeholder="Enter your street"
                inputClass="bg-transparent text-white"
                v-model="purchaser.address.street"
                required
              ></input-component>
            </div>

            <div class="mb-3">
              <label-component class="text-white" for="event-order-city" text="City"></label-component>

              <input-component
                id="event-order-city"
                placeholder="Enter your city"
                inputClass="bg-transparent text-white"
                v-model="purchaser.address.city"
                required
              ></input-component>
            </div>

            <div class="mb-3">
              <label-component class="text-white" for="event-order-state" text="State"></label-component>

              <v-select
                id="event-order-state"
                class="bg-transparent text-white"
                placeholder="Choose State"
                :options="statesOptions"
                v-model="purchaser.address.state"
              />
            </div>

            <div class="mb-3">
              <label-component class="text-white" for="event-order-zip" text="Zip"></label-component>

              <input-component
                id="event-order-zip"
                placeholder="Enter your zip"
                inputClass="bg-transparent text-white"
                v-model="purchaser.address.zip"
                required
              ></input-component>
            </div>
            
            <div class="mb-3">
              <label-component class="text-white" for="event-order-country" text="Country"></label-component>

              <v-select
                id="event-order-country"
                class="bg-transparent text-white"
                placeholder="Choose Country"
                :options="countryOptions"
                v-model="purchaser.address.country"
                required
              />

            </div>

            <div class="text-center">
              <b-button type="submit" 
              class="btn-light btn-standard rounded-pill text-primary text-uppercase w-100" 
              variant="white" style="max-width: 150px;"
              :disabled="busy"
              >{{ busy ? 'Working...' : 'Update'}}</b-button>
            </div>
          </div>
        </div>

        <div class="col-md-8 shadow-inner">
          <div class="p-4">
            <div class="row mb-5">
              <div class="col-md-8">
                <div class="border p-2 rounded">
                  <div class="row border-bottom mb-2 no-gutters pb-2">
                    <div class="col-md-8 d-flex">
                      <img class="mr-2" src="@/assets/icons/payment-card.svg" height="35px" width="35px" />
                    
                      <div class="flex-grow-1 payment-process-details">
                        <span class="d-block" style="font-size: 14px;">Payment Processed On</span>
                        <span class="d-block text-muted" style="font-size: 12px;">{{formatProcessedAt}}</span>
                      </div>
                    </div>

                    <div class="col-md-4 d-flex align-items-center justify-content-end">
                      <b-button
                        class="btn-sm btn-success text-uppercase"
                        variant="white"
                        @click="() => {}"
                      >{{transaction.status}}</b-button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 text-left" style="font-size: 12px;">Ticket Sales</div>
                    <div class="col-md-6 text-right" style="font-size: 14px;">{{transaction.ticketSales}}</div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6 text-left" style="font-size: 12px;">Gross</div>
                    <div class="col-md-6 text-right" style="font-size: 14px;">${{transaction.grossProceeds}}</div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6 text-left" style="font-size: 12px;">Net</div>
                    <div class="col-md-6 text-right" style="font-size: 14px;">USD ${{transaction.netProceeds}}</div>
                  </div>
                </div>
              </div>

              <div class="col-md-4 d-flex align-items-center">
                <div>
                  <div class="mb-2 text-uppercase text-center">
                                      {{formatOrderId}}
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-standard rounded-pill text-uppercase w-100"
                      v-b-modal="'refund-modal'"
                      :disabled="busy"
                    >Refund Order</button>
                  </div>
                
                  <div class="mb-2 text-uppercase text-center">
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-standard rounded-pill text-uppercase w-100"
                      @click="resendOrderConfirmation"
                      :disabled="busy"
                    >Resend Order Confirmation</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 font-weight-semibold mb-3 text-center text-primary text-uppercase">Attendees</div>

              <div class="col-md-12">
                <attendees-list-component :orderId="purchaser.id"></attendees-list-component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <refund-modal-component ref="refund" id="refund-modal" :orderId="transaction.orderId" ></refund-modal-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import moment from 'moment';
import FormatUtils from '@/api/util/FormatUtils';
import AddressUtils from '@/api/util/AddressUtils';
import AttendeesListComponent from './AttendeesListComponent.vue';
import RefundModalComponent from './RefundModalComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import InputComponent from '@/components/FormElements/InputComponent.vue';
import TextareaComponent from '@/components/FormElements/TextareaComponent.vue';
import vSelect from 'vue-select';
import BaseVue from '@/api/core/BaseVue';
import OrderDTO from '@/api/dto/OrderDTO';
import IVueSelect from '@/api/interface/IVueSelect';

@Component({
  components: {
    AttendeesListComponent,
    RefundModalComponent,
    LabelComponent,
    InputComponent,
    TextareaComponent,
    vSelect,
  },
})
export default class EditOrderComponent extends BaseVue {
  @Prop(Object) public readonly editedOrder!: any;
  @Prop(Function) public readonly updateOrder!: any;
  private purchaser = { ...this.editedOrder };
  private transaction: any = {};
  private countryOptions: IVueSelect[] = [];
  private statesOptions: IVueSelect[] = [];

  get formatOrderId() {
    return FormatUtils.formatId(this.editedOrder.id);
  }

  get formatProcessedAt() {
    return moment(this.transaction.processedAt).format('llll');
  }

  private created() {
    this.countryOptions = this.$store.getters.organization.countries;
    this.api.getOrderTransaction(this.editedOrder.id)
        .then((res) => {
          const order = this.handleSuccessIgnoreError(res, 'data.eventOrder');
          this.transaction = OrderDTO.fromModelAsTransaction(order);
          console.log('transaction', JSON.stringify(this.transaction));
      }).catch(this.handleFailure);
  }

  private updateOrderDetails() {
    console.log('purchaser update');
    this.busy = true;
    this.api.updateOrderPurchaser(this.$route.params.eventId, this.transaction.orderId, OrderDTO.toOrderPurchaser(this.purchaser))
        .then((res) => {
          this.handleSuccess(res, '', 'data.event.updateOrderPurchaser.errors');
          this.busy = false;
        }).catch(this.handleFailure);
    this.updateOrder(this.purchaser);
  }

  private resendOrderConfirmation() {
    this.busy = true;
    this.api.resendOrderConfirmation(this.$route.params.eventId, this.transaction.orderId)
        .then((res) => {
          this.handleMessage(res);
          this.busy = false;
        }).catch(this.handleFailure);
  }

  @Watch('purchaser.address.country')
  private monitorCountry(val: any) {
    const country = (!this.purchaser.address.country || !this.purchaser.address.country.code)
      ? 'US' : this.purchaser.address.country.code;
    this.statesOptions = AddressUtils.getRegions(country);
  }
}
</script>

<style lang="scss">
.edit-purchaser-details .bg-transparent {
  &::placeholder {
    color: #DDD;
  }

  &:-ms-input-placeholder {
    color: #DDD;
  }

  &::-ms-input-placeholder {
    color: #DDD;
  }
}
</style>
