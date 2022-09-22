/* eslint-disable default-param-last */
import { createSelector } from 'reselect';
import { GET_REFERRALS_INIT, GET_REFERRALS_SUCCESS, GET_REFERRALS_FAILURE } from './actionTypes';

const initialState = {
  pageLoading: true,
  referrals: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REFERRALS_INIT:
      return {
        ...state,
        pageLoading: true,
      };
    case GET_REFERRALS_SUCCESS:
      return {
        pageLoading: false,
        referrals: action.payload.referrals,
        error: null,
      };
    case GET_REFERRALS_FAILURE:
      return {
        ...state,
        pageLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getReferralsState = (state) => state.referrals;

export const getError = createSelector(getReferralsState, (referralsState) => referralsState.error);

export const getPageLoading = createSelector(
  getReferralsState,
  (referralsState) => referralsState.pageLoading
);

export const getReferrals = createSelector(
  getReferralsState,
  (referralsState) => referralsState.referrals
);
