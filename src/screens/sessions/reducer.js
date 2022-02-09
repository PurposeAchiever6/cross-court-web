import { createSelector } from 'reselect';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  INITIAL_LOAD_AUTH_INIT,
  INITIAL_LOAD_AUTH_SUCCESS,
  INITIAL_LOAD_AUTH_FAILURE,
  SHOW_CANCEL_MODAL,
  CANCEL_SESSION_SUCCESS,
  RESERVE_SESSION_INIT,
  RESERVE_SESSION_SUCCESS,
  RESERVE_SESSION_FAILURE,
  CONFIRM_SESSION_INIT,
  CONFIRM_SESSION_SUCCESS,
  CONFIRM_SESSION_FAILURE,
} from './actionTypes';

const initialState = {
  error: null,
  pageLoading: true,
  showCancelModal: false,
  sessionInfo: {},
  sessionId: '',
  sessionDate: '',
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
    case CONFIRM_SESSION_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    case SHOW_CANCEL_MODAL:
      return { ...state, showCancelModal: !state.showCancelModal };
    case CANCEL_SESSION_SUCCESS:
      return {
        ...state,
        showCancelModal: false,
      };
    case RESERVE_SESSION_INIT:
    case CONFIRM_SESSION_INIT:
      return {
        ...state,
        pageLoading: true,
      };
    case RESERVE_SESSION_SUCCESS:
    case CONFIRM_SESSION_SUCCESS:
      return {
        ...state,
        pageLoading: false,
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
export const getShowCancelModal = createSelector(getSession, (session) => session.showCancelModal);
