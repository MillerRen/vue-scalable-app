define(function (require, module, exports) {
  return {
    theme: 'default',
    plugins: [],
    components: [
      {
        name: 'HelloWorld',
        url: '/components/HelloWorld/index.umd.min.js'
      }
    ],
    routes: [
      {
        path: '/',
        name: 'Home',
        url: '/views/Home/index.umd.min.js'
      }
    ]
  }
})
