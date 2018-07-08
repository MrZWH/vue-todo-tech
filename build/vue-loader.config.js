  // const docsLoader = require.resolve('./doc-loader')

  module.exports = (isDev) => {
    return {
      preserveWhitepace: true, // 防止模板中出现意外空格
      extractCSS: !isDev, // 将vue的一些私有样式也单独打包到css文件中
      cssModule: {
        localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' :'[hash:base64:5]',
        camelCase: true
      },
      // hotReload: false, // 根据环境变量自动生成
      // loaders: {
      //   'docs': docsLoader
      // }
    }
  }