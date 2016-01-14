import webpack from 'webpack';
import config from '../../config';

export default {
  devtool: 'source-map',
  context: config.paths.client,
  entry: [
    'webpack-hot-middleware/client?__webpack_hmr&reload=true',
    config.paths.client + '/main.client.js',
  ],
  output: {
    path: config.paths.assets + '/js',
    publicPath: '/assets/js/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ __DEVELOPMENT__: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
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
