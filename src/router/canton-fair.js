/**
 * 广交会活动
 */
import { _import } from '../config/env'
import layout from '@/views/layout/layout.vue'

export default [{
  name: '广交会活动',
  path: '/canton-fair',
  hidden: true,
  redirect: '/canton-fair/exchange',
  component: layout,
  icon: 'icon-activity',
  children: [
    {
      name: '兑换列表',
      path: 'exchange',
      component: _import('canton-fair/exchange')
    }, {
      name: '店铺核销',
      path: 'write-off',
      component: _import('canton-fair/write-off')
    }
  ]
}]
