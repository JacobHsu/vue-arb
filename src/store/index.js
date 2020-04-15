import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '../i18n/store'

Vue.use(Vuex)

const modules = {
  i18n,
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules,
  strict: debug
})
