import { put, takeLatest, call } from 'redux-saga/effects';

import { INITIAL_LOAD_INIT, INITIAL_LOAD_SUCCESS, INITIAL_LOAD_FAILURE } from './actionTypes';

import purchaseHistoryService from './service';

export function* initialLoadFlow() {
  try {
    const purchaseHistoryPayload = yield call(purchaseHistoryService.getPurchaseHistory);
    console.log(purchaseHistoryPayload);
    yield put({
      type: INITIAL_LOAD_SUCCESS,
      payload: {
        availablePurchaseHistory: purchaseHistoryPayload,
      },
    });
  } catch (err) {
    yield put({ type: INITIAL_LOAD_FAILURE, error: err.response.data.error });
  }
}

export default function* purchaseHistorySaga() {
  yield takeLatest(INITIAL_LOAD_INIT, initialLoadFlow);
}
