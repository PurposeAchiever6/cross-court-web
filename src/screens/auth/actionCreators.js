import {
  LOGIN_INIT,
  LOGOUT_INIT,
  SIGN_UP_INIT,
  SEND_CONFIRMATION_EMAIL_INIT,
  FORGOT_PASS_INIT,
  PASS_RESET_INIT,
} from './actionTypes';

export const loginInit = payload => ({
  type: LOGIN_INIT,
  payload,
});

export const logoutInit = () => ({
  type: LOGOUT_INIT,
});

export const signUpInit = payload => ({
  type: SIGN_UP_INIT,
  payload,
});

export const sendConfirmationEmailInit = () => ({
  type: SEND_CONFIRMATION_EMAIL_INIT,
});

export const forgotPassInit = payload => ({
  type: FORGOT_PASS_INIT,
  payload,
});

export const passResetInit = payload => ({
  type: PASS_RESET_INIT,
  payload,
});
