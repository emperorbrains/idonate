import GraphQLApi from './GraphQLApi';
import * as Queries from './gql/Queries';
import * as Mutations from './gql/Mutations';

import EventDTO from '@/api/dto/EventDTO';
import { Upload } from 'element-ui';
import { from } from 'zen-observable';


export class EventApi {
  private gql: GraphQLApi;

  constructor(baseUrl: string, sessionKey: string) {
    this.gql = new GraphQLApi(baseUrl, sessionKey);
  }

  // ****************************************
  // LISTS
  // ****************************************
  public getOrganizationData(organization: string) {
    return this.gql.query(Queries.ORGANIZATION_DATA, { organizationId: organization });
  }

  public getPromoCodesList(eventId: string) {
    return this.gql.query(Queries.LIST_PROMO_CODES, { id: eventId });
  }

  // ****************************************
  // QUERIES
  // ****************************************


  public getComplimentaryTickets(eventId: string) {
    return this.gql.query(Queries.COMPLIMENTARY_TICKETS, {id: eventId});
  }

  public getOrderAttendees(orderId: string) {
    return this.gql.query(Queries.EVENT_ORDER_ATTENDEES, {id: orderId});
  }

  public getOrderTransaction(orderId: string) {
    return this.gql.query(Queries.EVENT_ORDER_TRANSACTION, {id: orderId});
  }

  public getOrder(orderId: string) {
    return this.gql.query(Queries.EVENT_ORDER, {id: orderId});
  }
  public getGuestlist(eventId: string) {
    return this.gql.query(Queries.GUEST_LIST, {id: eventId});
  }

  public getEvents(organization: string) {
    return this.gql.query(Queries.EVENTS, { organizationId: organization });
  }

  public getEvent(id: string) {
    return this.gql.query(Queries.EVENT, { id });
  }

  public previewEvent(id: string) {
    return this.gql.query(Queries.EVENT_PREVIEW, { id });
  }

  public getPromoCodes(eventId: string) {
    return this.gql.query(Queries.PROMO_CODES, {id: eventId});
  }

  public getSponsors(eventId: string) {
    return this.gql.query(Queries.EVENT_SPONSORS, {id: eventId});
  }

  public getTicketDefinitions(eventId: string) {
    return this.gql.query(Queries.TICKET_DEFINITIONS, {id: eventId});
  }

  public getTicketDefinition(ticketId: string) {
    return this.gql.query(Queries.TICKET_DEFINITION, {id: ticketId});
  }

  public getSurveyList(eventId: string) {
    return this.gql.query(Queries.SURVEYS, {id: eventId});
  }

  public getSurvey(eventId: string, survey: string) {
    return this.gql.query(Queries.SURVEY, {id: eventId, surveyId: survey});
  }
  public getTicketEmbed(eventId: string) {
    return this.gql.query(Queries.TICKET_EMBED, {id: eventId});
  }

  public getTicketDefinitionList(eventId: string) {
    return this.gql.query(Queries.EVENT_TICKET_LIST, {id: eventId});
  }

  // public getEventsData(organization: string) {
  //   return this.gql.query(Queries.EVENTS_LIST, { oid: organization });
  // }

  public getOrderEventOrder(orderId: string) {
    return this.gql.query(Queries.EVENT_ORDER, { id: orderId });
  }

  /* Event Dashboard*/
  public getDashboardEvents(organization: string, fromDt: Date, toDt: Date) {
    return this.gql.query(Queries.EVENTS_DASHBOARD, { organizationId: organization,
      fromDate: fromDt, toDate: toDt });
  }

  public getEventSalesReport(eventId: string) {
    return this.gql.query(Queries.EVENT_SALES_REPORT, { id: eventId });
  }

  public getOrdersList(eventId: string) {
    return this.gql.query(Queries.EVENT_ORDER_LIST, { id: eventId });
  }

  /* Event Dashboard*/

  // ****************************************
  // QUERIES END
  // ****************************************

  // ****************************************
  // MUTATIONS
  // ****************************************

  public copyEvent(orgId: string, event: string, eventName: string, eventSlug: string) {
      return this.gql.mutate(Mutations.COPY_EVENT, { organizationId: orgId, eventId: event, name: eventName, slug: eventSlug });
  }

  public createComplimentaryTicket(eventId: string, data: any) {
    return this.gql.mutate(Mutations.CREATE_COMP_TICKET, { id: eventId, compTicket: data });
  }

  public archiveEvent(id: string) {
    return this.gql.mutate(Mutations.ARCHIVE_EVENT, { id });
  }

  public createEvent(organizationId: string, data: any) {
      return this.gql.mutate(Mutations.CREATE_EVENT, { id: organizationId, event: data });
  }

  public deleteEvent(id: string) {
    return this.gql.mutate(Mutations.DELETE_EVENT, { id });
  }

  public publishEvent(id: string) {
    return this.gql.mutate(Mutations.PUBLISH_EVENT, { id });
  }

