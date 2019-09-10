import { Vue } from 'vue-property-decorator';
import { EventApi } from '@/api/EventApi';
import ApiUtils from '@/api/util/ApiUtils';
import { stringify } from 'querystring';
import OrganizationDTO from '@/api/dto/OrganizationDTO';
import ISelect from '@/api/interface/ISelect';

export default abstract class BaseVue extends Vue {

    protected ERROR_UPDATE_PATH: string = 'data.event.update.errors';
    protected api: EventApi | any = null;
    protected busy: boolean = false;

    constructor() {
        super();
        if (this.api === undefined || this.api === null) {
            const baseUrl: string = this.$store.getters.baseUrl;
            const sessionKey: string = this.$store.getters.sessionKey;
            this.api = (baseUrl === '' && sessionKey === '')
                    ? null : new EventApi(baseUrl, sessionKey);
            this.loadOrganization();
        }
    }


    protected loadOrganization() {
        if (this.api === null) {
            return;
        }
        if (!ApiUtils.hasValue(this.$store.getters.organization.name)) {
            this.api.getOrganizationData(this.$store.getters.organizationId)
                .then((res) => {
                    const org = this.handleSuccessIgnoreError(res, 'data.organization');
                    this.$store.commit('organization', OrganizationDTO.fromModel(org));
                });
        }
    }

    get organizationEmbeds(): ISelect[] {
        console.log(JSON.stringify(this.$store.getters.organization.embeds));
        return this.$store.getters.organization.embeds;
    }

    protected handleSuccessIgnoreError(res: any, objPath: string) {
        const errors = ApiUtils.getValue(res, 'errors');
        if (errors && errors.length > 0) {
          // tslint:disable-next-line: no-console
          console.error('Ignored load errors\n: ' + JSON.stringify(errors));
        }
        return (objPath !== '') ? ApiUtils.getValue(res, objPath) : null;
    }

    protected handleSuccess(res: any, objPath: string, errorPath: string = 'errors') {
        const errors = ApiUtils.getValue(res, errorPath);
        const gqlErrors = (errorPath === 'errors') ? null : ApiUtils.getValue(res, 'errors');
        if (errors && errors.length > 0) {
            this.$msgbox(this.errorsToString(errors), 'Error');
        } else if (gqlErrors && gqlErrors.length > 0) {
            this.$msgbox(this.errorsToString(gqlErrors), 'System Error');
        } else {
          return (objPath !== '') ? ApiUtils.getValue(res, objPath) : null;
        }
    }

    protected handleFailure(errors) {
        if (this === undefined) {
            (new Vue()).$msgbox(String(errors), 'Errors');
        } else {
            this.busy = false;
            this.$msgbox(this.errorsToString(errors), 'Errors');
        }
    }

    protected handleMessage(res: any) {
        const errors = ApiUtils.getValue(res, 'errors');
        if (errors && errors.length > 0) {
            this.$msgbox(this.errorsToString(errors), 'System Errors');
        }
    }

    protected errorsToString(errors: any) {
        let strError = '';
        if (Array.isArray(errors)) {
            for (const error of errors) {
                strError += ((typeof error) === 'string') ?
                    error + '\n' : JSON.stringify(error) + '\n';
            }
        } else {
            strError += ((typeof errors) === 'string') ?
                    errors + '\n' : JSON.stringify(errors) + '\n';
        }
        return strError;
    }

    protected proceed(route: string, params?: any) {
        if (params) {
            this.$router.push({ name: route, params });
        } else {
            this.$router.push({ name: route });
        }
    }

    protected delayPromise(duration) {
        return new Promise((resolve) => setTimeout(resolve, duration));
    }

}
