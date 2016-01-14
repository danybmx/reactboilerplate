import webpack from 'webpack';
import config from '../../config';

export default {
  context: config.paths.client,
  entry: [
    config.paths.client + '/main.client.js',
  ],
  output: {
    path: config.paths.assets + '/js',
    publicPath: '/assets/js/',
    library: 'bundle',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({ __DEVELOPMENT__: false }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: true } }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: config.paths.client,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            ['transform-decorators-legacy'],
          ],
        },
      },
    ],
  },
};
