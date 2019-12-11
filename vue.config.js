const path = require('path')
module.exports = {
  publicPath: '/zhengfu',
  devServer: {
    proxy: {
      '/api': {
        target: `http://47.107.36.107:8088`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  lintOnSave: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/less/variable.less')
      ]
    }
  }
}
