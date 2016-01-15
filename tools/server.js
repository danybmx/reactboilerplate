import express from 'express';
import io from 'socket.io';
import winston from 'winston';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

// Import config
import config from '../config';

// Server-side
import configureDatabase from '../config/database';
import configurePassport from '../config/passport';
import apiRoutes from '../server/routes.server.js';
import ioActions from '../server/io.server.js';

// Client-side
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { Provider } from 'react-redux';

import { routes, initializeStore } from '../client/main.client.js';

// Development dependencies
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';

configureDatabase((mongoose) => {
  // ---------
  // Initialize express
  // ---------
  const app = express();

  // ---------
  // Setup the loggers
  // ---------
  winston.level = 'debug';
  winston.add(winston.transports.File, { filename: 'logs/server.log' });
  app.use(morgan('tiny'));

  // ---------
  // Setup parsers
  // ---------
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // ---------
  // Initialize sessions
  // ---------
  const MongoStore = connectMongo(session);
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    cookies: {
      maxAge: 7 * 24 * 3600 * 1000,
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  }));

  // ---------
  // Configure passport
  // ---------
  configurePassport(app);

  // ---------
  // Configure express views
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

  const compiler = webpack(webpackConfig);
  const webpackMiddleware = webpackDevMiddleware(compiler, {
    publicPath: '/assets/js/',
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
  // Configure isomorphic app
  // ---------
  app.use('*', (req, res, next) => {
    try {
      // Set initialState for the store
      const initialState = res.initialState || {};

      // Initialize store
      const store = global.store = initializeStore(initialState);

      match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message);
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
          const getReduxPromise = () => {
            const { query, params } = renderProps;
            const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
            const promise = comp.fetchData ?
              comp.fetchData({ query, params, store, history }) :
              Promise.resolve();

            return promise;
          };

          getReduxPromise().then(() => {
            const reduxState = JSON.stringify(store.getState());

            let markup;
            if (config.env === 'development') {
              markup = ReactDOM.renderToString(
                <Provider store={store}>
                  <div>
                    <RoutingContext {...renderProps} />
                  </div>
                </Provider>
              );
            } else {
              markup = ReactDOM.renderToString(
                <Provider store={store}>
                  <div>
                    <RoutingContext {...renderProps} />
                  </div>
                </Provider>
              );
            }

            // Render on layout
            res.render('layout', {
              initialState: reduxState,
              title: config.meta.title,
              markup,
            });
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
});
