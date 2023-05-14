/* eslint-disable default-param-last */
import { createSelector } from 'reselect';
import {
  SELECT_PRODUCT,
  SELECT_PAYMENT_METHOD,
  SET_PROMO_CODE_INIT,
  SET_PROMO_CODE_SUCCESS,
  SET_PROMO_CODE_FAILURE,
  REMOVE_PROMO_CODE_INIT,
  SHOW_SELECT_PAYMENT_METHOD_MODAL,
  CLOSE_SELECT_PAYMENT_METHOD_MODAL,
  SHOW_ADD_PAYMENT_METHOD_MODAL,
  CLOSE_ADD_PAYMENT_METHOD_MODAL,
  CREATE_PURCHASE_INIT,
  CREATE_PURCHASE_SUCCESS,
  CREATE_PURCHASE_FAILURE,
  CREATE_SUBSCRIPTION_INIT,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAILURE,
  UPDATE_SUBSCRIPTION_INIT,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  SUBSCRIPTION_PRORATE_INIT,
  SUBSCRIPTION_PRORATE_SUCCESS,
  SUBSCRIPTION_PRORATE_FAILURE,
} from 'screens/checkout/actionTypes';
import { ADD_CARD_SUCCESS } from 'screens/payment-methods/actionTypes';

const initialState = {
  selectedProduct: null,
  selectedPaymentMethod: null,
  promoCodeApplied: null,
  prorate: null,
  checkoutLoading: false,
  promoCodeLoading: false,
  prorateLoading: false,
  purchaseConfirmed: false,
  showSelectPaymentMethodModal: false,
  showAddPaymentMethodModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload.product,
        promoCodeApplied: null,
        prorate: null,
      };
    case SELECT_PAYMENT_METHOD:
      return {
        ...state,
        selectedPaymentMethod: action.payload.paymentMethod,
      };
    case SET_PROMO_CODE_INIT:
      return {
        ...state,
        promoCodeLoading: true,
      };
    case SET_PROMO_CODE_SUCCESS:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          promoCodeAppliedPrice: action.payload.promoCode.discountedPrice,
        },
        promoCodeApplied: action.payload.promoCode,
        promoCodeLoading: false,
      };
    case SET_PROMO_CODE_FAILURE:
      return {
        ...state,
        promoCodeLoading: false,
      };
    case REMOVE_PROMO_CODE_INIT:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          promoCodeAppliedPrice: null,
        },
        promoCodeApplied: null,
      };
    case SHOW_SELECT_PAYMENT_METHOD_MODAL:
      return {
        ...state,
        showSelectPaymentMethodModal: true,
      };
    case CLOSE_SELECT_PAYMENT_METHOD_MODAL:
      return {
        ...state,
        showSelectPaymentMethodModal: false,
      };
    case SHOW_ADD_PAYMENT_METHOD_MODAL:
      return {
        ...state,
        showAddPaymentMethodModal: true,
      };
    case CLOSE_ADD_PAYMENT_METHOD_MODAL:
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        showAddPaymentMethodModal: false,
        showSelectPaymentMethodModal: true,
      };
    case CREATE_PURCHASE_INIT:
    case CREATE_SUBSCRIPTION_INIT:
    case UPDATE_SUBSCRIPTION_INIT:
      return {
        ...state,
        checkoutLoading: true,
      };
    case CREATE_PURCHASE_SUCCESS:
    case CREATE_SUBSCRIPTION_SUCCESS:
    case UPDATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        checkoutLoading: false,
        purchaseConfirmed: true,
      };
    case CREATE_PURCHASE_FAILURE:
    case CREATE_SUBSCRIPTION_FAILURE:
    case UPDATE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        checkoutLoading: false,
      };
    case SUBSCRIPTION_PRORATE_INIT:
      return {
        ...state,
        prorateLoading: true,
      };
    case SUBSCRIPTION_PRORATE_SUCCESS: {
      const { prorate, withPromoCode } = action.payload;
      const { subtotal, total } = prorate;
      const showSubTotal = withPromoCode && subtotal > 0;

      return {
        ...state,
        prorate,
        prorateLoading: false,
        selectedProduct: {
          ...state.selectedProduct,
          priceForUser: showSubTotal ? subtotal : total,
          promoCodeAppliedPrice: showSubTotal ? total : null,
        },
      };
    }
    case SUBSCRIPTION_PRORATE_FAILURE:
      return {
        ...state,
        prorate: null,
        prorateLoading: false,
      };
    default:
      return state;
  }
};

const getCheckout = (state) => state.checkout;

export const getSelectedProduct = createSelector(
  getCheckout,
  (checkout) => checkout.selectedProduct
);

export const getSelectedPaymentMethod = createSelector(
  getCheckout,
  (checkout) => checkout.selectedPaymentMethod
);

export const getPromoCodeApplied = createSelector(
  getCheckout,
  (checkout) => checkout.promoCodeApplied
);

export const getPromoCodeLoading = createSelector(
  getCheckout,
  (checkout) => checkout.promoCodeLoading
);

export const getCheckoutLoading = createSelector(
  getCheckout,
  (checkout) => checkout.checkoutLoading
);

export const getPurchaseConfirmed = createSelector(
  getCheckout,
  (checkout) => checkout.purchaseConfirmed
);

export const getProrate = createSelector(getCheckout, (checkout) => checkout.prorate);

export const getProrateLoading = createSelector(getCheckout, (checkout) => checkout.prorateLoading);

export const getShowAddPaymentMethodModal = createSelector(
  getCheckout,
  (checkout) => checkout.showAddPaymentMethodModal
);

export const getShowSelectPaymentMethodModal = createSelector(
  getCheckout,
  (checkout) => checkout.showSelectPaymentMethodModal
);
