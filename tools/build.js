import config from '../config';
import mkdirp from 'mkdirp';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

mkdirp(config.paths.assets, () => {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    __DEVELOPMENT__: false,
  }));

  const bundler = webpack(webpackConfig);
  bundler.run(() => {
    console.log('bundle.js has been built');
  });
});
