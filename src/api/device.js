import { axios } from '@/utils/request'

/**
 * 添加COAP设备
 */
export function addDeviceCoAP (data) {
  return axios({
    url: '/easyboot/device/addCoap',
    method: 'post',
    data
  })
}

/**
 * 添加MQTT设备
 */
export function addDeviceMQTT (data) {
  return axios({
    url: '/easyboot/device/addMqtt',
    method: 'post',
    data
  })
}

/**
 * 添加HTTP设备
 */
export function addDeviceHTTP (data) {
  return axios({
    url: '/easyboot/device/addHttp',
    method: 'post',
    data
  })
}

/**
 * 查询CoAP设备
 */
export function queryDeviceCoAP (parameter) {
  return axios({
    url: 'easyboot/device/listCoap',
    method: 'get',
    parameter
  })
}

/**
 * 查询MQTT设备
 */
export function queryDeviceMQTT (parameter) {
  return axios({
    url: 'easyboot/device/listMqtt',
    method: 'get',
    parameter
  })
}

/**
 * 查询HTTP设备
 */
export function queryDeviceHTTP (parameter) {
  return axios({
    url: 'easyboot/device/listHttp',
    method: 'get',
    parameter
  })
}

/**
 * 查询设备详情
 */
export function queryDeviceDetail (parameter) {
  return axios({
    url: 'easyboot/device/listHttp',
    method: 'get',
    parameter
  })
}

/**
 * 查询设备数据
 */
export function queryDeviceData () {
  return axios({
    url: 'easyboot/device/listHttp',
    method: 'get'
  })
}

/**
 * 查询设备支持协议
 */
export function queryDeviceProtocol () {
  return axios({
    url: 'easyboot/device/listProtocolType',
    method: 'get'
  })
}

/**
 * 查询设备支持类型
 */
export function queryDeviceType () {
  return axios({
    url: 'easyboot/device/listDeviceType',
    method: 'get'
  })
}
