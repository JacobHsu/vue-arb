import camelCase from 'lodash/camelCase'
import Vue from 'vue'
import _ from 'lodash'

export const createTypes = (type) => {
  if (_.isString(type)) return createType(type)

  if (_.isArray(type)) {
    return _.fromPairs(_.map(type, value => ([value, createType(value)])))
  }

  return {}
}

function createType (type) {
  return {
    base: `${type}`,
    success: `${type}_SUCCESS`,
    failure: `${type}_FAILURE`,
    processing: `${type}_PROCESSING`,
    processingKey: camelCase(`${type}Processing`),
    dataKey: camelCase(`${type}Data`),
    error: camelCase(`${type}Error`)
  }
}

/* eslint-disable no-param-reassign */
export const createMutations = (types) => {
  const mutation = {}
  Object.keys(types).forEach((key) => {
    const type = types[key]
    const camelCaseType = camelCase(type.base)

    mutation[type.base] = (state, payload) => {
      switch (payload.type) {
        case type.processing:
          Vue.set(state, type.processingKey, payload.value)
          break
        case type.success:
          Vue.set(state, type.dataKey, payload.data)
          Vue.set(state.status, camelCaseType, payload.status)
          Vue.set(state.message, camelCaseType, payload.message)
          Vue.set(state, type.processingKey, false)
          break
        case type.failure:
          Vue.set(state.error, camelCaseType, payload.error)
          Vue.set(state, type.processingKey, false)
          break
        default:
          /* eslint-disable no-console */
          console.error('Please check the types!')
          break
      }
    }
  })
  return mutation
}