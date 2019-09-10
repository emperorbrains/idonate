<template>
  <div>
    <b-table
      head-variant="light"
      table-class="table-events-list"
      :responsive="true"
      :items="events"
      :fields="fields"
      :filter="filter"
      :filter-function="filterData"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template slot="name" slot-scope="data">
        <router-link class="text-dark" :to="{ name: 'event-sales', params: { eventId: data.item.id } }" v-text="data.item.name"></router-link>
      </template>

      <template slot="actions" slot-scope="data">
        <span class="btn btn-white btn-sm cursor-pointer rounded-circle text-primary mx-2" @click="copyEvent(data.item)">
          <i class="far fa-copy"></i>
        </span>

        <span class="btn btn-white btn-sm cursor-pointer rounded-circle text-primary mx-2" @click="editEvent(data.item)">
          <i class="fas fa-pencil-alt"></i>
        </span>

        <span class="btn btn-white btn-sm cursor-pointer rounded-circle text-primary mx-2" @click="displayConfirmDeletionModal(data.item)">
          <i class="far fa-trash-alt"></i>
        </span>

        <event-delete-modal-component :id="'event-delete-modal-' + data.item.id" :event="data.item" @confirmed="deleteEvent" />
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';
import IEvent from '@/api/interface/IEvent';
import ApiUtils from '@/api/util/ApiUtils';
import EventDeleteModalComponent from './EventDeleteModalComponent.vue';

@Component({
  components: {
    EventDeleteModalComponent,
  },
})
export default class EventsListComponent extends Vue {
  @Prop(Number) public readonly currentPage!: number;
  @Prop(Array) public readonly events!: IEvent[];
  @Prop(String) public readonly filter!: string;
  @Prop(String) public readonly perPage!: number;

  private currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  private fields = [
    {
      key: 'name',
      label: 'Event Name',
      sortable: true,
    },
    {
      key: 'eventStart',
      label: 'Start Date',
      sortable: true,
      formatter: this.formatDate,
    },
    {
      key: 'attendeeCount',
      label: 'Attendees',
      sortable: true,
    },
    {
      key: 'venueName',
      label: 'Location',
      sortable: true,
    },
    {
      key: 'revenue',
      label: 'Revenue',
      sortable: true,
      formatter: this.formatCurrency,
    },
    {
        key: 'actions',
        label: '',
        sortable: false,
    },
  ];

  private filterData(item, query) {
    const name = JSON.stringify(item.name).toLowerCase().replace(/\"/g, "");

    if (name.startsWith(query)) {
      return true;
    }

    return false;
  }

  private formatDate(val) {
    return ApiUtils.hasValue(val) ? moment(val).format('ddd, MMM DD') : '';
  }

  private formatCurrency(val) {
    return ApiUtils.hasValue(val) ? this.currencyFormatter.format(val) : '';
  }

  private copyEvent(event) {
    this.$emit('copy-event', event);
  }

  private deleteEvent(event) {
    this.$emit('delete-event', event);
  }

  private displayConfirmDeletionModal(event: IEvent) {
    this.$bvModal.show('event-delete-modal-' + event.id);
  }

  private editEvent(event) {
    this.$router.push({ name: 'edit-event', params: { eventId: event.id } });
  }
}
</script>

<style lang="scss" scoped>
.table-events-list {
  margin-bottom: 0;
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 40px;
  overflow: hidden;
}
</style>
