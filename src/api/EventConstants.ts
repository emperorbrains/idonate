
export const STATUSES = [
  {
    text: 'Open',
    value: 'OPEN',
  },

  {
    text: 'Hidden',
    value: 'HIDDEN',
  },

  {
    text: 'Closed',
    value: 'CLOSED',
  },
];

export const SUBSCRIBER_INTERVALS = [
  {
    text: 'Daily',
    value: 'DAILY',
  },
  {
    text: 'Weekly',
    value: 'WEEKLY',
  },
  {
    text: 'Monthly',
    value: 'MONTHLY',
  },
];

export const SURVEY_QUESTION_TYPES = [
    {
      text: 'Textarea',
      value: 'TEXT',
    },
    {
      text: 'Fill in the blank',
      value: 'FILL_BLANKS',
    },
    {
      text: 'Multiple Choice',
      value: 'MULTIPLE_CHOICE',
    },
    {
      text: 'Multiple Choice Dropdown',
      value: 'MULTIPLE_CHOICE_DROPDOWN',
    },
    {
      text: 'Multiple Answers',
      value: 'MULTIPLE_ANSWER',
    },
  ];

export const SALES_DURATION_LIST = [
    {
      text: 'This Year',
      value: 'this-year',
    },
    {
      text: 'This Month',
      value: 'this-month',
    },
    {
      text: 'This Week',
      value: 'this-week',
    },
    {
      text: 'Custom',
      value: 'custom',
    },
  ];

export const ITEMS_PER_PAGE = [
  {
    text: '10',
    value: '10',
  },
  {
    text: '50',
    value: '50',
  },
  {
    text: '100',
    value: '100',
  },
  {
    text: '150',
    value: '150',
  },
  {
    text: '200',
    value: '200',
  },
];

export const DURATION_LIST = [
  {
    text: 'Last Year',
    value: 'last-year',
  },
  {
    text: 'Last Month',
    value: 'last-month',
  },
  {
    text: 'Last Week',
    value: 'last-week',
  },
  {
    text: 'Yesterday',
    value: 'yesterday',
  },
];

export const COMPANY_NAME_OPTIONS = [
  {
    label: 'Salutation',
    value: 'salutation',
  },
  {
    label: 'First Name',
    value: 'firstName',
  },
  {
    label: 'Last Name',
    value: 'lastName',
  },
  {
    label: 'Phone Number',
    value: 'phone',
  },
  {
    label: 'Email Address',
    value: 'email',
  },
  {
    label: 'Address 1',
    value: 'address1',
  },
  {
    label: 'Address 2',
    value: 'address2',
  },
  {
    label: 'City',
    value: 'city',
  },
  {
    label: 'State/Prov.',
    value: 'state',
  },
  {
    label: 'Country',
    value: 'country',
  },
  {
    label: 'Zip Code',
    value: 'zip',
  },
  {
    label: 'Company Name',
    value: 'companyName',
  },
];

export const SALES_CHART_OPTIONS = {
  legend: {
    fullWidth: true,
    labels: {
      fontColor: '#344349',
      fontFamily: 'Montserrat',
      fontSize: 13,
      usePointStyle: true,
      padding: 20,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    enabled: true,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          drawBorder: false,
        },
        barPercentage: 0.7,
      },
    ],
    yAxes: [
      {
        gridLines: {
          drawBorder: false,
          borderDash: [5, 5],
          color: '#BBBBBB',
        },
        ticks: {
          beginAtZero: true,
          padding: 15,
        },
      },
    ],
  },
};


// export const TICKET_DEFINITIONS = [
//   {
//   id: 1,
//   name: 'Advanced Child',
//   ownerDetails: {
//     firstName: '',
//     lastName: '',
//     email: '',
//   },
//   quantity: 5,
//   startSelling: new Date().toISOString(),
//   stopSelling: new Date().toISOString(),
//   promoCode: 'FREE AC',
//   promoCodeDiscountRate: 5,
//   price: '25.00',
//   showRemainingCount: true,
//   status: 'OPEN',
//   survey: {
//     id: 1,
//     name: 'Survey 1',
//     questions: [
//       {
//         answer: '',
//         isResponseRequired: false,
//         options: [
//           {
//             value: 'Hot Dog',
//           },

