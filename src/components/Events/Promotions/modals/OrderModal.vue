<template>
  <b-modal
    :id='id'
    ref='modal'
    size='xl'
    modal-class='purchase-modal'
    body-classcentered
    hide-footer
    hide-header
  >
    <div class='close-div'>
      <span @click="$refs['modal'].hide()" class='close-new'>x</span>
    </div>

    <form action='#' @submit.prevent='submitForm'>
      <b-form-row class='order-form'>
        <div class='form-data'>
          <b-col cols='12' md='auto' class='modal-title py-2'>

            <div class='mb-4 text-center'>
              <h3 class='mb-4 purchaser'>PURCHASER</h3>
            </div>

            <b-col class='pl-0 mb-3'>
              <label-component class="text-light" for='comp-ticket-firstName' text='First Name'></label-component>
              <input-component
                id='comp-ticket-firstName'
                placeholder='Enter First Name'
                v-model='value.firstName'
                required
              ></input-component>
            </b-col>

            <b-col class='pl-0 mb-3'>
              <label-component class="text-light" for='comp-ticket-lastName' text='Last Name'></label-component>
              <input-component
                id='comp-ticket-lastName'
                placeholder='Enter Last Name'
                v-model='value.lastName'
                required
              ></input-component>
            </b-col>

            <b-col class='pl-0 mb-3'>
              <label-component class="text-light" for='comp-ticket-email' text='Email'></label-component>
              <input-component
                id='comp-ticket-email'
                placeholder='Enter Email Address'
                v-model='value.email'
                type='email'
                required
              ></input-component>
            </b-col>

            <b-col class='pl-0 mb-3'>
              <label-component class="text-light" for='comp-ticket-street' text='street'></label-component>
              <input-component
                id='comp-ticket-street'
                placeholder='Enter Street Address'
                v-model='value.address.street'
                type='street'
                required
              ></input-component>
            </b-col>

            <b-col class='pl-0 mb-3'>
              <label-component class="text-light" for='comp-ticket-city' text='city'></label-component>
              <input-component
                id='comp-ticket-city'
                placeholder='Enter city'
                v-model='value.address.city'
                type='city'
                required
              ></input-component>
            </b-col>


            <b-col class='pl-0 mb-3'>
              <label-component class="text-light" for='comp-ticket-state' text='state'></label-component>
              <input-component
                id='comp-ticket-state'
                placeholder='Enter state'
                v-model='value.state'
                type='state'
                required
              ></input-component>
            </b-col>

            <b-col class='pl-0 mb-3'>
              <label-component class="text-light" for='comp-ticket-zip' text='zip'></label-component>
              <input-component
                id='comp-ticket-zip'
                placeholder='Enter zip'
                v-model='value.zip'
                type='zip'
                required
              ></input-component>
            </b-col>

            <b-col class='pl-0 mb-3'>
              <label-component class="text-light" for='comp-ticket-country' text='country'></label-component>
              <input-component
                id='comp-ticket-country'
                placeholder='Enter country'
                v-model='value.country'
                type='country'
                required
              ></input-component>
            </b-col>
            
            <b-col class='mt-5'>
              <button type='submit' class='btn btn-lg rounded-pill text-uppercase update'>Update</button>
            </b-col>

          </b-col>
        </div>

        <b-col col class="p-3">
          <b-col md='12'>
            <b-row>
              <b-col md='8' class='pl-0 mt-1'>
                <div class='payment-process mt-2 ml-0'>
                  <img src='@/assets/icons/payment-card.svg' height='35px' width='35px'>
                  <p class='payment-text'>
                    Payment Processed On
                    <br>
                    <span class='payment-below'> MISSING API </span>
                    <span class='paid mr-4'>PAID</span>
                  </p>
                  <hr>
                  <table class='w-100 tiket-data'>
                    <tr>
                      <td>Ticket Sales</td>
                      <td class='text-right'>$0.00</td>
                    </tr>
                    <tr>
                      <td>Gross</td>
                      <td class='text-right'>$0.00</td>
                    </tr>
                    <tr>
                      <td>Net</td>
                      <td class='text-right'>USD $0.00</td>
                    </tr>
                  </table>
                </div>
              </b-col>
              <b-col md='4 text-center mt-3 button-text'>
                <div class="mb-2 text-uppercase text-center">
                  {{formattedOrderId}}
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-standard rounded-pill text-uppercase w-100"
                    v-b-modal="'refund-modal'"
                  >Refund Order</button>
                </div>
                
                <div class="mb-2 text-uppercase text-center">
                  <button type="button"
                      class="btn btn-outline-primary btn-standard rounded-pill text-uppercase w-100"
                      @click="resendOrderConfirmation"
                    >Resend Order Confirmation</button>
                </div>
              </b-col>
            </b-row>
          </b-col>

          <div class='event py-2'>ATTENDEES</div>
          <b-row ml-4>
            <b-table
              responsive
              id='order-table'
              :items='attendeeTicketsList'
              :fields='attendeeTicketsFieldsList'
              thead-class='header'
              tbody-class='table-data'
              :tbody-tr-class='rowClass'
            >
              <template slot='attendee' slot-scope='list'>
                <b-col>
                  <span
                    :id='`tooltip-mail-${list.index}`'
                    class='free-stuff'
                  >{{ `${list.item.firstName} ${list.item.lastName}` }}</span>
                  <br>
                  <span class='free-stuff-new'>{{ list.item.ticketId }}</span>
                </b-col>
                <b-tooltip
                  :target='`tooltip-mail-${list.index}`'
                  class='details'
                >{{ `${list.item.email}` }}</b-tooltip>
              </template>

              <template slot='action' slot-scope='row'>
                <span class='edit-details' @click="editAction('hideTR', row)">Edit</span>
              </template>

              <template slot='row-details' slot-scope='row'>
                <b-row>
                  <b-col md3>
                    <input-component
                      id='comp-ticket-firstName'
                      placeholder='Enter First Name'
                      v-model='selectedRow.firstName'
                      required
                    ></input-component>
                  </b-col>

                  <b-col md3>
                    <input-component
                      id='comp-ticket-firstName'
                      placeholder='Enter Last Name'
                      v-model='selectedRow.lastName'
                      required
                    ></input-component>
                  </b-col>

                  <b-col md3>
                    <input-component
                      id='comp-ticket-firstName'
                      placeholder='Enter Company'
                      v-model='selectedRow.address'
                      required
                    ></input-component>
                  </b-col>

                  <b-col md3>
                    <input-component
                      id='comp-ticket-firstName'
                      placeholder='Enter Email'
                      v-model='row.item.email'
                      type='email'
                      required
                    ></input-component>
                  </b-col>

                  <b-col md3 @click="editAction('save', row)">
                    <i class='fa fa-check fa-2x' aria-hidden='true'></i>
                  </b-col>
 
                  <b-col md3 @click="editAction('close', row)">
                    <i class='fa fa-times fa-2x' aria-hidden='true'></i>
                  </b-col>

                </b-row>
              </template>

            </b-table>
          </b-row>

        </b-col>
      </b-form-row>
    </form>
    <refund-modal-component ref="refund" id="refund-modal" :orderId="value.orderId" ></refund-modal-component>
  </b-modal>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

