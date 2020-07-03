module.exports = {
  publicPath: process.env.TYPE === 'doc' ? '/vue-json-schema-form' : '/',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production' && process.env.TYPE !== 'doc') {
      config.externals = ['element-ui', 'ajv', 'ajv-i18n', 'vue']
    }
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
}
