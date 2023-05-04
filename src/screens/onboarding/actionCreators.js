import { SELECT_PRODUCT } from 'screens/onboarding/actionTypes';

export const selectProduct = (payload) => ({
  type: SELECT_PRODUCT,
  payload,
});
