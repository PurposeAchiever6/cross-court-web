import { put, all, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ROUTES from 'shared/constants/routes';

import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  CHECK_IN_INIT,
  CHECK_IN_SUCCESS,
  CHECK_IN_FAILURE,
} from './actionTypes';
import sessionService from './service';

export function* initialLoadFlow({ payload }) {
  try {
    const { session, users } = yield call(sessionService.getSessionInfo, payload.id, payload.date);
    yield put({
      type: INITIAL_LOAD_SUCCESS,
      payload: {
        session,
        users,
      },
    });
  } catch (err) {
    yield put({ type: INITIAL_LOAD_FAILURE, error: err.response.data.error });
  }
}

export function* checkInFlow({ payload }) {
  try {
    yield call(sessionService.checkIn, payload.ids);
    yield put({
      type: CHECK_IN_SUCCESS,
      payload,
    });
    yield put(push(ROUTES.SESSIONSTATE));
  } catch (err) {
    yield put({ type: CHECK_IN_FAILURE, error: err.response.data.error });
  }
}

export default function* rootSemSessionSaga() {
  yield all([takeLatest(INITIAL_LOAD_INIT, initialLoadFlow)]);
  yield all([takeLatest(CHECK_IN_INIT, checkInFlow)]);
}
