import webpack from 'webpack';
import webpackConfig from './tools/webpack.config.js';

const bundler = webpack(webpackConfig);
bundler.run();
