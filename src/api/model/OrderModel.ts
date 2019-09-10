import AddressUtils from '@/api/util/AddressUtils';
import IEventOrderTransaction from '@/api/interface/gms/IEventOrderTransaction';

export default class OrderModel {

  public id: string = '';
  public created: Date | string = '';
  public method: string = '';
  public status: string = '';
  public totalAmount?: number | string = '';
  public purchaser?: any = {
    firstName: '',
    lastName: '',
    email: '',
    address: AddressUtils.newAddress(),
  };
  public ticketInstances?: any = {};
  public transaction?: IEventOrderTransaction;
}

