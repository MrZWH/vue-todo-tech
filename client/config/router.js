import Router from 'vue-router'
import routes from './routers'

// 为了服务端渲染不造成内存溢出而使用以下方法
export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/', // 基路径
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0}
      }
    },
    // fallback: true,
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // }
  })
}