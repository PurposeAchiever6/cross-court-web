/* eslint-disable default-param-last */
import { createSelector } from 'reselect';
import { ONE_TIME } from 'screens/products/constants';
import { isRecurring } from 'screens/products/utils';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  UPDATE_SUBSCRIPTION_PAYMENT_METHOD_INIT,
  UPDATE_SUBSCRIPTION_PAYMENT_METHOD_SUCCESS,
  UPDATE_SUBSCRIPTION_PAYMENT_METHOD_FAILURE,
  UNPAUSE_SUBSCRIPTION_INIT,
  UNPAUSE_SUBSCRIPTION_SUCCESS,
  UNPAUSE_SUBSCRIPTION_FAILURE,
  REACTIVATE_SUBSCRIPTION_INIT,
  REACTIVATE_SUBSCRIPTION_SUCCESS,
  REACTIVATE_SUBSCRIPTION_FAILURE,
  REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_INIT,
  REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_SUCCESS,
  REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_FAILURE,
  CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_INIT,
  CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_SUCCESS,
  CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_FAILURE,
} from './actionTypes';

const initialState = {
  pageLoading: false,
  updateSubscriptionPaymentMethodLoading: false,
  availableProducts: [],
  error: '',
  unpauseLoading: false,
  reactivateLoading: false,
  removeCancelAtNextPeriodEndLoading: false,
  cancelRequestCancellationLoading: false,
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
        ...state,
        pageLoading: false,
        availableProducts: [...action.payload.availableProducts],
      };
    case INITIAL_LOAD_FAILURE:
      return {
        ...state,
        pageLoading: false,
        error: action.error,
      };
    case UPDATE_SUBSCRIPTION_PAYMENT_METHOD_INIT:
      return {
        ...state,
        updateSubscriptionPaymentMethodLoading: true,
      };
    case UPDATE_SUBSCRIPTION_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        updateSubscriptionPaymentMethodLoading: false,
      };
    case UPDATE_SUBSCRIPTION_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        updateSubscriptionPaymentMethodLoading: false,
        error: action.error,
      };
    case UNPAUSE_SUBSCRIPTION_INIT:
      return {
        ...state,
        unpauseLoading: true,
      };
    case UNPAUSE_SUBSCRIPTION_SUCCESS:
    case UNPAUSE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        unpauseLoading: false,
      };
    case REACTIVATE_SUBSCRIPTION_INIT:
      return {
        ...state,
        reactivateLoading: true,
      };
    case REACTIVATE_SUBSCRIPTION_SUCCESS:
    case REACTIVATE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        reactivateLoading: false,
      };
    case REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_INIT:
      return {
        ...state,
        removeCancelAtNextPeriodEndLoading: true,
      };
    case REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_SUCCESS:
    case REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_FAILURE:
      return {
        ...state,
        removeCancelAtNextPeriodEndLoading: false,
      };
    case CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_INIT:
      return {
        ...state,
        cancelRequestCancellationLoading: true,
      };
    case CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_SUCCESS:
    case CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_FAILURE:
      return {
        ...state,
        cancelRequestCancellationLoading: false,
      };
    default:
      return state;
  }
};

export const getProducts = (state) => state.products;

export const getPageLoading = createSelector(getProducts, (products) => products.pageLoading);

export const getUpdateSubscriptionPaymentMethodLoading = createSelector(
  getProducts,
  (products) => products.updateSubscriptionPaymentMethodLoading
);

export const getError = createSelector(getProducts, (products) => products.error);

export const getAvailableProducts = createSelector(
  getProducts,
  (products) => products.availableProducts
);

export const getRecurringProducts = createSelector(getAvailableProducts, (products) =>
  products.filter((product) => isRecurring(product))
);

export const getDropInProducts = createSelector(getAvailableProducts, (products) =>
  products.filter(
    (product) => product.productType === ONE_TIME && !product.seasonPass && !product.scouting
  )
);

export const getRecurringProductsPromoCode = createSelector(getRecurringProducts, (products) =>
  products
    .filter((product) => product.promoCode)
    .map((product) => ({ ...product.promoCode, product }))
);

export const getFeaturedRecurringProductPromoCode = createSelector(
  getRecurringProductsPromoCode,
  // When we want to only show one promo code offer, we keep the middle one that it should
  // be for the middle price product
  (promoCodes) => promoCodes[Math.floor((promoCodes.length - 1) / 2)]
);

export const getUnpauseLoading = createSelector(getProducts, (products) => products.unpauseLoading);

export const getReactivateLoading = createSelector(
  getProducts,
  (products) => products.reactivateLoading
);

export const getRemoveCancelAtNextPeriodEndLoading = createSelector(
  getProducts,
  (products) => products.removeCancelAtNextPeriodEndLoading
);

export const getCancelRequestCancellationLoading = createSelector(
  getProducts,
  (products) => products.cancelRequestCancellationLoading
);
