import { put, takeLatest, call } from 'redux-saga/effects';

import { FETCH_PAYMENTS_INIT, FETCH_PAYMENTS_SUCCESS, FETCH_PAYMENTS_FAILURE } from './actionTypes';

import paymentHistoryService from './service';

export function* fetchPaymentsFlow({ payload }) {
  try {
    const paymentHistoryPayload = yield call(paymentHistoryService.getPaymentHistory, payload);
    yield put({
      type: FETCH_PAYMENTS_SUCCESS,
      payload: {
        payments: paymentHistoryPayload.payments,
        pagination: paymentHistoryPayload.pagination,
      },
    });
  } catch (err) {
    yield put({ type: FETCH_PAYMENTS_FAILURE, error: err.response.data.error });
  }
}

export default function* paymentHistorySaga() {
  yield takeLatest(FETCH_PAYMENTS_INIT, fetchPaymentsFlow);
}
