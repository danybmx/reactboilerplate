export const SET_FLASH = 'SET_FLASH';
export const CLEAR_FLASH = 'CLEAR_FLASH';

export function setFlash(message, type = 'success') {
  return {
    type: SET_FLASH,
    state: {
      message,
      type,
    },
  };
}

export function clearFlash() {
  return {
    type: CLEAR_FLASH,
    state: {
      message: '',
      type: '',
      style: {},
    },
  };
}
