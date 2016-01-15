export const SET_FLASH = 'SET_FLASH';
export const CLEAR_FLASH = 'CLEAR_FLASH';
export const CLEAR_FLASH_ON_NEXT = 'CLEAR_FLASH_ON_NEXT';

export function setFlash(message, type = 'success') {
  return {
    type: SET_FLASH,
    state: {
      message,
      type,
    },
  };
}

export function clearFlashOnNext() {
  return {
    type: CLEAR_FLASH_ON_NEXT,
    state: {
      clearOnNext: true,
    },
  };
}

export function clearFlash() {
  return {
    type: CLEAR_FLASH,
  };
}
