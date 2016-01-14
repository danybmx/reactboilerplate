import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store.js';
import DevTools from '../containers/DevTools';

const initialState = JSON.parse(document.getElementById('__INITIAL_STATE__').innerHTML);
const store = configureStore(initialState);

let devTools = null;

if (__DEVELOPMENT__) { // eslint-disable-line no-undef
  devTools = (
    <DevTools />
  );
}

import Routes from '../routes.client.js';

const Root = (
  <Provider store={store}>
    <div>
      {Routes}{devTools}
    </div>
  </Provider>
);

export default Root;
