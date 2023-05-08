/* eslint-disable default-param-last */
import { createSelector } from 'reselect';
import { SET_SELECTED_PRODUCT } from 'screens/products/actionTypes';
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
  UPDATE_SUBSCRIPTION_INIT,
  UPDATE_SUBSCRIPTION_FAILURE,
  UPDATE_SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_PRORATE_INIT,
  SUBSCRIPTION_PRORATE_SUCCESS,
  SUBSCRIPTION_PRORATE_FAILURE,
  SHOW_ADD_PAYMENT_METHOD_MODAL,
  CLOSE_ADD_PAYMENT_METHOD_MODAL,
  SHOW_SELECT_PAYMENT_METHOD_MODAL,
  CLOSE_SELECT_PAYMENT_METHOD_MODAL,
} from 'screens/checkout/actionTypes';

import { ADD_CARD_SUCCESS } from 'screens/payment-methods/actionTypes';

const initialState = {
  error: '',
  checkoutLoading: false,
  purchaseConfirmed: false,
  promoCodeLoading: false,
  promoCodeError: '',
  promoCodeValid: false,
  promoCode: null,
  prorate: null,
  prorateLoading: false,
  showAddPaymentMethodModal: false,
  showSelectPaymentMethodModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PURCHASE_INIT:
    case CREATE_FREE_SESSION_INIT:
    case CREATE_SUBSCRIPTION_INIT:
    case UPDATE_SUBSCRIPTION_INIT:
      return {
        ...state,
        checkoutLoading: true,
        error: '',
      };
    case CREATE_PURCHASE_SUCCESS:
    case CREATE_FREE_SESSION_SUCCESS:
    case CREATE_SUBSCRIPTION_SUCCESS:
    case UPDATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        checkoutLoading: false,
        purchaseConfirmed: true,
        promoCodeValid: false,
      };
    case CREATE_PURCHASE_FAILURE:
    case CREATE_FREE_SESSION_FAILURE:
    case CREATE_SUBSCRIPTION_FAILURE:
    case UPDATE_SUBSCRIPTION_FAILURE:
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
        prorateLoading: false,
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
    case SUBSCRIPTION_PRORATE_INIT:
      return {
        ...state,
        prorateLoading: true,
      };
    case SUBSCRIPTION_PRORATE_SUCCESS:
      return {
        ...state,
        prorate: action.payload.prorate,
        prorateLoading: false,
      };
    case SUBSCRIPTION_PRORATE_FAILURE:
      return {
        ...state,
        prorate: null,
        prorateLoading: false,
      };
    case SHOW_ADD_PAYMENT_METHOD_MODAL:
      return {
        ...state,
        showAddPaymentMethodModal: true,
      };
    case CLOSE_ADD_PAYMENT_METHOD_MODAL:
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        showAddPaymentMethodModal: false,
        showSelectPaymentMethodModal: true,
      };
    case SHOW_SELECT_PAYMENT_METHOD_MODAL:
      return {
        ...state,
        showSelectPaymentMethodModal: true,
      };
    case CLOSE_SELECT_PAYMENT_METHOD_MODAL:
      return {
        ...state,
        showSelectPaymentMethodModal: false,
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

export const getProrate = createSelector(getCheckout, (checkout) => checkout.prorate);
export const getProrateLoading = createSelector(getCheckout, (checkout) => checkout.prorateLoading);

export const getShowAddPaymentMethodModal = createSelector(
  getCheckout,
  (checkout) => checkout.showAddPaymentMethodModal
);

export const getShowSelectPaymentMethodModal = createSelector(
  getCheckout,
  (checkout) => checkout.showSelectPaymentMethodModal
);
