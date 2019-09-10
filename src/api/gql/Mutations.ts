import { gql } from 'apollo-boost';
import { DocumentNode } from 'graphql';


// ****************************************
// CREATE
// ****************************************

export const CREATE_COMP_TICKET = gql`
  mutation ($id: UUID!, $compTicket: CreateCompTicketInput) {
    event(id: $id) {
      createCompTicket(compTicket: $compTicket) {
        errors order { id totalAmount method }
  } } }`;

export const COPY_EVENT = gql`
  mutation ($organizationId: UUID!, $eventId: UUID!, $name: String!, $slug: String!) {
    organization(id: $organizationId) {
      copyEvent(id: $eventId, name: $name, slug: $slug) {
        errors event { id status }
      }
    }
  }`;

export const CREATE_EVENT = gql`
  mutation ($id: UUID!, $event: CreateEventInput!) {
    organization(id: $id) {
      createEvent(event: $event) {
        errors event { id status }
      }
    }
  }`;

export const CREATE_TICKET_DEFINITION = gql`
  mutation ($id: UUID!, $ticket: CreateTicketDefinitionInput!) {
    event(id: $id) {
      createTicketDefinition(ticketDefinition: $ticket) {
        errors
        ticketDefinition { id status }
      }
    }
  }`;

export const CREATE_SURVEY = gql`
  mutation ($id: UUID!, $name: String!) {
    event(id: $id) {
      createSurvey(eventSurvey: {name: $name }) {
        errors
        survey { id name }
      }
    }
  }`;

export const ADD_EMAIL_SUBSCRIBER = gql`
  mutation ($id: UUID!, $subscriber: EventEmailSubscriberInput!) {
    event(id: $id) {
      addEmailSubscriber(subscriber: $subscriber) {
        errors subscriber { email interval }
      }
    }
  }`;

export const UPDATE_EMAIL_SUBSCRIBER = gql`
  mutation ($id: UUID!, $email: String!, $subscriber: EventEmailSubscriberInput!) {
    event(id: $id) {
      updateEmailSubscriber(email: $email, subscriber: $subscriber) {
        errors subscriber { email interval }
      }
    }
  }`;

export const CREATE_PROMO_CODE = gql`
  mutation ($id: UUID!, $promoCode: CreatePromoCodeInput) {
    event(id: $id) {
      createPromoCode(promoCode: $promoCode) {
        errors promoCode { id }
      }
    }
  }`;

export const CREATE_SPONSOR = gql`
  mutation ($id: UUID!, $sponsor: CreateEventSponsorInput!) {
    event(id: $id) {
      createSponsor(sponsor: $sponsor ) {
        errors sponsor { id }
      }
    }
  }`;


export const UPDATE_SPONSOR = gql`
  mutation ($id: UUID!, $sponsorId: UUID!, $sponsor: UpdateEventSponsorInput!) {
    event(id: $id) {
      updateSponsor(id: $sponsorId, sponsor: $sponsor ) {
        errors
      }
    }
  }`;

export const CREATE_SURVEY_QUESTION = gql`
  mutation ($id: UUID!, $surveyId: UUID!, $question: SurveyQuestionInput!) {
    event(id: $id) {
      createSurveyQuestion(eventSurveyId: $surveyId, surveyQuestion: $question) {
        errors question { id } }
    }
  }`;

// ****************************************
// UPDATE
// ****************************************

export const UPDATE_EVENT_STEP = gql`
  mutation ($id: UUID!, $step: Int) {
    event(id: $id) {
      update(event: {lastConfigurationStep: $step}) {
        errors }
    }
  }`;

export const UPDATE_EVENT = gql`
  mutation ($id: UUID!, $event: EventInput!) {
    event(id: $id) {
      update(event: $event) {
        errors event { id status }
      }
    }
  }`;

export const UPDATE_SURVEY_QUESTION = gql`
  mutation ($id: UUID!, $surveyQuestionId: UUID!, $question: SurveyQuestionInput!) {
    event(id: $id) {
      updateSurveyQuestion(id: $surveyQuestionId, surveyQuestion: $question) {
        errors question { id } }
    }
  }`;

export const UPDATE_SURVEY = gql`
  mutation ($id: UUID!, $surveyId: UUID!, $survey: EventSurveyInput!) {
    event(id: $id) {
      updateSurvey(eventSurvey: $survey, id: $surveyId) {
        errors
        survey { id name }
      }
    }
  }`;

export const UPDATE_PROMO_CODE = gql`
  mutation ($id: UUID!, $promoCodeId: UUID!, $promoCode: PromoCodeInput) {
    event(id: $id) {
      updatePromoCode(id: $promoCodeId, promoCode: $promoCode) {
        errors }
    }
  }`;

export const UPDATE_TICKET_DEFINITION = gql`
  mutation ($id: UUID!, $ticketId:  UUID!, $ticket: TicketDefinitionInput!) {
    event(id: $id) {
      updateTicketDefinition(id: $ticketId, ticketDefinition: $ticket) {
        errors
        ticketDefinition { id status }
      }
    }
  }`;

export const UPDATE_EMAIL_SUBCRIBER = gql`
  mutation ($id: UUID!, $email: String, $subscriber: EventEmailSubscriberInput!) {
    event(id: $id) {
      updateEmailSubscriber(subscriber: $subscriber) {
        errors subscriber { email interval }
      }
    }
  }`;

export const UPDATE_ORDER_ATTENDEE = gql`
  mutation ($id: UUID!, $attendee: EventAttendeeContactInput!, $orderId: UUID!, $ticketInstanceId: UUID!) {
    event(id: $id) {
      updateOrderAttendee(attendee:$attendee, orderId: $orderId, ticketInstanceId: $ticketInstanceId) {
        errors }
    }
  }`;

