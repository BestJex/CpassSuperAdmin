/**
 * 场地管理
 */
import { _import } from '../config/env'
import layout from '@/views/layout/layout.vue'

export default [{
  name: '场地管理',
  path: '/field',
  redirect: '/field/list',
  component: layout,
  icon: 'icon-Site',
  children: [{
    name: '场地列表',
    path: 'list',
    component: _import('field/list')
  }, {
    name: '场地详情',
    path: 'detail',
    hidden: true,
    component: _import('field/detail')
  }, {
    name: '场地订单',
    path: 'order',
    component: _import('field/order')
  }, {
    name: '场地订单详情',
    path: 'order/detail',
    hidden: true,
    component: _import('field/order-detail')
  }]
}]
