const path = require('path')
// 非缓存的require方法，下次require时仍然读取最新文件
function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

module.exports = function (app) {
  app.use(function (req, res, next) {
    // 透传其他请求，除了/api开头的
    if (!req.path.startsWith('/api')) {
      return next()
    }
    // 动态加载mocks数据，即使它被更新了
    try {
      // 这里使用了json文件，你也可以使用js模块，它仍然是动态的
      // 比如把返回改成函数调用：
      // const module = path.join(__dirname, req.path + '.json')
      // const fn = requireUncached(module)
      // fn(req, res, next)
      if(!/\.\w+$/.test(req.path)) {
        req.path += '.json'
      }
      const module = path.join(__dirname, req.path)
      const data = requireUncached(module)
      res.json(data)
    } catch (e) {
      next(e.message)
    }
  })
}
