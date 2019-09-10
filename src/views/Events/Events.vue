<template>
  <div>
    <div class="px-5 pt-5 pb-3">
      <div class="row">
        <div class="col-md">
          <h2 class="font-weight-bold mb-0 text-primary text-uppercase">Events</h2>
        </div>

        <div class="col-md align-middle d-inline-block text-right">
          <a href="#" class="btn btn-outline-primary btn-standard mr-3 rounded-pill text-uppercase" v-b-modal.event-help-modal>Event Help</a>

          <router-link
            class="btn btn-primary btn-standard rounded-pill text-uppercase"
            :to="{ name: 'new-event' }"
          >New Event</router-link>
        </div>
      </div>
    </div>

    <div class="px-5 pt-3 pb-0">
      <div class="row">
        <div class="col-md-8">
          <div class="rounded graph p-3">
            <div class="row mb-4">
              <div class="col-md-4 d-flex align-items-center">
                <span class="font-weight-semibold">Sales Overview</span>
              </div>

              <div class="col-md">
                <div class="d-flex align-items-center flex-wrap">
                  <div
                    class="flex-even btn-sales-overview-filter input-with-icon icon-right border mr-2 pl-3"
                    :class="{ 'is-disabled':  salesReportDuration !== 'custom'}"
                  >
                    <date-picker-component
                      id="sales-from-date"
                      inputPlaceholder="From Date"
                      v-model="fromDate"
                      v-if="salesReportDuration === 'custom'"
                    />
                    <input type="text" class="form-control border-0 pl-0" placeholder="From Date" disabled v-else>

                    <span class="icon">
                      <img src="@/assets/icons/calender.svg">
                    </span>
                  </div>

                  <div
                    class="flex-even btn-sales-overview-filter input-with-icon icon-right border mr-2 pl-3"
                    :class="{ 'is-disabled':  salesReportDuration !== 'custom'}"
                  >
                    <date-picker-component
                      id="sales-to-date"
                      inputPlaceholder="To Date"
                      :disableUpTo="fromDate"
                      v-model="toDate"
                      v-if="salesReportDuration === 'custom'"
                    />
                    <input type="text" class="form-control border-0 pl-0" placeholder="To Date" disabled v-else>

                    <span class="icon">
                      <img src="@/assets/icons/calender.svg">
                    </span>
                  </div>

                  <div class="flex-even btn-sales-overview-filter border">
                    <select-component
                      class="border-0 rounded-0"
                      :options="salesReportDurationList"
                      v-model="salesReportDuration"
                      required
                    ></select-component>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <event-sales-report-overview-chart-component
                  class="sales-report-overview-chart"
                  :datasets="filteredSalesReportDatasets"
                  :labels="gLables"
                ></event-sales-report-overview-chart-component>
              </div>
            </div>
          </div>

          <div class="p-3">
            <p class="mb-0">Note: Data displayed here is for {{formattedFromDate}} to {{formattedToDate}} for both Active &amp; Archived events</p>
          </div>
        </div>

        <div class="col-md">
          <div class="mb-3 p-3 rounded total-revenue">
            <span class="font-weight-semibold">Total Revenue</span>
            <h1 class="my-5 text-center text-success" v-text="totalRevenue"></h1>
          </div>

          <div class="p-3 rounded total-attendees">
            <span class="font-weight-semibold">Total Attendees</span>
            <h1 class="my-5 text-center text-success" v-text="totalAttendees"></h1>
          </div>
        </div>
      </div>
    </div>

    <div class="px-5 py-3">
      <div class="row mb-4">
        <div class="col-md-3 mb-3"></div>

        <div class="col-md-6 d-flex align-items-center justify-content-center mb-3">
          <div class="btn-group border rounded-pill">
            <b-button
              :class="[ showEventWithStatus === 'ACTIVE' ? 'btn-primary' : '' ]"
              class="btn-report-status text-uppercase"
              variant="white"
              @click="() => showEventWithStatus = 'ACTIVE'"
            >Active</b-button>

            <b-button
              :class="[ showEventWithStatus === 'DRAFT' ? 'btn-primary' : '' ]"
              class="btn-report-status text-uppercase"
              variant="white"
              @click="() => showEventWithStatus = 'DRAFT'"
            >Drafts</b-button>

            <b-button
              :class="[ showEventWithStatus === 'ARCHIVE' ? 'btn-primary' : '' ]"
              class="btn-report-status text-uppercase"
              variant="white"
              @click="() => showEventWithStatus = 'ARCHIVE'"
            >Archived</b-button>
          </div>
        </div>

        <div class="col-md-3 mb-3 text-right">
          <div class="searchbox input-with-icon icon-right">
            <input type="text" class="form-control bg-light" placeholder="Search" v-model="filter">
            <span class="icon text-muted">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <events-list-component
            class="mb-4 table-standard"
            :events="filteredEventsWithStatus"
            :filter="filter"
            :currentPage="currentEventPage"
            :perPage="showEventsPerPage"
            @copy-event="copyEvent"
            @delete-event="deleteEvent"
          ></events-list-component>

          <div class="row">
            <div class="col-md d-flex align-items-center">
              <span class="mr-2">Show</span>

              <select-component
                class="select-per-page"
                :options="showEventsPerPageList"
                v-model="showEventsPerPage"
              ></select-component>

              <span class="ml-2">per page</span>
            </div>

            <div class="col-md">
              <b-pagination
                class="paginate-events"
                :total-rows="filteredEventsWithStatus.length"
                :per-page="showEventsPerPage"
                v-model="currentEventPage"
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

    <event-help-modal-component id="event-help-modal"></event-help-modal-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { cloneDeep } from 'lodash';
