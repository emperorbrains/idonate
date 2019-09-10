import moment from 'moment';
import PromoCodeModel from '@/api/model/PromoCodeModel';
import ApiUtils from '@/api/util/ApiUtils';
import DateUtils from '@/api/util/DateUtils';
import TypeUtils from '@/api/util/TypeUtils';

export default class PromoCodeDTO {

  public static fromModel(objs: PromoCodeModel[]) {
    const data: PromoCodeDTO[] = [];
    for (const obj of objs) {
      const price = TypeUtils.toFloatPath(obj, 'ticketDefinition.price');
      const datum: PromoCodeDTO = {
        id: obj.id,
        promoStartDate: '', promoStartTime: {},
        promoEndDate: '', promoEndTime: {},
        code: obj.code, quantity: obj.quantity,
        usedCount: obj.usedCount, status: obj.status,
        appliesTo: TypeUtils.toStringPath(obj, 'ticketDefinition.name', 'N/A'),
        oldPrice: price,
        newPrice: price - TypeUtils.toFloat(obj.discountFlat),
        limit: obj.quantity === null,
        immediately: obj.promoStart === null,
        eventDate: obj.promoEnd === null,
        discountFlat: obj.discountFlat,
        discountPercent: +obj.discountPercent * 100,
      };
      data.push(datum);
    }
    return data;
  }

  public static toModel(obj: PromoCodeDTO, id: boolean = false) {
    console.log(JSON.stringify(obj));
    const data: any = {
        code: obj.code,
        quantity: obj.limit ? null : TypeUtils.toInt(obj.quantity),
        promoStart: obj.immediately ? null : DateUtils.toDate(obj.promoStartDate, obj.promoStartTime.dateTime),
        promoEnd: obj.immediately ? null : DateUtils.toDate(obj.promoEndDate, obj.promoEndTime.dateTime),
        discountPercent: +obj.discountPercent / 100,
        discountFlat: obj.discountFlat,

        // NO!
        //appliesTo: obj.appliesTo,
    };
    if (id) { data.id = obj.id; }
    if (!id) { data.status = 'PAUSED'; }
    return data;
  }


  public discountPercent: number | string = '';
  public discountFlat: number | string = '';
  public id: string = '';

  // Currently used for pricing
  public oldPrice: number | string = 0;
  public newPrice: number | string = 0;

  public promoStartDate: string = '';
  public promoStartTime: any = {
    dateTime: moment().format(),
    timezone: '',
  };
  public promoEndDate: string = '';
  public promoEndTime: any = {
    dateTime: moment().format(),
    timezone: '',
  };

  public appliesTo: string = '';
  public code: string = '';
  public quantity: number | string = '';
  public limit: boolean = false;
  public immediately: boolean = false;
  public eventDate: boolean = false;
  public usedCount: number | string = '';
  public status: string = 'PAUSED';
}
