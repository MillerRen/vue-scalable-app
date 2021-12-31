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

args.target = 'lib'
args.formats = 'umd-min'

args.name = entry.replace(/(.*\/|.*\\)*(.*\/|.*\\)(.*)\.vue$/, '$2$3')

service.run(command, args, rawArgv).catch(err => {
  console.error(err)
  process.exit(1)
})