import { EventApi } from '@/api/EventApi';
import IEvent from '@/api/interface/IEvent';
import moment from 'moment';

import DatePickerComponent from '@/components/FormElements/DatePickerComponent.vue';
import EventHelpModalComponent from '@/components/Events/EventHelpModalComponent.vue';
import EventsListComponent from '@/components/Events/EventsListComponent.vue';
import EventSalesReportOverviewChartComponent from '@/components/Events/EventSalesReportOverviewChartComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';
import BaseEventVue from '@/api/core/BaseEventVue';
import * as EventConstants from '@/api/EventConstants';
import ApiUtils from '@/api/util/ApiUtils';
import FormatUtils from '@/api/util/FormatUtils';

type EventStatus = 'ACTIVE' | 'DRAFT' | 'ARCHIVED';

@Component({
  components: {
    DatePickerComponent,
    EventHelpModalComponent,
    EventsListComponent,
    EventSalesReportOverviewChartComponent,
    SelectComponent,
  },
})
export default class Events extends BaseEventVue {
  private buttonActive: number = 1;
  private fromDate: string = moment().subtract(1, 'year').format();
  private toDate: string = moment().format();
  private salesReportDuration: string = 'this-year';
  private salesReportDatasets: any = [];
  private salesRevenue: string = '$1,540,239';
  private eventsAttendees: string = '12,125';
  private attendeesThisYear: string = '+185';
  private showEventWithStatus: string = 'ACTIVE';
  private eventsList: IEvent[] = [];
  private currentEventPage: number = 1;
  private showEventsPerPage: string = '10';
  private currentPage: number = 1;
  private filter: string = '';
  private totalRevenue = '0';
  private totalAttendees = '0';
  private graphLabels: any = [];
  private salesReportDurationList = EventConstants.SALES_DURATION_LIST;
  private showEventsPerPageList = EventConstants.ITEMS_PER_PAGE;

  get formattedFromDate() {
    return moment(this.fromDate).format('MM/DD/YYYY');
  }

  get formattedToDate() {
    return moment(this.toDate).format('MM/DD/YYYY');
  }

  get gLables() {
    return this.graphLabels;
  }