import moment from 'moment';
import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import RefundModalComponent from '@/components/Events/Orders/RefundModalComponent.vue';
import IComplementaryTicket from '@/api/interface/IComplementaryTicket';
import BaseVue from '@/api/core/BaseVue';
import TicketInstanceDTO from '@/api/dto/TicketInstanceDTO';
import OrderDTO from '@/api/dto/OrderDTO';
import FormatUtils from '@/api/util/FormatUtils';

@Component({
  components: {
    InputComponent,
    LabelComponent,
    SelectComponent,
    RefundModalComponent,
  },
})
export default class OrderModal extends BaseVue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;
  @Prop(Object) public value!: any;
  @Prop(Number) public itemIndex!: number;
  @Prop(String) public readonly orderId!: string;
  @Prop(Array) public  readonly attendeeTicketsList!: any[];

  get formattedOrderId() {
    return FormatUtils.formatId(this.value.orderId);
  }

  private hideTR: boolean = false;
  private selectedRow = {
    ticketId: '',
    firstName: '',
    lastName: '',
    email: '',
    ticketType: '',
    address: '',
    qty: '',
  };

  private ticketItem = {
    ticketId: '',
    firstName: '',
    lastName: '',
    email: '',
    ticketType: '',
    address: '',
    qty: '',
  };

  private attendeeTicketsFieldsList: any[] = [
    {
      key: 'attendee',
    },
    {
      key: 'ticketName',
      label: 'Ticket',
    },
    {
      key: 'date',
      label: 'Ticket Date',
      formatter: this.eventDate,
    },
    {
      key: 'ticketPrice',
    },
    {
      key: 'total',
      label: 'Ticket',
      formatter: this.free,
    },
    {
      key: 'action',
      label: '',
    },
  ];

  private selectedIndex: any = null;

  private editAction(type, row) {
    if (type === 'hideTR') {
      this.selectedRow = Object.assign(
        {},
        { ...this.selectedRow, ...row.item },
      );
      this.selectedIndex = row.index;
      this.hideTR = !this.hideTR;
    } else if (type === 'save') {
      const index = row.index;
      this.attendeeTicketsList.splice(index, 1, this.selectedRow);

      this.updateAttendeeDetails(this.selectedRow);

    } else if (type === 'close') {
      this.selectedRow = this.ticketItem;
      this.selectedIndex = null;
    }
    row.toggleDetails();
  }


