import axios from 'axios'
import { camelizeKeys } from 'humps'
import isNil from 'lodash/isNil'
import i18n from '@/i18n'
import { getAccessToken } from '@/libs/ls'
import Router from '@/router/'

const BNN_FUTURE_EVENT_HOST = process.env.VUE_APP_API_HOST

const convertSimpleObjToQueryString = (obj) => {
  const stringifyObj = Object.keys(obj)
    .filter(k => !isNil(obj[k]))
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join('&')
  return stringifyObj
}

const sendRequest = (options) => {
  const { url, method = 'GET', headers, auth = true, lang = true, body, qs, isLogin = false } = options
  const HEADER = {
    Accept: 'application/json',
    'Content-Type': isLogin ? 'application/x-www-form-urlencoded charset=UTF-8' : 'application/json',
    ...headers
  }
  const locale = `${i18n.locale.toLowerCase()}/`
  const langUrl = lang ? locale : ''
  const data = isLogin ? convertSimpleObjToQueryString(body) : body
  if (auth) HEADER.Authorization = `bearer ${getAccessToken()}`

  return axios({
    baseURL: BNN_FUTURE_EVENT_HOST,
    url: `${langUrl}${url}`,
    method,
    headers: HEADER,
    params: qs,
    data
  })
}

/* eslint no-global-assign: "error" */

let isAlertShow = false

const Request = ({ commit }, type, options, cbs) => {
  // cbs: 回調,為一物件 { processing, success, failure }
  if (cbs && cbs.processing) {
    cbs.processing()
  } else {
    commit(type.base, { type: type.processing, value: true })
  }

  return new Promise((resolve, reject) => {
    sendRequest(options)
      .then((response) => {
        const { data, message, status } = camelizeKeys(response.data)
        const { others } = options
        if (options.isLogin) {
          localStorage.setItem('loginInfo', JSON.stringify(camelizeKeys(response.data)))
        }
        if (cbs && cbs.success) {
          cbs.success(response)
        } else {
          commit(type.base, { type: type.success, data, message, status, others })
        }
        resolve(response)
      })
      .catch((error) => {
        if (cbs && cbs.failure) {
          cbs.failure(error)
        } else {
          /*  eslint no-extra-boolean-cast: "off" */
          if (!!~[401, 403].indexOf(error.response.status)) {
            if (!isAlertShow) {
              if (error.response.data.message) {
                alert(error.response.data.message)
              } else {
                alert('请重新登录')
              }
              isAlertShow = true
            }
            if (Router.history.current.name !== 'login') {
              Router.replace({ name: 'login' })
              localStorage.setItem('loginInfo', '')
              location.reload()
            }
          }
          if (error.response.status === 500) {
            alert(i18n.messages[i18n.locale]['g_e_system'])
          }
          commit(type.base, { type: type.failure, error })
        }

        reject(error)
      })
  })
}

export default Request
