export default class PromoCodeModel {

  public id: string = '';
  public code: string = '';
  public quantity: number | string = '';
  public discountPercent: number | string = '';
  public discountFlat: number | string = '';
  public promoStart: string = '';
  public promoEnd: string = '';
  public status: string = 'PAUSED';
  public ticketDefinition: any = {
    id: '',
    name: '',
  };
  public usedCount: number | string = '';
}




