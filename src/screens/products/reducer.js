import { createSelector } from 'reselect';
import { CHECK_PROMO_CODE_SUCCESS, CLEAR_DISCOUNT } from 'screens/checkout/actionTypes';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  SET_SELECTED_PRODUCT,
} from './actionTypes';

const initialState = {
  pageLoading: false,
  availableProducts: [
    {
      name: 'Free Session',
      description: '1 session for free',
      price: '0',
    },
  ],
  selectedProduct: null,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_LOAD_INIT:
      return {
        ...state,
        pageLoading: true,
      };
    case INITIAL_LOAD_SUCCESS:
      return {
        pageLoading: false,
        availableProducts: [...action.payload.availableProducts],
      };
    case INITIAL_LOAD_FAILURE:
      return {
        ...state,
        pageLoading: false,
        error: action.error,
      };
    case SET_SELECTED_PRODUCT:
      return {
        ...state,
        priceBeforeDiscount: action.payload.selectedProduct.price,
        selectedProduct: { ...action.payload.selectedProduct },
      };
    case CHECK_PROMO_CODE_SUCCESS:
      return {
        ...state,
        priceBeforeDiscount: state.selectedProduct.price,
        selectedProduct: {
          ...state.selectedProduct,
          price: action.payload.price,
        },
      };
    case CLEAR_DISCOUNT:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          price: state.priceBeforeDiscount,
        },
      };
    default:
      return state;
  }
};

export const getProducts = (state) => state.products;

export const getPageLoading = createSelector(getProducts, (products) => products.pageLoading);

export const getError = createSelector(getProducts, (products) => products.error);

export const getAvailableProducts = createSelector(
  getProducts,
  (products) => products.availableProducts
);

export const getSelectedProduct = createSelector(
  getProducts,
  (products) => products.selectedProduct
);
