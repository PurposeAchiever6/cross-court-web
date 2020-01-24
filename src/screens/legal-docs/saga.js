import { put, takeLatest, call, all } from 'redux-saga/effects';

import { GET_LEGAL_DOCS_INIT, GET_LEGAL_DOCS_SUCCESS, GET_LEGAL_DOCS_FAILURE } from './actionTypes';

import legalDocsService from './service';

export function* getLegalDocsFlow() {
  try {
    const [cancelationPolicy, termsAndConditions] = yield all([
      call(legalDocsService.getCancelationPolicy),
      call(legalDocsService.getTermsAndCondtions),
    ]);
    yield put({
      type: GET_LEGAL_DOCS_SUCCESS,
      payload: {
        cancelationPolicy,
        termsAndConditions,
      },
    });
  } catch (err) {
    yield put({ type: GET_LEGAL_DOCS_FAILURE, error: err.response.data.error });
  }
}

export default function* purchaseHistorySaga() {
  yield takeLatest(GET_LEGAL_DOCS_INIT, getLegalDocsFlow);
}
