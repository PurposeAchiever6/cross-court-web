import { put, takeLatest, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ROUTES from 'shared/constants/routes';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  ADD_CARD_INIT,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  DELETE_CARD_INIT,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
} from './actionTypes';

import paymentsService from './service';

export function* initialLoadFlow() {
  try {
    const paymentMethodsPayload = yield call(paymentsService.getAllPaymentMethods);
    console.log(paymentMethodsPayload);
    yield put({
      type: INITIAL_LOAD_SUCCESS,
      payload: {
        availableCards: paymentMethodsPayload,
      },
    });
  } catch (err) {
    yield put({ type: INITIAL_LOAD_FAILURE, error: err.response.data.error });
  }
}

export function* addCardFlow(action) {
  try {
    const paymentMethodPayload = yield call(
      paymentsService.createPaymentMethod,
      action.payload.stripe,
      action.payload.cardElement
    );
    yield call(paymentsService.addPaymentMethod, paymentMethodPayload);

    yield put({
      type: ADD_CARD_SUCCESS,
    });
    yield put(push(ROUTES.PAYMENTS));
  } catch (err) {
    yield put({ type: ADD_CARD_FAILURE, error: err.response.data.error });
  }
}

export function* deleteCardFlow(action) {
  try {
    yield call(paymentsService.deletePaymentMethod, action.payload.cardId);

    yield put({
      type: DELETE_CARD_SUCCESS,
    });
    yield put({
      type: INITIAL_LOAD_INIT,
    });
  } catch (err) {
    yield put({ type: DELETE_CARD_FAILURE, error: err.response.data.error });
  }
}

export default function* paymentsSaga() {
  yield all([
    takeLatest(INITIAL_LOAD_INIT, initialLoadFlow),
    takeLatest(ADD_CARD_INIT, addCardFlow),
    takeLatest(DELETE_CARD_INIT, deleteCardFlow),
    takeLatest(DELETE_CARD_INIT, deleteCardFlow),
    // takeLatest(CLAIM_FREE_SESSION, claimFreeSessionFlow),
  ]);
}
