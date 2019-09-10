import AddressUtils from '@/api/util/AddressUtils';
import TypeUtils from '@/api/util/TypeUtils';
import ISelect from '@/api/interface/ISelect';
import IVueSelect from '@/api/interface/IVueSelect';
import OrganizationModel from '@/api/model/OrganizationModel';

export default class OrganizationDTO {

  public static fromModel(obj: OrganizationModel): OrganizationDTO {
    const data: OrganizationDTO = new OrganizationDTO();
    data.name = obj.name;
    data.status = obj.status;
    data.countries = OrganizationDTO.fromModelToIVueSelect(obj.supportedCountries, 'id', 'text');
    data.p2pPrograms = OrganizationDTO.fromModelToISelect(obj.p2pPrograms, 'id', 'name');
    data.campaigns = OrganizationDTO.fromModelToISelect(obj.campaigns, 'id', 'title');
    data.embeds = OrganizationDTO.fromModelToISelect(obj.embeds, 'id', 'name');
    data.p2pPrograms.unshift({ text: 'Create Peer2Peer', value: 'create-peer-2-peer' });
    return data;
  }

  private static fromModelToISelect(objs: any, code: string, display: string): ISelect[] {
    const data: ISelect[] = [];
    for (const obj of objs) {
      data.push({
        text: TypeUtils.toStringPath(obj, display),
        value: TypeUtils.toStringPath(obj, code) });
    }
    return data;
  }

  private static fromModelToIVueSelect(objs: any, code: string, display: string): IVueSelect[] {
    const data: IVueSelect[] = [];
    for (const obj of objs) {
      data.push({
        label: TypeUtils.toStringPath(obj, display),
        code: TypeUtils.toStringPath(obj, code) });
    }
    return data;
  }

  public name: string = '';
  public status: string = '';
  public p2pPrograms: ISelect[] = [];
  public countries: IVueSelect[] = [];
  public campaigns: ISelect[] = [];
  public embeds: ISelect[] = [];
}
