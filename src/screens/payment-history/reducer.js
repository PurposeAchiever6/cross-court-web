import { createSelector } from 'reselect';
import { INITIAL_LOAD_INIT, INITIAL_LOAD_SUCCESS, INITIAL_LOAD_FAILURE } from './actionTypes';

const initialState = {
  error: '',
  pageLoading: false,
  payments: [],
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
        payments: [...action.payload.payments],
      };
    case INITIAL_LOAD_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    default:
      return state;
  }
};

const getPaymentHistoryReducer = (state) => state.paymentHistory;

export const getPageLoading = createSelector(
  getPaymentHistoryReducer,
  (paymentHistory) => paymentHistory.pageLoading
);

export const getError = createSelector(
  getPaymentHistoryReducer,
  (paymentHistory) => paymentHistory.error
);

export const getPaymentHistory = createSelector(
  getPaymentHistoryReducer,
  (paymentHistory) => paymentHistory.payments
);
