import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will no redirct in the levelbar
* noDropdown : if `noDropdown:true` will has no submenu
* meta : { role: ['admin'] }  will control the page role
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  { path: '/gateway', component: _import('gateway/index'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    name: '用户管理模块',
    icon: 'users',
    children: [
      { path: 'user', icon: 'user', component: _import('user/user'), name: '用户管理' },
      { path: 'role', icon: 'role', component: _import('user/role'), name: '角色管理' },
      { path: 'topology', icon: 'topology', component: _import('user/topology'), name: '企业拓扑图' },
      { path: 'whse', icon: 'whse', component: _import('user/whse'), name: '仓库管理' },
      { path: 'factory', icon: 'factory', component: _import('user/factory'), name: '工厂管理' }
    ]
  },
  {
    path: '/plugin',
    component: Layout,
    redirect: 'noredirect',
    name: '插件管理模块',
    icon: 'plugin',
    children: [
      { path: 'plugin', icon: 'plugin', component: _import('plugin/plugin'), name: '插件管理' }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: 'noredirect',
    name: '消息队列管理',
    icon: 'message',
    children: [
      { path: 'server', icon: 'server', component: _import('message/server'), name: '消息服务管理' },
      { path: 'virtual', icon: 'virtual', component: _import('message/virtual'), name: '虚拟机管理' },
      { path: 'switch', icon: 'switch', component: _import('message/switch'), name: '交换机管理' },
      { path: 'queue', icon: 'queue', component: _import('message/queue'), name: '队列管理' }
    ]
  },
  {
    path: '/taskManagement',
    component: Layout,
    redirect: 'noredirect',
    name: '任务管理',
    icon: 'taskManagement',
    children: [
      { path: 'taskExecution', icon: 'taskExecution', component: _import('taskManagement/taskExecution'), name: '任务执行情况' },
      { path: 'taskManagement', icon: 'taskManagement', component: _import('taskManagement/taskManagement'), name: '任务管理' },
      { path: 'expression', icon: 'expression', component: _import('taskManagement/expression'), name: '表达式模板' }
    ]
  },
  {
    path: '/logManagement',
    component: Layout,
    redirect: 'noredirect',
    name: '日志管理',
    icon: 'logManagement',
    children: [
      { path: 'logManagement', icon: 'logManagement', component: _import('logManagement/logManagement'), name: '日志管理' },
      { path: 'logAllocation', icon: 'logAllocation', component: _import('logManagement/logAllocation'), name: '日志配置文件' }
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: 'noredirect',
    name: '设备管理',
    icon: 'device',
    children: [
      { path: 'device', icon: 'device', component: _import('device/device'), name: '设备管理' }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
