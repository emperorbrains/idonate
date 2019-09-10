import OrderModel from '../model/OrderModel';
import ApiUtils from '@/api/util/ApiUtils';
import AddressUtils from '@/api/util/AddressUtils';
import TypeUtils from '@/api/util/TypeUtils';
import FormatUtils from '@/api/util/FormatUtils';
import IAddress from '@/api/interface/IAddress';
import moment from 'moment';

export default class OrderDTO {

  public static fromModel(objs: OrderModel[]) {
    const data: OrderDTO[] = [];
    for (const obj of objs) {
      const datum: OrderDTO = {
        orderId: FormatUtils.formatId(obj.id), id: obj.id,
        created: moment(obj.created).format('lll'),
        firstName: ApiUtils.getValue(obj, 'purchaser.firstName'),
        lastName: ApiUtils.getValue(obj, 'purchaser.lastName'),
        email: ApiUtils.getValue(obj, 'purchaser.email'),
        address: AddressUtils.getAddress(ApiUtils.getValue(obj, 'purchaser.address')),
        method: obj.method,
        totalAmount: TypeUtils.toFloat(obj.totalAmount),
      };
      data.push(datum);
    }
    return data;
  }

  public static fromModelAsTransaction(obj: OrderModel) {
    return {
        orderId: obj.id,
        status: TypeUtils.toStringPath(obj, 'transaction.status'),
        processedAt: TypeUtils.toStringPath(obj, 'transaction.processedAt'),
        ticketSales: TypeUtils.toFloatPath(obj, 'transaction.ticketSales'),
        netProceeds: TypeUtils.toFloatPath(obj, 'transaction.netProceeds'),
        grossProceeds: TypeUtils.toFloatPath(obj, 'transaction.grossProceeds'),
    };
  }

  public static toOrderPurchaser(obj: OrderDTO) {
    return {
        firstName: obj.firstName, lastName: obj.lastName,
        email: obj.email,
        address: AddressUtils.getAddress(ApiUtils.getValue(obj, 'purchaser.address')),
    };
  }




  public id: string = '';
  public orderId: string = '';
  public created: Date | string = '';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public method: string = '';
  public totalAmount: number | string = '';
  public address: IAddress = AddressUtils.newAddress();

}
