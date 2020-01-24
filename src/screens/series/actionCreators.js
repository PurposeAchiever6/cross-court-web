import { INITIAL_LOAD_INIT, SET_SELECTED_PRODUCT } from './actionTypes';

export const initialLoad = () => ({
  type: INITIAL_LOAD_INIT,
});

export const setSelectedProduct = productId => ({
  type: SET_SELECTED_PRODUCT,
  payload: {
    selectedProduct: productId,
  },
});
