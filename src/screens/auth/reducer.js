import { createSelector } from 'reselect';
import {
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_INIT,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from './actionTypes';

const initialState = {
  loginLoading: false,
  signupLoading: false,
  loginError: '',
  signupErrors: {},
  userEmail: '',
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
      };
    case LOGIN_FAILURE:
      return { ...state, loginError: action.error, loginLoading: false };
    case SIGN_UP_INIT:
      return {
        ...state,
        signupLoading: true,
        signupErrors: {},
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        userEmail: action.payload.email,
      };
    case SIGN_UP_FAILURE:
      return { ...state, signupErrors: action.errors, signupLoading: false };
    default:
      return state;
  }
};

const getAuth = state => state.auth;

export const getLoginLoading = createSelector(
  getAuth,
  auth => auth.loginLoading
);

export const getLoginError = createSelector(
  getAuth,
  auth => auth.loginError
);

export const getSignupLoading = createSelector(
  getAuth,
  auth => auth.signupLoading
);

export const getSignupErrors = createSelector(
  getAuth,
  auth => auth.signupErrors
);

export const getUserEmail = createSelector(
  getAuth,
  auth => auth.userEmail
);
