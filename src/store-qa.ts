import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    event: {},
    organization: {},
    organizationId: '12345678-1234-5678-1234-567812345678',
    baseUrl: 'https://api.qa-events.idonatedev.com/gms',
    sessionKey: '66b182f23ed100444993fa79b83d518954aa79f71958e7705030b21bc6b3d630',
    eventsPublicBaseUrl: 'https://events-qa.idonate.com/',
  },
  mutations: {
    event(state, evt) {
      state.event = evt;
    },
    eventsPublicBaseUrl(state, evt) {
      state.eventsPublicBaseUrl = evt;
    },
    organizationId(state, obj) {
      state.organizationId = obj;
    },
    organization(state, obj) {
      state.organization = obj;
    },
    baseUrl(state, obj) {
      state.baseUrl = obj;
    },
    sessionKey(state, obj) {
      state.sessionKey = obj;
    },
  },
  getters: {
    event: (state) => {
      return state.event;
    },
    organizationId: (state) => {
      return state.organizationId;
    },
    organization: (state) => {
      return state.organization;
    },
    baseUrl: (state) => {
      return state.baseUrl;
    },
    sessionKey: (state) => {
      return state.sessionKey;
    },
    eventsPublicBaseUrl: (state) => {
      return state.eventsPublicBaseUrl;
    },
  },
  actions: {

  },
});
