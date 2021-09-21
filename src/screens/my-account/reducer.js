import { createSelector } from 'reselect';
import { INITIAL_LOAD_AUTH_SUCCESS as SESSIONS_INITIAL_LOAD } from 'screens/sessions/actionTypes';
import { INITIAL_APP_LOAD_SUCCESS } from 'shared/actions/actionTypes';
import { isToday } from 'shared/utils/date';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  EDIT_PROFILE_INIT,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  SHOW_EDIT_PROFILE,
} from './actionTypes';

import {
  CANCEL_SUBSCRIPTION_SUCCESS,
  REACTIVATE_SUBSCRIPTION_SUCCESS,
} from '../products/actionTypes';
import { CREATE_SUBSCRIPTION_SUCCESS, UPDATE_SUBSCRIPTION_SUCCESS } from '../checkout/actionTypes';

const initialState = {
  error: '',
  pageLoading: false,
  editProfileLoading: false,
  showEditProfile: false,
  userProfile: {},
  previousSessions: [],
  upcomingSessions: [],
  semUpcomingSessions: [],
  todaySemSessions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_LOAD_INIT:
      return {
        ...state,
        pageLoading: true,
        error: '',
      };
    case INITIAL_LOAD_SUCCESS:
      return {
        ...state,
        pageLoading: false,
        userProfile: { ...action.payload.availableUserProfile },
        previousSessions: [...action.payload.availableUserSessions.previousSessions],
        upcomingSessions: [...action.payload.availableUserSessions.upcomingSessions],
        semUpcomingSessions: [...action.payload.availableUserSessions.semUpcomingSessions],
        todaySemSessions: [
          ...action.payload.availableUserSessions.semUpcomingSessions.filter(({ date }) =>
            isToday(date)
          ),
        ],
      };
    case INITIAL_LOAD_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    case EDIT_PROFILE_INIT:
      return {
        ...state,
        editProfileLoading: true,
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        showEditProfile: false,
        editProfileLoading: false,
        userProfile: { ...action.payload },
      };
    case EDIT_PROFILE_FAILURE:
      return {
        ...state,
        editProfileLoading: false,
      };
    case SHOW_EDIT_PROFILE:
      return {
        ...state,
        showEditProfile: !state.showEditProfile,
      };
    case SESSIONS_INITIAL_LOAD:
    case INITIAL_APP_LOAD_SUCCESS:
      return {
        ...state,
        userProfile: { ...action.payload.userProfile },
      };
    case CREATE_SUBSCRIPTION_SUCCESS:
    case UPDATE_SUBSCRIPTION_SUCCESS:
    case CANCEL_SUBSCRIPTION_SUCCESS:
    case REACTIVATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        userProfile: { ...state.userProfile, activeSubscription: action.payload.subscription },
      };
    default:
      return state;
  }
};

const getMyAccount = (state) => state.myAccount;

export const getPageLoading = createSelector(getMyAccount, (myAccount) => myAccount.pageLoading);

export const getError = createSelector(getMyAccount, (myAccount) => myAccount.error);

export const getUserProfile = createSelector(getMyAccount, (myAccount) => myAccount.userProfile);

export const getPreviousSessions = createSelector(
  getMyAccount,
  (myAccount) => myAccount.previousSessions
);

export const getUpcomingSessions = createSelector(
  getMyAccount,
  (myAccount) => myAccount.upcomingSessions
);

export const getEditProfileLoading = createSelector(
  getMyAccount,
  (myAccount) => myAccount.editProfileLoading
);

export const getShowEditProfile = createSelector(
  getMyAccount,
  (myAccount) => myAccount.showEditProfile
);

export const getSemUpcomingSessions = createSelector(
  getMyAccount,
  (myAccount) => myAccount.semUpcomingSessions
);
