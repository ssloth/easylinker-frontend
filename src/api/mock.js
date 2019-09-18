export const listProtocolType = {
  msg: '操作成功',
  code: 0,
  data: [
    { name: 'HTTP协议设备', key: 'HTTP' },
    { name: 'CoAP协议设备', key: 'CoAP' }
    // { name: 'MQTT协议设备', key: 'MQTT' },
    // { name: 'UDP协议设备', key: 'UDP' },
    // { name: 'TCP协议设备', key: 'TCP' }
  ]
}

export const listDeviceType = {
  msg: '操作成功',
  code: 0,
  data: [
    { name: '数值型设备', key: 'VALUE' },
    { name: '文本型设备', key: 'TEXT' },
    { name: '布尔型设备', key: 'BOOLEAN' },
    { name: '开关型设备', key: 'SWITCH' }
    // { name: '文件型设备', key: 'FILE' },
    // { name: '流媒体型设备', key: 'STREAM' },
    // { name: '终端型设备', key: 'TERMINAL_HOST' }
  ]
}
