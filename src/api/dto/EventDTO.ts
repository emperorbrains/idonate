import moment from 'moment';

import IEventLocation from '@/api/interface/IEventLocation';
import IEventDuration from '@/api/interface/IEventDuration';
import ITax from '@/api/interface/ITax';
import ApiUtils from '@/api/util/ApiUtils';
import EventModel from '@/api/model/EventModel';
import TicketDefinitionModel from '@/api/model/TicketDefinitionModel';
import DateUtils from '@/api/util/DateUtils';
import TypeUtils from '@/api/util/TypeUtils';

export default class EventDTO {

  public static toCore(obj: any) {
    return {
      id: obj.id,
      name:  obj.name,
      lastConfigurationStep: obj.lastConfigurationStep,
      eventStart: obj.eventStart,
      status: obj.status,
      p2pProgramPending: TypeUtils.toStringPath(obj, 'p2pProgramPending'),
    };
  }

  public static toBasic(obj: EventModel) {
    if (obj.venueAddress === null) {
      obj.venueAddress = {};
    }
    console.log('obj.eventStart', obj.eventStart);
    const eventDuration = DateUtils.toDuration(obj.eventStart, obj.eventEnd);
    return {
      id:  obj.id, name:  obj.name, slug: obj.slug,
      campaignId: obj.campaignId, p2pProgramId: obj.p2pProgramId,
      lastConfigurationStep: obj.lastConfigurationStep,
      location: {
        venue: obj.venueName, street: obj.venueAddress.street,
        street2: obj.venueAddress.street2, city: obj.venueAddress.city,
        state: obj.venueAddress.state, country: obj.venueAddress.country,
        zip: obj.venueAddress.zip,
      },
      duration: eventDuration,
    };
  }

  public static toAdditional(obj: EventModel) {
    return {
      id:  obj.id, webUrl:  obj.webUrl, summary: ApiUtils.nullToEmpty(obj.summary),
      terms: ApiUtils.nullToEmpty(obj.terms),
      posterUrl: obj.posterUrl, posterMode: obj.posterMode,
      description: TypeUtils.toString(obj.description, ''),
      embedId: obj.embedId,
    };
  }

  public static toDesign(obj: EventModel) {
    return {
      id: obj.id, buttonText: obj.buttonText, footerBgColor: obj.footerBgColor,
      buttonBgColor: obj.buttonBgColor, buttonTextColor: obj.buttonTextColor,
      coverImageUrl: obj.coverImageUrl, footerLogoImageUrl: obj.footerLogoImageUrl,
      mainLogoImageUrl: obj.mainLogoImageUrl,
    };
  }

  public static toEmbed(obj: EventModel) {
    if (obj === null || obj.ticketEmbedSettings === null ) {
      return new EventDTO().ticketEmbed;
    }
    return {
      theme: obj.ticketEmbedSettings.theme,
      showEventImage:  obj.ticketEmbedSettings.showEventImage,
      showEventLocation: obj.ticketEmbedSettings.showEventLocation,
      showEventDescription: obj.ticketEmbedSettings.showEventDescription,
      showEventTime:  obj.ticketEmbedSettings.showEventTime,
      buttonSize: obj.ticketEmbedSettings.buttonSize,
      buttonBgColor: obj.ticketEmbedSettings.buttonBgColor,
      buttonText: obj.ticketEmbedSettings.buttonText,
      buttonTextColor: obj.ticketEmbedSettings.buttonTextColor,
    };
  }

  public static toOrderEmail(obj: EventModel) {
    return {
      id: obj.id, name: obj.name,
      receiptLogoImageUrl: obj.receiptLogoImageUrl,
      receiptContent: ApiUtils.nullToEmpty(obj.receiptContent),
      receiptSubject: ApiUtils.nullToEmpty(obj.receiptSubject),
    };
  }

  public static toSponsor(obj: EventModel) {
    return {
      id: obj.id, sponsorTier1Name: ApiUtils.nullToEmpty(obj.sponsorTier1Name),
      sponsorTier2Name: ApiUtils.nullToEmpty(obj.sponsorTier2Name),
      sponsorTier3Name: ApiUtils.nullToEmpty(obj.sponsorTier3Name),
    };
  }

