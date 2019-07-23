/**
 * 设备管理/设备列表
 */
import { listQueryAdapter } from '@/utils/adapter'
import {
  addDevice,
  updateDevice,
  queryDeviceList,
  queryDeviceType,
  queryDeviceProtocol,
  queryDeviceStatus
} from '@/api/device'

const deviceList = {
  state: {
    deviceDataFn: null,
    deviceTypeMap: [],
    deviceProtocolMap: [],
    deviceStatusMap: []
  },
  mutations: {
    SET_DEVICE_DATA_FN (state, list) {
      state.list = list
    },
    SET_DEVICE_TYPE_MAP (state, deviceTypeMap) {
      state.deviceTypeMap = deviceTypeMap
    },
    SET_DEVICE_PROTOCOL_MAP (state, deviceProtocolMap) {
      state.deviceProtocolMap = deviceProtocolMap
    },
    SET_DEVICE_STATUS_MAP (state, deviceStatusMap) {
      state.deviceStatusMap = deviceStatusMap
    }
  },
  actions: {
    async AddDevice ({ commit }, data) {
      const response = await addDevice(data)
      return response
    },
    async UpdateDevice ({ commit }, data) {
      const response = await updateDevice(data)
      return response
    },
    async QueryDeviceType ({ commit }, parameter) {
      const { data } = await queryDeviceType(parameter)
      commit('SET_DEVICE_TYPE_MAP', data)
    },
    async QueryDeviceProtocol ({ commit }, parameter) {
      const { data } = await queryDeviceProtocol(parameter)
      commit('SET_DEVICE_PROTOCOL_MAP', data)
    },
    async QueryDeviceStatus ({ commit }) {
      const { data } = await queryDeviceStatus()
      commit('SET_DEVICE_STATUS_MAP', data)
    },
    async QueryDeviceDataFn ({ commit }, parameter) {
      const { deviceProtocol } = parameter
      if (!deviceProtocol) return { data: [], pageNo: 0, totalCount: 0, pageSize: 0, totalPage: 0 }
      commit('SET_DEVICE_DATA_FN', listQueryAdapter(queryDeviceList)(parameter))
    }
  }
}

export default deviceList
