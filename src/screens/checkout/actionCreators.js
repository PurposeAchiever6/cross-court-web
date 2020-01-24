import { CREATE_PURCHASE_INIT, CREATE_FREE_SESSION_INIT } from './actionTypes';

export const createPurchase = () => ({
  type: CREATE_PURCHASE_INIT,
});

export const createFreeSessionInit = () => ({
  type: CREATE_FREE_SESSION_INIT,
});
