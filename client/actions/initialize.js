export const INITIALIZE = 'INITIALIZE';

export function initializeState(initialState) {
  return {
    type: 'INITIALIZE',
    state: initialState,
  };
}
