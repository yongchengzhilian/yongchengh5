import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/pay',
      component: () => import('@/views/pay/')
    }
  ]
})
