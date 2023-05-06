import {
  SELECT_PRODUCT,
  SET_PAYMENT_METHOD_INIT,
  SET_PROMO_CODE_INIT,
  REMOVE_PROMO_CODE_INIT,
} from 'screens/onboarding/actionTypes';

export const selectProduct = (payload) => ({
  type: SELECT_PRODUCT,
  payload,
});

export const setPaymentMethodInit = (payload) => ({
  type: SET_PAYMENT_METHOD_INIT,
  payload,
});

export const setPromoCodeInit = (payload) => ({
  type: SET_PROMO_CODE_INIT,
  payload,
});

export const removePromoCodeInit = () => ({
  type: REMOVE_PROMO_CODE_INIT,
});
