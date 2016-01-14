import config from '../config';

let webpackConfig;
if (config.env === 'development') {
  webpackConfig = require('./webpack/webpack.config.dev.js').default;
} else {
  webpackConfig = require('./webpack/webpack.config.prod.js').default;
}

export default webpackConfig;
