import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '../i18n/store'
import Home from './Home'
import Header from './Header'
import Topic from './Topic'


Vue.use(Vuex)

const modules = {
  i18n,
  Header,
  Home,
  Topic,
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules,
  strict: debug
})
