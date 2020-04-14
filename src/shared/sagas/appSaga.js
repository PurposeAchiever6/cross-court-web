import { put, takeLatest, call } from 'redux-saga/effects';
import utils from 'shared/utils/storage';
import myAccountService from 'screens/my-account/service';

import {
  INITIAL_APP_LOAD_INIT,
  INITIAL_APP_LOAD_SUCCESS,
  INITIAL_APP_LOAD_FAILURE,
  SAVE_SESSION_TO_STORAGE,
  REMOVE_SESSION_FROM_STORAGE,
  SAVE_SESSION_TO_STORAGE_ERROR,
  REMOVE_SESSION_FROM_STORAGE_ERROR,
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

export function* saveSessionToStorageFlow({ payload }) {
  try {
    yield call(utils.saveSession, payload);
  } catch (err) {
    yield put({ type: SAVE_SESSION_TO_STORAGE_ERROR, error: err });
  }
}

export function* removeSessionFromStorageFlow() {
  try {
    yield call(utils.removeSavedSession);
  } catch (err) {
    yield put({ type: REMOVE_SESSION_FROM_STORAGE_ERROR, error: err });
  }
}

export default function* appSaga() {
  yield takeLatest(INITIAL_APP_LOAD_INIT, initialLoadFlow);
  yield takeLatest(SAVE_SESSION_TO_STORAGE, saveSessionToStorageFlow);
  yield takeLatest(REMOVE_SESSION_FROM_STORAGE, removeSessionFromStorageFlow);
}
