import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'

const TOKEN_KEY = 'TOUTIAO_USER'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user:null
    // user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
    user:getItem(TOKEN_KEY)
  },
  mutations: {
    sendSms(state, data) {
      state.user = data
      setItem(TOKEN_KEY,state.user)
      // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(user))
    }
  },
  actions: {
  },
  modules: {
  }
})
