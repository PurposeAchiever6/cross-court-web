/* eslint-disable default-param-last */
import { createSelector } from 'reselect';
import { RESET_LOADING } from 'shared/actions/actionTypes';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  INITIAL_LOAD_AUTH_INIT,
  INITIAL_LOAD_AUTH_SUCCESS,
  INITIAL_LOAD_AUTH_FAILURE,
  SHOW_WAITLIST_MODAL,
  CLOSE_WAITLIST_MODAL,
  RESERVE_SESSION_INIT,
  RESERVE_SESSION_SUCCESS,
  RESERVE_SESSION_FAILURE,
  JOIN_SESSION_WAITLIST_INIT,
  JOIN_SESSION_WAITLIST_SUCCESS,
  JOIN_SESSION_WAITLIST_FAILURE,
  REMOVE_SESSION_WAITLIST_INIT,
  REMOVE_SESSION_WAITLIST_SUCCESS,
  REMOVE_SESSION_WAITLIST_FAILURE,
  ADD_SESSION_GUEST_SUCCESS,
  ADD_SESSION_GUEST_FAILURE,
  REMOVE_SESSION_GUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  error: null,
  pageLoading: true,
  sessionsLoadingBtns: [],
  removeSessionWaitlistLoading: false,
  showWaitlistModal: false,
  sessionInfo: {},
  sessionId: '',
  sessionDate: '',
  addSessionGuestError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_LOAD_INIT:
    case INITIAL_LOAD_AUTH_INIT:
      return {
        ...state,
        pageLoading: true,
        error: null,
        sessionId: action.payload.sessionId,
        sessionDate: action.payload.date,
      };
    case INITIAL_LOAD_SUCCESS:
    case INITIAL_LOAD_AUTH_SUCCESS:
      return {
        ...state,
        pageLoading: false,
        sessionInfo: { ...action.payload.sessionInfo },
      };
    case INITIAL_LOAD_FAILURE:
    case INITIAL_LOAD_AUTH_FAILURE:
      return { ...state, error: action.error };
    case RESERVE_SESSION_FAILURE:
      return {
        ...state,
        error: action.error,
        sessionsLoadingBtns: [
          ...state.sessionsLoadingBtns.filter((id) => id !== action.payload.sessionId),
        ],
      };
    case SHOW_WAITLIST_MODAL:
      return { ...state, showWaitlistModal: action.payload.sessionId };
    case CLOSE_WAITLIST_MODAL:
      return { ...state, showWaitlistModal: false };
    case RESERVE_SESSION_INIT:
      return {
        ...state,
        sessionsLoadingBtns: [...state.sessionsLoadingBtns, action.payload.sessionId],
      };
    case JOIN_SESSION_WAITLIST_INIT:
      return {
        ...state,
        sessionsLoadingBtns: [...state.sessionsLoadingBtns, action.payload.sessionId],
      };
    case REMOVE_SESSION_WAITLIST_INIT:
      return {
        ...state,
        removeSessionWaitlistLoading: true,
      };
    case RESERVE_SESSION_SUCCESS:
      return {
        ...state,
        sessionsLoadingBtns: [
          ...state.sessionsLoadingBtns.filter((id) => id !== action.payload.sessionId),
        ],
        sessionInfo: {
          ...state.sessionInfo,
          userSession: action.payload.userSession,
        },
      };
    case JOIN_SESSION_WAITLIST_SUCCESS:
      return {
        ...state,
        sessionInfo: {
          ...state.sessionInfo,
          onWaitlist: true,
          waitlistPlacement: action.payload.waitlistPlacement,
        },
        sessionsLoadingBtns: [
          ...state.sessionsLoadingBtns.filter((id) => id !== action.payload.sessionId),
        ],
      };
    case REMOVE_SESSION_WAITLIST_SUCCESS:
      return {
        ...state,
        sessionInfo: { ...state.sessionInfo, onWaitlist: false, waitlistPlacement: null },
        removeSessionWaitlistLoading: false,
      };
    case JOIN_SESSION_WAITLIST_FAILURE:
    case REMOVE_SESSION_WAITLIST_FAILURE:
      return {
        ...state,
        error: action.error,
        removeSessionWaitlistLoading: false,
      };
    case ADD_SESSION_GUEST_SUCCESS:
      return {
        ...state,
        addSessionGuestError: false,
        sessionInfo: {
          ...state.sessionInfo,
          userSession: {
            ...state.sessionInfo.userSession,
            sessionGuests: [
              ...state.sessionInfo.userSession.sessionGuests,
              action.payload.sessionGuest,
            ],
          },
        },
      };
    case ADD_SESSION_GUEST_FAILURE:
      return {
        ...state,
        addSessionGuestError: true,
      };
    case REMOVE_SESSION_GUEST_SUCCESS:
      return {
        ...state,
        sessionInfo: {
          ...state.sessionInfo,
          userSession: {
            ...state.sessionInfo.userSession,
            sessionGuests: [
              ...state.sessionInfo.userSession.sessionGuests.filter(
                (guest) => guest.id !== action.payload.sessionGuestId
              ),
            ],
          },
        },
      };
    case RESET_LOADING:
      return {
        ...state,
        pageLoading: initialState.pageLoading,
      };
    default:
      return state;
  }
};

const getSession = (state) => state.session;

export const getPageLoading = createSelector(getSession, (session) => session.pageLoading);

export const getError = createSelector(getSession, (session) => session.error);

export const getSessionInfo = createSelector(getSession, (session) => session.sessionInfo);
export const getSessionId = createSelector(getSession, (session) => session.sessionId);
export const getSessionDate = createSelector(getSession, (session) => session.sessionDate);
export const getRemoveSessionWaitlistLoading = createSelector(
  getSession,
  (session) => session.removeSessionWaitlistLoading
);
export const getShowWaitlistModal = createSelector(
  getSession,
  (session) => session.showWaitlistModal
);
export const getSessionsLoadingBtns = createSelector(
  getSession,
  (session) => session.sessionsLoadingBtns
);
export const getAddSessionGuestError = createSelector(
  getSession,
  (session) => session.addSessionGuestError
);
