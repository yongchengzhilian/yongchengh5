const path = require('path')
module.exports = {
  publicPath: '/pay',
  devServer: {
    proxy: {
      '/api': {
        target: `https://www.aidou.online`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  lintOnSave: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/less/index.less')
      ]
    }
  }
}
