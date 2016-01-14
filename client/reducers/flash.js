import {
  SET_FLASH, CLEAR_FLASH,
} from '../actions';

export default function common(state = {
  message: '',
  type: '',
  style: {},
}, action) {
  switch (action.type) {
    case SET_FLASH:
      return Object.assign({}, state, action.state);
    case CLEAR_FLASH:
      return Object.assign({}, state, action.state);
    default:
      return state;
  }
}
