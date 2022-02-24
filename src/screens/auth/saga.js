import { put, all, takeLatest, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { head } from 'ramda';
import { toast } from 'react-toastify';

import ROUTES from 'shared/constants/routes';
import AuthUtils from 'shared/utils/auth';

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
  AUTO_LOGIN_INIT,
  AUTO_LOGIN_SUCCESS,
  AUTO_LOGIN_FAILURE,
  UPDATE_SKILL_RATING_INIT,
  UPDATE_SKILL_RATING_SUCCESS,
  UPDATE_SKILL_RATING_FAILURE,
} from './actionTypes';
import authService from './service';
import { getUserEmail } from './reducer';

export function* loginFlow({ payload }) {
  try {
    const loginPayload = yield call(authService.login, payload);
    yield call(AuthUtils.setTokens, loginPayload);
    yield put({ type: LOGIN_SUCCESS, payload: loginPayload.user });
    yield put(push(ROUTES.HOME));
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, error: err.response.data.error });
  }
}

export function* logoutFlow({ payload }) {
  yield call(AuthUtils.removeTokens);
  yield put({ type: LOGOUT_SUCCESS });
  yield put(push(payload.redirectTo || ROUTES.HOME));
}

export function* signupFlow({ payload }) {
  try {
    const signupPayload = yield call(authService.signup, payload);
    yield put({ type: SIGN_UP_SUCCESS, payload: signupPayload });
    yield put(push(ROUTES.RATING, { from: ROUTES.SIGNUP }));
  } catch (err) {
    if (err.response.data.error) {
      yield call(toast.error, err.response.data.error);
    }
    yield put({
      type: SIGN_UP_FAILURE,
      payload: {
        errors: err.response.data.errors,
      },
    });
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

export function* updateSkillRatingFlow({ payload }) {
  try {
    const { isEdit } = payload;
    let email = null;
    if (!isEdit) email = yield select(getUserEmail);

    yield call(authService.updateSkillRating, { email, skillRating: payload.skillRating });
    yield put({ type: UPDATE_SKILL_RATING_SUCCESS });
    yield put(push(isEdit ? ROUTES.MYACCOUNT : ROUTES.SIGNUPSUCCESS));
  } catch (err) {
    yield put({ type: UPDATE_SKILL_RATING_FAILURE, error: err.response.data.error });
  }
}

export function* forgotPassFlow({ payload }) {
  try {
    yield call(authService.forgotPassword, payload);
    yield put({ type: FORGOT_PASS_SUCCESS, payload: { email: payload.email } });
    yield put(push(ROUTES.FORGOTPASSWORDSUCCESS));
  } catch (err) {
    yield put({ type: FORGOT_PASS_FAILURE, error: err.response.data.error });
  }
}

export function* passResetFlow({ payload }) {
  try {
    yield call(authService.resetPassword, payload);
    yield put({ type: PASS_RESET_SUCCESS });
    yield put(push(ROUTES.RESETPASSWORDSUCCESS));
  } catch (err) {
    yield put({ type: PASS_RESET_FAILURE, error: head(err.response.data.errors.fullMessages) });
  }
}

export function* autoLoginFlow({ payload }) {
  try {
    yield call(AuthUtils.setTokens, payload.headers);
    yield put({ type: AUTO_LOGIN_SUCCESS });
  } catch (err) {
    yield put({ type: AUTO_LOGIN_FAILURE, error: err });
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
    takeLatest(AUTO_LOGIN_INIT, autoLoginFlow),
    takeLatest(UPDATE_SKILL_RATING_INIT, updateSkillRatingFlow),
  ]);
}
