export default class TicketDefinitionModel {

  public id: string = '';
  public name: string = '';
  public status: string = '';
  public description: string | null = null;
  public price: number | string | null = null;
  public fairMarketValue: number | string | null = null;
  public quantity: number | null = null;
  public limitMaximum: number | null = null;
  public ticketStart: Date | null = null;
  public ticketEnd: Date | null = null;
  public showRemainingQuantity: boolean = true;
  public promoCode: object | null = {
    id: '',
    code: '',
  };
  public survey: object | null = {
    surveyId: '',
    name: '',
  };
}




/*
{
  id: 1,
  name: 'Advanced Child',
  ownerDetails: {
    firstName: '',
    lastName: '',
    email: '',
  },
  quantity: 5,
  startSelling: new Date().toISOString(),
  stopSelling: new Date().toISOString(),
  promoCode: 'FREE AC',
  promoCodeDiscountRate: 5,
  price: '25.00',
  showRemainingCount: true,
  status: 'OPEN',
  survey: {
    id: 1,
    name: 'Survey 1',
    questions: [
      {
        answer: '',
        isResponseRequired: false,
        options: [
          {
            value: 'Hot Dog',
          },

          {
            value: 'Hamburger',
          },

          {
            value: 'Pizza',
          },
        ],
        title: 'Type of meal',
        type: 'multiple-choice',
      },

      {
        answer: '',
        isResponseRequired: true,
        options: [
          {
            value: 'S',
          },

          {
            value: 'M',
          },

          {
            value: 'L',
          },
        ],
        title: 'T-Shirt Size',
        type: 'multiple-choice',
      },
    ],
  },
}
*/
