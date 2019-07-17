// import store from '@/store'
import { merge } from 'lodash'
import {
  addDevice,
  queryDevice,
  queryDeviceData,
  queryDeviceDetail,
  queryDeviceType,
  queryDeviceProtocol,
  queryDeviceStatus
} from '@/api/device'

const defaultQuery = {
  page: 0,
  size: 10
}

const device = {
  state: {
    list: [],
    deviceTypeMap: [],
    deviceProtocolMap: [],
    device: {
      detail: {},
      data: []
    }
  },
  mutations: {
    SET_DEVICE_LIST (state, list) {
      state.list = list
    },
    SET_DEVICE_TYPE_MAP (state, deviceTypeMap) {
      state.deviceTypeMap = deviceTypeMap
    },
    SET_DEVICE_PROTOCOL_MAP (state, deviceProtocolMap) {
      state.deviceProtocolMap = deviceProtocolMap
    },
    SET_DEVICE_DETAIL (state, detail) {
      state.device.detail = detail
    },
    SET_DEVICE_DATA (state, data) {
      state.device.data = data
    }
  },
  actions: {
    async AddDevice ({ commit }, data) {
      const response = await addDevice(data)
      return response
    },
    async QueryDevice ({ commit }, parameter) {
      const { deviceProtocol } = parameter
      if (!deviceProtocol) return { data: [], pageNo: 0, totalCount: 0, pageSize: 0, totalPage: 0 }
      const {
        data: { content, size, number, totalElements, totalPages }
      } = await queryDevice(merge(defaultQuery, parameter))
      return {
        data: content,
        pageNo: number,
        totalCount: totalElements,
        pageSize: size,
        totalPage: totalPages
      }
    },
    async QueryDeviceData ({ commit }, parameter) {
      const { data } = await queryDeviceData(parameter)
      commit('SET_DEVICE_DATA', data)
    },
    async QueryDeviceDetail ({ commit }, parameter) {
      const { data } = await queryDeviceDetail(parameter)
      commit('SET_DEVICE_DETAIL', data)
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
    }
  }
}

export default device
