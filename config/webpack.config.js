const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const productionConfig = require('./webpack.config.prod')
const developmentConfig = require('./webpack.config.dev')

module.exports = (env) => {
  switch(true) {
    case env.development:
      console.log(merge(commonConfig, developmentConfig).module)
      return merge(commonConfig, developmentConfig)
    case env.production:
      return merge(commonConfig, productionConfig)
  }
}
