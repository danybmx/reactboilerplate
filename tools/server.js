import express from 'express';
import handlebars from 'express-handlebars';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from '../config.js';
import webpackConfig from './webpack.config.js';
import { match, RoutingContext } from 'react-router';
import routes from '../src/client/routes.client.js';

const app = express();

// ---------
// Configure express App
// ---------
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', config.paths.views);

if (config.env === 'development') {
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

app.use('/api/*', (req, res) => {
  // TODO: Add server routes
  res.send('API!');
});

app.use('*', (req, res, next) => {
  // TODO: Add client routes;
  try {
    match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        // Render on layout
        res.render('layout', {
          jsonProps: JSON.stringify(renderProps),
          markup: ReactDOM.renderToString(<RoutingContext {...renderProps} />),
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
