import ApiUtils from './ApiUtils';
import TypeUtils from './TypeUtils';
import IAddress from '@/api/interface/IAddress';
import IVueSelect from '@/api/interface/IVueSelect';

export default class AddressUtils {

  public static getRegions(countryCode: string = 'US'): IVueSelect[] {
    const regions: any = this.countryRegionData.filter((obj) => obj.countryShortCode === countryCode)[0].regions;
    const options: any = [];
    for (const region of regions) {
        options.push({code: region.shortCode, label: region.name});
    }
    return options;
  }

  public static getCountries(): any[] {
    const options: any = [];
    for (const country of this.countryRegionData) {
      options.push({value: country.countryShortCode, text: country.countryName});
    }
    return options;
  }

  public static newAddress(): IAddress {
    return {
      street: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    };
  }

  public static getAddress(obj: any): IAddress {
    if (!ApiUtils.hasValue(obj)) {
      return AddressUtils.newAddress();
    }
    const data: IAddress = {
      street: TypeUtils.toStringPath(obj, 'street', ''),
      street2: TypeUtils.toStringPath(obj, 'street2', ''),
      city: TypeUtils.toStringPath(obj, 'city', ''),
      state: TypeUtils.toStringPath(obj, 'state', ''),
      zip: TypeUtils.toStringPath(obj, 'zip', ''),
      country: TypeUtils.toStringPath(obj, 'country', ''),
    };
    return data;
  }

  public static toString(street, street2, city, state, zip, country): string {
    let data: string = TypeUtils.toString(street);
    data += (ApiUtils.hasValue(street2)) ? ', ' + TypeUtils.toString(street2) : '';
    data += (ApiUtils.hasValue(city)) ? ', ' + TypeUtils.toString(city) : '';
    data += (ApiUtils.hasValue(state)) ? ', ' + TypeUtils.toString(state) : '';
    data += (ApiUtils.hasValue(zip)) ? ' ' + TypeUtils.toString(zip) : '';
    data += (ApiUtils.hasValue(country)) ? ' ' + TypeUtils.toString(country) : '';
    return data;
  }

  private static countryRegionData = require('country-region-data');

}
