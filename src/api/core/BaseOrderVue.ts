import { Vue } from 'vue-property-decorator';
import EventDTO from '@/api/dto/EventDTO';
import BaseVue from '@/api/core/BaseVue';

export default class BaseOrderVue extends BaseVue {
    protected ERROR_UPDATE_PATH: string = 'data.event.update.errors';
    protected event = new EventDTO();


}
