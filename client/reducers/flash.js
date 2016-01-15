import {
  SET_FLASH, CLEAR_FLASH, CLEAR_FLASH_ON_NEXT,
} from '../actions';

const initialState = {
  message: '',
  type: '',
  style: {},
  clearOnNext: false,
};

export default function common(state = initialState, action) {
  switch (action.type) {
    case SET_FLASH:
      return Object.assign({}, state, action.state);
    case CLEAR_FLASH_ON_NEXT:
      return Object.assign({}, state, action.state);
    case CLEAR_FLASH:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
