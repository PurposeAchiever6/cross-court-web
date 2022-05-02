import {
  INITIAL_LOAD_INIT,
  SET_SELECTED_PRODUCT,
  CANCEL_SUBSCRIPTION_INIT,
  REACTIVATE_SUBSCRIPTION_INIT,
  UPDATE_SUBSCRIPTION_PAYMENT_METHOD_INIT,
  SUBSCRIPTION_FEEDBACK_INIT,
  PAUSE_SUBSCRIPTION_INIT,
  CANCEL_PAUSE_SUBSCRIPTION_INIT,
} from './actionTypes';

export const initialLoad = () => ({
  type: INITIAL_LOAD_INIT,
});

export const setSelectedProduct = (product) => ({
  type: SET_SELECTED_PRODUCT,
  payload: {
    selectedProduct: product,
  },
});

export const cancelSubscription = (subscription) => ({
  type: CANCEL_SUBSCRIPTION_INIT,
  payload: { subscription },
});

export const reactivateSubscription = (subscription) => ({
  type: REACTIVATE_SUBSCRIPTION_INIT,
  payload: { subscription },
});

export const updateSubscriptionPaymentMethod = (subscription, paymentMethod) => ({
  type: UPDATE_SUBSCRIPTION_PAYMENT_METHOD_INIT,
  payload: {
    subscription,
    paymentMethod,
  },
});

export const subscriptionFeedback = (payload) => ({
  type: SUBSCRIPTION_FEEDBACK_INIT,
  payload,
});

export const pauseSubscription = (subscription, months) => ({
  type: PAUSE_SUBSCRIPTION_INIT,
  payload: { subscription, months },
});

export const cancelPauseSubscription = (subscription) => ({
  type: CANCEL_PAUSE_SUBSCRIPTION_INIT,
  payload: { subscription },
});
