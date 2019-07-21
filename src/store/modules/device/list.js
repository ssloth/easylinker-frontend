// import store from '@/store'
import {
  addDevice,
  updateDevice,
  queryDevice,
  queryDeviceType,
  queryDeviceProtocol,
  queryDeviceStatus
} from '@/api/device'

const deviceList = {
  state: {
    list: [],
    deviceTypeMap: [],
    deviceProtocolMap: [],
    deviceStatusMap: []
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
    // NOTE: Pagination 是从1开始，后端是从0返回，咱也不敢让后端改接口，先每次查询都将page-1，将返回的页数手动加1
    async QueryDevice ({ commit }, parameter) {
      const { deviceProtocol, page } = parameter
      if (!deviceProtocol) return { data: [], pageNo: 0, totalCount: 0, pageSize: 0, totalPage: 0 }
      const {
        data: { content, size, number, totalElements, totalPages }
      } = await queryDevice({ ...parameter, ...{ page: page - 1 } })
      return {
        data: content,
        pageNo: number + 1,
        totalCount: totalElements,
        pageSize: size,
        totalPage: totalPages
      }
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

export default deviceList
