import { createSelector } from 'reselect';
import { FETCH_PAYMENTS_INIT, FETCH_PAYMENTS_SUCCESS, FETCH_PAYMENTS_FAILURE } from './actionTypes';

const initialState = {
  error: '',
  pageLoading: false,
  payments: [],
  pagination: {
    totalPages: '',
    totalRecords: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENTS_INIT:
      return {
        ...state,
        pageLoading: true,
        error: '',
      };
    case FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        pageLoading: false,
        payments: [...action.payload.payments],
        pagination: { ...action.payload.pagination },
      };
    case FETCH_PAYMENTS_FAILURE:
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

export const getPagination = createSelector(
  getPaymentHistoryReducer,
  (paymentHistory) => paymentHistory.pagination
);
