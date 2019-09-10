import { gql } from 'apollo-boost';

export const ORGANIZATION_DATA = gql`
  query($organizationId: UUID!){
    organization(id: $organizationId){
      name status
      p2pPrograms(statuses: [ACTIVE]) { id name }
      supportedCountries { id text }
      campaigns(isActive:true) { id title }
      embeds(statuses: [ACTIVE]) { id name }
    }
  }`;

export const GUEST_LIST: any = gql`
  query ($id: UUID!) {
    event(id: $id) {
      id name lastConfigurationStep eventStart p2pProgramPending status
      ticketInstances {
        id orderId
        attendee { firstName lastName email company }
        ticketDefinition { name }
      }
    }
  }`;

export const COMPLIMENTARY_TICKETS: any = gql`
  query ($id: UUID!) {
    event(id: $id) {
      ticketInstances(isComp: true) {
        id orderId
        attendee { firstName lastName email company }
        ticketDefinition { name price }
      }
    }
  }`;

export const EVENT_TICKETS: any = gql`
  query ($id: UUID!) {
    event(id: $id) {
      ticketInstances {
        id orderId grossProceeds netProceeds
        promoCode {id code discountFlat discountPercent }
        attendee { firstName lastName email company salutation phone street street2 city state zip }
        ticketDefinition { id name price description}
      }
    }
  }`;

export const TICKET_DEFINITIONS: any = gql`
  query($id: UUID!){
    event(id: $id) {
      ticketStart ticketEnd
      ticketDefinitions {
        id name status description price fairMarketValue ticketEnd
        quantity limitMaximum ticketStart showRemainingQuantity
        survey { surveyId name }
        promoCode { id code }
      }
    }
  }`;

export const TICKET_DEFINITION: any = gql`
  query($id: UUID!){
    ticketDefinition(id: $id) {
      id name status description price fairMarketValue ticketEnd
      quantity limitMaximum ticketStart showRemainingQuantity
      survey { surveyId name }
      promoCode { id code }
    }
  }`;

export const TICKET_EMBED: any = gql`
  query ($id: UUID!) {
    event(id: $id) {
      id name lastConfigurationStep eventStart p2pProgramPending status
      ticketEmbedSettings {
        showEventTime showEventLocation showEventImage showEventDescription
        theme buttonText buttonSize buttonBgColor buttonTextColor
      }
    }
  }`;


export const LIST_PROMO_CODES = gql`
  query($id: UUID!) {
    event(id: $id){
      name
      promoCodes {
        value: id
        text: code
      }
    }
  }`;

export const PROMO_CODES = gql`
    query($id: UUID!) {
      event(id: $id){
        name
        promoCodes {
          id code usedCount status quantity discountPercent discountFlat promoStart promoEnd
          ticketDefinition { name, price}
        }
      }
    }`;

// export const EVENTS_LIST: any = gql`
//     query($organizationId: UUID!){
//       events(organizationId: $organizationId) {
//         id name slug status eventStart eventEnd
//         terms campaignId webUrl venueName
//         venueAddress {
//           street street2 city state zip country
//         }
//       }
//     }`;

export const EVENTS: any = gql`
    query($organizationId: UUID!){
      events(organizationId: $organizationId) {
        id name slug status eventStart eventEnd
        terms campaignId webUrl venueName
        venueAddress {
          street street2 city state zip country
        }
      }
    }`;

export const EVENT: any = gql`
  query($id: UUID!) {
    event(id: $id) {
      id sponsorTier1Name sponsorTier2Name sponsorTier3Name
      receiptSubject receiptContent id name slug eventStart
      eventEnd webUrl capacity hostName hostEmail summary
      description terms ticketStart ticketEnd isPrivate posterMode
      posterUrl coverImageUrl mainLogoImageUrl taxNumber enableTax
      footerLogoImageUrl emailLogoImageUrl receiptLogoImageUrl
      enableCheckoutDonation enableBuyerClaimAll enableBranding
      footerBgColor buttonText buttonTextColor buttonBgColor taxRate
      embedId campaignId p2pProgramId cartTimeoutSeconds venueName
      status enablePublicGuestList sendTicketsWithConfirmationEmail
      lastConfigurationStep p2pProgramPending
      venueAddress { street street2 city state zip country }
      guestDetailsSettings { salutation firstName lastName phone email
        address1 address2 city state zip companyName }
    }
  }`;

