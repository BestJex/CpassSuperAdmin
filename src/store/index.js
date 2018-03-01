import Vue from 'vue'
import Vuex from 'vuex'

import { app, permission, common, tagsView, counter } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    permission,
    common,
    tagsView,
    counter
  }
})
