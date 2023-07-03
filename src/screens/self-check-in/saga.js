import { put, all, takeLatest, call } from 'redux-saga/effects';
import toast from 'shared/utils/toast';
import { push } from 'connected-react-router';

import ROUTES from 'shared/constants/routes';
import selfCheckInService from 'screens/self-check-in/service';
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

export function* getQrDataFlow({ payload }) {
  try {
    const { locationId } = payload;
    const response = yield call(selfCheckInService.getQrData, locationId);

    yield put({
      type: GET_QR_DATA_SUCCESS,
      payload: response,
    });
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({ type: GET_QR_DATA_FAILURE, error: err.response.data.error });
  }
}

export function* getUserSessionsFlow({ payload }) {
  try {
    const { locationId } = payload;

    const userSessions = yield call(selfCheckInService.getUserSessionsForSelfCheckIn, locationId);

    yield put({
      type: GET_USER_SESSIONS_SUCCESS,
      payload: userSessions,
    });
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({ type: GET_USER_SESSIONS_FAILURE, error: err.response.data.error });
  }
}

export function* selfCheckInUserSessionsFlow({ payload }) {
  try {
    const { userSessionIds, qrData } = payload;

    yield call(selfCheckInService.selfCheckInUserSessions, userSessionIds, qrData);
    yield put({ type: SELF_CHECK_IN_USER_SESSIONS_SUCCESS });
    yield put(push(ROUTES.SELF_CHECK_IN_SUCCESS));
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({ type: SELF_CHECK_IN_USER_SESSIONS_FAILURE, error: err.response.data.error });
    yield put(push(ROUTES.SELF_CHECK_IN_ERROR));
  }
}

export default function* selfCheckInSaga() {
  yield all([takeLatest(GET_QR_DATA_INIT, getQrDataFlow)]);
  yield all([takeLatest(GET_USER_SESSIONS_INIT, getUserSessionsFlow)]);
  yield all([takeLatest(SELF_CHECK_IN_USER_SESSIONS_INIT, selfCheckInUserSessionsFlow)]);
}
