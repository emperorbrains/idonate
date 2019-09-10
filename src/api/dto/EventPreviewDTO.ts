import moment from 'moment';

import IEventLocation from '@/api/interface/IEventLocation';
import IEventDuration from '@/api/interface/IEventDuration';
import ITax from '@/api/interface/ITax';
import ApiUtils from '@/api/util/ApiUtils';
import TypeUtils from '@/api/util/TypeUtils';
import EventModel from '@/api/model/EventModel';
import TicketDefinitionModel from '@/api/model/TicketDefinitionModel';
import AddressUtils from '../util/AddressUtils';

export default class EventDTO {

  public static toPreview(obj: EventModel, tickets: TicketDefinitionModel[]) {
    let prices: number[] = [];
    const addressString = !ApiUtils.hasValue(obj.venueAddress) ? '' :
    AddressUtils.toString(obj.venueAddress.street, obj.venueAddress.street2, obj.venueAddress.city,
      obj.venueAddress.state, obj.venueAddress.zip, obj.venueAddress.country);

    for (const ticket of tickets) {
      prices.push(TypeUtils.toInt(ticket.price));
    }
    prices = prices.sort((a, b) =>  a - b);
    return {
      id: obj.id, status: obj.status,
      name: obj.name, venueName: obj.venueName,
      address: addressString,
      eventDate: moment(obj.eventStart).format('ddd, MMM D h:mm A'),
      posterUrl: obj.posterUrl,
      posterMode: obj.posterMode,
      coverImageUrl: obj.coverImageUrl,
      footerLogoImageUrl: obj.footerLogoImageUrl,
      mainLogoImageUrl: obj.mainLogoImageUrl,
      terms: ApiUtils.nullToEmpty(obj.terms),
      description: ApiUtils.nullToEmpty(obj.description),
      summary: ApiUtils.nullToEmpty(obj.summary),
      buttonTextColor: obj.buttonTextColor,
      footerBgColor: obj.footerBgColor,
      buttonText: obj.buttonText,
      buttonBgColor: obj.buttonBgColor,
      min: prices[0], max: prices[prices.length - 1],
    };
  }

}


