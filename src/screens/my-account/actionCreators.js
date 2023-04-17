import { INITIAL_LOAD_INIT, EDIT_PROFILE_INIT, SEND_MEMBERSHIP_HANDBOOK_INIT } from './actionTypes';

export const initialLoadInit = () => ({
  type: INITIAL_LOAD_INIT,
});

export const editProfileInit = (payload) => ({
  type: EDIT_PROFILE_INIT,
  payload,
});

export const sendMembershipHandbook = (payload) => ({
  type: SEND_MEMBERSHIP_HANDBOOK_INIT,
  payload,
});
