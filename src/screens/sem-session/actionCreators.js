import {
  INITIAL_LOAD_INIT,
  CHECK_IN_INIT,
  TIMER_START,
  TIMER_PAUSE,
  TIMER_RESET,
  TIMER_RESUME,
  ADD_WIN,
  CLEAR_STREAK,
} from './actionTypes';

export const initialLoadInit = (id, date) => ({
  type: INITIAL_LOAD_INIT,
  payload: {
    id,
    date,
  },
});

export const checkInInit = (ids, playersMissingIds) => ({
  type: CHECK_IN_INIT,
  payload: {
    ids,
    playersMissingIds,
  },
});

export const startTimer = () => ({
  type: TIMER_START,
});

export const pauseTimer = () => ({
  type: TIMER_PAUSE,
});

export const resumeTimer = startTime => ({
  type: TIMER_RESUME,
  payload: {
    startTime,
  },
});

export const resetTimer = () => ({
  type: TIMER_RESET,
});

export const addWin = winner => ({
  type: ADD_WIN,
  payload: {
    winner,
  },
});

export const clearStreak = () => ({
  type: CLEAR_STREAK,
});
