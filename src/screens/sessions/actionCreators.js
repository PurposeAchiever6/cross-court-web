import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_AUTH_INIT,
  RESERVE_SESSION_INIT,
  CANCEL_SESSION_INIT,
  CONFIRM_SESSION_INIT,
  JOIN_SESSION_WAITLIST_INIT,
  SHOW_CANCEL_MODAL,
  SIGNUP_BOOK_SESSION,
  BUY_CREDITS_AND_BOOK_SESSION,
} from './actionTypes';

export const initialLoadInit = (sessionId, date) => ({
  type: INITIAL_LOAD_INIT,
  payload: {
    sessionId,
    date,
  },
});

export const initialLoadAuthInit = (sessionId, date) => ({
  type: INITIAL_LOAD_AUTH_INIT,
  payload: {
    sessionId,
    date,
  },
});

export const reserveSessionInit = (sessionId, date, referralCode) => ({
  type: RESERVE_SESSION_INIT,
  payload: {
    sessionId,
    date,
    referralCode,
  },
});

export const cancelSessionInit = (sessionId) => ({
  type: CANCEL_SESSION_INIT,
  payload: {
    sessionId,
  },
});

export const confirmSessionInit = (sessionId) => ({
  type: CONFIRM_SESSION_INIT,
  payload: {
    sessionId,
  },
});

export const joinSessionWaitlistInit = (sessionId, sessionDate) => ({
  type: JOIN_SESSION_WAITLIST_INIT,
  payload: {
    sessionId,
    sessionDate,
  },
});

export const showCancelModal = () => ({
  type: SHOW_CANCEL_MODAL,
});

export const signupBookSession = (id, date) => ({
  type: SIGNUP_BOOK_SESSION,
  payload: {
    sessionId: id,
    date,
  },
});

export const buyCreditsAndBookSession = (id, date) => ({
  type: BUY_CREDITS_AND_BOOK_SESSION,
  payload: {
    sessionId: id,
    date,
  },
});
