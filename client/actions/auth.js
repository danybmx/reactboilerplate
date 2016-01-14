import fetch from 'isomorphic-fetch';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const RECEIVE_REGISTER = 'RECEIVE_REGISTER';

export function receiveLogin(response) {
  return {
    type: RECEIVE_LOGIN,
    logginIn: false,
    loggedIn: response.user ? true : false,
    error: response.error || '',
  };
}

export function requestLogin(username, password) {
  return dispatch => {
    dispatch({
      type: REQUEST_LOGIN,
      logginIn: true,
    });
    return fetch('/api/auth', {
      method: 'post',
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      return response.json();
    }).then(json => dispatch(receiveLogin(json)));
  };
}
