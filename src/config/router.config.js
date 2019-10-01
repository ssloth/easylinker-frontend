import { UserLayout, BasicLayout, RouteView } from '@/layouts'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/home/index',
    children: [
      {
        path: '/home',
        name: 'control',
        redirect: '/home',
        component: RouteView,
        meta: { title: '控制中心', keepAlive: true, icon: 'appstore' },
        children: [
          {
            path: '/home/index',
            name: 'home',
            component: () => import('@/views/Home'),
            meta: { title: 'Dashboard', keepAlive: true }
          }
        ]
      },
      {
        path: '/device',
        name: 'device',
        redirect: '/device/list',
        component: RouteView,
        meta: { title: '设备管理', keepAlive: true, icon: 'database' },
        children: [
          {
            path: '/device/list',
            name: 'deviceList',
            component: () => import('@/views/Device/List/index'),
            meta: { title: '设备列表', keepAlive: true }
          },
          {
            path: '/device/list/boolean/:id',
            name: 'deviceBoolean',
            hidden: true,
            component: () => import('@/views/Device/List/Detail/Boolean'),
            meta: { title: '布尔设备-详情', keepAlive: true }
          },
          {
            path: '/device/list/value/:id',
            name: 'deviceValue',
            hidden: true,
            component: () => import('@/views/Device/List/Detail/Value'),
            meta: { title: '数值设备-详情', keepAlive: true }
          },
          {
            path: '/device/list/swtich/:id',
            name: 'deviceSwitch',
            hidden: true,
            component: () => import('@/views/Device/List/Detail/Swtich'),
            meta: { title: '开关设备-详情', keepAlive: true }
          }
        ]
      },
      {
        path: '/scene',
        name: 'scene',
        redirect: '/scene/list',
        component: RouteView,
        meta: { title: '场景管理', keepAlive: true, icon: 'bank' },
        children: [
          {
            path: '/scene/list',
            name: 'sceneList',
            component: () => import('@/views/Scene/List'),
            meta: { title: '场景列表', keepAlive: true }
          }
        ]
      },
      {
        path: '/system',
        name: 'system',
        redirect: '/system/user',
        component: RouteView,
        meta: { title: '系统管理', keepAlive: true, icon: 'setting' },
        children: [
          {
            path: '/system/user',
            name: 'systemUser',
            component: () => import('@/views/System/User'),
            meta: { title: '用户中心', keepAlive: true }
          },
          {
            path: '/system/setting',
            name: 'systemSetting',
            component: () => import('@/views/System/Setting'),
            meta: { title: '系统设置', keepAlive: true }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/User/New-Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/User/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/User/RegisterResult')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/Exception/404')
  }
]
