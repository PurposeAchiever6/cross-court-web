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
  LOGOUT_INIT,
} from './actionTypes';

const initialState = {
  loginLoading: false,
  signupLoading: false,
  forgotPassLoading: false,
  passResetLoading: false,
  isAuthenticated: false,
  loginError: '',
  signupErrors: {},
  userEmail: '',
  forgotPassError: '',
  passResetError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return {
        ...state,
        loginLoading: true,
        loginError: '',
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
      return { ...state, loginError: action.error, loginLoading: false };
    case SIGN_UP_INIT:
      return {
        ...state,
        signupLoading: true,
        signupErrors: {},
        userEmail: '',
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        userEmail: action.payload.email,
      };
    case SIGN_UP_FAILURE:
      return { ...state, signupErrors: action.error, signupLoading: false };
    case FORGOT_PASS_INIT:
      return {
        ...state,
        forgotPassLoading: true,
        forgotPassError: '',
        userEmail: '',
      };
    case FORGOT_PASS_SUCCESS:
      return {
        ...state,
        forgotPassLoading: false,
        userEmail: action.payload.email,
      };
    case FORGOT_PASS_FAILURE:
      return { ...state, forgotPassError: action.error, forgotPassLoading: false };
    case PASS_RESET_INIT:
      return {
        ...state,
        passResetLoading: true,
        passResetError: '',
      };
    case PASS_RESET_SUCCESS:
      return {
        ...state,
        passResetLoading: false,
      };
    case PASS_RESET_FAILURE:
      return { ...state, passResetError: action.error, passResetLoading: false };
    case LOGOUT_INIT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const getAuth = state => state.auth;

export const getLoginLoading = createSelector(getAuth, auth => auth.loginLoading);

export const getLoginError = createSelector(getAuth, auth => auth.loginError);

export const getSignupLoading = createSelector(getAuth, auth => auth.signupLoading);

export const getSignupErrors = createSelector(getAuth, auth => auth.signupErrors);

export const getUserEmail = createSelector(getAuth, auth => auth.userEmail);

export const getForgotPassLoading = createSelector(getAuth, auth => auth.forgotPassLoading);

export const getForgotPassError = createSelector(getAuth, auth => auth.forgotPassError);

export const getPassResetLoading = createSelector(getAuth, auth => auth.passResetLoading);

export const getPassResetError = createSelector(getAuth, auth => auth.passResetError);

export const getIsAuthenticated = createSelector(getAuth, auth => auth.isAuthenticated);
