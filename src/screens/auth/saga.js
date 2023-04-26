import { put, all, takeLatest, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { head } from 'ramda';
import toast from 'shared/utils/toast';

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
  UPDATE_PERSONAL_INFO_INIT,
  UPDATE_PERSONAL_INFO_SUCCESS,
  UPDATE_PERSONAL_INFO_FAILURE,
  UPDATE_PROFILE_REQUEST_INIT,
  UPDATE_PROFILE_REQUEST_SUCCESS,
  UPDATE_PROFILE_REQUEST_FAILURE,
  CLOSE_FORGOT_PASSWORD_MODAL,
  SHOW_FORGOT_PASSWORD_EMAIL_SENT_MODAL,
  CLOSE_RESET_PASSWORD_MODAL,
} from './actionTypes';
import authService from './service';
import { getUserEmail } from './reducer';

export function* loginFlow({ payload }) {
  try {
    const loginPayload = yield call(authService.login, payload);
    yield call(AuthUtils.setTokens, loginPayload);
    yield put({ type: LOGIN_SUCCESS, payload: loginPayload.user });
    yield put(push(ROUTES.HOME));
    yield call(toast.success, 'Login successful. Welcome!');
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, error: err.response.data.error });
    yield call(toast.error, err.response.data.error);
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
    yield put(push(ROUTES.SIGNUP_VERIFICATION));
  } catch (err) {
    if (err.response.data.error) {
      yield call(toast.error, err.response.data.error);
    }
    if (err.response.data.errors) {
      yield call(toast.error, head(err.response.data.errors.fullMessages));
    }
    yield put({
      type: SIGN_UP_FAILURE,
    });
  }
}

export function* sendConfirmationEmailFlow() {
  try {
    const userEmail = yield select(getUserEmail);
    yield call(authService.sendConfirmationEmail, userEmail);
    yield put({ type: SEND_CONFIRMATION_EMAIL_SUCCESS });
    yield call(toast.success, 'Confirmation email sent.');
  } catch (err) {
    const errorMessage = err.response.data.error;
    yield call(toast.error, errorMessage);
    yield put({ type: SEND_CONFIRMATION_EMAIL_FAILURE, error: errorMessage });
  }
}

export function* updateSkillRatingFlow({ payload }) {
  try {
    const { isEdit } = payload;
    let email = null;
    if (!isEdit) email = yield select(getUserEmail);

    yield call(authService.updateSkillRating, { email, skillRating: payload.skillRating });
    yield put({ type: UPDATE_SKILL_RATING_SUCCESS });

    if (isEdit) {
      yield call(toast.success, 'Skill rating updated successfully');
    } else {
      yield put(push(ROUTES.ABOUT_YOURSELF, { from: ROUTES.RATING }));
    }
  } catch (err) {
    const errorMessage = err.response.data.error;
    yield call(toast.error, errorMessage);
    yield put({ type: UPDATE_SKILL_RATING_FAILURE, error: errorMessage });
  }
}

export function* updatePersonalInfoFlow({ payload }) {
  try {
    const email = yield select(getUserEmail);

    yield call(authService.updatePersonalInfo, { email, personalInfo: payload.personalInfo });
    yield put({ type: UPDATE_PERSONAL_INFO_SUCCESS });
    yield put(
      push(payload.from === ROUTES.ABOUT_YOURSELF ? ROUTES.GOALS : ROUTES.SIGNUPSUCCESS, {
        from: payload.from,
      })
    );
  } catch (err) {
    const errorMessage = err.response.data.error;
    yield call(toast.error, errorMessage);
    yield put({ type: UPDATE_PERSONAL_INFO_FAILURE, error: errorMessage });
  }
}

export function* updateRequestFlow({ payload }) {
  try {
    yield call(authService.updateProfileRequest, payload);
    yield put({ type: UPDATE_PROFILE_REQUEST_SUCCESS });
  } catch (err) {
    yield put({ type: UPDATE_PROFILE_REQUEST_FAILURE, error: err.response.data.error });
  }
}

export function* forgotPasswordFlow({ payload }) {
  try {
    yield call(authService.forgotPassword, payload);
    yield put({ type: FORGOT_PASS_SUCCESS, payload: { email: payload.email } });
    yield put({ type: CLOSE_FORGOT_PASSWORD_MODAL });
    yield put({ type: SHOW_FORGOT_PASSWORD_EMAIL_SENT_MODAL });
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({ type: FORGOT_PASS_FAILURE, error: err.response.data.error });
  }
}

export function* passwordResetFlow({ payload }) {
  try {
    yield call(authService.resetPassword, payload);
    yield put({ type: PASS_RESET_SUCCESS });
    yield put({ type: CLOSE_RESET_PASSWORD_MODAL });
    yield call(
      toast.success,
      'Your password has been reset. You can now login using your new password.'
    );
  } catch (err) {
    const errorMsg = head(err.response.data.errors.fullMessages);
    yield call(toast.error, errorMsg);
    yield put({ type: PASS_RESET_FAILURE, error: errorMsg });
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
    takeLatest(FORGOT_PASS_INIT, forgotPasswordFlow),
    takeLatest(PASS_RESET_INIT, passwordResetFlow),
    takeLatest(AUTO_LOGIN_INIT, autoLoginFlow),
    takeLatest(UPDATE_SKILL_RATING_INIT, updateSkillRatingFlow),
    takeLatest(UPDATE_PERSONAL_INFO_INIT, updatePersonalInfoFlow),
    takeLatest(UPDATE_PROFILE_REQUEST_INIT, updateRequestFlow),
  ]);
}
