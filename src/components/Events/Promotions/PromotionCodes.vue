<template>
  <div>
    <b-row>
      <b-col></b-col>

      <b-col md='6'>
        <h4 class="font-weight-semibold mb-0 text-center text-primary">PROMOTIONAL CODES</h4>
      </b-col>

      <b-col class="text-right">
        <a class="font-weight-semibold mr-4" href="#" @click="handleType('new', null, null)">+ Create New</a>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <div class="mt-4 mb-5 table-standard">
          <b-table
            responsive
            head-variant="light"
            :items='promotionsList'
            :fields='promotionsListFields'
            :filter='filter'
          >
            <template slot='promoCode' slot-scope='promoListData'>
              <span class='free-stuff'>{{ promoListData.item.code }}</span>
              <br>
              <span class='general-adult'>{{ getAppliesField(promoListData.item.appliesTo) }}</span>
            </template>

            <template slot='pricing' slot-scope='promoListData'>
              <span class='upper-price'>${{ promoListData.item.oldPrice }}</span>
              <br>
              <span class='lower-price'>${{ promoListData.item.newPrice }}</span>
            </template>

            <template slot='starts' slot-scope='promoListData'>
              <span>{{ dateFormatFunction(promoListData.item.promoStartDate) }}</span>
              <br>
              <span>{{ promoListData.item.promoStartTime.dateTime | moment('LT') }}</span>
            </template>

            <template slot='ends' slot-scope='promoListData'>
              <span>{{ dateFormatFunction(promoListData.item.promoEndDate) }}</span>
              <br>
              <span>{{ promoListData.item.promoEndTime.dateTime | moment('LT') }}</span>
            </template>

            <template slot='action' slot-scope='promoListData'>
              <span class='cursor' @click="handleType('edit', promoListData.item, promoListData.index)">
                <img src='@/assets/icons/edit-icon.svg' height='15px' width='25'>
              </span>
              
              <span
                class='cursor'
                @click='handleDeleteItem(promoListData.index)'
                v-b-modal.delete-promo-ticket-modal
              >
                <img src='@/assets/icons/delete-icon.svg' height='35px' width='30'>
              </span>
              <img
                class='cursor'
                @click='handlePlay(promoListData.item, promoListData.index)'
                v-if="promoListData.item.status==='OPEN' || promoListData.item.status==='Open'"
                src='@/assets/icons/pause-icon.svg'
                width='30'
                height='30px'
              >
              
              <img
                class='cursor'
                @click='handlePlay(promoListData.item, promoListData.index)'
                v-if="promoListData.item.status==='PAUSED' || promoListData.item.status==='Paused'"
                src='@/assets/icons/vector.svg'
                width='25'
                height='16px'
              >
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>

    <promo-code-modal
      id='promo-code-modal'
      :type='type'
      :item='listItem'
      :itemIndex='index'
      v-model='listItem'
      @addNewPromoCode='addNewPromoCode'
      @editPromoCode='editPromoCode'
      @updatePromoCode='updatePromoCode'
    ></promo-code-modal>

    <delete-promo-ticket-modal
      id='delete-promo-ticket-modal'
      :deleteIndex='deleteIndex'
      @deleteItem='deleteItem'
    ></delete-promo-ticket-modal>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

import DeletePromoTicketModal from './modals/DeletePromoTicketModal.vue';
import PromoCodeModal from './modals/PromoCodeModal.vue';
import BaseEventVue from '@/api/core/BaseEventVue';
import PromoCodeDTO from '@/api/dto/PromoCodeDTO';
import ApiUtils from '@/api/util/ApiUtils';
import DateUtils from '@/api/util/DateUtils';

@Component({
  components: {
    DeletePromoTicketModal,
    PromoCodeModal,
  },
})
export default class PromotionCodes extends BaseEventVue {
  private filter: string = '';
  private type: string = 'new';
  private index: any = null;
  private deleteIndex: any = null;
  private eventId: string = '';

  private listItem: any = new PromoCodeDTO();

  private promotionsList: any[] = [];

