import { axios } from '@/utils/request'

/**
 * 添加场景
 */
export function addSence (parameter) {
  return axios({
    url: '/easyboot/scene/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 添加自定义场景
 */
export function addCustomScene (parameter) {
  return axios({
    url: '/easyboot/scene/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 查询场景列表
 */
export function querySenceList (parameter) {
  return axios({
    url: '/easyboot/scene/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 查询场景类型
 */
export function querySceneType (parameter) {
  return axios({
    url: '/easyboot/scene/listSceneType',
    method: 'get',
    params: parameter
  })
}

/**
 * 查询场景下设备
 */
export function querySenceDevice (parameter) {
  return axios({
    url: '/easyboot/scene/listDevice',
    method: 'get',
    params: parameter
  })
}
