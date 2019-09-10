export default class IQuestionData {
  public id?: string = '';
  public choices: string[] = [];
  public question: string = '';
  public questionType: string = '';
  public isResponseRequired: boolean = false;
}
