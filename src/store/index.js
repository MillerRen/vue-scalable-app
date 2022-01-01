import Vue from 'vue'
import Vuex from 'vuex'
import request from '../api/request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token')
  },
  mutations: {},
  actions: {
    request (store, config) {
      return request(config)
    }
  },
  modules: {}
})
