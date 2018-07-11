import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import './assets/styles/global.styl'
import createrRouter from './config/router'
import { resolve } from 'url';

Vue.use(VueRouter)

const router = createrRouter()

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
  render: (h) => h(App)
}).$mount('#root')