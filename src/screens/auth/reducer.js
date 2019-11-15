import { createSelector } from 'reselect';
import { LOGIN_INIT, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';

const initialState = {
  loginLoading: false,
  loginError: '',
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
