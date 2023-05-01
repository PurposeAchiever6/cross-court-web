import {
  INITIAL_LOAD_INIT,
  EDIT_PROFILE_INIT,
  SEND_MEMBERSHIP_HANDBOOK_INIT,
  UPDATE_SKILL_RATING_INIT,
} from './actionTypes';

export const initialLoadInit = () => ({
  type: INITIAL_LOAD_INIT,
});

export const editProfileInit = (payload, options = {}) => ({
  type: EDIT_PROFILE_INIT,
  payload,
  options,
});

export const sendMembershipHandbook = (payload) => ({
  type: SEND_MEMBERSHIP_HANDBOOK_INIT,
  payload,
});

export const updateSkillRatingInit = (payload) => ({
  type: UPDATE_SKILL_RATING_INIT,
  payload,
});
