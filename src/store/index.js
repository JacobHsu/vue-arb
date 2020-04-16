import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '../i18n/store'
import Home from './Home'
import Topic from './Topic'

Vue.use(Vuex)

const modules = {
  i18n,
  Home,
  Topic,
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules,
  strict: debug
})
