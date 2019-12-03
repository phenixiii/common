import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router/index.js'
import Router from 'vue-router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'           
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/utils/permission' // permission control

import jsEnum from '@/assets/js/enum.js'
import jsRes from '@/assets/js/res.js'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})

// set ElementUI lang to zh-cn
Vue.use(ElementUI, { locale })

//全局
window.jsEnum = jsEnum;
window.jsRes = jsRes;

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

//runtime

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}