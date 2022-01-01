import Vue from 'vue'
import nprogress from 'nprogress'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: []
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (!localStorage.getItem('token')) {
      return next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  next()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
