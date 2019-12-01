import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'

import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import createLogger from './util/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  modules: {
    i18n: vuexI18n.store
  }
})

Vue.use(vuexI18n.plugin, store)

export default store
