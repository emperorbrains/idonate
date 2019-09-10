import AddressUtils from '@/api/util/AddressUtils';
import IEventOrderTransaction from '@/api/interface/gms/IEventOrderTransaction';

export default class OrganizationModel {

  public name: string = '';
  public status: string = '';
  public p2pPrograms = {
    id: '',
    name: '' };
  public supportedCountries = {
      id: '',
      text: '' };
  public campaigns = {
    id: '',
    title: '' };
  public embeds = {
    id: '',
    name: '' };
}
