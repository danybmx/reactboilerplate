import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import DevTools from './containers/DevTools';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();
let createStoreWithMiddleware;

createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
