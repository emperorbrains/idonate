import ISponsor from '@/api/interface/ISponsor';

export default interface ITier {
  name: string;
  sponsors: ISponsor[];
}
