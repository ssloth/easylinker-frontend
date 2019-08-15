import deviceTypeModel from '@/model/device/type'

const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles || [],
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,

  sceneSecurityIdMap: state => state.scene.list.map(item => ({ name: item.name, key: item.securityId })),
  deviceOperationLogColumns: state =>
    deviceTypeModel[state.device.detail.deviceType && state.device.detail.deviceType.toLowerCase()],
  deviceDataColumns: state =>
    deviceTypeModel[state.device.detail.deviceType && state.device.detail.deviceType.toLowerCase()]
}

export default getters
