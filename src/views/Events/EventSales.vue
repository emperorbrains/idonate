<template>
  <div>
    <div id="main" class="site-content">
      <div class="row no-gutters">
        <div class="col-md">
          <div>
            <event-header-component :event="event"></event-header-component>
            <div class="px-4 px-md-5 py-4 py-md-5">
              <event-tabs-component class="mb-5"></event-tabs-component>
              <div class="border overflow-hidden p-4 rounded-standard shadow-standard">
                <b-row>
                  <b-col md="7" class="graph">
                    <b-card class="rounded shadow-sm full-height p-3 m-0 shadow">
                      <b-card-body class="p-0">
                        <div class="sales-chart-wrap">
                          <bar
                            ref="chart"
                            :height="width > 760 ? 220 : 500"
                            :chartdata="chartData"
                            chart-id="sales-chart"
                            :options="chartOptions"
                          />
                        </div>
                      </b-card-body>
                    </b-card>
                  </b-col>
                  <b-col md="5">
                    <sale-process/>
                  </b-col>
                </b-row>
                <hr>
                <sales-summary/>
                <hr>
                <sales-breakdown/>
                <hr class="mt-4 mb-2">
                <sale-report-subscribers
                  :subscribers="subscribers"
                  :deleteSubscriber="deleteSubscriberShow"
                  :showEditSubscriber="showEditSubscriber"
                />
                <new-subscriber
                  id="new-subscriber"
                  :edit="updateSubscriber"
                  :init="updateSubscriberBuffer"
                  @refresh="refreshSubscriber"
                />
                <delete-modal id="delete-subscriber" @submit="deleteSubscriber"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import moment from 'moment';
import BaseEventVue from '@/api/core/BaseEventVue';
import Bar from '@/components/Charts/BarChart.vue';
import DeleteModal from '@/components/Events/Sales/DeleteModal.vue';
import EventHeaderComponent from '@/components/Events/EventHeaderComponent.vue';
import EventTabsComponent from '@/components/Events/EventTabsComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import SalesReportDTO from '@/api/dto/SalesReportDTO';
import EventDTO from '@/api/dto/EventDTO';
import * as EventConstants from '@/api/EventConstants';
import NewSubscriber from '@/components/Events/Sales/CreateSubscriber.vue';
import SalesBreakdown from '@/components/Events/Sales/Breakdown.vue';
import SaleProcess from '@/components/Events/Sales/Process.vue';
import SaleReportSubscribers from '@/components/Events/Sales/Subcribers.vue';
import SalesSummary from '@/components/Events/Sales/Summary.vue';

@Component({
  components: {
    Bar,
    DeleteModal,
    EventHeaderComponent,
    EventTabsComponent,
    NewSubscriber,
    SalesBreakdown,
    SaleProcess,
    SaleReportSubscribers,
    SalesSummary,
  },
})
export default class EventSales extends BaseEventVue {
  public event: EventDTO = new EventDTO();
  private width: number = 1200;
  private subscribers: any[] = [];
  private chartData = {};
  private chartOptions = EventConstants.SALES_CHART_OPTIONS;
  private updateSubscriber: boolean = false;
  private deleteSubscriberIdx: number = -1; // index of subscriber to delete
  private updateSubscriberBuffer: any = {};

  public getsSubscribersList() {
    if (this.api === null) {
      return;
    }
    this.api
      .getEventSalesReport(this.$route.params.eventId)
      .then((res: any) => {
        const results = this.handleSuccessIgnoreError(
          res,
          'data.event.emailSubscribers',
        );
        this.subscribers = results;
      });
  }

  public mounted() {
    window.onresize = () => {
      this.width = window.innerWidth;
    };
  }

  public created() {
    // Important. Next line is used to determine routing [Don't remove]
    this.event.id = this.$route.params.eventId;

    this.api.getEventSalesReport(this.$route.params.eventId)
      .then((res: any) => {
          const info = this.handleSuccessIgnoreError(res, 'data.event.salesReport.tickets');
          const evt = this.handleSuccessIgnoreError(res, 'data.event');
          this.chartData = SalesReportDTO.toChartData(info);
          this.storeEvent(evt);
      });
    this.getsSubscribersList();
  }

  private showEditSubscriber(idx: number) {
    this.$bvModal.show('new-subscriber');
    this.updateSubscriber = true;
    const doc = this.subscribers[idx];
    this.updateSubscriberBuffer = {
      index: idx,
      ...doc,
      interval: doc.interval,
    };
  }

  private refreshSubscriber(subscriber) {
    this.getsSubscribersList();
    this.updateSubscriber = false;
  }


  private deleteSubscriberShow(idx: number) {
    if (idx >= 0) {
      this.deleteSubscriberIdx = idx;
      this.$bvModal.show('delete-subscriber');
    }
  }
  private deleteSubscriber() {
    if (this.api === null) {
      return;
    }
    const email = this.subscribers[this.deleteSubscriberIdx].email;
    this.api.deleteEmailSubscriber(this.$route.params.eventId, email)
      .then(this.getsSubscribersList())
      .catch(this.handleFailure);
  }
}
</script>
<style lang="scss" scoped>
.full-height {
  height: 100%;
}
</style>