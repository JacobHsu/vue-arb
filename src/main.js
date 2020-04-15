import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false

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
  localStorage.setItem('lang', defaultLang)
} 

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
