import moment from 'moment';
import PromoCodeModel from '../model/PromoCodeModel';
import ApiUtils from '@/api/util/ApiUtils';
import TicketInstanceModel from '../model/TicketInstanceModel';
import AddressUtils from '@/api/util/AddressUtils';
import TypeUtils from '@/api/util/TypeUtils';
import FormatUtils from '../util/FormatUtils';

export default class TicketInstanceDTO {

  public static fromModel(objs: TicketInstanceModel[]) {
    const data: TicketInstanceDTO[] = [];
    for (const obj of objs) {
      const datum: TicketInstanceDTO = {
        id: obj.id, instanceId: FormatUtils.formatId(obj.id),
        ticketName: obj.ticketDefinition.name,
        firstName: obj.attendee.firstName, lastName: obj.attendee.lastName,
        email: obj.attendee.email, company: obj.attendee.company, orderId: obj.orderId,
        ticketDefinitionId: obj.ticketDefinition.id,
        ticketPrice: obj.ticketDefinition.price,
        grossProceeds: TypeUtils.toFloat(obj.grossProceeds),
        netProceeds: TypeUtils.toFloat(obj.netProceeds),
        quantity: 1,
        // Stubs
        details: { },
        salutation:  TypeUtils.toStringPath(obj.attendee, 'salutation'),
        phone: TypeUtils.toStringPath(obj.attendee, 'phone'),
        address: AddressUtils.toString(obj.attendee.street, obj.attendee.street2,
          obj.attendee.city, obj.attendee.state, obj.attendee.zip, ''),
        _showDetails: false,
      };
      data.push(datum);
    }
    return data;
  }

  public static fromModelToAttendeeList(objs: TicketInstanceModel[]) {
    const data: any[] = [];
    for (const obj of objs) {
      const datum = {
        id: obj.id, ticketId: FormatUtils.formatId(obj.id),
        ticketName: obj.ticketDefinition.name,
        firstName: obj.attendee.firstName, lastName: obj.attendee.lastName,
        email: obj.attendee.email, orderId: obj.orderId,
        quantity: '0', ticketDefinitionId: obj.ticketDefinition.id,
        ticketPrice: obj.ticketDefinition.price,
        grossProceeds: TypeUtils.toFloat(obj.grossProceeds),
        netProceeds: TypeUtils.toFloat(obj.netProceeds),
        editedAttendee: { firstName: obj.attendee.firstName,
          lastName: obj.attendee.lastName,
          email: obj.attendee.email, company: obj.attendee.company },
        // Stubs
        details: { },
        _showDetails: false,
      };
      data.push(datum);
    }
    return data;
  }

  public static toCompTicketModel(obj: TicketInstanceDTO, id: boolean = false) {
    const data: any = {
        attendee: { firstName: obj.firstName,
          lastName: obj.lastName, email: obj.email,
        },
        ticketDefinitionId: obj.ticketDefinitionId,
        quantity: obj.quantity,   // This is very important
    };
    if (id) { data.id = obj.id; }
    return data;
  }


  public static toModel(obj: TicketInstanceDTO, id: boolean = false) {
    const data: any = {
        attendee: { firstName: obj.firstName,
          lastName: obj.lastName, email: obj.email,
        },
        ticketDefinitionId: obj.ticketDefinitionId,
        quantity: obj.quantity,
    };
    if (id) { data.id = obj.id; }
    return data;
  }

  public id: string = '';
  public instanceId = '';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public company: string = '';
  public ticketName: string = '';
  public ticketPrice: string = '';
  public orderId: string = '';
  public quantity: string | number = '';   // IMPORTANT. Used in comp ticket flow
  public ticketDefinitionId: string = '';
  public grossProceeds: number = 0;
  public netProceeds: number = 0;

  public salutation: string = '';
  public phone: string = '';
  public address: string = '';

  public details = {
  // Used on Guestlist

  };

  // tslint:disable-next-line: variable-name
  public _showDetails: boolean = false;
}



/*
    {
      salutation: 'Salutation',
      contact: '9998887776',
      address: 'Address',
      company: 'Company',
      _showDetails: false,
      details: [
        {
          que: 'Enter Note',
          ans: this.notes,
          type: 'textarea',
        },
        {
          que: 'Type of meal',
          ans: this.selected,
          type: 'radio',
        },
        {
          que: 'T-shirt size',
          ans: this.dropdown,
          type: 'dropdown',
        },
        {
          que: 'Bike Type',
          ans: this.checked,
          type: 'checkbox',
        },
      ],
    },
*/
