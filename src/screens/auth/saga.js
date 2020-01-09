import { put, all, takeLatest, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import routes from 'shared/constants/routes';
import authUtils from 'shared/utils/auth';
import { head } from 'ramda';
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
  FORGOT_PASS_INIT,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAILURE,
  PASS_RESET_INIT,
  PASS_RESET_SUCCESS,
  PASS_RESET_FAILURE,
} from './actionTypes';
import authService from './service';
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

export function* forgotPassFlow({ payload }) {
  try {
    yield call(authService.forgotPassword, payload);
    yield put({ type: FORGOT_PASS_SUCCESS, payload: { email: payload.email } });
    yield put(push(routes.forgotPasswordSuccess));
  } catch (err) {
    yield put({ type: FORGOT_PASS_FAILURE, error: err.response.data.error });
  }
}

export function* passResetFlow({ payload }) {
  try {
    yield call(authService.resetPassword, payload);
    yield put({ type: PASS_RESET_SUCCESS });
    yield put(push(routes.resetPasswordSuccess));
  } catch (err) {
    yield put({ type: PASS_RESET_FAILURE, error: head(err.response.data.errors.full_messages) });
  }
}

export default function* rootLoginSaga() {
  yield all([
    takeLatest(LOGIN_INIT, loginFlow),
    takeLatest(LOGOUT_INIT, logoutFlow),
    takeLatest(SIGN_UP_INIT, signupFlow),
    takeLatest(SEND_CONFIRMATION_EMAIL_INIT, sendConfirmationEmailFlow),
    takeLatest(FORGOT_PASS_INIT, forgotPassFlow),
    takeLatest(PASS_RESET_INIT, passResetFlow),
  ]);
}
