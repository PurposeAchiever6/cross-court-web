import { createSelector } from 'reselect';
import { INITIAL_LOAD_INIT, INITIAL_LOAD_SUCCESS, INITIAL_LOAD_FAILURE } from './actionTypes';

const initialState = {
  error: '',
  pageLoading: false,
  purchaseHistory: [],
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
        purchaseHistory: [...action.payload.availablePurchaseHistory],
      };
    case INITIAL_LOAD_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    default:
      return state;
  }
};

const getPurchaseHistoryReducer = state => state.purchaseHistory;

export const getPageLoading = createSelector(
  getPurchaseHistoryReducer,
  purchaseHistory => purchaseHistory.pageLoading
);

export const getError = createSelector(
  getPurchaseHistoryReducer,
  purchaseHistory => purchaseHistory.error
);

export const getPurchaseHistory = createSelector(
  getPurchaseHistoryReducer,
  purchaseHistory => purchaseHistory.purchaseHistory
);
