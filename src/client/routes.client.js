import App from './containers/App';
import Admin from './containers/Admin';
import Counter from './components/Counter';
import Index from './components/Index';
import AdminDashboard from './components/Admin/Dashboard';
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import { isServer } from '../shared/utils' ;

const createHistory = () => {
  if (isServer()) {
    return createMemoryHistory();
  }
  return createBrowserHistory();
};

const routes = (
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="counter" component={Counter} />
    </Route>
    <Route path="/admin" component={Admin}>
      <IndexRoute component={AdminDashboard} />
    </Route>
  </Router>
);

export default routes;
