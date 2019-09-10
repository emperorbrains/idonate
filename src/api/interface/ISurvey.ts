import IQuestion from '@/api/interface/IQuestion';
import ITicket from '@/api/interface/ITicket';

export default interface ISurvey {
  id?: number;
  name: string;
  questions: IQuestion[];
  ticket?: ITicket;
}