//           {
//             value: 'Hamburger',
//           },

//       {
//         answer: '',
//         isResponseRequired: true,
//         options: [],
//         title: 'Favorite Color ___',
//         type: 'fill-in-the-blank',
//       },
//     ],
//   },
// },

//           {
//             value: 'Pizza',
//           },
//         ],
//         title: 'Type of meal',
//         type: 'multiple-choice',
//       },

//       {
//         answer: '',
//         isResponseRequired: true,
//         options: [
//           {
//             value: 'S',
//           },

//           {
//             value: 'M',
//           },

//           {
//             value: 'L',
//           },
//         ],
//         title: 'T-Shirt Size',
//         type: 'multiple-choice',
//       },
//     ],
//   },
// },

//       {
//         answer: '',
//         isResponseRequired: true,
//         options: [],
//         title: 'Favorite Color ___',
//         type: 'fill-in-the-blank',
//       },
//     ],
//   },
// },
// {
//   id: 2,
//   name: 'Advanced Adult',
//   ownerDetails: {
//     firstName: '',
//     lastName: '',
//     email: '',
//   },
//   quantity: 5,
//   startSelling: new Date().toISOString(),
//   stopSelling: new Date().toISOString(),
//   promoCode: 'FREE AD',
//   promoCodeDiscountRate: 5,
//   price: '25.00',
//   showRemainingCount: false,
//   status: 'OPEN',
//   survey: {
//     id: 2,
//     name: 'Survey 2',
//     questions: [
//       {
//         answer: '',
//         isResponseRequired: false,
//         options: [
//           {
//             value: 'Hot Dog',
//           },

//           {
//             value: 'Hamburger',
//           },

//           {
//             value: 'Pizza',
//           },
//         ],
//         title: 'Type of meal',
//         type: 'multiple-answers',
//       },

//       {
//         answer: '',
//         isResponseRequired: true,
//         options: [],
//         title: 'Favorite Colour ___',
//         type: 'fill-in-the-blank',
//       },
//     ],
//   },
// },

// {
//   id: 3,
//   name: 'General Child',
//   ownerDetails: {
//     firstName: '',
//     lastName: '',
//     email: '',
//   },
//   quantity: 5,
//   startSelling: new Date().toISOString(),
//   stopSelling: new Date().toISOString(),
//   promoCode: 'FREE GC',
//   promoCodeDiscountRate: 5,
//   price: '35.00',
//   showRemainingCount: false,
//   status: 'OPEN',
//   survey: {
//     id: 3,
//     name: 'Survey 3',
//     questions: [
//       {
//         answer: '',
//         isResponseRequired: false,
//         options: [
//           {
//             value: 'Hot Dog',
//           },

//           {
//             value: 'Hamburger',
//           },

//           {
//             value: 'Pizza',
//           },
//         ],
//         title: 'Type of meal',
//         type: 'multiple-answers',
//       },

//       {
//         answer: '',
//         isResponseRequired: true,
//         options: [],
//         title: 'Favorite Colour ___',
//         type: 'fill-in-the-blank',
//       },
//     ],
//   },
// },

// {
//   id: 4,
//   name: 'General Adult',
//   ownerDetails: {
//     firstName: '',
//     lastName: '',
//     email: '',
//   },
//   quantity: 5,
//   startSelling: new Date().toISOString(),
//   stopSelling: new Date().toISOString(),
//   promoCode: 'FREE GA',
//   promoCodeDiscountRate: 5,
//   price: '25.00',
//   showRemainingCount: false,
//   status: 'OPEN',
//   survey: {
//     id: 4,
//     name: 'Survey 4',
//     questions: [
//       {
//         answer: '',
//         isResponseRequired: false,
//         options: [
//           {
//             value: 'Hot Dog',
//           },

//           {
//             value: 'Hamburger',
//           },

//           {
//             value: 'Pizza',
//           },
//         ],
//         title: 'Type of meal',
//         type: 'multiple-answers',
//       },

//       {
//         answer: '',
//         isResponseRequired: true,
//         options: [],
//         title: 'Write something about you',
//         type: 'textarea',
//       },
//     ],
//   },
// },
// ];
