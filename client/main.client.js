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
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';

// App Reducers
import reducers from './reducers';

// App Actions
import { clearFlash, clearFlashOnNext } from './actions';

// Auth utils
import { requireAuth } from './utils/auth';

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

let finalCreateStore;
if (__DEVELOPMENT__) {
  finalCreateStore = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument()
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(thunkMiddleware)
  )(createStore);
}

// History
let history;
if (!canUseDOM) {
  history = createMemoryHistory();
} else {
  history = createBrowserHistory();
}

let store;
// Initialize store if it's running on browser
if (canUseDOM) {
  const initialState = JSON.parse(document.getElementById('__INITIAL_STATE__').innerHTML);
  store = finalCreateStore(reducer, initialState);
  window.store = store;

  syncReduxAndRouter(history, store);
}

// Flash cleaner
history.listen(() => {
  if (store.getState().flash.message) {
    if (store.getState().flash.clearOnNext) {
      store.dispatch(clearFlash());
    } else {
      store.dispatch(clearFlashOnNext());
    }
  }
});

export const routes = (
  <div>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} onEnter={requireAuth} />
        <Route path="login" store={store} component={LoginPage} />
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

export function initializeStore(initialState) {
  const serverStore = finalCreateStore(reducer, initialState);
  syncReduxAndRouter(history, serverStore);

  return serverStore;
}
