// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import { syncHistory, routeReducer } from 'redux-simple-router';

// App Reducers
import reducers from './reducers';

// App Actions
import { initializeState } from './actions';

// Auth utils
import { bindCheckAuth } from './utils/auth';

// DevTools
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// Components
import App from './components/App';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

// Reducer
const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer,
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
  global._history = history = createMemoryHistory();
} else {
  window._history = history = createBrowserHistory();
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

const store = finalCreateStore(reducer);

export function initializeStore(initialState) {
  reduxRouterMiddleware.listenForReplays(store);
  store.dispatch(initializeState(initialState));
  return store;
}

// Initialize store if it's running on browser
if (canUseDOM) {
  const initialState = JSON.parse(document.getElementById('__INITIAL_STATE__').innerHTML);
  initializeStore(initialState);
}

// Bind Auth
const requireAuth = bindCheckAuth(
  store,
  (nextState, replaceState, callback) => {
    replaceState({
      nextPathname: nextState.location.pathname,
      flash: {
        type: 'error',
        message: 'Restricted Area',
      },
    }, '/login');
    callback();
  }
);

export const routes = (
  <div>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} onEnter={requireAuth} />
        <Route path="login" component={LoginPage} />
      </Route>
    </Router>
  </div>
);

if (canUseDOM) {
  ReactDOM.render(
    <Provider store={store}>
      {routes}
    </Provider>
  , document.getElementById('mount'));

  if (__DEVELOPMENT__) {
    ReactDOM.render(<DevTools store={store} />, document.getElementById('debug'));
  }
}
