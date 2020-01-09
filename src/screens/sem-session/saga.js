import { put, all, takeLatest, call } from 'redux-saga/effects';

import { INITIAL_LOAD_INIT, INITIAL_LOAD_SUCCESS, INITIAL_LOAD_FAILURE } from './actionTypes';
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

export default function* rootSemSessionSaga() {
  yield all([takeLatest(INITIAL_LOAD_INIT, initialLoadFlow)]);
}
