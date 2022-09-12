import {
  LOGIN_INIT,
  LOGOUT_INIT,
  SIGN_UP_INIT,
  SEND_CONFIRMATION_EMAIL_INIT,
  FORGOT_PASS_INIT,
  PASS_RESET_INIT,
  AUTO_LOGIN_INIT,
  UPDATE_SKILL_RATING_INIT,
  UPDATE_PROFILE_REQUEST_INIT,
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

export const updateProfileRequestInit = (payload) => ({
  type: UPDATE_PROFILE_REQUEST_INIT,
  payload,
});

export const forgotPassInit = (payload) => ({
  type: FORGOT_PASS_INIT,
  payload,
});

export const passResetInit = (payload) => ({
  type: PASS_RESET_INIT,
  payload,
});

export const autoLogin = (headers) => ({
  type: AUTO_LOGIN_INIT,
  payload: {
    headers,
  },
});
