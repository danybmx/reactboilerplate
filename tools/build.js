/* eslint no-console:0 */
import config from '../config';
import mkdirp from 'mkdirp';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

mkdirp.sync(config.paths.assets);

const bundler = webpack(webpackConfig);
bundler.run(() => {
  console.log('bundle.js has been built');
});
