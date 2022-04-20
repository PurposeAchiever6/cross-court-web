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

export const createPurchase = (payload) => ({
  type: CREATE_PURCHASE_INIT,
  payload,
});

export const createSubscription = () => ({
  type: CREATE_SUBSCRIPTION_INIT,
});

export const updateSubscription = () => ({
  type: UPDATE_SUBSCRIPTION_INIT,
});

export const createAndReserveFreeSessionInit = (sessionId, date, referralCode) => ({
  type: CREATE_FREE_SESSION_INIT,
  payload: {
    sessionId,
    date,
    referralCode,
  },
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
