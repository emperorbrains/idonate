import ApiUtils from '@/api/util/ApiUtils';
import SponsorModel from '@/api/model/SponsorModel';
import ITier from '@/api/interface/ITier';

export default class SponsorDTO {

  public static fromModel(obj: SponsorModel): ITier[]  {
    return [
        { name: obj.sponsorTier1Name,
          sponsors: SponsorDTO.fromTier(obj.sponsorTier1Name, obj.sponsorTiers) },
        { name: obj.sponsorTier2Name,
            sponsors: SponsorDTO.fromTier(obj.sponsorTier2Name, obj.sponsorTiers) },
        { name: obj.sponsorTier3Name,
            sponsors: SponsorDTO.fromTier(obj.sponsorTier3Name, obj.sponsorTiers) },
      ];
  }

  private static fromTier(tierName: string, objs: any) {
    if (!ApiUtils.hasValue(tierName) || objs === null) {
      return [];
    }
    for (const obj of objs) {
        if (obj.name === tierName) {
          return obj.sponsors;
        }
    }
    return [];
  }


}
