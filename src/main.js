import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import VueLocalStorage from 'vue-localstorage'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueLocalStorage)
Vue.use(BootstrapVue)

i18n.locale = 'zh-CN'

Vue.mixin({
  methods: {
    goTo: function (path) {
      this.$router.push({ name: path })
    }
  }
})

const userLang = navigator.language || navigator.userLanguage
localStorage.setItem('userLang', userLang)

const defaultLang = userLang.indexOf('en') === -1 ? 'zh-CN' : 'en-US'
const lang = localStorage.getItem('lang')

if (!lang) {
  store.dispatch('changeLang', defaultLang)
  localStorage.setItem('lang', defaultLang)
} else {
  store.dispatch('changeLang', lang)
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
