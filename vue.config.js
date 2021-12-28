const path = require('path')

module.exports = {
  productionSourceMap: false,
  css: {
    extract: false,
    sourceMap: false
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 20480 }))
  }
}
