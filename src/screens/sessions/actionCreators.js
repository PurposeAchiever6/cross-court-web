import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_AUTH_INIT,
  RESERVE_SESSION_INIT,
  CANCEL_SESSION_INIT,
  JOIN_SESSION_WAITLIST_INIT,
  REMOVE_SESSION_WAITLIST_INIT,
  SHOW_WAITLIST_MODAL,
  CLOSE_WAITLIST_MODAL,
  SHOW_ADD_GUEST_MODAL,
  CLOSE_ADD_GUEST_MODAL,
  SIGNUP_BOOK_SESSION,
  BUY_CREDITS_AND_BOOK_SESSION,
  VOTE_SESSION_INIT,
  REMOVE_VOTE_SESSION_INIT,
  ADD_SESSION_GUEST_INIT,
  REMOVE_SESSION_GUEST_INIT,
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

export const reserveSessionInit = (payload) => ({
  type: RESERVE_SESSION_INIT,
  payload,
});

export const cancelSessionInit = (sessionId) => ({
  type: CANCEL_SESSION_INIT,
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

export const removeSessionWaitlistInit = (sessionId, sessionDate) => ({
  type: REMOVE_SESSION_WAITLIST_INIT,
  payload: {
    sessionId,
    sessionDate,
  },
});

export const showWaitlistModal = (sessionId) => ({
  type: SHOW_WAITLIST_MODAL,
  payload: { sessionId },
});

export const closeWaitlistModal = () => ({
  type: CLOSE_WAITLIST_MODAL,
});

export const showAddGuestModal = () => ({
  type: SHOW_ADD_GUEST_MODAL,
});

export const closeAddGuestModal = () => ({
  type: CLOSE_ADD_GUEST_MODAL,
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

export const voteSessionInit = (sessionId, sessionDate) => ({
  type: VOTE_SESSION_INIT,
  payload: {
    sessionId,
    sessionDate,
  },
});

export const removeVoteSessionInit = (sessionId, sessionDate) => ({
  type: REMOVE_VOTE_SESSION_INIT,
  payload: {
    sessionId,
    sessionDate,
  },
});

export const addSessionGuest = (userSessionId, guestInfo) => ({
  type: ADD_SESSION_GUEST_INIT,
  payload: {
    userSessionId,
    guestInfo,
  },
});

export const removeSessionGuest = (userSessionId, sessionGuestId) => ({
  type: REMOVE_SESSION_GUEST_INIT,
  payload: {
    userSessionId,
    sessionGuestId,
  },
});
