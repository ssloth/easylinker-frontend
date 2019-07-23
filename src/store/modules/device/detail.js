import { listQueryAdapter } from '@/utils/adapter'
import { queryDeviceData } from '@/api/device'

export default {
  state: {
    detail: {}
  },
  mutations: {
    SET_DEVICE_DETAIL (state, detail) {
      state.detail = detail
    }
  },
  actions: {
    SetDeviceDetail ({ commit }, detail) {
      commit('SET_DEVICE_DETAIL', detail)
    },
    async QueryDeviceDataList (_, parameter) {
      listQueryAdapter(queryDeviceData)(parameter)
    }
  }
}
