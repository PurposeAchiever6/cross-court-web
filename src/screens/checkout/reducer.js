import { createSelector } from 'reselect';
import {
  CREATE_PURCHASE_INIT,
  CREATE_PURCHASE_SUCCESS,
  CREATE_PURCHASE_FAILURE,
  CREATE_FREE_SESSION_INIT,
  CREATE_FREE_SESSION_SUCCESS,
  CREATE_FREE_SESSION_FAILURE,
  CHECK_PROMO_CODE_INIT,
  CHECK_PROMO_CODE_SUCCESS,
  CHECK_PROMO_CODE_FAILURE,
} from './actionTypes';

const initialState = {
  error: '',
  checkoutLoading: false,
  purchaseConfirmed: false,
  promoCodeLoading: false,
  promoCodeError: '',
  promoCodeValid: false,
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
        promoCodeValid: false,
      };
    case CREATE_PURCHASE_FAILURE:
    case CREATE_FREE_SESSION_FAILURE:
      return { ...state, error: action.error, checkoutLoading: false };
    case CHECK_PROMO_CODE_INIT:
      return {
        ...state,
        promoCodeLoading: true,
      };
    case CHECK_PROMO_CODE_SUCCESS:
      return {
        ...state,
        promoCodeLoading: false,
        promoCodeValid: true,
      };
    case CHECK_PROMO_CODE_FAILURE:
      return {
        ...state,
        promoCodeLoading: false,
        promoCodeError: action.error,
        promoCodeValid: false,
      };
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

export const getPromoCodeLoading = createSelector(
  getCheckout,
  checkout => checkout.promoCodeLoading
);

export const getPromoCodeError = createSelector(getCheckout, checkout => checkout.promoCodeError);
export const getPromoCodeValid = createSelector(getCheckout, checkout => checkout.promoCodeValid);
