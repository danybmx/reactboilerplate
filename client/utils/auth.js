export function bindCheckAuth(store, onFail) {
  return (nextState, replaceState, callback) => {
    const resolveAuth = (resolve, reject) => {
      if (!store.getState().auth) {
        return setTimeout(() => resolveAuth(resolve, reject), 25);
      }

      if (store.getState().auth.loggedIn) {
        resolve();
      } else {
        reject();
      }
    };

    new Promise(resolveAuth)
      .then(() => { callback(); })
      .catch(() => onFail(nextState, replaceState, callback));
  };
}
