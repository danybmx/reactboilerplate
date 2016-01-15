import {
  REQUEST_LOGIN, RECEIVE_LOGIN, REQUEST_LOGOUT,
} from '../actions/auth';

const initialState = {
  loggedIn: false,
  loggingIn: false,
  user: {},
  token: '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, action.state);
    case RECEIVE_LOGIN:
      return Object.assign({}, state, action.state);
    case REQUEST_LOGOUT:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
