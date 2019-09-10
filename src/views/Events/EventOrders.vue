<template>
  <div>
    <div id="main" class="site-content">
      <div class="row no-gutters">
        <div class="col-md">
          <div>
            <event-header-component></event-header-component>

            <div class="px-4 px-md-5 py-4 py-md-5">
              <event-tabs-component class="mb-5"></event-tabs-component>

              <div class="border overflow-hidden p-4 rounded-standard shadow-standard">
                <b-row class="mb-3">
                  <b-col>
                    <div class="d-flex align-items-center">
                      <div class="w-100 mr-3">
                        <v-select
                          class="orders-list-search-field"
                          :options="options"
                          @input="changeOption"
                          v-model="selectedOption"
                          placeholder="Orders #"
                        />
                      </div>

                      <div class="searchbox input-with-icon icon-right">
                        <input type="text" class="form-control bg-light rounded-standard-semi" placeholder="Search" v-model="filter" @input="filterOrders">
                        <span class="icon text-muted">
                          <i class="fas fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </b-col>

                  <b-col md="4">
                    <h3 class="font-weight-semibold text-center text-primary">ORDERS LIST</h3>
                  </b-col>

                  <b-col class="text-right">
                    <b-button
                      id="tooltip-button-2"
                      class="font-weight-semibold mr-3 rounded-standard-semi"
                      variant="primary"
                      @click="() => exportToExcel()"
                    >
                      Download List
                      <img
                        class="ml-2"
                        src="@/assets/icons/download.svg"
                        height="22px"
                        width="24px"
                      />
                    </b-button>
                  </b-col>
                </b-row>

                <div class="row">
                  <div class="col">
                    <event-orders-list-component
                      class="mb-4 table-standard"
                      :orders="filteredOrders"
                      :currentPage="currentOrderPage"
                      :perPage="showOrdersPerPage"
                      :updateOrder="updateOrder"
                    ></event-orders-list-component>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md d-flex align-items-center">
                    <span class="mr-2">Show</span>

                    <select-component
                      class="select-per-page"
                      :options="showOrdersPerPageList"
                      v-model="showOrdersPerPage"
                    ></select-component>

                    <span class="ml-2">per page</span>
                  </div>

                  <div class="col-md">
                    <b-pagination
                      :total-rows="filteredOrders.length"
                      :per-page="showOrdersPerPage"
                      v-model="currentOrderPage"
                      prev-text="<"
                      next-text=">"
                      align="center"
                      hide-goto-end-buttons
                    />
                  </div>

                  <div class="col-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { startCase, startsWith } from 'lodash';
import vSelect from 'vue-select';

import { EventApi } from '@/api/EventApi';
import EventHeaderComponent from '@/components/Events/EventHeaderComponent.vue';
import EventTabsComponent from '@/components/Events/EventTabsComponent.vue';
import EventOrdersListComponent from '@/components/Events/Orders/EventOrdersListComponent.vue';
import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import * as EventConstants from '@/api/EventConstants';
import BaseEventVue from '@/api/core/BaseEventVue';
import OrderDTO from '@/api/dto/OrderDTO';

@Component({
  components: {
    EventHeaderComponent,
    EventOrdersListComponent,
    EventTabsComponent,
    SelectComponent,
    vSelect,
  },
})
export default class EventOrders extends BaseEventVue {
  private ordersList: any = [];
  private showOrdersPerPageList = EventConstants.ITEMS_PER_PAGE;
  private options = [
    {
      label: 'Order #',
      value: 'orderId',
    },
    {
      label: 'First Name',
      value: 'firstName',
    },
    {
      label: 'Last Name',
      value: 'lastName',
    },
    {
      label: 'Email',
      value: 'email',
    },
  ];
  private selectedOption: any = this.options[0];
  private currentOrderPage: number = 1;
  private showOrdersPerPage: string = '10';
  private currentPage: number = 1;
  private filter: string = '';
  private filteredOrders = this.ordersList;

  private created() {
    // Important. Next line is used to determine routing [Don't remove]
    this.event.id = this.$route.params.eventId;
    this.getOrdersList();
  }

  private getOrdersList() {
    this.api.getOrdersList(this.$route.params.eventId)
      .then((res: any) => {
          const info = this.handleSuccessIgnoreError(res, 'data.event.orders');
          const evt = this.handleSuccessIgnoreError(res, 'data.event');
          this.ordersList = OrderDTO.fromModel(info);
          this.storeEvent(evt);
          this.filteredOrders = this.ordersList;
      });
  }

  private filterOrders() {
    const selectedOption = this.selectedOption.value;
    const searchText = this.filter.trim().toLowerCase();

    this.filteredOrders = this.ordersList.filter((order) => {
      return startsWith(order[selectedOption].toLowerCase(), searchText);
    });
  }

  private changeOption() {
    this.filter = '';
    this.filteredOrders = this.ordersList;
  }

  private updateOrder(updatedOrder) {
    this.filteredOrders = this.filteredOrders.map((order) => {
      if (updatedOrder.id === order.id) {
        order = updatedOrder;
      }

      return order;
    });
  }

  private exportToExcel() {
    const arrData = this.filteredOrders;
    let CSV = '';
    let row = '';

    for (const index of Object.keys(arrData[0])) {
      row += startCase(index) + ',';
    }

    row = row.slice(0, -1);
    CSV += row + '\r\n';

    for (const elem of arrData) {
      let innerRow = '';

      for (const index of Object.keys(elem)) {
        innerRow += '"' + elem[index] + '",';
      }

      innerRow.slice(0, innerRow.length - 1);
      CSV += innerRow + '\r\n';
    }

    const fileName = 'OrderList';
    const uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    const link = document.createElement('a');

    link.href = uri;
    link.download = fileName + '.csv';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }
}
</script>

<style lang="scss" scoped>
.searchbox input {
  height: 32px;
}

.searchbox .icon {
  right: 10px !important;
  top: 5px !important;
}
</style>

<style lang="scss">
.orders-list-search-field {
  .vs__clear {
    display: none;
  }

  .vs__dropdown-toggle {
    background-color: #f8f9fa !important;
    border-radius: 10px;
  }
}
</style>
