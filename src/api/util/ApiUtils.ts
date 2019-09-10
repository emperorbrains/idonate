import { DocumentNode } from 'graphql';

export default class ApiUtils {

  public static hasValue(obj: any) {
    return obj !== null && obj !== undefined && obj !== '';
  }

  public static getValue(obj, path: string) {
      return path.split('.').reduce((o, x) => {
          return (typeof o === 'undefined' || o === null) ? o : o[x];
      }, obj);
  }

  public static getGqlString(doc: DocumentNode) {
    return doc.loc && doc.loc.source.body;
  }

  public static nullToEmpty(obj: any) {
    return (obj === null) ? '' : obj;
  }

  public static storeFrameInfo(store: any, data: any) {
    // tslint:disable-next-line:no-console
    console.log('Input: ' + data);
    const info = JSON.parse(data);
    store.commit('organizationId', info.organizationId);
    store.commit('sessionKey', info.sessionKey);
    store.commit('baseUrl', decodeURIComponent(info.baseUrl));
    store.commit('eventsPublicBaseUrl', decodeURIComponent(info.eventsPublicBaseUrl));
  }

  public static capitalize(str: string) {
    return ApiUtils.hasValue(str)
      ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  }

}
