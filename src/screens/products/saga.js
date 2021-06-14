import { put, takeLatest, call, all } from 'redux-saga/effects';

import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  CANCEL_SUBSCRIPTION_INIT,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAILURE,
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
    yield call(productsService.cancelSubscription, action.payload.subscription.id);
    yield put({
      type: CANCEL_SUBSCRIPTION_SUCCESS,
      payload: {},
    });
  } catch (err) {
    yield put({ type: CANCEL_SUBSCRIPTION_FAILURE, error: err.response.data.error });
  }
}

export default function* productsSaga() {
  yield all([
    takeLatest(INITIAL_LOAD_INIT, initialLoadFlow),
    takeLatest(CANCEL_SUBSCRIPTION_INIT, cancelSubscriptionFlow),
  ]);
}
