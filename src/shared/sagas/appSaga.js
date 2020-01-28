import { put, takeLatest, call } from 'redux-saga/effects';

import myAccountService from 'screens/my-account/service';
import {
  INITIAL_APP_LOAD_INIT,
  INITIAL_APP_LOAD_SUCCESS,
  INITIAL_APP_LOAD_FAILURE,
} from '../actions/actionTypes';

export function* initialLoadFlow() {
  try {
    const profilePayload = yield call(myAccountService.getUserProfile);

    yield put({
      type: INITIAL_APP_LOAD_SUCCESS,
      payload: {
        userProfile: profilePayload,
      },
    });
  } catch (err) {
    yield put({ type: INITIAL_APP_LOAD_FAILURE, error: err.response.data.error });
  }
}

export default function* appSaga() {
  yield takeLatest(INITIAL_APP_LOAD_INIT, initialLoadFlow);
}
