// 单独构建分包，部分代码来自@vue/cli-service
// 由于@vue/cli-service 指定--name 参数时无法自动替换[name]占位符
// 如果它能够支持了，可以不用此文件，直接使用--name参数[name]即可
const Service = require('@vue/cli-service/lib/Service')
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    // FIXME: --no-module, --no-unsafe-inline, no-clean, etc.
    'modern',
    'report',
    'report-json',
    'inline-vue',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose'
  ]
})
const command = args._[0]
const entry = args._[1]

if(entry) {
  args.target = 'lib'
  args.formats = 'umd-min'
  args.name = entry.replace(/(.*\/|.*\\)*(.*\/|.*\\)(.*)\.(vue|js)$/, '$2$3.[hash:7]')
}

service.run(command, args, rawArgv).catch(err => {
  console.error(err)
  process.exit(1)
})