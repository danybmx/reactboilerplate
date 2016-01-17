// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { Router, Route, IndexRoute } from 'react-router';

import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistory, routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

// App Reducers
import reducers from './reducers';

// App Actions
import { setFlash } from './actions';

// Auth utils
import { bindCheckAuth, bindCheckNoAuth, bindCheckRole } from './utils/auth';

// DevTools
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// Components
import App from './components/App';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

// Reducer
const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer,
  form: formReducer,
}));

let DevTools;
if (__DEVELOPMENT__) { // eslint-disable-line
  DevTools = createDevTools(
    <DockMonitor
      toggleVisibilityKey="ctrl-h"
      changePositionKey="ctrl-q">
      <LogMonitor theme="tomorrow" />
    </DockMonitor>
  );
}

// History
let history;
if (!canUseDOM) {
  history = createMemoryHistory();
} else {
  history = createBrowserHistory();
}

const reduxRouterMiddleware = syncHistory(history);

let finalCreateStore;
if (__DEVELOPMENT__) {
  finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, reduxRouterMiddleware),
    DevTools.instrument()
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, reduxRouterMiddleware)
  )(createStore);
}

export function initialize(initialState, render) {
  const store = finalCreateStore(reducer, initialState);
  reduxRouterMiddleware.listenForReplays(store);

  // Bind Auth
  const authFailCallback = (nextState, replaceState, callback, redirect, flash) => {
    replaceState({
      nextPathname: nextState.location.pathname,
    }, '/');
    if (flash) {
      store.dispatch(setFlash({ message: flash.message, type: flash.type || 'error' }));
    }
    callback();
  };

  const requireAuth = bindCheckAuth(store, authFailCallback, '/login', {
    message: 'Restricted area',
  });
  const requireNoAuth = bindCheckNoAuth(store, authFailCallback, '/', {
    message: `You are already logged in`,
  });
  const requireAdminRole = bindCheckRole(store, 'admin', authFailCallback, '/', {
    message: `You are already logged in`,
  });

  const routes = (
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={HomePage} onEnter={requireAuth} />
          <Route path="login" component={LoginPage} onEnter={requireNoAuth} />
          <Route path="register" component={RegisterPage} onEnter={requireNoAuth} />
        </Route>
      </Router>
    </div>
  );

  if (canUseDOM) {
    render(store, routes);
  }

  return { store, routes };
}

// Initialize store if it's running on browser
if (canUseDOM) {
  const initialState = JSON.parse(document.getElementById('__INITIAL_STATE__').innerHTML);
  initialize(initialState, (store, routes) => {
    ReactDOM.render(
      <Provider store={store}>
        {routes}
      </Provider>
    , document.getElementById('mount'));

    if (__DEVELOPMENT__) {
      ReactDOM.render(<DevTools store={store} />, document.getElementById('debug'));
    }
  });
}
