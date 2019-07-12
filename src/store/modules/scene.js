import store from '@/store'
import { querySceneList, queryPreInstallTemplate, querySceneType, addScene } from '@/api/scene'
const defaultQuery = {
  page: 0,
  size: 10
}
const scene = {
  state: {
    list: [],
    preInstallTemplate: {},
    sceneType: {},
    loading: {
      submitLoading: false
    }
  },

  mutations: {
    SET_SENCE_LIST (state, sceneList) {
      state.list = sceneList
    },
    SET_PER_INSTALL_TEMPLATE (state, preInstallTemplate) {
      state.preInstallTemplate = preInstallTemplate
    },
    SET_SENCE_TYPE (state, sceneType) {
      state.sceneType = sceneType
    },
    SET_SUBMIT_LOADING (state, loading) {
      state.sceneType = loading
    }
  },

  actions: {
    async QuerySceneList ({ commit }, parameter) {
      const {
        data: { content }
      } = await querySceneList(parameter)
      commit('SET_SENCE_LIST', content)
    },
    async QueryPreInstallTemplate ({ commit }) {
      const { data } = await queryPreInstallTemplate()
      commit('SET_PER_INSTALL_TEMPLATE', data)
    },
    async QuerySceneType ({ commit }) {
      const { data } = await querySceneType()
      commit('SET_SENCE_TYPE', data)
    },
    async AddScene ({ commit }, data) {
      commit('SET_SUBMIT_LOADING', true)
      try {
        const respent = await addScene(data)
        await store.dispatch('QuerySceneList', defaultQuery)
        commit('SET_SUBMIT_LOADING', false)
        return respent
      } catch (error) {
        console.log(error)
        commit('SET_SUBMIT_LOADING', false)
        return error
      }
    }
  }
}

export default scene
