import Vue from 'vue'
import router from './router'
import store from './store'
import { CONFIG_FILE } from './constants/env'

export default class App {
  constructor (options) {
    this.options = options
  }

  loadConfig () {
    // 本地配置，可以用于直接在线调试分包
    if (localStorage.getItem('config')) {
      return Promise.resolve(JSON.parse(localStorage.getItem('config')))
    }
    return store.dispatch('request', {
      url: CONFIG_FILE
    })
  }

  initPlugins (plugins = []) {
    return Promise.all(
      plugins.map(plugin => {
        return this.options.loadScript(plugin.url).then(plugin => {
          Vue.use(plugin.default || plugin)
        })
      })
    )
  }

  initComponents (components = []) {
    components.map(component => {
      Vue.component(component.name, () => {
        return this.options.loadScript(component.url)
      })
    })
  }

  initRoutes (routes = [], children = false) {
    return routes.map(route => {
      route.url && this.initComponents([route])
      route.name &&
        !route.component &&
        (route.component = Vue.component(route.name))
      route.children && this.initRoutes(route.children, true)
      !children && delete route.name && router.addRoute(route)
    })
  }

  createApp (ctx) {
    this.root = new Vue({
      provide () {
        return ctx
      },
      router,
      store,
      render: h => h('router-view')
    }).$mount(this.options.el)
  }

  checkLogin () {
    router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiredAuth)) {
        if (!store.state.token) {
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
  }

  bootstrap () {
    return this.loadConfig().then(config => {
      return this.initPlugins(config.plugins || []).then(() => {
        this.initComponents(config.components || [])
        this.initRoutes(config.routes || [])
        this.createApp({
          theme: config.theme
        })
        this.checkLogin()
      })
    })
  }

  start () {
    return this.bootstrap()
  }
}
