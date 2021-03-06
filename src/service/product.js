// 产品库
import fetch from '@/config/fetch'
import { API_PATH } from '@/config/env'

// 产品库新增页面 权限列表
export const permissionList = (obj) => fetch(API_PATH + '/supervisor/permission/selectList', obj, 'GET')

// 产品库下拉
export const productSelect = (obj) => fetch(API_PATH + '/supervisor/product/select', obj, 'GET')

// 产品库详情
export const productDetail = (obj) => fetch(API_PATH + '/supervisor/product/findDetail', obj, 'GET')

// 产品库编辑
export const productUpdate = (obj) => fetch(API_PATH + '/supervisor/product/update', obj, 'POST')

// 产品库新增
export const productAdd = (obj) => fetch(API_PATH + '/supervisor/product/save', obj, 'POST')

// 产品库名称校验
export const checkProductName = (obj) => fetch(API_PATH + '/supervisor/product/checkName', obj, 'GET')

// 产品库版本列表
export const productList = (obj) => fetch(API_PATH + '/supervisor/product/selectPage', obj, 'GET')

// 产品库禁用
export const productClose = (obj) => fetch(API_PATH + '/supervisor/product/close', obj, 'GET')

// 产品库恢复
export const productOpen = (obj) => fetch(API_PATH + '/supervisor/product/open', obj, 'GET')
