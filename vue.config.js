const path = require('path')
const mocks = require('./mocks')
const env = process.env

module.exports = {
  indexPath: `index-${env.npm_package_gitHead}.html`,
  productionSourceMap: env.NODE_ENV !== 'production',
  css: {
    extract: false,
    sourceMap: false
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    disableHostCheck: true,
    setup (app) {
      // mocks数据，我们已经有了一个dev server，为啥不用呢！
      mocks(app)
    }
  },
  pwa: {
    workboxOptions: {
      importWorkboxFrom: 'local'
    }
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    config.plugins.delete('pwa')
    config.plugins.delete('workbox')
    config.output.libraryTarget('umd')
    config.output.libraryExport('')
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 20480 }))
  }
}
