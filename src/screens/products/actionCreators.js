import {
  INITIAL_LOAD_INIT,
  CANCEL_SUBSCRIPTION_INIT,
  REACTIVATE_SUBSCRIPTION_INIT,
  REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_INIT,
  UPDATE_SUBSCRIPTION_PAYMENT_METHOD_INIT,
  SUBSCRIPTION_REQUEST_CANCELLATION_INIT,
  CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_INIT,
  PAUSE_SUBSCRIPTION_INIT,
  CANCEL_PAUSE_SUBSCRIPTION_INIT,
  UNPAUSE_SUBSCRIPTION_INIT,
} from './actionTypes';

export const initialLoad = () => ({
  type: INITIAL_LOAD_INIT,
});

export const cancelSubscription = (subscription) => ({
  type: CANCEL_SUBSCRIPTION_INIT,
  payload: { subscription },
});

export const reactivateSubscription = (subscription) => ({
  type: REACTIVATE_SUBSCRIPTION_INIT,
  payload: { subscription },
});

export const removeSubscriptionCancelAtNextPeriodEnd = (payload) => ({
  type: REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_INIT,
  payload,
});

export const updateSubscriptionPaymentMethod = (subscription, paymentMethod) => ({
  type: UPDATE_SUBSCRIPTION_PAYMENT_METHOD_INIT,
  payload: {
    subscription,
    paymentMethod,
  },
});

export const createSubscriptionRequestCancellation = (payload) => ({
  type: SUBSCRIPTION_REQUEST_CANCELLATION_INIT,
  payload,
});

export const cancelSubscriptionRequestCancellation = (payload = {}) => ({
  type: CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_INIT,
  payload,
});

export const pauseSubscription = (subscription, reason) => ({
  type: PAUSE_SUBSCRIPTION_INIT,
  payload: {
    subscription,
    reason,
  },
});

export const cancelPauseSubscription = (subscription) => ({
  type: CANCEL_PAUSE_SUBSCRIPTION_INIT,
  payload: { subscription },
});

export const unpauseSubscription = (subscription) => ({
  type: UNPAUSE_SUBSCRIPTION_INIT,
  payload: { subscription },
});
