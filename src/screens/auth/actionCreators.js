import { LOGIN_INIT, LOGOUT_INIT } from './actionTypes';

export const loginInit = payload => ({
  type: LOGIN_INIT,
  payload,
});

export const logoutInit = () => ({
  type: LOGOUT_INIT,
});
