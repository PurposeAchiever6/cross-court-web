/* eslint-disable default-param-last */
import { createSelector } from 'reselect';
import { SELECT_PRODUCT } from 'screens/onboarding/actionTypes';

const initialState = {
  selectedProduct: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload.product,
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
