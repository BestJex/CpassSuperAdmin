/**
 * 客户管理
 */
import { _import } from '../config/env'
import layout from '@/views/layout/layout.vue'

export default [{
  name: '客户管理',
  path: '/client',
  redirect: '/client/list',
  component: layout,
  noDropdown: false,
  icon: 'icon-kehu',
  children: [{
    name: '客户列表',
    path: 'list',
    component: _import('client/index')
  }, {
    name: '',
    path: 'add',
    component: _import('client/add/index'),
    hidden: true,
    meta: { title: '', level2: true }
  }, {
    name: '修改客户资料',
    path: 'modify',
    component: _import('client/edit/index'),
    hidden: true,
    meta: { level2: true }
  }, {
    name: '客户详情',
    path: 'detail',
    component: _import('client/detail/index'),
    hidden: true,
    meta: { level2: true }
  }, {
    name: '账户信息',
    path: 'account',
    component: _import('client/account/index'),
    hidden: true,
    meta: {
      // 是否是二级页包括 3级 等
      level2: true,
      // title 是否显示下载 pdf 按钮
      pdf: true
    }
  },

  // 空间列表
  {
    name: '空间列表',
    path: 'space',
    component: _import('client/space/index'),
    meta: { level2: true }
  },

  // 城市维护
  {
    name: '城市维护',
    path: 'city',
    component: _import('client/city-maintain/index'),
    meta: { level2: true }
  }]
}]
