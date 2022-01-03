import 'nprogress/nprogress.css'
import Vue from 'vue'
import './registerServiceWorker'

import App from './app'
import { CONFIG_FILE } from './constants/env'
import dynamicImport from './utils/dynamic-import'

Vue.config.productionTip = false

const app = new App({
  el: '#app',
  configFile: CONFIG_FILE,
  loadScript: dynamicImport
})

app.start()
