/**
 * 设备管理/设备列表
 */
import { listQueryAdapter, listQueryEchoAdapter } from '@/utils/adapter'
import deviceTypeModel from '@/model/device/type/index'
import {
  addDevice,
  updateDevice,
  queryDeviceList,
  queryDeviceType,
  queryDeviceProtocol,
  queryDeviceStatus,
  queryDeviceDataList,
  queryDeviceOperateLogList
} from '@/api/device'

const device = {
  state: {
    detail: {},
    uploadColumns: [],
    deviceTypeMap: [],
    deviceProtocolMap: [],
    deviceStatusMap: [],
    operationColumns: []
  },
  mutations: {
    SET_DEVICE_DETAIL (state, detail) {
      state.detail = detail
    },
    SET_DEVICE_TYPE_MAP (state, deviceTypeMap) {
      state.deviceTypeMap = deviceTypeMap
    },
    SET_DEVICE_PROTOCOL_MAP (state, deviceProtocolMap) {
      state.deviceProtocolMap = deviceProtocolMap
    },
    SET_DEVICE_STATUS_MAP (state, deviceStatusMap) {
      state.deviceStatusMap = deviceStatusMap
    },
    SET_OPERATION_COLUMNS (state, operationColumns) {
      state.operationColumns = operationColumns
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
    async SetDeviceDetail ({ commit }, data) {
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
    },
    async QueryDeviceTypeModel ({ commit }, type) {
      commit('SET_OPERATION_COLUMNS', deviceTypeModel[type] || [])
    },
    async QueryDeviceList ({ commit }, parameter) {
      const { deviceProtocol } = parameter
      if (!deviceProtocol) return { data: [], pageNo: 0, totalCount: 0, pageSize: 0, totalPage: 0 }
      const result = await listQueryAdapter(queryDeviceList)(parameter)
      return result
    },
    async QueryDeviceDataList ({ commit }, parameter) {
      const { deviceProtocol } = parameter
      if (!deviceProtocol) return { data: [], pageNo: 0, totalCount: 0, pageSize: 0, totalPage: 0 }
      const result = await listQueryAdapter(queryDeviceDataList)(parameter)
      return result
    },
    async QueryDeviceOperateLogList ({ commit }, parameter) {
      const { deviceSecurityId } = parameter
      if (!deviceSecurityId) return { data: [], pageNo: 0, totalCount: 0, pageSize: 0, totalPage: 0 }
      const result = await listQueryEchoAdapter(queryDeviceOperateLogList)(parameter)
      return result
    }
  }
}

export default device
