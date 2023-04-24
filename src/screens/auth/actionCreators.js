import {
  LOGIN_INIT,
  LOGOUT_INIT,
  SIGN_UP_INIT,
  SEND_CONFIRMATION_EMAIL_INIT,
  FORGOT_PASS_INIT,
  PASS_RESET_INIT,
  AUTO_LOGIN_INIT,
  UPDATE_SKILL_RATING_INIT,
  UPDATE_PERSONAL_INFO_INIT,
  UPDATE_PROFILE_REQUEST_INIT,
  SHOW_FORGOT_PASSWORD_MODAL,
  CLOSE_FORGOT_PASSWORD_MODAL,
  SHOW_FORGOT_PASSWORD_EMAIL_SENT_MODAL,
  CLOSE_FORGOT_PASSWORD_EMAIL_SENT_MODAL,
  SHOW_RESET_PASSWORD_MODAL,
  CLOSE_RESET_PASSWORD_MODAL,
} from './actionTypes';

export const loginInit = (payload) => ({
  type: LOGIN_INIT,
  payload,
});

export const logoutInit = (payload = {}) => ({
  type: LOGOUT_INIT,
  payload,
});

export const signUpInit = (payload) => ({
  type: SIGN_UP_INIT,
  payload,
});

export const sendConfirmationEmailInit = () => ({
  type: SEND_CONFIRMATION_EMAIL_INIT,
});

export const updateSkillRatingInit = (payload) => ({
  type: UPDATE_SKILL_RATING_INIT,
  payload,
});

export const updatePersonalInfo = (payload) => ({
  type: UPDATE_PERSONAL_INFO_INIT,
  payload,
});

export const updateProfileRequestInit = (payload) => ({
  type: UPDATE_PROFILE_REQUEST_INIT,
  payload,
});

export const forgotPasswordInit = (payload) => ({
  type: FORGOT_PASS_INIT,
  payload,
});

export const passwordResetInit = (payload) => ({
  type: PASS_RESET_INIT,
  payload,
});

export const autoLogin = (headers) => ({
  type: AUTO_LOGIN_INIT,
  payload: {
    headers,
  },
});

export const showForgotPasswordModal = () => ({
  type: SHOW_FORGOT_PASSWORD_MODAL,
});

export const closeForgotPasswordModal = () => ({
  type: CLOSE_FORGOT_PASSWORD_MODAL,
});

export const showForgotPasswordEmailSentModal = () => ({
  type: SHOW_FORGOT_PASSWORD_EMAIL_SENT_MODAL,
});

export const closeForgotPasswordEmailSentModal = () => ({
  type: CLOSE_FORGOT_PASSWORD_EMAIL_SENT_MODAL,
});

export const showResetPasswordModal = () => ({
  type: SHOW_RESET_PASSWORD_MODAL,
});

export const closeResetPasswordModal = () => ({
  type: CLOSE_RESET_PASSWORD_MODAL,
});
