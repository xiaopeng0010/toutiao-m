import Vue from 'vue'
import Vuex from 'vuex'


// const TOKEN_KEY = 'TOUTIAO_USER'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user:null
    user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
  },
  mutations: {
    sendSms(state, user) {
      state.user = user
      window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(user))
    }
  },
  actions: {
  },
  modules: {
  }
})
