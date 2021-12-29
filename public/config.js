// config shuld be a json file but we have not a json loader
// requirejs can load amd js directly.
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
        name: 'App',
        url: '/views/App/index.umd.min.js',
        children: [
          {
            path: '',
            name: 'Home',
            url: '/views/Home/index.umd.min.js'
          },
          {
            path: 'About',
            name: 'About',
            url: '/views/About/index.umd.min.js'
          }
        ]
      },
      {
        path: '*',
        component: {
          template: '<div>404</div>'
        }
      }
    ]
  }
})
