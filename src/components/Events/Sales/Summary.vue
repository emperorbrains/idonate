<template>
  <div>
    <b-row>
      <b-col offset="4" md="4" class="text-center header-text text-uppercase mt-2">Sales Summary</b-col>
      <b-col md="4" class="text-right">
        <b-button variant="primary" class="download mr-3">
          <span class="text" @click="download">Download List</span><i class="fa fa-download" aria-hidden="true"></i>
        </b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-table
        table-class="event-sales-summary"
        :responsive="true"
        :items="saleList"
        :fields="saleListFields"
        thead-class="header"
        class="table-shadow summary_table remove-table-margin-bottom">
      </b-table>
    </b-row>
  </div>
</template>

<style lang="scss" scoped>
.download {
  background: #2080BF;
  border: 1px solid #2080BF;
  border-radius: 10px;
  box-sizing: border-box;

  .text {
    margin-right: 10px;
  }
}

.summary_table {
  margin: 30px 16px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { EventApi } from '@/api/EventApi';
import BaseVue from '@/api/core/BaseVue';
import XLSX from 'xlsx';

@Component
export default class SaleSummary extends BaseVue {
  private saleList: any[] = [];

  private saleListFields: any[] = [
    {
      key: 'name',
      label: 'Tickets',
      variant: 'secondary-light',
    },
    {
      key: 'quantity',
    },
    {
      key: 'price',
      label: 'Price',
      formatter: (value, key, item) => {
        return (value === null || value.length < 1)
                ? '' : '$' + value;
      },
    },
    {
      key: 'totalSalesCount',
      label: 'Sold',
    },
    {
      key: 'compCount',
      label: 'Comp',
    },
    {
      key: 'refundedCount',
      label: 'Refunded',
    },
    {
      key: 'totalSalesValue',
      label: 'Amount',
      formatter: (value, key, item) => {
        return '$' + value;
      },
    },
  ];

  public getSalesList() {
    this.api.getEventSalesReport(this.$route.params.eventId)
      .then((res: any) => {
          this.saleList = this.handleSuccessIgnoreError(res, 'data.event.salesReport.tickets');
          this.computeTotals();
      });
  }

  public download() {
    const sheet = XLSX.utils.json_to_sheet(this.saleList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, 'data');
    XLSX.writeFile(wb, 'summary.xlsx');
  }

  public computeTotals() {
    const compCountSum = this.saleList.reduce((a, c) => a + c.compCount, 0);
    const refundedCountSum = this.saleList.reduce((a, c) => a + c.refundedCount, 0);
    const totalSalesValueSum = this.saleList.reduce((a, c) => a + parseFloat(c.totalSalesValue), 0);
    const quantitySum = this.saleList.reduce((a, c) => a + c.quantity, 0);
    const totalSalesCountSum = this.saleList.reduce((a, c) => a + c.totalSalesCount, 0);
    this.saleList.push({
      name: 'TOTAL',
      quantity: quantitySum,
      price: '',
      totalSalesCount: totalSalesCountSum,
      compCount: compCountSum,
      refundedCount: refundedCountSum,
      totalSalesValue: totalSalesValueSum,
    });
  }

  private created() {
    this.getSalesList();
  }

}
</script>

<style lang="scss">
.event-sales-summary tbody tr:last-child td {
  border-top: 1px solid #000;
  font-weight: 600;
}
</style>
