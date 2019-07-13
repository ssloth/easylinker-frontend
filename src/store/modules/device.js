// import store from '@/store'
import {
  queryDeviceCoAP,
  queryDeviceHTTP,
  queryDeviceMQTT,
  queryDeviceData,
  queryDeviceDetail,
  addDeviceCoAP,
  addDeviceMQTT,
  addDeviceHTTP,
  queryDeviceType,
  queryDeviceProtocol
} from '@/api/device'
const device = {
  state: {
    list: [],
    deviceTypeList: [],
    device: {
      detail: {},
      data: []
    }
  },
  mutations: {
    SET_DEVICE_LIST (state, list) {
      state.list = list
    },
    SET_DEVICE_TYPE_LIST (state, deviceTypeList) {
      state.deviceTypeList = deviceTypeList
    },
    SET_DEVICE_PROTOCOL_LIST (state, deviceProtocolList) {
      state.deviceProtocolList = deviceProtocolList
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
      const { data } = await queryDeviceData(parameter)
      commit('SET_DEVICE_DATA', data)
    },
    async QueryDeviceDetail ({ commit }, parameter) {
      const { data } = await queryDeviceDetail(parameter)
      commit('SET_DEVICE_DETAIL', data)
    },
    async QueryDeviceType ({ commit }, data) {
      const response = await queryDeviceType(data)
      commit('SET_DEVICE_TYPE', response.data)
    },
    async QueryDeviceProtocol ({ commit }, data) {
      const response = await queryDeviceProtocol(data)
      commit('SET_DEVICE_PROTOCOL', response.data)
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
