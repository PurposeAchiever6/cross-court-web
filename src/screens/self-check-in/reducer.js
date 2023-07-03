/* eslint-disable default-param-last */
import { createSelector } from 'reselect';
import {
  GET_QR_DATA_INIT,
  GET_QR_DATA_SUCCESS,
  GET_QR_DATA_FAILURE,
  GET_USER_SESSIONS_INIT,
  GET_USER_SESSIONS_SUCCESS,
  GET_USER_SESSIONS_FAILURE,
  SELF_CHECK_IN_USER_SESSIONS_INIT,
  SELF_CHECK_IN_USER_SESSIONS_SUCCESS,
  SELF_CHECK_IN_USER_SESSIONS_FAILURE,
} from 'screens/self-check-in/actionTypes';

const initialState = {
  error: '',
  pageLoading: false,
  qrData: '',
  refreshTimeMs: null,
  userSessions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QR_DATA_INIT:
      return {
        ...state,
        pageLoading: true,
        error: '',
      };
    case GET_QR_DATA_SUCCESS:
      return {
        ...state,
        pageLoading: false,
        qrData: action.payload.data,
        refreshTimeMs: action.payload.refreshTimeMs,
        error: '',
      };
    case GET_QR_DATA_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    case GET_USER_SESSIONS_INIT:
      return {
        ...state,
        pageLoading: true,
        error: '',
      };
    case GET_USER_SESSIONS_SUCCESS:
      return {
        ...state,
        pageLoading: false,
        userSessions: action.payload.userSessions,
        error: '',
      };
    case GET_USER_SESSIONS_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    case SELF_CHECK_IN_USER_SESSIONS_INIT:
      return {
        ...state,
        pageLoading: true,
        error: '',
      };
    case SELF_CHECK_IN_USER_SESSIONS_SUCCESS:
      return {
        ...state,
        pageLoading: false,
        error: '',
      };
    case SELF_CHECK_IN_USER_SESSIONS_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    default:
      return state;
  }
};

const getSelfCheckIn = (state) => state.selfCheckIn;

export const getPageLoading = createSelector(
  getSelfCheckIn,
  (selfCheckIn) => selfCheckIn.pageLoading
);

export const getError = createSelector(getSelfCheckIn, (selfCheckIn) => selfCheckIn.error);

export const qrData = createSelector(getSelfCheckIn, (selfCheckIn) => selfCheckIn.qrData);

export const selectRefreshTime = createSelector(
  getSelfCheckIn,
  (selfCheckIn) => selfCheckIn.refreshTimeMs
);

export const selectUserSessions = createSelector(
  getSelfCheckIn,
  (selfCheckIn) => selfCheckIn.userSessions
);
