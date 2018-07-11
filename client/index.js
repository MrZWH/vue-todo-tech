import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

import './assets/styles/global.styl'
import createrRouter from './config/router'
import CreateStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createrRouter()
const store = CreateStore()

router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  // if (to.fullPath === '/app') {
  //   next({path: '/login'})
  // } else {
  //   next()
  // }
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
})

router.afterEach((to, from) => {
  console.log('after each invoked')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')