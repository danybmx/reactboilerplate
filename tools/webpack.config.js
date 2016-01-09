import config from '../config';
import webpackDevConfig from './webpack/webpack.config.dev.js';
import webpackProdConfig from './webpack/webpack.config.prod.js';

let webpackConfig;
if (config.env === 'development') {
  webpackConfig = webpackDevConfig;
} else {
  webpackConfig = webpackProdConfig;
}

export default webpackConfig;
