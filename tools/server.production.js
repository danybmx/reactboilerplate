import express from 'express';
import io from 'socket.io';
import handlebars from 'express-handlebars';

import passport from '../server/config/passport';
import database from '../server/config/passport';

import config from '../config.js';
import routes from '../client/routes.client.js';
import configureStore from '../client/store.js';
import DevTools from '../client/containers/DevTools';

import apiRoutes from '../server/routes.server.js';
import ioActions from '../server/io.server.js';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { Provider } from 'react-redux';

// Development dependencies
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';
global.__DEVELOPMENT__ = true;

const app = express();

// ---------
// Configure express App
// ---------
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', config.paths.views);

// ---------
// Configure the navigator for use react in the server
// ---------
global.navigator = {
  userAgent:
    'Mozilla/5.0 (Windows NT 6.1; WOW64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko)' +
    'Chrome/49.0.2454.85 Safari/537.36',
};

// ---------
// Configure webpack
// ---------
webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());
webpackConfig.plugins.push(new webpack.DefinePlugin({
  __DEVELOPMENT__: true,
}));

const compiler = webpack(webpackConfig);
const webpackMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/assets/',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
});
app.use(webpackMiddleware);
app.use(webpackHotMiddleware(compiler));

// ---------
// Configure static resources
// ---------
app.use(express.static(config.paths.static));

// ---------
// Configure api/server routes
// ---------
const apiRouter = express.Router(); // eslint-disable-line new-cap
app.use('/api', apiRoutes(apiRouter));

// ---------
// Configure isomorphic routes
// ---------
app.use('*', (req, res, next) => {
  try {
    match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        // Set initialState for the store
        const initialState = res.initialState || {};

        // Initialize store
        const store = configureStore(initialState);

        // Create start markup
        let markup;
        if (config.env === 'development') {
          markup = ReactDOM.renderToString(<Provider store={store}>
            <div>
              <RoutingContext {...renderProps} />
              <DevTools />
            </div>
          </Provider>);
        } else {
          markup = ReactDOM.renderToString(<Provider store={store}>
            <div>
              <RoutingContext {...renderProps} />
            </div>
          </Provider>);
        }

        // Render on layout
        res.render('layout', {
          initialState: JSON.stringify(initialState),
          title: '--- React Boilerplate ---',
          markup,
        });
      } else {
        res.status(404).send('Not found');
      }
    });
  } catch (err) {
    next(err);
  }
});

const server = app.listen(config.port, '0.0.0.0', () => {
  /* eslint no-console:0 */
  console.log('-> 🌎  Listening on %s!', config.port);
});

const ioServer = io(server);
ioServer.on('connection', (socket) => {
  ioActions(socket);
});
