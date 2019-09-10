<template>
  <b-modal :id="id" ref="modal" size="lg" centered hide-footer>
    <template slot="modal-title">
      Event Help
    </template>
    
    <div class="p-3">
      <p>The Events Management feature provides a way to sell tickets to an event. Tickets can have a
cost or be free. A web page is created for the event or a ticket widget can be embedded in a
web page on your site. As you create or edit your event, hover over the ? beside field names
for more information about the use of the field.</p>

      <p class="font-weight-semibold">Events Dashboard</p>

      <p>The dashboard is the initial screen in the Events feature. The dashboard provides an overview
  of your events. View information regarding ticket sales, attendees, and a list of your events.</p>

      <p class="font-weight-semibold">Create/Edit Events</p>

      <ul>
        <li>To create a new event, click the New Event button on the upper right of the dashboard</li>
        <li>To edit an event, click the pencil icon on the line with the event in the events list</li>
        <li>When creating or editing an event:
          <ul>
            <li>Enter or update information in the fields</li>
            <li>Click Save and Continue to advance to the next screen.</li>
            <li>The progress bar across the top of the screen tracks where you are in the process</li>
            <li>Click Publish to activate a new event once data is in all required fields</li>
          </ul>
        </li>
      </ul>

      <p class="font-weight-semibold">Surveys</p>

      <p>Use surveys to gather more information from ticket purchasers like a meal choice or t-shirt size.
Create a survey first and then add it to a ticket during the ticket creation.</p>

      <ul>
        <li>Click Create Survey or click the pencil icon in the survey list to edit an existing survey</li>
        <li>Enter survey name</li>
        <li>Click Add Question</li>
        <li>Enter the question and select the question type</li>
        <li>Add more questions as needed</li>
        <li>Click Save and Continue</li>
      </ul>

      <p class="font-weight-semibold">Tickets</p>

      <p>Create multiple ticket types as needed for your event.</p>

      <ul>
        <li>Click the Create New button to create a new ticket.</li>
        <li>Click on the Ticket Name in the tickets list to edit an existing ticket.</li>
        <li>Enter or update ticket information</li>
        <li>Click Save and Continue</li>
      </ul>

      <p class="font-weight-semibold">Ticket Embeds</p>

      <p>Use embed code to embed a ticket widget on your website</p>

      <ul>
        <li>Select settings for the Ticket Embed</li>
        <li>Click the copy icon to copy the ticket embed code to your computer clipboard</li>
        <li>Use your website editing tool to paste the embed code on the desired web page</li>
        <li>Select Button settings and embed a button on your website pointing to an event page</li>
      </ul>

      <p class="font-weight-semibold">Order Confirmation</p>

      <p>An order confirmation email is sent to each ticket purchaser. You may configure the email on
the Order Confirmation screen or use the provided default content.</p>

      <ul>
        <li>Enter the email subject</li>
        <li>Load a logo image to be included in the order confirmation</li>
        <li>Enter the content of the order confirmation email.</li>
        <li>Click Test to review the order confirmation</li>
        <li>Click Save and Continue</li>
      </ul>

      <p class="font-weight-semibold">Sponsors</p>

      <p>Add event sponsors to the event web page.</p>

      <ul>
        <li>Enter a sponsor name</li>
        <li>Enter the url for the sponsor’s webpage</li>
        <li>Upload the sponsor logo or related image</li>
        <li>Tiers /groups of sponsors can be configured</li>
      </ul>

      <p class="font-weight-semibold">Settings</p>

      <p>The Settings screen offers a variety of settings for your event. Options include:</p>

      <ul>
        <li>Allow one person to claim a group of tickets</li>
        <li>Set a checkout time limit</li>
        <li>Make the guest list public</li>
        <li>Enter host contact information</li>
      </ul>

      <p class="font-weight-semibold">Publish</p>

      <p>Once you are done creating/editing the event, the Publish button will light up. This is initially
on the Settings screen when creating a new event. Be sure to click Publish to make the event
active.</p>

      <p class="font-weight-semibold">Order Management and Reporting</p>

      <p>From the Dashboard, click on the event name in the event list to access reporting tools for your
event and to manage event orders. The next screen shows options across the top of the screen
which are Sales Report, Orders, Guest List, Promotions, and Email Updates. Click the option
you want to use.</p>

      <ul>
        <li>Sales Report – Lists a sales summary by ticket as well as proceeds and attendee count
for the event. You may also subscribe to automated sales reports.</li>
        <li>Orders – View individual ticket orders here. You may download order information as
well as edit the order, issue a refund, and resend the order confirmation email.</li>
        <li>Guest List – View, edit, and download guest information.</li>
        <li>Promotions – Create and edit promotional codes and issue complimentary tickets.</li>
        <li>Email Updates – Create and send an email to ticket purchasers.</li>
      </ul>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class EventHelpModalComponent extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(String) public readonly id!: string;

  private closeDialogBox() {
    this.$refs.modal.hide();
  }
}
</script>

