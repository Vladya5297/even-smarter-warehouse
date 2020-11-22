const { task, src, dest } = require('gulp')

const File = require('./tools/File.js')

function processAliases () {
  const customAliases = new File('aliases.json').readJson()

  const jsConfigPaths = {}
  for (const aliasName in customAliases) {
    const aliasPath = customAliases[aliasName]
    if (new File(aliasPath).getPath().ext) {
      jsConfigPaths[`${aliasName}`] = [`${aliasPath}`]
    } else {
      jsConfigPaths[`${aliasName}/*`] = [`${aliasPath}/*`]
    }
  }

  const jsConfig = new File('jsconfig.json')
  const config = jsConfig.readJson() || {}
  try {
    config.compilerOptions.paths = jsConfigPaths
  } catch {
    config.compilerOptions = {
      jsx: 'react',
      baseUrl: '.',
      paths: jsConfigPaths
    }
  }
  jsConfig.writeJson(config)
}

task('process-aliases', async (cb) => {
  processAliases()
  cb()
})

task('copy-styles', (cb) => {
  src([
    './node_modules/antd/dist/antd.css',
    './node_modules/antd/dist/antd.css.map',
    './node_modules/antd/dist/antd.dark.css',
    './node_modules/antd/dist/antd.dark.css.map'
  ]).pipe(
    dest('./public/styles')
  )
  cb()
})
