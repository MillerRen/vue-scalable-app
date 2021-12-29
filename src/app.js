import Vue from 'vue'
import router from './router'
import store from './store'

export default class App {
  constructor (options) {
    this.options = options
  }

  loadConfig () {
    if (localStorage.getItem('config')) {
      return Promise.resolve(JSON.parse(localStorage.getItem('config')))
    }
    return this.options.loadScript(this.options.configFile)
  }

  initPlugins (plugins = []) {
    return Promise.all(
      plugins.map(plugin => {
        return this.options.loadScript(plugin.url).then(plugin => {
          Vue.use(plugin)
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
      route.component = route.component || Vue.component(route.name)
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

  bootstrap () {
    return this.loadConfig().then(config => {
      return this.initPlugins(config.plugins || []).then(() => {
        this.initComponents(config.components || [])
        this.initRoutes(config.routes || [])
        this.createApp({
          theme: config.theme
        })
      })
    })
  }

  start () {
    return this.bootstrap()
  }
}
