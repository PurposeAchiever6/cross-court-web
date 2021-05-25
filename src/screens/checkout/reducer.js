import { createSelector } from 'reselect';
import { SET_SELECTED_PRODUCT } from 'screens/series/actionTypes';
import {
  CLEAR_DISCOUNT,
  CREATE_PURCHASE_INIT,
  CREATE_SUBSCRIPTION_INIT,
  CREATE_PURCHASE_SUCCESS,
  CREATE_PURCHASE_FAILURE,
  CREATE_FREE_SESSION_INIT,
  CREATE_FREE_SESSION_SUCCESS,
  CREATE_FREE_SESSION_FAILURE,
  CHECK_PROMO_CODE_INIT,
  CHECK_PROMO_CODE_SUCCESS,
  CHECK_PROMO_CODE_FAILURE,
  CREATE_SUBSCRIPTION_FAILURE,
  CREATE_SUBSCRIPTION_SUCCESS,
} from './actionTypes';

const initialState = {
  error: '',
  checkoutLoading: false,
  purchaseConfirmed: false,
  promoCodeLoading: false,
  promoCodeError: '',
  promoCodeValid: false,
  promoCode: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PURCHASE_INIT:
    case CREATE_FREE_SESSION_INIT:
    case CREATE_SUBSCRIPTION_INIT:
      return {
        ...state,
        checkoutLoading: true,
        error: '',
      };
    case CREATE_PURCHASE_SUCCESS:
    case CREATE_FREE_SESSION_SUCCESS:
    case CREATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        checkoutLoading: false,
        purchaseConfirmed: true,
        promoCodeValid: false,
      };
    case CREATE_PURCHASE_FAILURE:
    case CREATE_FREE_SESSION_FAILURE:
    case CREATE_SUBSCRIPTION_FAILURE:
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
        promoCode: action.payload.promoCode,
      };
    case CHECK_PROMO_CODE_FAILURE:
      return {
        ...state,
        promoCodeLoading: false,
        promoCodeError: action.error,
        promoCodeValid: false,
      };
    case SET_SELECTED_PRODUCT:
      return {
        ...state,
        promoCodeValid: false,
      };
    case CLEAR_DISCOUNT:
      return {
        ...state,
        promoCodeLoading: false,
        promoCodeError: '',
        promoCodeValid: false,
        promoCode: null,
      };
    default:
      return state;
  }
};

const getCheckout = (state) => state.checkout;

export const getCheckoutLoading = createSelector(
  getCheckout,
  (checkout) => checkout.checkoutLoading
);

export const getError = createSelector(getCheckout, (checkout) => checkout.error);

export const getPurchaseConfirmed = createSelector(
  getCheckout,
  (checkout) => checkout.purchaseConfirmed
);

export const getPromoCodeLoading = createSelector(
  getCheckout,
  (checkout) => checkout.promoCodeLoading
);

export const getPromoCodeError = createSelector(getCheckout, (checkout) => checkout.promoCodeError);
export const getPromoCodeValid = createSelector(getCheckout, (checkout) => checkout.promoCodeValid);
export const getPromoCode = createSelector(getCheckout, (checkout) => checkout.promoCode);
