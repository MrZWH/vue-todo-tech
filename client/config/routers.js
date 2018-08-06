import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id',
    path: '/app',
    // props: true,
    // porps: (router) => ({ id: route.query.id})
    component: Todo,
    // component: () => import('../views/todo/todo.vue'),
    // component: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'app'
    },
    beforeEnter (to, from, next) {
      console.log('app router before enter')
      next()
    }
    // children: [
    //   {
    //     path: 'test'
    //   }
    // ]
  },
  {
    path: '/login',
    // component: () => import('../views/login/login.vue')
    component: Login
  }
]
