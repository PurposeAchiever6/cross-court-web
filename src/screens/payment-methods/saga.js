import { put, takeLatest, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
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
  UPDATE_CARD_INIT,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAILURE,
} from './actionTypes';

import paymentsService from './service';

export function* initialLoadFlow() {
  try {
    const paymentMethodsPayload = yield call(paymentsService.getAllPaymentMethods);
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

export function* addPaymentMethodFlow(action) {
  try {
    const paymentMethodPayload = yield call(
      paymentsService.createPaymentMethod,
      action.payload.stripe,
      action.payload.cardElement
    );
    const paymentMethod = yield call(paymentsService.addPaymentMethod, paymentMethodPayload);

    yield put({
      type: ADD_CARD_SUCCESS,
      payload: {
        paymentMethod,
      },
    });
    yield call(toast.success, 'Card sucessfully added!');

    yield put(push(action.payload.redirectTo || ROUTES.EDIT_PAYMENT_METHODS));
  } catch (err) {
    yield call(toast.error, err.message);

    yield put({ type: ADD_CARD_FAILURE, error: err });
  }
}

export function* updatePaymentMethodFlow(action) {
  try {
    const paymentMethodsPayload = yield call(
      paymentsService.updatePaymentMethod,
      action.payload.paymentMethodId,
      action.payload.paymentMethodAttrs
    );

    yield put({
      type: UPDATE_CARD_SUCCESS,
      payload: {
        availableCards: paymentMethodsPayload,
      },
    });
    yield call(toast.success, 'Default card updated');
  } catch (err) {
    yield call(toast.error, err.message);

    yield put({ type: UPDATE_CARD_FAILURE, error: err });
  }
}

export function* deletePaymentMethodFlow(action) {
  try {
    const paymentMethodsPayload = yield call(
      paymentsService.deletePaymentMethod,
      action.payload.cardId
    );

    yield put({
      type: DELETE_CARD_SUCCESS,
      payload: {
        availableCards: paymentMethodsPayload,
      },
    });
    yield call(toast.success, 'Card successfully deleted');
  } catch (err) {
    yield call(toast.error, err.response.data.error);

    yield put({ type: DELETE_CARD_FAILURE, error: err.response.data.error });
  }
}

export default function* paymentsSaga() {
  yield all([
    takeLatest(INITIAL_LOAD_INIT, initialLoadFlow),
    takeLatest(ADD_CARD_INIT, addPaymentMethodFlow),
    takeLatest(DELETE_CARD_INIT, deletePaymentMethodFlow),
    takeLatest(UPDATE_CARD_INIT, updatePaymentMethodFlow),
  ]);
}
