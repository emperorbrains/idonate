export default class TicketInstanceModel {

  public id: string = '';

  // public ticketDefinitionId: string = '';
  public orderId: string = '';
  // public quantity: number = 0;
  public grossProceeds: number = 0;
  public netProceeds: number = 0;
  public promoCode: any = {
    id: '',
    code: '',
    discountFlat: '',
    discountPercent: '',
  };
  public attendee: any = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    salutation: '',
    phone: '',
    street: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
  };
  public ticketDefinition: any = {
    id: '',
    name: '',
    price: null,
    description: '',
  };
}