export const EVENT_PREVIEW: any = gql`
  query($id: UUID!) {
    event(id: $id) {
      sponsorTier1Name sponsorTier2Name sponsorTier3Name status
      id name slug eventStart eventEnd webUrl summary enablePublicGuestList
      description terms posterUrl coverImageUrl mainLogoImageUrl venueName
      buttonTextColor footerBgColor buttonText buttonBgColor
      footerLogoImageUrl posterMode
      venueAddress { street street2 city state zip country }
      ticketDefinitions { price }
    }
  }`;

export const EVENT_TICKET_LIST: any = gql`
  query($id: UUID!) {
    event(id: $id) {
      id name lastConfigurationStep eventStart p2pProgramPending status
      ticketDefinitions {
        id name quantity ticketStart ticketEnd status promoCode { id, code }
      }
    }
  }`;

export const SURVEYS: any = gql`
  query($id: UUID!) {
    event(id: $id) {
      id name lastConfigurationStep eventStart p2pProgramPending status
      surveys {
        id name questionCount
        ticket: ticketDefinition { name }
      }
    }
  }`;

export const SURVEY: any = gql`
  query ($id: UUID!, $surveyId: UUID!) {
    event(id: $id) {
      survey(id: $surveyId) {
      name  questionCount
      questions { id  questionType isResponseRequired question choices } }
    }
  }`;

export const EVENT_SPONSORS: any = gql`
  query ($id: UUID!) {
    event(id: $id) {
      id name lastConfigurationStep eventStart p2pProgramPending status
      sponsorTier1Name sponsorTier2Name sponsorTier3Name
      sponsorTiers{
        name sponsors { id name webUrl imageUrl }
      }
    }
  }`;

export const EVENTS_DASHBOARD: any = gql`
  query($organizationId: UUID!, $fromDate: Date!, $toDate: Date!) {
    eventsDashboard(organizationId: $organizationId) {
      events {
        id name eventStart attendeeCount venueName revenue status}
      salesOverview(fromDate: $fromDate, toDate: $toDate, interval: AUTO) {
        attendeeCount revenue interval
        graph { labels totalSalesData refundedData complimentaryData }
      }
    }
  }`;

export const EVENT_SALES_REPORT: any = gql`
  query($id: UUID!) {
      event(id: $id) {
        id name lastConfigurationStep eventStart p2pProgramPending status
        emailSubscribers { email interval }
        salesReport {
          tickets {
            name quantity price totalSalesCount compCount
            totalSalesValue refundedCount refundedValue }
          overview {
            grossProceeds netProceeds regularAttendeeCount compAttendeeCount
            ticketSalesProceeds donationProceeds ticketPriceValue fairMarketValue }
    } } }`;


export const EVENT_ORDER_LIST: any = gql`
  query($id: UUID!) {
      event(id: $id) {
        id name lastConfigurationStep eventStart p2pProgramPending status
        orders{
          id created method totalAmount status
          purchaser {
            firstName lastName email
            address { street street2 city state zip country }
          }
        }
     }
  }`;

export const EVENT_ORDER: any = gql`
  query($id: UUID!) {
    eventOrder(id: $id) {
    id method status totalAmount created
    purchaser {
      firstName lastName email address {
        street street2 city state zip country }
    }
    ticketInstances {
      id orderId grossProceeds netProceeds
      attendee { firstName lastName email company salutation phone street street2 city state zip }
      ticketDefinition { id name price description}
    }
    transaction{ status processedAt ticketSales grossProceeds netProceeds}
    }
  }`;

export const EVENT_ORDER_ATTENDEES: any = gql`
  query($id: UUID!) {
    eventOrder(id: $id) {
    ticketInstances {
      id orderId grossProceeds netProceeds
      attendee { firstName lastName email company salutation phone street street2 city state zip }
      ticketDefinition { id name price description}
    }
    transaction{ status processedAt ticketSales grossProceeds netProceeds}
    }
  }`;

export const EVENT_ORDER_TRANSACTION: any = gql`
  query($id: UUID!) {
    eventOrder(id: $id) {
      id method status totalAmount created
      transaction{ status processedAt ticketSales grossProceeds netProceeds}
    }
  }`;
