import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    event: {},
    organization: {},
    organizationId: '',
    baseUrl: '',
    sessionKey: '',
    eventsPublicBaseUrl: '',
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
