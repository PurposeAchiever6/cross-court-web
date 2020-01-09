import { INITIAL_LOAD_INIT, CHECK_IN_INIT } from './actionTypes';

export const initialLoadInit = (id, date) => ({
  type: INITIAL_LOAD_INIT,
  payload: {
    id,
    date,
  },
});

export const checkInInit = (ids, playersMissing) => ({
  type: CHECK_IN_INIT,
  payload: {
    ids,
    playersMissing,
  },
});
