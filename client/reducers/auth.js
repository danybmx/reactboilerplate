import {
  REQUEST_LOGIN, RECEIVE_LOGIN,
} from '../actions/auth';

export default function auth(state = {
  user: {},
  loggedIn: false,
  loggingIn: false,
  token: '',
}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, action.state);
    case RECEIVE_LOGIN:
      return Object.assign({}, state, action.state);
    default:
      return state;
  }
}
