export const SET_FLASH = 'SET_FLASH';
export const CLEAR_FLASH = 'CLEAR_FLASH';

const defaultOptions = {
  message: '',
  type: 'success',
  style: {},
};

/**
 * Function for set a flash message that dissapears
 * on the next rounte change.
 */
export function setFlash(options, timeout) {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: SET_FLASH,
        state: Object.assign({}, defaultOptions, options),
      });
    }, timeout);
  };
}

export function clearFlash() {
  return {
    type: CLEAR_FLASH,
  };
}
