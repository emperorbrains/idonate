export default interface IQuestion {
  answer?: string;
  id?: string;
  isResponseRequired: boolean;
  choices: string[];
  question: string;
  questionType: string;
}
