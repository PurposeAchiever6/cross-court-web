import {
  CREATE_PURCHASE_INIT,
  CREATE_FREE_SESSION_INIT,
  CHECK_PROMO_CODE_INIT,
} from './actionTypes';

export const createPurchase = () => ({
  type: CREATE_PURCHASE_INIT,
});

export const createFreeSessionInit = () => ({
  type: CREATE_FREE_SESSION_INIT,
});

export const checkPromoCode = (promoCode, price) => ({
  type: CHECK_PROMO_CODE_INIT,
  payload: {
    promoCode,
    price,
  },
});
