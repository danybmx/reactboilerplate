import fetch from 'isomorphic-fetch';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const RECEIVE_REGISTER = 'RECEIVE_REGISTER';

export function receiveLogin(response) {
  return {
    type: RECEIVE_LOGIN,
    state: {
      loggingIn: false,
      loggedIn: response.user ? true : false,
      user: response.user,
      error: response.error || false,
      message: response.message || '',
    },
  };
}

export function logout(callback) {
  return dispatch => {
    dispatch({
      type: REQUEST_LOGOUT,
    });
    fetch('/api/auth', {
      method: 'delete',
    });
    callback();
  };
}

export function loginWithPassword(data, callback) {
  return dispatch => {
    dispatch({
      type: REQUEST_LOGIN,
      state: {
        loggingIn: true,
        loggedIn: false,
        user: {},
        error: '',
      },
    });

    return fetch('/api/auth', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json();
    }).then(json => {
      dispatch(receiveLogin(json));
      callback();
    });
  };
}
