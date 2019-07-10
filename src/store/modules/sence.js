import { querySenceList } from '@/api/sence'
const sence = {
  state: {
    list: [],
    loading: null
  },

  mutations: {
    SET_SENCE_LIST (state, senceList) {
      state.list = senceList
    }
  },

  actions: {
    async QuerySenceList ({ commit }, parameter) {
      const {
        data: { content }
      } = await querySenceList(parameter)
      commit('SET_SENCE_LIST', content)
    }
  }
}

export default sence
