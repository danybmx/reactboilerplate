import App from './containers/App';
import Counter from './components/Counter';
import React, { Component } from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, browserHistory } from 'react-router';

const routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <Route path="counter" component={Counter} />
    </Route>
  </Router>
);

export default routes;