export const UPDATE_ORDER_PURCHASER = gql`
 mutation ($id: UUID!, $orderId: UUID!, $purchaser: EventPurchaserContactInput!) {
    event(id: $id) {
      updateOrderPurchaser(orderId: $orderId, purchaser: $purchaser) {
        errors }
    }
  }`;

// ****************************************
// DELETE
// ****************************************

export const DELETE_EMAIL_SUBSCRIBER = gql`
  mutation ($id: UUID!, $email: String!) {
    event(id: $id) {
      deleteEmailSubscriber(email: $email) {
        errors }
    }
  }`;

export const DELETE_EVENT = gql`
  mutation ($id: UUID!) {
    event(id: $id) {
      delete { errors }
    }
  }`;

export const DELETE_TICKET_DEFINITION = gql`
  mutation ($id: UUID!, $ticketId: UUID!) {
    event(id: $id) {
      deleteTicketDefinition(id: $ticketId)
        {
        errors
      }
    }
  }`;

export const DELETE_SPONSOR = gql`
  mutation ($eventId: UUID!, $sponsorId: UUID!) {
    event(id: $eventId) {
      deleteSponsor(id: $sponsorId) { errors }
    }
  }`;

export const DELETE_SURVEY = gql`
  mutation ($id: UUID!, $surveyId: UUID!) {
    event(id: $id) {
      deleteSurvey(id: $surveyId) { errors }
    }
  }`;

export const DELETE_PROMO_CODE = gql`
  mutation ($id: UUID!, $promoCodeId: UUID!) {
    event(id: $id) {
      deletePromoCode(id: $promoCodeId) { errors }
    }
  }`;

export const DELETE_SURVEY_QUESTION = gql`
  mutation ($id: UUID!, $surveyQuestionId: UUID!) {
    event(id: $id) {
      deleteSurveyQuestion(id: $surveyQuestionId) { errors }
    }
  }`;

// export const UPDATE_ORDER_PURCHASER = gql`
//   mutation ($id: UUID!, $orderId: UUID!, $purchaser: EventPurchaserContactInput!) {
//     event(id: $id) {
//       updateOrderPurchaser(orderId: $orderId, purchaser:$purchaser) { errors }
//     }
//   }`;

// export const UPDATE_ORDER_ATTENDEE = gql`
//   mutation ($id: UUID!, $orderId: UUID!, $ticketInstanceId: UUID!, $attendee: EventAttendeeContactInput!) {
//     event(id: $id) {
//       updateOrderAttendee(attendee: attendee, orderId: $orderId, ticketInstanceId: $ticketInstanceId) {
//         errors }
//     }
//   }`;

// ****************************************
// ACTIONS
// ****************************************

export const ARCHIVE_EVENT = gql`
  mutation ($id: UUID!) {
    event(id: $id) {
      archive { errors }
    }
  }`;

export const PUBLISH_EVENT = gql`
  mutation ($id: UUID!) {
    event(id: $id) {
      publish { errors }
    }
  }`;

export const SEND_EMAIL = gql`
  mutation ($id: UUID!, $emailUpdate: EmailUpdateInput) {
    event(id: $id) {
      sendEmailUpdate(emailUpdate: $emailUpdate) {
        errors }
    }
  }`;

export const SEND_EMAIL_TEST = gql`
  mutation ($id: UUID!, $emailUpdate: EmailUpdateInput) {
    event(id: $id) {
      sendEmailUpdateTest(emailUpdate: $emailUpdate) {
        errors }
    }
  }`;

export const REFUND_ORDER = gql`
    mutation ($id: UUID!, $orderId: UUID!) {
      event(id: $id) {
        refundOrder(orderId: $orderId) { errors }
      }
    }`;

export const SEND_ORDER_CONFIRMATION = gql`
    mutation ($id: UUID!, $orderId: UUID!) {
      event(id: $id) {
        sendOrderConfirmation(orderId: $orderId) { errors }
      }
    }`;

export const SEND_ORDER_CONFIRMATION_TEST = gql`
    mutation ($id: UUID!) {
      event(id: $id) {
        sendOrderConfirmationTest { errors }
      }
    }`;

// ****************************************
// UPLOADS
// ****************************************

export const UPLOAD_EVENT_COVER = gql`
  mutation ($id: UUID!, $file: Upload) {
    event(id: $id) {
      update(event: { coverImage: $file}) { errors }
    }
  }`;

export const UPLOAD_EVENT_EMAILLOGO = gql`
  mutation ($id: UUID!, $file: Upload) {
    event(id: $id) {
      update(event: { emailLogoImage: $file}) { errors }
    }
  }`;

export const UPLOAD_EVENT_FOOTERLOGO = gql`
  mutation ($id: UUID!, $file: Upload) {
    event(id: $id) {
      update(event: { footerLogoImage: $file}) { errors }
    }
  }`;

export const UPLOAD_EVENT_MAINLOGO = gql`
  mutation ($id: UUID!, $file: Upload) {
    event(id: $id) {
      update(event: { mainLogoImage: $file}) { errors }
    }
  }`;

export const UPLOAD_EVENT_RECEIPTLOGO = gql`
  mutation ($id: UUID!, $file: Upload) {
    event(id: $id) {
      update(event: { receiptLogoImage: $file}) { errors }
    }
  }`;

export const UPLOAD_EVENT_POSTER = gql`
  mutation ($id: UUID!, $file: Upload) {
    event(id: $id) {
      update(event: { posterImage: $file}) { errors }
    }
  }`;
