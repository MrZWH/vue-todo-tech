import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    // props: true,
    component: Todo,
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'app'
    },
    // children: [
    //   {
    //     path: 'test'
    //   }
    // ]
  },
  {
    path: '/login',
    component: Login
  }
]
