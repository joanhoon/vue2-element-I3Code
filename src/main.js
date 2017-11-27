import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters' // 全局filter
import './icons' // icon
// import './errorLog'// error log
import './permission' // 权限
import './mock'  // 该项目所有请求使用mockjs模拟
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

// 此处需要use后，this.$http.get或者this.$http.post才可以
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(ElementUI)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
