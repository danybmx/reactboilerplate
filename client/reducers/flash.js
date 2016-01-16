import { SET_FLASH, CLEAR_FLASH } from '../actions';
import { UPDATE_LOCATION } from 'redux-simple-router';

const initialState = {
  message: '',
  type: '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_FLASH:
      return Object.assign({}, state, action.state);
    case UPDATE_LOCATION:
      return initialState;
    case CLEAR_FLASH:
      return initialState;
    default:
      return state;
  }
}
