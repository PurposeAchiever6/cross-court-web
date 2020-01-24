import { createSelector } from 'reselect';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  SET_SELECTED_CARD,
  CLAIM_FREE_SESSION,
} from './actionTypes';

const initialState = {
  error: '',
  pageLoading: false,
  availableCards: [],
  selectedCard: null,
  claimFreeSession: false,
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
        availableCards: [...action.payload.availableCards],
      };
    case INITIAL_LOAD_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    case SET_SELECTED_CARD:
      return {
        ...state,
        selectedCard: { ...action.payload.selectedCard },
      };
    case CLAIM_FREE_SESSION:
      return {
        ...state,
        claimFreeSession: true,
      };
    default:
      return state;
  }
};

const getPayments = state => state.payments;

export const getPageLoading = createSelector(getPayments, payments => payments.pageLoading);

export const getError = createSelector(getPayments, payments => payments.error);

export const getAvailableCards = createSelector(getPayments, payments => payments.availableCards);

export const getSelectedCard = createSelector(getPayments, payments => payments.selectedCard);
export const getClaimFreeSession = createSelector(
  getPayments,
  payments => payments.claimFreeSession
);
