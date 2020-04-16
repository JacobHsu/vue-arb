import Vue from 'vue'
import isNil from 'lodash/isNil'

const LOGIN_INFO = 'loginInfo'

function getter (id) {
  const data = Vue.localStorage.get(id)

  if (isNil(data) || data === 'undefined') return {}

  return JSON.parse(data)
}

function setter (id, data) {
  Vue.localStorage.set(id, JSON.stringify(data))
  return true
}

export function getLoginInfo () {
  return getter(LOGIN_INFO)
}

export function setLoginInfo (data) {
  return setter(LOGIN_INFO, data)
}

export function getAccessToken () {
  const loginInfo = getLoginInfo()

  return (loginInfo && loginInfo.accessToken) || ''
}