  public updateEvent(id: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_EVENT, { id, event: data });
  }

  public createSurvey(eventId: string, surveyName: string) {
    return this.gql.mutate(Mutations.CREATE_SURVEY, { id: eventId, name: surveyName });
  }

  public updateSurvey(eventId: string, survey: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_SURVEY, { id: eventId, surveyId: survey, survey: data });
  }

  public deleteSurvey(eventId: string, survey: string) {
    return this.gql.mutate(Mutations.DELETE_SURVEY, { id: eventId, surveyId: survey });
  }

  public createTicketDefinition(eventId: string, data: any) {
    return this.gql.mutate(Mutations.CREATE_TICKET_DEFINITION,
      { id: eventId, ticket: data });
  }

  public updateTicketDefinition(eventId: string, ticket: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_TICKET_DEFINITION,
      { id: eventId, ticketId: ticket, ticket: data });
  }

  public deleteTicketDefinition(eventId: string, ticket: string) {
    return this.gql.mutate(Mutations.DELETE_TICKET_DEFINITION,
      { id: eventId, ticketId: ticket });
  }

  public createSponsor(eventId: string, data: any) {
    return this.gql.mutate(Mutations.CREATE_SPONSOR, { id: eventId, sponsor: data });
  }

  public updateSponsor(eventId: string, sponsor: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_SPONSOR, { id: eventId, sponsorId: sponsor, sponsor: data });
  }

  public deleteSponsor(event: string, sponsor: string) {
    return this.gql.mutate(Mutations.DELETE_SPONSOR,
      { eventId: event, sponsorId: sponsor });
  }
  public createPromoCode(eventId: string, data: any) {
    return this.gql.mutate(Mutations.CREATE_PROMO_CODE, { id: eventId, promoCode: data });
  }

  public updatePromoCode(eventId: string, promoCode: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_PROMO_CODE, { id: eventId, promoCodeId: promoCode, promoCode: data });
  }

  public deletePromoCode(eventId: string, promoCode: string) {
    return this.gql.mutate(Mutations.DELETE_PROMO_CODE, { id: eventId, promoCodeId: promoCode });
  }

  public createSurveyQuestion(eventId: string, survey: string, data: any) {
    return this.gql.mutate(Mutations.CREATE_SURVEY_QUESTION, { id: eventId, surveyId: survey, question: data });
  }

  public updateSurveyQuestion(eventId: string, surveyQuestion: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_SURVEY_QUESTION, { id: eventId, surveyQuestionId: surveyQuestion, question: data });
  }

  public deleteSurveyQuestion(eventId: string, surveyQuestion: string) {
    return this.gql.mutate(Mutations.DELETE_SURVEY_QUESTION, { id: eventId, surveyQuestionId: surveyQuestion });
  }

  public updateEventStep(eventId: string, stepNo: string) {
    return this.gql.mutate(Mutations.UPDATE_EVENT_STEP, { id: eventId, step: stepNo });
  }

  public addEmailSubscriber(eventId: string, data: any) {
    return this.gql.mutate(Mutations.ADD_EMAIL_SUBSCRIBER, { id: eventId, subscriber: data });
  }

  public updateEmailSubscriber(eventId: string, oldEmail: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_EMAIL_SUBSCRIBER, { id: eventId, email: oldEmail, subscriber: data });
  }

  public deleteEmailSubscriber(eventId: string, emailAddress: string) {
    return this.gql.mutate(Mutations.DELETE_EMAIL_SUBSCRIBER, { id: eventId, email: emailAddress });
  }

  public updateOrderPurchaser(eventId: string, order: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_ORDER_PURCHASER, { id: eventId,  orderId: order, purchaser: data });
  }

  public updateOrderAttendee(eventId: string, order: string, ticketInstance: string, data: any) {
    return this.gql.mutate(Mutations.UPDATE_ORDER_ATTENDEE, { id: eventId,  orderId: order, ticketInstanceId: ticketInstance, attendee: data });
  }

  // ****************************************
  // MUTATIONS :: ACTIONS
  // ****************************************

  public sendEmail(eventId: string, data: any) {
    return this.gql.mutate(Mutations.SEND_EMAIL, { id: eventId, emailUpdate: data });
  }

  public sendEmailTest(eventId: string, data: any) {
    return this.gql.mutate(Mutations.SEND_EMAIL_TEST, { id: eventId, emailUpdate: data });
  }

  public refundOrder(eventId: string, order: string) {
    return this.gql.mutate(Mutations.REFUND_ORDER, { id: eventId, orderId: order });
  }

  public sendOrderConfirmation(eventId: string, order: string) {
    return this.gql.mutate(Mutations.SEND_ORDER_CONFIRMATION, { id: eventId,  orderId: order });
  }

  public sendOrderConfirmationTest(eventId: string) {
    return this.gql.mutate(Mutations.SEND_ORDER_CONFIRMATION_TEST, { id: eventId });
  }

  // ****************************************
  // MUTATIONS :: UPLOAD
  // ****************************************

  public uploadEventFile(eventId: string, field: string, data: any) {
    let query;
    switch (field) {
      case 'posterImage': query = Mutations.UPLOAD_EVENT_POSTER; break;
      case 'coverImage': query = Mutations.UPLOAD_EVENT_COVER; break;
      case 'footerLogoImage': query = Mutations.UPLOAD_EVENT_FOOTERLOGO; break;
      case 'mainLogoImage': query = Mutations.UPLOAD_EVENT_MAINLOGO; break;
      case 'emailLogoImage': query = Mutations.UPLOAD_EVENT_EMAILLOGO; break;
      case 'receiptLogoImage': query = Mutations.UPLOAD_EVENT_RECEIPTLOGO; break;
      default: return;
    }
    return this.gql.mutate(query, { id: eventId, file: data });
  }

  // public uploadFile(field: string, file: Upload) {
  //   return this.gql.mutate(Mutations.UPLOAD_FILE_COVERIMAGE, { file });
  // }

  // public uploadTestingIssue(eventId: string, data: Upload) {
  //   return this.gql.mutate(Mutations.UPLOAD_TESTING_ISSUE, { id: eventId, file: data });
  // }

}



