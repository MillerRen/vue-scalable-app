import Vue from 'vue'
import dynamicImport from './utils/dynamic-import'
import router from './router'

function initPlugins (plugins = []) {
  return Promise.all(
    plugins.map(plugin => {
      return dynamicImport(plugin.url).then(plugin => {
        Vue.use(plugin)
      })
    })
  )
}

function initComponents (components = []) {
  components.map(component => {
    Vue.component(component.name, function () {
      return dynamicImport(component.url)
    })
  })
}

function initRoutes (routes = []) {
  routes.map(route => {
    route.url && initComponents([route])
    route.component = Vue.component(route.name)
    router.addRoute(route)
  })
}

export default function bootstrap () {
  return dynamicImport('/config.js').then(config => {
    return initPlugins(config.plugins || []).then(() => {
      initComponents(config.components || [])
      initRoutes(config.routes || [])
    })
  })
}
