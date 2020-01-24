import { createSelector } from 'reselect';
import {
  CREATE_PURCHASE_INIT,
  CREATE_PURCHASE_SUCCESS,
  CREATE_PURCHASE_FAILURE,
  CREATE_FREE_SESSION_INIT,
  CREATE_FREE_SESSION_SUCCESS,
  CREATE_FREE_SESSION_FAILURE,
} from './actionTypes';

const initialState = {
  error: '',
  checkoutLoading: false,
  purchaseConfirmed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PURCHASE_INIT:
    case CREATE_FREE_SESSION_INIT:
      return {
        ...state,
        checkoutLoading: true,
        error: '',
      };
    case CREATE_PURCHASE_SUCCESS:
    case CREATE_FREE_SESSION_SUCCESS:
      return {
        ...state,
        checkoutLoading: false,
        purchaseConfirmed: true,
      };
    case CREATE_PURCHASE_FAILURE:
    case CREATE_FREE_SESSION_FAILURE:
      return { ...state, error: action.error, checkoutLoading: false };
    default:
      return state;
  }
};

const getCheckout = state => state.checkout;

export const getCheckoutLoading = createSelector(getCheckout, checkout => checkout.checkoutLoading);

export const getError = createSelector(getCheckout, checkout => checkout.error);

export const getPurchaseConfirmed = createSelector(
  getCheckout,
  checkout => checkout.purchaseConfirmed
);
