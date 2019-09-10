<template>
  <div class="border p-4 rounded shadow full-height">
    <div class="sale-proceeds d-flex">
      <div class="flex-even text-center p-3">
        <h5 class="font-weight-semibold text-muted mb-3">Gross Proceeds</h5>
        <h3 class="font-weight-semibold text-primary">${{details.grossProceeds}}</h3>
      </div>

      <div class="flex-even text-center p-3">
        <h5 class="font-weight-semibold text-muted mb-3">Net Proceeds</h5>
        <h3 class="font-weight-semibold text-primary">${{details.netProceeds}}</h3>
      </div>
    </div>

    <div class="sale-attendees">
      <h5 class="font-weight-semibold text-center text-muted mb-2">Attendees</h5>

      <div class="d-flex align-items-center justify-content-between">
        <div class="text-center">
          <h4 class="font-weight-semibold text-muted">{{details.regularAttendeeCount}}</h4>
          <p class="mb-0">Regular</p>
        </div>

        <div class="text-center attendees-sum">
          <div class="circle"></div>

          <div class="total-wrapper">
            <h3 class="font-weight-semibold text-primary">{{details.compAttendeeCount + details.regularAttendeeCount}}</h3>
            <p class="label mb-0">TOTAL</p>
          </div>
        </div>

        <div class="text-center">
          <h4 class="font-weight-semibold text-muted">{{details.compAttendeeCount}}</h4>
          <p class="mb-0">Comp</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseVue from '@/api/core/BaseVue';

@Component
export default class Process extends BaseVue {
  private details = [];

  private created() {
    this.getEventSalesReport();
  }

  private getEventSalesReport() {
    this.api.getEventSalesReport(this.$route.params.eventId)
      .then((res: any) => this.details = this.handleSuccessIgnoreError(res, 'data.event.salesReport.overview'));
  }

}
</script>

<style lang="scss" scoped>
.sale-proceeds {
  margin-bottom: 75px;

  & > div:first-child {
    border-right: 1px solid #CCC;
  }
}
.sale-attendees{
  margin-top: 130px;
}
.full-height {
  height: 100%;
}

.attendees-sum {
  position: relative;
  max-width: 150px;
  width: 100%;

  .circle {
    border: 8px solid #44A0EA;
    border-bottom: 8px dashed #FFF;
    border-radius: 50%;
    height: 150px;
    margin: 0 auto;
    width: 150px;
  }

  .total-wrapper {
    position: absolute;
    left: 35px;
    top: 46px;

    .label {
      border: 2px solid #506883;
      border-radius: 50px;
      font-weight: 600;
      margin-top: 40px;
      padding: 2px 15px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .sale-proceeds {
    margin-bottom: 60px;
  }
  .sale-attendees{
    margin-top: 0px;
  }
}
</style>
