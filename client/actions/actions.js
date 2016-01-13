import fetch from 'isomorphic-fetch';
export const REQUEST_INITIAL_COUNT = 'REQUEST_INITIAL_COUNT';
export const RECEIVE_INITIAL_COUNT = 'RECEIVE_INITIAL_COUNT';
export const REQUEST_ADD = 'REQUEST_ADD';
export const SET_COUNT = 'SET_COUNT';

export function requestInitialCount() {
  return {
    type: REQUEST_INITIAL_COUNT,
    isFetching: true,
  };
}

export function receiveInitialCount(count) {
  return {
    type: RECEIVE_INITIAL_COUNT,
    isFetching: false,
    count,
  };
}

export function setCount(count) {
  return {
    type: SET_COUNT,
    count,
  };
}

export function fetchCount() {
  return dispatch => {
    dispatch(requestInitialCount());
    return fetch('/api/counter')
      .then((response) => {
        return response.json();
      })
      .then(json => dispatch(receiveInitialCount(json.initialCount)));
  };
}

export function fetchCountAdd() {
  return {
    type: REQUEST_ADD,
  };
}
