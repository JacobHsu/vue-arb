import { createTypes, createMutations } from '@/libs'
import Request from '@/request'

const types = {
  GET_TOPICS: createTypes('GET_TOPICS')
}

const state = {
  sort: 1,
  topicTypeId: 1,
  regionId: 'all',
  message: {},
  status: {},
  error: {}
}

const getters = {

}

const actions = {
  getTopics (context, searchKeyword) {
    const qs = {
      topicTypeId: state.topicTypeId,
      sort: state.sort
    }

    if (state.regionId && state.regionId !== 'all') { qs.regionId = state.regionId }
    if (searchKeyword) qs.keyword = searchKeyword

    return Request(context, types.GET_TOPICS, {
      url: 'topics',
      method: 'GET',
      auth: false,
      qs
    })
  }
}


const mutations = {
  ...createMutations(types)
}

export default {
  state,
  getters,
  actions,
  mutations
}