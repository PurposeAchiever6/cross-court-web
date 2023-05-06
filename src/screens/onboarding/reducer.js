/* eslint-disable default-param-last */
import { createSelector } from 'reselect';
import {
  SELECT_PRODUCT,
  SET_PAYMENT_METHOD_INIT,
  SET_PAYMENT_METHOD_SUCCESS,
  SET_PAYMENT_METHOD_FAILURE,
  SET_PROMO_CODE_INIT,
  SET_PROMO_CODE_SUCCESS,
  SET_PROMO_CODE_FAILURE,
  REMOVE_PROMO_CODE_INIT,
} from 'screens/onboarding/actionTypes';

const initialState = {
  selectedProduct: null,
  selectedPaymentMethod: null,
  promoCodeApplied: null,
  paymentMethodLoading: false,
  promoCodeLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload.product,
        promoCodeApplied: null,
      };
    case SET_PAYMENT_METHOD_INIT:
      return {
        ...state,
        paymentMethodLoading: true,
      };
    case SET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        selectedPaymentMethod: action.payload.paymentMethod,
        paymentMethodLoading: false,
      };
    case SET_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        paymentMethodLoading: false,
      };
    case SET_PROMO_CODE_INIT:
      return {
        ...state,
        promoCodeLoading: true,
      };
    case SET_PROMO_CODE_SUCCESS:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          promoCodeAppliedPrice: action.payload.price,
        },
        promoCodeApplied: action.payload.promoCode,
        promoCodeLoading: false,
      };
    case SET_PROMO_CODE_FAILURE:
      return {
        ...state,
        promoCodeLoading: false,
      };
    case REMOVE_PROMO_CODE_INIT:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          promoCodeAppliedPrice: null,
        },
        promoCodeApplied: null,
      };
    default:
      return state;
  }
};

const getOnboarding = (state) => state.onboarding;

export const getSelectedProduct = createSelector(
  getOnboarding,
  (onboarding) => onboarding.selectedProduct
);

export const getSelectedPaymentMethod = createSelector(
  getOnboarding,
  (onboarding) => onboarding.selectedPaymentMethod
);

export const getPromoCodeApplied = createSelector(
  getOnboarding,
  (onboarding) => onboarding.promoCodeApplied
);

export const getPromoCodeLoading = createSelector(
  getOnboarding,
  (onboarding) => onboarding.promoCodeLoading
);

export const getPaymentMethodLoading = createSelector(
  getOnboarding,
  (onboarding) => onboarding.paymentMethodLoading
);
