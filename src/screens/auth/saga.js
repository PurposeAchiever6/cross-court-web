import { put, all, takeLatest, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import routes from 'shared/constants/routes';

import {
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_INIT,
  LOGOUT_SUCCESS,
  SIGN_UP_INIT,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SEND_CONFIRMATION_EMAIL_INIT,
  SEND_CONFIRMATION_EMAIL_SUCCESS,
  SEND_CONFIRMATION_EMAIL_FAILURE,
} from './actionTypes';
import authService from './service';
import authUtils from './utils';
import { getUserEmail } from './reducer';

export function* loginFlow({ payload }) {
  try {
    const loginPayload = yield call(authService.login, payload);
    yield call(authUtils.setTokens, loginPayload);
    yield put({ type: LOGIN_SUCCESS, payload: loginPayload.user });
    yield put(push(routes.dashboard));
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

export function* signupFlow({ payload }) {
  try {
    const signupPayload = yield call(authService.signup, payload);
    yield put({ type: SIGN_UP_SUCCESS, payload: signupPayload });
    yield put(push(routes.signupSuccess));
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE, errors: err.response.data.errors });
  }
}

export function* sendConfirmationEmailFlow() {
  try {
    const userEmail = yield select(getUserEmail);
    yield call(authService.sendConfirmationEmail, userEmail);
    yield put({ type: SEND_CONFIRMATION_EMAIL_SUCCESS });
  } catch (err) {
    yield put({ type: SEND_CONFIRMATION_EMAIL_FAILURE, error: err.response.data.error });
  }
}

export default function* rootLoginSaga() {
  yield all([
    takeLatest(LOGIN_INIT, loginFlow),
    takeLatest(LOGOUT_INIT, logoutFlow),
    takeLatest(SIGN_UP_INIT, signupFlow),
    takeLatest(SEND_CONFIRMATION_EMAIL_INIT, sendConfirmationEmailFlow),
  ]);
}
