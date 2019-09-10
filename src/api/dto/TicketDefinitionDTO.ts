import TicketDefinitionModel from '@/api/model/TicketDefinitionModel';
import ApiUtils from '@/api/util/ApiUtils';
import TypeUtils from '@/api/util/TypeUtils';
import moment from 'moment';

export default class TicketDefinitionDTO {

  public static toList(objs: TicketDefinitionModel[], openOnly: boolean) {
    const data: any[] = [];
    for (const obj of objs) {
      if (openOnly) {
        if ('OPEN' === obj.status) {
          data.push({ text: obj.name, value: obj.id });
        }
      } else {
        data.push({ text: obj.name, value: obj.id });
      }
    }
    return data;
  }

  public static toOptionsList(objs: TicketDefinitionModel[], openOnly: boolean, includePrice: boolean = false) {
    const data: any[] = [];
    for (const obj of objs) {
      if (openOnly) {
        if ('OPEN' === obj.status) {
          data.push(includePrice
                    ? { label: obj.name, code: obj.id, price: obj.price }
                    : { label: obj.name, code: obj.id });
        }
      } else {
        data.push(includePrice
          ? { label: obj.name, code: obj.id, price: obj.price }
          : { label: obj.name, code: obj.id });
      }
    }
    return data;
  }


  public static fromModelToDisplayList(objs: TicketDefinitionModel[]) {
    const data: TicketDefinitionDTO[] = [];
    for (const obj of objs) {
      const price = TypeUtils.toFloatPath(obj, 'ticketDefinition.price');
      const datum: any = {
        id: obj.id, name: obj.name, status: obj.status,
        promoCode: ApiUtils.getValue(obj, 'promoCode'),
        quantity: obj.quantity === null ? 'unlimited' : obj.quantity,
        ticketStart: obj.ticketStart === null ? moment() : obj.ticketStart,
        ticketEnd: obj.ticketEnd === null ? null : obj.ticketEnd,
      };
      data.push(datum);
    }
    return data;
  }

  public static fromModel(obj: TicketDefinitionModel) {
    const data: TicketDefinitionDTO = {
      id: obj.id, name: obj.name, status: obj.status,
      showRemainingQuantity: obj.showRemainingQuantity,
      quantity: obj.quantity === null ? 'unlimited' : String(obj.quantity),
      description: ApiUtils.nullToEmpty(obj.description),
      surveyId: ApiUtils.getValue(obj, 'survey.surveyId'),
      promoCodeId: ApiUtils.getValue(obj, 'promoCode.id'),
      limitMaximum: obj.limitMaximum,
      ticketPrice: { price: obj.price, fairMarketValue: obj.fairMarketValue },
      isImmediate: obj.ticketStart === null,
      isEventDate: obj.ticketEnd === null,
      isPriceFree: obj.price === null,
      ticketStart: obj.ticketStart === null ? {} : { dateTime: obj.ticketStart, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
      ticketEnd: obj.ticketEnd === null ? {} : { dateTime: obj.ticketEnd, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    };
    return data;
  }

  public static toModel(obj: TicketDefinitionDTO, id: boolean = false) {
    const data: any = {
      name: obj.name,
      status: obj.status,
      description: obj.description,
      showRemainingQuantity: obj.showRemainingQuantity,
      // FILTERED
      quantity: obj.quantity === 'unlimited' ? null : obj.quantity,
      price: obj.isPriceFree ? null : TypeUtils.toFloat(obj.ticketPrice.price),
      fairMarketValue: obj.isPriceFree ? null : TypeUtils.toFloat(obj.ticketPrice.fairMarketValue),
      promoCodeId: TypeUtils.isUUID(String(obj.promoCodeId)) ? obj.promoCodeId : null,
      ticketStart: obj.isImmediate ? null : obj.ticketStart.dateTime,
      ticketEnd: obj.isEventDate ? null : obj.ticketEnd.dateTime,
      // MISSING API
      // surveyId: TypeUtils.isUUID(String(obj.surveyId)) ? obj.surveyId : null,
    };
    if (id) { data.id = obj.id; }
    return data;
  }

  public static toModelAttribute(attribute: string, val: string) {
    switch (attribute) {
      case 'quantity': return {
                          quantity: val === 'unlimited' || !ApiUtils.hasValue(val) ? null : val,
                        };
      case 'ticketStart': return { ticketStart: ApiUtils.hasValue(val) ? val : null };
      case 'ticketEnd': return { ticketEnd: ApiUtils.hasValue(val) ? val : null };
      case 'status': return ApiUtils.hasValue(val) ?  { status: val} : null;
      case 'promoCode': return { promoCodeId: TypeUtils.isUUID(val) ? val : null };
    }
    return null;
  }

  public static toModelPromoCode(promoId: string) {
    return { promoCodeId: TypeUtils.isUUID(promoId) ? promoId : null };
  }

  public id: string = '';
  public name: string = '';
  public status: string = '';
  public description: string = '';
  public quantity: string | null = null;
  public limitMaximum: number | null = null;
  public ticketStart: any = {};
  public ticketEnd: any = {};
  public showRemainingQuantity: boolean = true;
  public promoCodeId: string | null = null;
  public surveyId: string | null = null;
  public ticketPrice: any = {
    price: '',
    fairMarketValue: '',
  };

  // Extension
  public isPriceFree: boolean = false;
  public isImmediate: boolean = false;
  public isEventDate: boolean = false;
}