private updateAttendeeDetails(row) {
    const promises: any = [];
    promises.push(this.$validator.validateAll());

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      const mutation = {
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        company: row.company,
      };

      this.api.updateOrderAttendee(this.$route.params.eventId, this.value.orderId, this.value.id, mutation)
          .then((res) => {
            this.handleSuccess(res, '', 'data.errors');
          }).catch(this.handleFailure);
    });
  }

  private rowClass(item, type) {
    if (this.hideTR) {
      return 'row-toggle';
    } else if (this.selectedRow && this.selectedRow.ticketId === item.ticketId) {
      return 'row-toggle';
    } else {
      return;
    }
  }

  // private mounted() {
  //   this.loadAttendees();
  // }

  // private loadAttendees() {
  //   console.log('loadAttendees', this.orderId);
  //   this.api.getOrderAttendees(this.orderId)
  //     .then((res) => {
  //       const comps = this.handleSuccessIgnoreError(res, 'data.eventOrder.ticketInstances');
  //       this.attendeeTicketsList = TicketInstanceDTO.fromModelToAttendeeList(comps);
  //     }).catch(this.handleFailure);
  // }

  private eventDate(value) {
    return moment(this.$store.getters.event.eventStart).format('YYYY/MM/DD');
  }

  private resendOrderConfirmation() {
    this.api.resendOrderConfirmation(this.$route.params.eventId, this.orderId)
        .then(this.handleMessage)
        .catch(this.handleFailure);
  }

  private free(value) {
        return '0.00';
  }

  private submitForm() {
    this.api.updateOrderPurchaser(this.$route.params.eventId, this.orderId, OrderDTO.toOrderPurchaser(this.value))
        .then(this.handleMessage)
        .catch(this.handleFailure);
    this.$emit('editCompItem', this.itemIndex, this.value);
    this.$refs.modal.hide();
  }
}
</script>

