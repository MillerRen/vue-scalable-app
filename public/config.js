// config shuld be a json file but we have not a json loader
// requirejs can load amd js directly.
define(function (require, module, exports) {
  return {
    theme: 'default',
    plugins: [],
    components: [
      {
        name: 'HelloWorld',
        url: '/components/HelloWorld.39242a3.umd.min.js'
      }
    ],
    routes: [
      {
        path: '/',
        name: 'App',
        url: '/views/App.24e789a.umd.min.js',
        children: [
          {
            path: '',
            name: 'Home',
            url: '/views/Home.bb9dc5c.umd.min.js'
          },
          {
            path: 'About',
            name: 'About',
            url: '/views/About.00a60eb.umd.min.js',
            meta: {
              requiredAuth: true
            }
          },
          {
            path: 'login',
            name: 'Login',
            url: '/views/Login.6a3944c.umd.min.js'
          },
          {
            path: '404',
            alias: '*',
            name: 'Notfound',
            url: '/views/404.ae82108.umd.min.js'
          }
        ]
      }
    ]
  }
})
