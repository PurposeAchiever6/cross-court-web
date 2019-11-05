import { put, all, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_INIT,
  LOGOUT_SUCCESS,
} from './actionTypes';
import authService from './service';
import authUtils from './utils';

export function* loginFlow({ payload }) {
  try {
    const loginPayload = yield call(authService.login, payload);
    yield call(authUtils.setLocalStorage, loginPayload);
    yield put({ type: LOGIN_SUCCESS, payload: loginPayload.user });
    yield put(push('/dashboard'));
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, error: err.response.data.error });
  }
}

export function* logoutFlow() {
  const localStorageClear = localStorage.clear();
  const reload = window.location.reload();
  yield call(reload);
  yield call(localStorageClear);
  yield put({ type: LOGOUT_SUCCESS });
}

export default function* rootLoginSaga() {
  yield all([takeLatest(LOGIN_INIT, loginFlow), takeLatest(LOGOUT_INIT, logoutFlow)]);
}
