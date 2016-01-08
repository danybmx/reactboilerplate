import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store.js';
import Routes from '../routes.client.js';
import DevTools from '../containers/DevTools';

const store = configureStore();

let devTools = null;

if (__DEVELOPMENT__) { // eslint-disable-line no-undef
  devTools = (
    <DevTools />
  );
}

const Root = (
  <Provider store={store}>
    <div>
      {Routes}{devTools}
    </div>
  </Provider>
);

export default Root;
