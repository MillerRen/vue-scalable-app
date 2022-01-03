import Vue from 'vue'
import Vuex from 'vuex'
import request from '../api/request'
import { TOKEN_NAME } from '../constants/env'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem(TOKEN_NAME)
  },
  mutations: {},
  actions: {
    request (store, config) {
      return request(config)
    }
  },
  modules: {}
})
