export const bindCheckAuth = (store, onFail, redirect = '/login', flash = false) => {
  return function requireAuth(nextState, replaceState, callback) {
    if (store.getState().auth.loggedIn) {
      callback();
    } else {
      onFail(nextState, replaceState, callback, redirect, flash);
    }
  };
};

export const bindCheckNoAuth = (store, onFail, redirect = '/', flash = false) => {
  return function requireAuth(nextState, replaceState, callback) {
    if (!store.getState().auth.loggedIn) {
      callback();
    } else {
      onFail(nextState, replaceState, callback, redirect, flash);
    }
  };
};

export const bindCheckRole = (store, role, onFail, redirect = '/', flash = false) => {
  return function requireAuth(nextState, replaceState, callback) {
    if (store.getState().auth.loggedIn && store.getState().auth.user.role === role) {
      callback();
    } else {
      onFail(nextState, replaceState, callback, redirect, flash);
    }
  };
};
