import Vue from 'vue'
import router from './router'
import store from './store'

import '../theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'                    // 自定义主题
import ElementUI from 'element-ui'

import vuePermissions from './directive/permissions/index'  // 如果参数为true是，聚焦元素
import App from './App'
import comMixins from '@/mixins'                            // 全局的方法
import './interceptors'                                     // 路由拦截
import { title, item, cardEmpty } from '@/components'
import './icons'

Vue.use(ElementUI, { size: 'medium' })
Vue.use(vuePermissions)
Vue.mixin(comMixins)

// 全局注册组件
const components = [
  title, item, cardEmpty
]
components.map(component => {
  Vue.component(component.name, component)
})

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

new Vue({
  router,
  store,
  ...App,
  mounted() {
    this.setOpenedList()
  },
  methods: {
    setOpenedList() {
      this.$store.dispatch('setOpenedList')
    }
  }
}).$mount('#app')
