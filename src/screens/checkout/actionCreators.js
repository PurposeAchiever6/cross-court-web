import {
  CLEAR_DISCOUNT,
  CREATE_PURCHASE_INIT,
  CREATE_FREE_SESSION_INIT,
  CHECK_PROMO_CODE_INIT,
  CREATE_SUBSCRIPTION_INIT,
} from './actionTypes';

export const clearDiscount = () => ({
  type: CLEAR_DISCOUNT,
});

export const createPurchase = () => ({
  type: CREATE_PURCHASE_INIT,
});

export const createSubscription = () => ({
  type: CREATE_SUBSCRIPTION_INIT,
});

export const createAndReserveFreeSessionInit = (sessionId, date, referralCode) => ({
  type: CREATE_FREE_SESSION_INIT,
  payload: {
    sessionId,
    date,
    referralCode,
  },
});

export const checkPromoCode = (promoCode, price) => ({
  type: CHECK_PROMO_CODE_INIT,
  payload: {
    promoCode,
    price,
  },
});
