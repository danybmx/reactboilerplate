import { combineReducers } from 'redux';
import {
  REQUEST_INITIAL_COUNT, RECEIVE_INITIAL_COUNT, REQUEST_ADD,
} from '../actions';

function counter(state = {
  isFetching: false,
  count: 0,
  inc: 1,
}, action) {
  switch (action.type) {
    case REQUEST_INITIAL_COUNT:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_INITIAL_COUNT:
      return Object.assign({}, state, {
        isFetching: false,
        count: action.count,
      });
    case REQUEST_ADD:
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counter,
});

export default rootReducer;
