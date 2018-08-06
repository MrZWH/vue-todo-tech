const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render-no-bundle')
const serverConfig = require('../../build/webpack.config.server')

const NativeModule = require('module')
const vm = require('vm')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.hasErrors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    'server-entry.js'
  )
  // delete require.cache[bundlePath]
  // bundle = require('../../server-build/server-entry.js').default
  try {
    const m = { exports: {}}
    const bundleStr = mfs.readFileSync(bundlePath, 'utf-8')
    const wrapper = NativeModule.wrap(bundleStr)
    const script = new vm.Script(wrapper, {
      filename: 'server-entry.js',
      displayErrors: true
    })
    const result = script.runInNewContext()
    result.call(m.exports, m.exports, require, m)
    bundle = m.exports.default
  } catch (error) {
    console.error('compile js error', error)
  }
  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '等一会'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data
  const template = fs.readFileSync(
    path.json(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer.createRenderer({
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router