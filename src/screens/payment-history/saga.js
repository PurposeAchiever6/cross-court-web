import { put, takeLatest, call } from 'redux-saga/effects';

import { INITIAL_LOAD_INIT, INITIAL_LOAD_SUCCESS, INITIAL_LOAD_FAILURE } from './actionTypes';

import paymentHistoryService from './service';

export function* initialLoadFlow() {
  try {
    const paymentHistoryPayload = yield call(paymentHistoryService.getPaymentHistory);
    yield put({
      type: INITIAL_LOAD_SUCCESS,
      payload: {
        payments: paymentHistoryPayload,
      },
    });
  } catch (err) {
    yield put({ type: INITIAL_LOAD_FAILURE, error: err.response.data.error });
  }
}

export default function* paymentHistorySaga() {
  yield takeLatest(INITIAL_LOAD_INIT, initialLoadFlow);
}
