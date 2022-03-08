import {
  INITIAL_APP_LOAD_INIT,
  SAVE_SESSION_TO_STORAGE,
  REMOVE_SESSION_FROM_STORAGE,
  RESET_LOADING,
} from './actionTypes';

export const initialAppLoad = () => ({
  type: INITIAL_APP_LOAD_INIT,
});

export const saveSessionToStorage = (id, date) => ({
  type: SAVE_SESSION_TO_STORAGE,
  payload: {
    sessionId: id,
    date,
  },
});

export const removeSessionFromStorage = () => ({
  type: REMOVE_SESSION_FROM_STORAGE,
});

export const resetLoading = () => ({
  type: RESET_LOADING,
});
