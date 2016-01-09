import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import DevTools from './containers/DevTools';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();
let createStoreWithMiddleware;

if (__DEVELOPMENT__) { // eslint-disable-line no-undef
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    DevTools.instrument()
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware)
  )(createStore);
}

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
