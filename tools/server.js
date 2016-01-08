import express from 'express';
import handlebars from 'express-handlebars';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { Provider } from 'react-redux';

import config from '../config.js';
import routes from '../src/client/routes.client.js';
import configureStore from '../src/client/store.js';
import DevTools from '../src/client/containers/DevTools';
import apiRoutes from '../src/server/routes.server.js';

const app = express();

// ---------
// Configure express App
// ---------
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', config.paths.views);

global.navigator = {
  userAgent:
    'Mozilla/5.0 (Windows NT 6.1; WOW64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko)' +
    'Chrome/49.0.2454.85 Safari/537.36',
};

if (config.env === 'development') {
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
}

// Static assets
app.use(express.static(config.paths.dist));

// Api routing
const apiRouter = express.Router(); // eslint-disable-line new-cap
app.use('/api', apiRoutes(apiRouter));

// Website routing
app.use('*', (req, res, next) => {
  try {
    match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        // Initialize store
        const store = configureStore();
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
          jsonProps: JSON.stringify(renderProps),
          title: 'React-Boilerplate',
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

app.listen(config.port, '0.0.0.0', () => {
  /* eslint no-console:0 */
  console.log('-> 🌎  Listening on %s!', config.port);
});
