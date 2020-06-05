const path = require('path')
module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '/yongcheng': {
        target: `https://www.qike.site`,
        changeOrigin: true,
        pathRewrite: {
          '^/yongcheng': '/yongcheng'
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
