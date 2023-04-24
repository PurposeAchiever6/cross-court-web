/* eslint-disable default-param-last */
import { createSelector } from 'reselect';
import {
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_INIT,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FORGOT_PASS_INIT,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAILURE,
  PASS_RESET_INIT,
  PASS_RESET_SUCCESS,
  PASS_RESET_FAILURE,
  AUTO_LOGIN_SUCCESS,
  SHOW_FORGOT_PASSWORD_MODAL,
  CLOSE_FORGOT_PASSWORD_MODAL,
  SHOW_FORGOT_PASSWORD_EMAIL_SENT_MODAL,
  CLOSE_FORGOT_PASSWORD_EMAIL_SENT_MODAL,
  SHOW_RESET_PASSWORD_MODAL,
  CLOSE_RESET_PASSWORD_MODAL,
} from './actionTypes';

const initialState = {
  loginLoading: false,
  signupLoading: false,
  forgotPassLoading: false,
  passResetLoading: false,
  isAuthenticated: false,
  showForgotPasswordModal: false,
  showForgotPasswordEmailSentModal: false,
  showResetPasswordModal: false,
  signupErrors: {},
  user: {
    firstName: '',
    email: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return {
        ...state,
        loginLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
      };
    case SIGN_UP_INIT:
      return {
        ...state,
        signupLoading: true,
        signupErrors: {},
        user: { firstName: '', email: '' },
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        user: { firstName: action.payload.firstName, email: action.payload.email },
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signupErrors: action.payload.errors,
        signupLoading: false,
      };
    case FORGOT_PASS_INIT:
      return {
        ...state,
        forgotPassLoading: true,
        user: { firstName: '', email: '' },
      };
    case FORGOT_PASS_SUCCESS:
      return {
        ...state,
        forgotPassLoading: false,
        user: { email: action.payload.email },
      };
    case FORGOT_PASS_FAILURE:
      return {
        ...state,
        forgotPassLoading: false,
      };
    case PASS_RESET_INIT:
      return {
        ...state,
        passResetLoading: true,
      };
    case PASS_RESET_SUCCESS:
      return {
        ...state,
        passResetLoading: false,
      };
    case PASS_RESET_FAILURE:
      return {
        ...state,
        passResetLoading: false,
      };
    case AUTO_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case SHOW_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        showForgotPasswordModal: true,
      };
    case CLOSE_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        showForgotPasswordModal: false,
      };
    case SHOW_FORGOT_PASSWORD_EMAIL_SENT_MODAL:
      return {
        ...state,
        showForgotPasswordEmailSentModal: true,
      };
    case CLOSE_FORGOT_PASSWORD_EMAIL_SENT_MODAL:
      return {
        ...state,
        showForgotPasswordEmailSentModal: false,
      };
    case SHOW_RESET_PASSWORD_MODAL:
      return {
        ...state,
        showForgotPasswordModal: false,
        showForgotPasswordEmailSentModal: false,
        showResetPasswordModal: true,
      };
    case CLOSE_RESET_PASSWORD_MODAL:
      return {
        ...state,
        showResetPasswordModal: false,
      };
    default:
      return state;
  }
};

const getAuth = (state) => state.auth;

export const getLoginLoading = createSelector(getAuth, (auth) => auth.loginLoading);

export const getSignupLoading = createSelector(getAuth, (auth) => auth.signupLoading);

export const getSignupErrors = createSelector(getAuth, (auth) => auth.signupErrors);

export const getUser = createSelector(getAuth, (auth) => auth.user);

export const getUserEmail = createSelector(getAuth, (auth) => auth.user.email);

export const getForgotPassLoading = createSelector(getAuth, (auth) => auth.forgotPassLoading);

export const getPassResetLoading = createSelector(getAuth, (auth) => auth.passResetLoading);

export const getIsAuthenticated = createSelector(getAuth, (auth) => auth.isAuthenticated);

export const getShowForgotPasswordModal = createSelector(
  getAuth,
  (auth) => auth.showForgotPasswordModal
);

export const getShowForgotPasswordEmailSentModal = createSelector(
  getAuth,
  (auth) => auth.showForgotPasswordEmailSentModal
);

export const getShowResetPasswordModal = createSelector(
  getAuth,
  (auth) => auth.showResetPasswordModal
);
