module.exports = {
  publicPath: process.env.TYPE === 'doc' ? '/vue-json-schema-form' : '/',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production' && process.env.TYPE !== 'doc') {
      config.externals = ['element-ui', 'ajv', 'ajv-i18n', 'vue']
    }
  },
  // chainWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production' && process.env.TYPE !== 'doc') {
  //     config.module.rule('ts').uses.delete('cache-loader')
  //     config.module
  //       .rule('ts')
  //       .use('ts-loader')
  //       .loader('ts-loader')
  //       .tap((options) => ({
  //         ...options,
  //         transpileOnly: false,
  //         happyPackMode: false,
  //       }))
  //   }
  // },
  // parallel: false,
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
}
