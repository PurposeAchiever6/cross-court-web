import {
  SELECT_PRODUCT,
  SELECT_PAYMENT_METHOD,
  SET_PROMO_CODE_INIT,
  REMOVE_PROMO_CODE_INIT,
  SHOW_SELECT_PAYMENT_METHOD_MODAL,
  CLOSE_SELECT_PAYMENT_METHOD_MODAL,
  SHOW_ADD_PAYMENT_METHOD_MODAL,
  CLOSE_ADD_PAYMENT_METHOD_MODAL,
  CREATE_PURCHASE_INIT,
  CREATE_SUBSCRIPTION_INIT,
  UPDATE_SUBSCRIPTION_INIT,
  SUBSCRIPTION_PRORATE_INIT,
} from 'screens/checkout/actionTypes';

export const selectProduct = (payload) => ({
  type: SELECT_PRODUCT,
  payload,
});

export const selectPaymentMethod = (payload) => ({
  type: SELECT_PAYMENT_METHOD,
  payload,
});

export const setPromoCodeInit = (payload) => ({
  type: SET_PROMO_CODE_INIT,
  payload,
});

export const removePromoCodeInit = () => ({
  type: REMOVE_PROMO_CODE_INIT,
});

export const showSelectPaymentMethodModal = () => ({
  type: SHOW_SELECT_PAYMENT_METHOD_MODAL,
});

export const closeSelectPaymentMethodModal = () => ({
  type: CLOSE_SELECT_PAYMENT_METHOD_MODAL,
});

export const showAddPaymentMethodModal = () => ({
  type: SHOW_ADD_PAYMENT_METHOD_MODAL,
});

export const closeAddPaymentMethodModal = () => ({
  type: CLOSE_ADD_PAYMENT_METHOD_MODAL,
});

export const createPurchase = (payload, options = {}) => ({
  type: CREATE_PURCHASE_INIT,
  payload,
  options,
});

export const createSubscription = (payload, options = {}) => ({
  type: CREATE_SUBSCRIPTION_INIT,
  payload,
  options,
});

export const updateSubscription = (payload) => ({
  type: UPDATE_SUBSCRIPTION_INIT,
  payload,
});

export const subscriptionProrate = (payload) => ({
  type: SUBSCRIPTION_PRORATE_INIT,
  payload,
});
