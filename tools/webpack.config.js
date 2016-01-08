import webpack from 'webpack';
import config from '../config';

export default {
  devtool: 'eval',
  context: config.paths.src,
  entry: [
    'webpack-hot-middleware/client?__webpack_hmr&reload=true',
    config.paths.client + '/main.client.js',
  ],
  output: {
    path: config.paths.assets,
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: config.paths.src,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            ['transform-decorators-legacy'],
            [
              'react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module'],
                }],
              }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react'],
              },
            ],
          ],
        },
      },
    ],
  },
};
