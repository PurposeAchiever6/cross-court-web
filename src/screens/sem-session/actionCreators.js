import { INITIAL_LOAD_INIT } from './actionTypes';

export const initialLoadInit = (id, date) => ({
  type: INITIAL_LOAD_INIT,
  payload: {
    id,
    date,
  },
});
