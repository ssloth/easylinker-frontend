// import store from '@/store'
import {
  queryDeviceCoAP,
  queryDeviceHTTP,
  queryDeviceMQTT,
  queryDeviceData,
  queryDeviceDetail,
  addDeviceCoAP,
  addDeviceMQTT,
  addDeviceHTTP
} from '@/api/device'
const device = {
  state: {
    list: [],
    device: {
      detail: {},
      data: []
    }
  },
  mutations: {
    SET_DEVICE_LIST (state, list) {
      state.list = list
    },
    SET_DEVICE_DETAIL (state, detail) {
      state.device.detail = detail
    },
    SET_DEVICE_DATA (state, data) {
      state.device.data = data
    }
  },
  actions: {
    async QueryDeviceCoAP ({ commit }, parameter) {
      const {
        data: { content }
      } = await queryDeviceCoAP(parameter)
      commit('SET_DEVICE_LIST', content)
    },
    async QueryDeviceMQTT ({ commit }, parameter) {
      const {
        data: { content }
      } = await queryDeviceMQTT(parameter)
      commit('SET_DEVICE_LIST', content)
    },
    async QueryDeviceHTTP ({ commit }, parameter) {
      const {
        data: { content }
      } = await queryDeviceHTTP(parameter)
      commit('SET_DEVICE_LIST', content)
    },
    async QueryDeviceData ({ commit }, parameter) {
      const {
        data: { content }
      } = await queryDeviceData(parameter)
      commit('SET_DEVICE_DATA', content)
    },
    async QueryDeviceDetail ({ commit }, parameter) {
      const {
        data: { content }
      } = await queryDeviceDetail(parameter)
      commit('SET_DEVICE_DETAIL', content)
    },
    async AddDeviceCoAP ({ commit }, data) {
      await addDeviceCoAP(data)
    },
    async AddDeviceMQTT ({ commit }, data) {
      await addDeviceMQTT(data)
    },
    async AddDeviceHTTP ({ commit }, data) {
      await addDeviceHTTP(data)
    }
  }
}

export default device
