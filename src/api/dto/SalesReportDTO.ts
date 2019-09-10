import moment from 'moment';
import SalesReportModel from '../model/SalesReportModel';

export default class SalesReportDTO {

  public static toChartData(objs: SalesReportModel[]) {
    const labelData: any = [];
    const totalData: any[] = [];
    const refundedData: any[] = [];
    const compData: any[] = [];
    for (const obj of objs) {
      labelData.push(obj.name);
      totalData.push(obj.totalSalesValue);
      refundedData.push(obj.refundedValue);
      compData.push(obj.compCount);
    }
    // return {
    //   labelData: labels, totalData: totals,
    //   refundedData: refundeds, compData: comps,
    // };

    return {
      labels: labelData,
      datasets: [
        {
          label: 'Total Sales', backgroundColor: '#50E3C2', data: totalData,
        },
        {
          label: 'Refunded', backgroundColor: '#F5A623', data: refundedData,
        },
        {
          label: 'Complimentary', backgroundColor: '#03BD5B', data: compData,
        },
      ],
    };
  }

}