<style scoped>
.purchase-modal {
  max-width: 1018px;
  margin-right: 100px;
}
.form-control,
.modal-title {
  background-color: #3a8dc2;
  color: #fff;
}
.edit-details {
  padding: 2px 10px;
  background: #2284c3;
  border-radius: 6px;
  font-size: 13px;
  color: #fff;
  cursor: pointer;
}
a.btn.btn-outline-primary.px-4.mr-1.mb-2.w-100.rounded-pill.text-uppercase {
  font-size: 13px;
}
.payment-process {
  width: 90%;
  background: #fff;
  padding: 10px;
  display: inline-block;
  border-radius: 6px;
  border: 2px solid #d3d7da;
}
span.paid {
  background: #03bd5b;
  color: #fff;
  padding: 0 18px;
  position: absolute;
  font-size: 12px;
  border-radius: 6px;
  right: 53px;
  top: 28px;
}
p.payment-text {
  display: inline-table;
  font-size: 15px;
  color: #403c3cde;
  margin-left: 5px;
  margin-bottom: 0px;
}
p.payment-text span.payment-below {
  font-size: 11px;
  line-height: 13px;
  display: block;
}
.button-text a {
  font-size: 12px;
  white-space: nowrap;
}
table.tiket-data,
.payment-text {
  color: #687b8c;
  font-weight: 500;
}
#textarea-address {
  border-radius: 20px;
}
.fa-check {
  color: #038037;
  cursor: pointer;
}
.fa-times {
  color: #ccc;
  cursor: pointer;
}
.form-control input#comp-ticket-firstName {
  background: #2080bf;
  color: #fff;
}
.event {
  text-align: center;
  font-size: 16px;
}
.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  height: 324px;
  -webkit-overflow-scrolling: touch;
}
span.free-stuff {
  font-weight: 600;
  font-size: 15px;
  color: #111;
}
span.free-stuff-new {
  color: #7ec89d;
  font-size: 14px;
  font-weight: 500;
}
tbody.table-data tr td {
  color: #808080;
}
.purchaser {
  font-size: 18px;
  font-weight: 500;
}
.form-data {
  width: 26%;
}
.form-control {
  background: #3a8dc2;
  color: #fff;
}
.order-form {
  box-shadow: inset -2px 7px 6px -3px #cdd2d4;
}
button.update {
  background: #fff;
  color: #2080bf;
  font-size: 16px;
  padding: 6px 40px;
  margin: auto;
  display: block;
  margin-bottom: 12px;
}
::-webkit-scrollbar {
  width: 5px;
  min-height: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #c4c6c8;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
span.close-new {
  position: relative;
  font-size: 26px;
  display: block;
  left: 98%;
  font-weight: 600;
  color: #111;
  cursor: pointer;
  top: -15px;
  margin-bottom: -15px;
}
@media (max-width: 768px) {
  .form-data {
    width: 100%;
  }
  .payment-process {
    width: 123%;
    margin-left: -21px !important;
  }
  span.paid {
    right: -30px;
    top: 45px;
  }
}
</style>
<style>
.modal-open #order-modal.modal {
  background: rgba(255, 255, 255, 0.85);
  overflow-y: hidden !important;
}
.modal-dialog.modal-xl {
  margin-top: 17px !important;
}
.row-toggle .col,
.table-data tr .col {
  padding-left: 2px;
  padding-right: 3px;
}
#order-table #comp-ticket-firstName {
  width: 143px;
  height: 32px;
  padding-top: 0;
  padding-bottom: 0;
}
.b-table-has-details {
  display: none !important;
}
.modal-dialog.modal-xl .modal-content {
  margin-left: 26px;
  width: 93%;
  border-radius: 1.3rem !important;
  box-shadow: 0 4px 20px;
}
.modal-title #comp-ticket-firstName,
.modal-title #comp-ticket-lastName {
  background-color: #3a8dc2;
  font-weight: 500;
  color: #fff;
}
#order-table {
  margin-left: 6px;
  margin-right: 6px;
}
.order-form .table-responsive {
  overflow-x: hidden !important;
}
.tiket-data .text-right {
  padding-right: 24px !important;
}
@media (max-width: 768px) {
  .modal-dialog.modal-xl .modal-content {
    margin-left: 0px;
  }
}
</style>

// [
//     {
//       ticketId: 'ZZzzzzzZZZZZZ',
//       email: 'mrogers@email.com',
//       ticketType: 'General Adult',
//       ticketPrice: '$25.00',
//       tax: '$0.00',
//       total: '$35.00',
//       date: 'Sat, Aug 31 2018',
//       firstName: 'Wade',
//       lastName: 'Wiggs',
//       address: 'USA',
//     },
//   ];
