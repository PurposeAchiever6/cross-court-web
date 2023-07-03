import {
  GET_QR_DATA_INIT,
  GET_USER_SESSIONS_INIT,
  SELF_CHECK_IN_USER_SESSIONS_INIT,
} from 'screens/self-check-in/actionTypes';

export const getQrData = (locationId) => ({
  type: GET_QR_DATA_INIT,
  payload: {
    locationId,
  },
});

export const getUserSessions = (locationId) => ({
  type: GET_USER_SESSIONS_INIT,
  payload: {
    locationId,
  },
});

export const selfCheckInUserSessions = (userSessionIds, qrData) => ({
  type: SELF_CHECK_IN_USER_SESSIONS_INIT,
  payload: {
    userSessionIds,
    qrData,
  },
});
