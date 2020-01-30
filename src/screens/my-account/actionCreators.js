import { INITIAL_LOAD_INIT, EDIT_PROFILE_INIT, SHOW_EDIT_PROFILE } from './actionTypes';

export const initialLoadInit = () => ({
  type: INITIAL_LOAD_INIT,
});

export const editProfileInit = (name, phoneNumber) => ({
  type: EDIT_PROFILE_INIT,
  payload: {
    name,
    phone_number: phoneNumber,
  },
});

export const showEditProfile = () => ({
  type: SHOW_EDIT_PROFILE,
});
