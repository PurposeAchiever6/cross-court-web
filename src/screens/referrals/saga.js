import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { GET_REFERRALS_INIT, GET_REFERRALS_SUCCESS, GET_REFERRALS_FAILURE } from './actionTypes';
import referralsService from './service';

export function* getReferralsFlow() {
  try {
    const referrals = yield call(referralsService.getReferrals);
    yield put({
      type: GET_REFERRALS_SUCCESS,
      payload: { referrals },
    });
  } catch (error) {
    const errorMsg = error.response.data.error;
    yield call(toast.error, errorMsg);
    yield put({ type: GET_REFERRALS_FAILURE, error: errorMsg });
  }
}

export default function* referralSaga() {
  yield all([takeLatest(GET_REFERRALS_INIT, getReferralsFlow)]);
}