  private promotionsListFields: any[] = [
    {
      key: 'promoCode',
    },
    {
      key: 'pricing',
    },
    {
      key: 'starts',
    },
    {
      key: 'ends',
    },
    {
      key: 'quantity',
    },
    {
      key: 'usedCount',
    },
    {
      key: 'status',
      formatter: this.formatStatus,
    },
    {
      key: 'action',
      label: '',
    },
  ];

  private getAppliesField(field) {
    if (typeof field === 'string') {
      return field;
    } else if (Array.isArray(field)) {
      return field[0].label;
    }
  }

  private getPricing(field) {
    if (field === null || field === undefined) {
      return '$0.00';
    } else if (field.includes('$')) {
      return field;
    } else {
      return `$${field}.00`;
    }
  }

  private handleDeleteItem(index) {
    this.deleteIndex = index;
  }

  private handleType(type, item, index) {
    if (type === 'new') {
      this.type = 'new';
      this.listItem = new PromoCodeDTO();
      this.$bvModal.show('promo-code-modal');
    } else if (type === 'edit') {
      this.type = 'edit';
      this.listItem = item;
      this.index = index;
      this.$bvModal.show('promo-code-modal');
    }
  }

  private dateFormatFunction(dateString) {
    return DateUtils.dateFormatFunction(dateString);
  }

  private formatStatus(val) {
    return ApiUtils.capitalize(val);
  }

  private deleteItem(index) {
    if (this.api === null) {
       return;
    }
    this.api.deletePromoCode(this.$route.params.eventId, this.promotionsList[index].id)
      .then((res) => {
        this.handleSuccess(res, '', 'data.event.deletePromoCode.errors');
        this.loadPromoCodes();
      }) .catch(this.handleFailure);
  }

  private addNewPromoCode(item) {
    this.loadPromoCodes();
  }

  private editPromoCode(index, item) {
    this.loadPromoCodes();
  }

  private handlePlay(item, index) {
    let newStatus = '';
    if (item.status === 'OPEN' || item.status === 'Open') {
      newStatus = 'PAUSED';
      const item1 = { ...item, status: 'PAUSED' };
      this.promotionsList.splice(index, 1, item1);
    } else if (item.status === 'PAUSED' || item.status === 'Paused') {
      newStatus = 'OPEN';
      const item2 = { ...item, status: 'OPEN' };
      this.promotionsList.splice(index, 1, item2);
    }

    this.api.updatePromoCode(this.$route.params.eventId, item.id, {status: newStatus} )
      .then((res) => {
        this.updateEventDontProceed(res, 'data.event.updatePromoCode.errors');
        this.loadPromoCodes();
      });

  }

  private updatePromoCode({ key, value }) {
    // tslint:disable-next-line: no-console
    console.log('updatePromoCode');
    this[key] = value;
  }

  private created() {
    this.eventId = this.$route.params.eventId;
    this.loadPromoCodes();
  }

  private loadPromoCodes() {
    if (this.api === null) {
       return;
    }
    this.api.getPromoCodes(this.$route.params.eventId)
      .then((res) => {
        const promos = this.handleSuccessIgnoreError(res, 'data.event.promoCodes');
        this.promotionsList = PromoCodeDTO.fromModel(promos);
      }).catch(this.handleFailure);
  }
}
</script>
<style scoped>
span.free-stuff {
  color: #000000;
  font-weight: 700;
  font-size: 16px;
}

span.general-adult {
  font-weight: 500;
  font-size: 16px;
  margin-left: 10px;
}

span.upper-price {
  color: red;
  text-decoration: line-through;
  font-size: 16px;
}

span.lower-price {
  font-weight: 600;
  font-size: 15px;
}

i.fa {
  margin: 5px;
  color: #388cd0;
  background: #fff;
  padding: 5px;
  border-radius: 20px;
}

span.cursor img {
  cursor: pointer;
}

img.cursor {
  cursor: pointer;
}

@media (min-width: 1024px) {
  .event {
    margin-left: 133px;
  }
}

@media (max-width: 768px) {
  .event {
    display: block;
    text-align: center;
  }

  p.create span {
    text-align: center;
    display: block;
    margin: auto;
    width: 180%;
  }
}
</style>
