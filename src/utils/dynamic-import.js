/* eslint import/no-webpack-loader-syntax: off */
import 'script-loader!requirejs/require.js'

const requirejs = window.requirejs

requirejs.config({
  baseUrl: '/'
})

export default function (url) {
  return new Promise((resolve, reject) => {
    requirejs([url], resolve, reject)
  })
}
