<template>
  <div>
    <b-row class="mb-4">
      <b-col>
        <div class="d-flex align-items-center">
          <div class="w-100 mr-3">
            <v-select
              class="complementary-tickets-search-field"
              :options="ticketIDList"
              v-model="dropdownFilter"
              placeholder="#Tickets"
            />
          </div>

          <div class="searchbox input-with-icon icon-right">
            <input
              type="text"
              class="form-control bg-light rounded-standard-semi"
              placeholder="Search"
              v-model="filter"
            />
            <span class="icon text-muted">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
      </b-col>

      <b-col md="5">
        <h3 class="font-weight-semibold text-center text-primary">COMPLEMENTARY TICKETS</h3>
      </b-col>

      <b-col class="text-right">
        <a
          class="font-weight-semibold mr-4"
          href="#"
          v-b-modal.new-complementary-ticket-modal
        >+ Create New</a>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <div class="table-standard">
          <b-table
            responsive
            head-variant="light"
            :items="complementaryList"
            :fields="complementaryFieldsList"
            thead-class="header"
            :filter="filter"
            :filter-function="filterFunction"
            @row-clicked="rowClickHandler"
          >
            <template slot="action" slot-scope="compTicket">
              <span @click="handleOrderModal(compTicket.item)" class="order-img">
                <img src="@/assets/icons/order.svg" height="20px" />
              </span>
            </template>
          </b-table>
        </div>

        <new-complementary-ticket-modal
          id="new-complementary-ticket-modal"
          v-model="ticketItem"
          @addNewCompTicket="addNewCompTicket"
        ></new-complementary-ticket-modal>

        <order-modal
          id="order-modal"
          v-model="ticketItem"
          :itemIndex="index"
          :attendeeTicketsList="attendeeTicketsList"
          @editCompItem="editCompItem"
        ></order-modal>
      </b-col>
    </b-row>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import vSelect from 'vue-select';
import NewComplementaryTicketModal from './modals/NewComplementaryTicketModal.vue';
import OrderModal from './modals/OrderModal.vue';
import IComplementaryTicket from '@/api/interface/IComplementaryTicket';
import BaseEventVue from '@/api/core/BaseEventVue';
import TicketInstanceDTO from '@/api/dto/TicketInstanceDTO';

@Component({
  components: {
    vSelect,
    NewComplementaryTicketModal,
    OrderModal,
  },
})
export default class ComplementaryTickets extends BaseEventVue {
  private filter: any = null;
  private dropdownFilter: any = { label: 'Ticket#', value: 'instanceId' };
  private eventId: string = '';
  private ticketItem: TicketInstanceDTO = new TicketInstanceDTO();
  private attendeeTicketsList: any[] = [];

  private ticketIDList: any[] = [
    { label: 'Ticket#', value: 'instanceId' },
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
    { label: 'Email', value: 'email' },
  ];

  private searchFilter: string = '';
  private index: any = null;
  private complementaryList: any[] = [];
  private complementaryFieldsList: any[] = [
    {
      key: 'instanceId',
      label: 'Ticket#',
    },
    {
      key: 'firstName',
      label: 'First Name',
    },
    {
      key: 'lastName',
      label: 'Last Name',
    },
    {
      key: 'email',
    },
    {
      key: 'ticketName',
      label: 'Ticket Type',
    },
    {
      key: 'action',
      label: 'Order',
    },
  ];

  private filterFunction(x, y) {
    return (this.dropdownFilter &&
              x[this.dropdownFilter.value].toLowerCase().includes(y.toLowerCase()))
              ? true : false;
  }

  private rowClickHandler(item, index, event) {
    this.index = index;
  }

  private addNewCompTicket() {
    this.loadComplimentaryTickets();
  }

  private handleOrderModal(item) {
    // tslint:disable-next-line: no-console
    console.log('handleOrderModal::' + JSON.stringify(item));
    this.ticketItem = Object.assign({}, { ...this.ticketItem, ...item });
    this.api.getOrderAttendees(item.orderId)
      .then((res) => {
        const comps = this.handleSuccessIgnoreError(res, 'data.eventOrder.ticketInstances');
        this.attendeeTicketsList = TicketInstanceDTO.fromModelToAttendeeList(comps);
      }).catch(this.handleFailure);
    this.$bvModal.show('order-modal');
  }

  private editCompItem(index, item) {
    // // tslint:disable-next-line: no-console
    // console.log('editCompItem::' + JSON.stringify(item));
    // this.complementaryList.splice(index, 1, item);
  }

  private created() {
    if (this.api === null) {
       return;
    }
    this.eventId = this.$route.params.eventId;
    this.loadComplimentaryTickets();
  }

  private loadComplimentaryTickets() {
    this.api.getComplimentaryTickets(this.eventId)
      .then((res) => {
        const comps = this.handleSuccessIgnoreError(res, 'data.event.ticketInstances');
        this.complementaryList = TicketInstanceDTO.fromModel(comps);
      }).catch(this.handleFailure);
  }
}
</script>

<style lang="scss" scoped>
.searchbox input {
  height: 32px;
}
</style>

<style lang="scss">
.complementary-tickets-search-field {
  .vs__clear {
    display: none;
  }

  .vs__dropdown-toggle {
    background-color: #f8f9fa !important;
    border-radius: 10px;
  }
}

.searchbox .icon {
  right: 10px !important;
  top: 5px !important;
}
</style>