  public static toSettings(obj: EventModel) {
    return {
      id: obj.id, cartTimeoutSeconds: String(obj.cartTimeoutSeconds),
      hostEmail: obj.hostEmail, hostName: obj.hostName,
      tax: { taxRate: String(100 * obj.taxRate), taxNumber: obj.taxNumber },
      enableBuyerClaimAll: obj.enableBuyerClaimAll, capacity: String(obj.capacity),
      enablePublicGuestList: obj.enablePublicGuestList,
      sendTicketsWithConfirmationEmail: obj.sendTicketsWithConfirmationEmail,
      status: obj.status,
      guestDetailsSettings: this.toGuestDetails(obj.guestDetailsSettings),
    };
  }

  public static fromModelToGuestDetails(obj: any) {
    console.log('fromModelToGuestDetails', JSON.stringify(obj));
    if (obj === null) { return {}; }
    const items: any = [];
    for (const x of obj) {
      items.push(x.value);
    }
    console.log('fromModelToGuestDetails', JSON.stringify(items));
    const data: any = {};
    data.salutation = items.includes('salutation');
    data.firstName = items.includes('firstName');
    data.lastName = items.includes('lastName');
    data.phone = items.includes('phone');
    data.email = items.includes('email');
    data.address1 = items.includes('address1');
    data.address2 = items.includes('address2');
    data.city = items.includes('city');
    data.state = items.includes('state');
    data.zip = items.includes('zip');
    data.companyName = items.includes('companyName');
    return data;
  }

  private static toGuestDetails(obj: any) {
    console.log('toGuestDetails', JSON.stringify(obj));
    if (obj === null) { return []; }
    const data: string[] = [];
    if (obj.salutation) { data.push('Salutation'); }
    if (obj.firstName) { data.push('First Name'); }
    if (obj.lastName) { data.push('Last Name'); }
    if (obj.phone) { data.push('Phone'); }
    if (obj.email) { data.push('Email Address'); }
    if (obj.address1) { data.push('Address 1'); }
    if (obj.address2) { data.push('Address 2'); }
    if (obj.city) { data.push('City'); }
    if (obj.state) { data.push('State'); }
    if (obj.zip) { data.push('Zip'); }
    if (obj.companyName) { data.push('Company Name'); }
    console.log('data', JSON.stringify(data));
    return data;
  }

  public id: string = '';

  // BASIC
  public name: string = '';
  public slug: string = '';
  public campaignId: string = '';
  public p2pProgramId: string = '';
  public dateAsTicketDate: boolean = false;
  public duration: IEventDuration = DateUtils.newDuration();

  public location: IEventLocation = {
    venue: '',
    street: '',
    street2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  };

// Additional details
  public summary: string = '';
  public description: string = '';
  public embedId: string = '';
  public webUrl: string = '';
  public terms: string = '';
  public posterUrl: string = '';
  public posterMode: string = 'HIDDEN';

// Design
  public footerBgColor: string = '';
  public buttonBgColor: string = '#0C15A3';
  public buttonText: string = 'Get Tickets';
  public buttonTextColor: string = '#DDF5FF';

 // Embed
  public ticketEmbed: any = {
     theme: 'light',
     showEventImage:  false,
     showEventLocation: false,
     showEventDescription: false,
     showEventTime:  false,
     buttonSize: 'small',
     buttonBgColor: '#0C15A3',
     buttonText: 'Buy now',
     buttonTextColor: '#DDF5FF',
  };

 // Order
 public receiptLogoImageUrl: string = '';
 public receiptSubject: string = '';
 public receiptContent: string = '';

 // Sponsor
 public sponsorTier1Name: string = '';
 public sponsorTier2Name: string = '';
 public sponsorTier3Name: string = '';


 // Settings
 public cartTimeoutSeconds: string = '600';
 public enableBuyerClaimAll: boolean = false;
 public capacity: string = '1';
 public hostEmail: string = '';
 public hostName: string = '';
 public sendTicketsWithConfirmationEmail: boolean = true;
 public tax: ITax = {
   taxRate: '',
   taxNumber: '',
 };
 public enablePublicGuestList: boolean = false;
 public guestDetailsSettings: any[] = [];

 public type: string = 'tickets';
 public status: string = 'DRAFT';

 // Methods
 get locationMinusVenue() {
    const loc = this.location;
    return (!loc) ? {} : { street: loc.street, street2: loc.street2,
       zip: loc.zip, city: loc.city,
       state: ApiUtils.getValue(loc, 'state.code'),
       country: ApiUtils.getValue(loc, 'country.code'),
    };
  }
}


