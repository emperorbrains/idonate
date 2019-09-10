import IQuestion from '@/api/interface/IQuestion';
import ITicket from '@/api/interface/ITicket';

export default interface ISurveyData {
  id: string;
  name: string;
  questionCount: number;
  ticket?: object;
}
