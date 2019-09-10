import ApiUtils from './ApiUtils';

export default class ExportUtils {

  public static promotions(type) {
    const ShowLabel: boolean = true;
    let array: any[] = [];
    if (type === 'Comp') {
      array = [];
    } else {
      array = [];
    }

    let CSV = '';

    if (ShowLabel) {
      let row = '';

      for (const index in array[0]) {
        if (array[0].hasOwnProperty(index)) {
          row += index + ',';
        }
      }

      row = row.slice(0, -1);
      CSV += row + '\r\n';
    }

    for (const i of array) {
      let row = '';

      for (const keys in i) {
        if (i.hasOwnProperty(keys)) {
          row += '"' + i[keys] + '",';
        }
      }

      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }

    if (CSV === '') {
      alert('Invalid data');
      return;
    }

    let fileName = '';
    if (type === 'Comp') {
      fileName = 'Complementary Tickets';
    } else {
      fileName = 'Promotional Codes';
    }

    fileName = fileName.replace(/ /g, '_');
    const uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    const link = document.createElement('a');
    link.href = uri;
    link.download = fileName + '.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
