import {
  CLEAR_DISCOUNT,
  CREATE_PURCHASE_INIT,
  CREATE_FREE_SESSION_INIT,
  CHECK_PROMO_CODE_INIT,
  CREATE_SUBSCRIPTION_INIT,
  UPDATE_SUBSCRIPTION_INIT,
  SUBSCRIPTION_PRORATE_INIT,
} from './actionTypes';

export const clearDiscount = () => ({
  type: CLEAR_DISCOUNT,
});

export const createPurchase = (payload, options = {}) => ({
  type: CREATE_PURCHASE_INIT,
  payload,
  options,
});

export const createSubscription = (payload = {}, options = {}) => ({
  type: CREATE_SUBSCRIPTION_INIT,
  payload,
  options,
});

export const updateSubscription = () => ({
  type: UPDATE_SUBSCRIPTION_INIT,
});

export const createAndReserveFreeSessionInit = (payload) => ({
  type: CREATE_FREE_SESSION_INIT,
  payload,
});

export const checkPromoCode = (promoCode) => ({
  type: CHECK_PROMO_CODE_INIT,
  payload: {
    promoCode,
  },
});

export const subscriptionProrate = (productId) => ({
  type: SUBSCRIPTION_PRORATE_INIT,
  payload: { product_id: productId },
});
