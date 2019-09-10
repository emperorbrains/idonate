import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    event: {},
    organization: {},
    organizationId: 'c218136a-29df-4183-8dbc-d1a628d3ba29',
    baseUrl: 'https://devnext.idonate.com/api',
    sessionKey: 'b9ca577ad3e71b51f0d6c012ae8cb86a1201bc0b4cc780cfc8a64e8500cfc037',
    eventsPublicBaseUrl: 'https://events-public.qa-events.idonatedev.com/',
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
