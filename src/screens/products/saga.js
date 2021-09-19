import { put, takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  CANCEL_SUBSCRIPTION_INIT,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAILURE,
  REACTIVE_SUBSCRIPTION_INIT,
  REACTIVE_SUBSCRIPTION_SUCCESS,
  REACTIVE_SUBSCRIPTION_FAILURE,
} from './actionTypes';
import productsService from './service';

export function* initialLoadFlow() {
  try {
    const availableProductsPayload = yield call(productsService.getAllProducts);
    yield put({
      type: INITIAL_LOAD_SUCCESS,
      payload: { availableProducts: [...availableProductsPayload] },
    });
  } catch (err) {
    yield put({ type: INITIAL_LOAD_FAILURE, error: err.response.data.error });
  }
}

export function* cancelSubscriptionFlow(action) {
  try {
    const subscription = yield call(
      productsService.cancelSubscription,
      action.payload.subscription.id
    );
    yield put({
      type: CANCEL_SUBSCRIPTION_SUCCESS,
      payload: { subscription },
    });
  } catch (err) {
    yield put({ type: CANCEL_SUBSCRIPTION_FAILURE, error: err.response.data.error });
  }
}

export function* reactiveSubscriptionFlow(action) {
  try {
    const subscription = yield call(
      productsService.reactiveSubscription,
      action.payload.subscription.id
    );
    yield put({
      type: REACTIVE_SUBSCRIPTION_SUCCESS,
      payload: { subscription },
    });
    yield call(toast.success, 'Your subscription has been reactivated successfully');
  } catch (err) {
    const error = err.response.data.error;
    yield put({ type: REACTIVE_SUBSCRIPTION_FAILURE, error });
    yield call(toast.error, error);
  }
}

export default function* productsSaga() {
  yield all([
    takeLatest(INITIAL_LOAD_INIT, initialLoadFlow),
    takeLatest(CANCEL_SUBSCRIPTION_INIT, cancelSubscriptionFlow),
    takeLatest(REACTIVE_SUBSCRIPTION_INIT, reactiveSubscriptionFlow),
  ]);
}
