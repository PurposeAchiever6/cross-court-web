import { put, takeLatest, call } from 'redux-saga/effects';

import { INITIAL_LOAD_INIT, INITIAL_LOAD_SUCCESS, INITIAL_LOAD_FAILURE } from './actionTypes';
import seriesService from './service';

export function* initialLoadFlow() {
  try {
    const availableProductsPayload = yield call(seriesService.getAllProducts);
    yield put({
      type: INITIAL_LOAD_SUCCESS,
      payload: { availableProducts: [...availableProductsPayload] },
    });
  } catch (err) {
    yield put({ type: INITIAL_LOAD_FAILURE, error: err.response.data.error });
  }
}

export default function* seriesSaga() {
  yield takeLatest(INITIAL_LOAD_INIT, initialLoadFlow);
}
