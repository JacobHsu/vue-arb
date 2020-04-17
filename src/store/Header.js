const state = {
  mainMenu: [
    {
      key: 'forecastLog',
      name: 'header_t_menu1',
      type: 'text',
      disabled: false
    },
    {
      key: 'my',
      name: 'header_t_menu2',
      type: 'text',
      disabled: false
    }
  ],
  collapse: false,
  message: {},
  status: {},
  error: {}
}
const actions = {
}
const getters = {
  collapseClass: state => {
    const cls = 'collapse navbar-collapse'
    return state.collapse ? `${cls} show` : cls
  },
  mainMenu: state => {
    return state.mainMenu
  },
}
const mutations = {

}
export default {
  state,
  getters,
  actions,
  mutations
}
