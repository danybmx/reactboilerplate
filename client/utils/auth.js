import { setFlash } from '../actions';
import v from '../styles/variables';

export function requireAuth(nextState, replaceState) {
  if (!store.getState().auth.loggedIn || !store.getState().auth.user) {
    store.dispatch(setFlash('Restricted area', v.dangerColor));
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
}
