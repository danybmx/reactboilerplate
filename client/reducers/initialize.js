import {
  INITIALIZE,
} from '../actions';

export default function initialize(state = {}, action) {
  switch (action.type) {
    case INITIALIZE:
      return Object.assign({}, state, action.state);
    default:
      return state;
  }
}
