import { createTypes, createMutations } from '@/libs'
import Request from '@/request'

const types = {
  GET_TOPIC_INFO: createTypes('GET_TOPIC_INFO')
}

const state = {
  sort: 1,
  topicId: 0,
  regionId: 'all',
  message: {},
  status: {},
  error: {}
}

const actions = {
  getTopicInfo (context, qs) {
    return Request(context, types.GET_TOPIC_INFO, {
      url: 'topic',
      method: 'GET',
      qs: qs,
      auth: true
    })
  },
}
const getters = {
  topicId: state => state.topicId || ''
}

const mutations = {
  [types.GET_MEMBER_RELATED_TOPICS] (state) {
    console.log('a', state)
  },
  ...createMutations(types),
  topicId (state, topicId) {
    state.topicId = topicId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
