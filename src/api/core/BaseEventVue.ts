import EventDTO from '@/api/dto/EventDTO';
import BaseVue from '@/api/core/BaseVue';
import ApiUtils from '@/api/util/ApiUtils';
import TypeUtils from '@/api/util/TypeUtils';

export default class BaseEventVue extends BaseVue {
    protected ERROR_UPDATE_PATH: string = 'data.event.update.errors';
    protected event = new EventDTO();

    public storeEvent(evt: any) {
        if (evt === null) {
            return;
        }
        this.$store.commit('event', EventDTO.toCore(evt));
    }

    public get storedEvent() {
        return this.$store.getters.event;
    }

    public updateEventDontProceed(res: any, errorPath: string = 'data.event.update.errors') {
        const errors = ApiUtils.getValue(res, errorPath);
        const gqlErrors = ApiUtils.getValue(res, 'errors');
        if (errors && errors.length > 0) {
          this.$msgbox(errors, 'Errors');
        } else if (gqlErrors && gqlErrors.length > 0) {
            this.$msgbox(gqlErrors, 'System Errors');
        }
    }

    public updateEventAndProceed(route: string, res: any, errorPath: string = 'data.event.update.errors', params?: any) {
        const errors = ApiUtils.getValue(res, errorPath);
        const gqlErrors = ApiUtils.getValue(res, 'errors');
        if (errors && errors.length > 0) {
          this.$msgbox(errors, 'Errors');
        } else if (gqlErrors && gqlErrors.length > 0) {
            this.$msgbox(gqlErrors, 'System Errors');
        } else {
            this.proceed(route, params);
        }
    }

    protected updateEventStepAndProceed(eventId: string, step: number, route: string, params?: any) {
        if (this.api === null) {
            return;
        }
        if (step <= TypeUtils.toInt(this.$store.getters.event.lastConfigurationStep)) {
            this.proceed(route, params);
        } else {
            this.api.updateEventStep(eventId, step)
                .then(this.handleMessage)
                .then(this.proceed(route, params))
                .catch(this.handleFailure);
        }
    }

}