  get filteredSalesReportDatasets() {
    this.toDate = moment().format();
    const dataset = this.salesReportDatasets;

    if (this.salesReportDuration.length < 1) {
      // Sort the dataset based on fromDate and toDate.
    } else {
      if (this.salesReportDuration === 'this-year') {
        this.fromDate = moment().subtract(1, 'year').format();
        // Sort based on this year.
      } else if (this.salesReportDuration === 'this-month') {
        this.fromDate = moment().subtract(1, 'month').format();
        // Sort based on this month.
      } else if (this.salesReportDuration === 'this-week') {
        this.fromDate = moment().subtract(1, 'week').format();
        // Sort based on this week.
      } else if (this.salesReportDuration === 'custom') {
        // Sort based on custom.
        // Do nothing. Use values chosen
      }
    }
    // this.getEventList();
    return dataset;
  }

  get filteredEventsWithStatus() {
    return this.eventsList.filter((event) => event.status === this.showEventWithStatus);
  }

  private copyEvent(event) {
    if (this.api === null) {
       return;
    }
    this.api.copyEvent(this.$store.getters.organizationId, event.id, 'Copy of ' + event.name, event.name + 'copy')
        .then(this.getEventList())
        .catch(this.handleFailure);
  }

  private deleteEvent(event) {
    if (this.api === null) {
       return;
     }
    this.api.deleteEvent(event.id)
      .then(this.getEventList())
      .catch(this.handleFailure);
  }

  @Watch('salesReportDuration')
  private monitorSalesReportDuration(data: any) {
    const updateFromAndToFields = this.filteredSalesReportDatasets; // IMPORTANT
    this.getEventList();
  }

  private getEventList() {
    console.log('getEventList');
    if (this.api === null) {
       return;
    }
    try {
      this.api.getDashboardEvents(this.$store.getters.organizationId, moment(this.fromDate).format('YYYY-MM-DD'), moment(this.toDate).format('YYYY-MM-DD'))
      .then((res: any) => {
        this.eventsList = res.data.eventsDashboard.events;
        const { graph, attendeeCount, revenue } = res.data.eventsDashboard.salesOverview;
        const { labels, complimentaryData, refundedData, totalSalesData } = graph;

        this.totalRevenue = revenue;
        this.totalAttendees = attendeeCount;
        this.graphLabels = labels;

        const Complimentary = {
          label: 'Complimentary',
          backgroundColor: '#50E3C2',
          data: complimentaryData,
        };

        const Refunded = {
          label: 'Refunded',
          backgroundColor: '#F5A623',
          data: refundedData,
        };

        const TotalSales = {
          label: 'Total Sales',
          backgroundColor: '#03BD5B',
          data: totalSalesData,
        };

        const emptyArray: any[] = [];
        this.salesReportDatasets = emptyArray.concat([ Complimentary, Refunded, TotalSales ]);
      });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log('error', error);
    }
  }

  private receiveMessage(event) {
    const json = JSON.stringify(event.data);
    if (json.includes('organizationId') && !json.includes('vue-devtools-backend')) {
      console.log('event.data', JSON.stringify(event.data));
      ApiUtils.storeFrameInfo(this.$store, event.data);  // store payload

      this.api = new EventApi(this.$store.getters.baseUrl, this.$store.getters.sessionKey);
      this.getEventList();
      this.loadOrganization();
    }
  }

  private created() {
    window.addEventListener('message', this.receiveMessage);

    if (parent) {
      parent.postMessage(JSON.stringify({
      source: 'events-ui',
      status: 'ready'}), '*');
    }
    if (this.api !== null) {
      this.loadOrganization();
      this.getEventList();
    }
  }


}
</script>

<style lang="scss" scoped>
.btn {
  letter-spacing: 0.15em;
}

.btn-report-status {
  border-radius: 50px !important;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.15em;
}

.btn-sales-overview-filter {
  border-radius: 10px !important;

  select {
    height: 37px;
  }
}

.graph {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 100%;
  max-height: 405px;
}

.is-disabled {
  background-color: #e9ecef;
}

.searchbox {
  input {
    border-radius: 10px !important;
  }

  .icon {
    top: 8px;
  }
}

.total-revenue,
.total-attendees {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

@media only screen and (min-width: 768px) {
  .sales-report-overview-chart {
    max-height: 305px;
  }
}
</style>
