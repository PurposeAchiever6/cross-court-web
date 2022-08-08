import { FETCH_PAYMENTS_INIT } from './actionTypes';

export const fetchPayments = (page) => ({
  type: FETCH_PAYMENTS_INIT,
  payload: {
    page,
  },
});
