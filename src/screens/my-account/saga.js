import { put, takeLatest, call, all } from 'redux-saga/effects';

import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  EDIT_PROFILE_INIT,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
} from './actionTypes';

import myAccountService from './service';

export function* initialLoadFlow() {
  try {
    const [userProfilePayload, userSessionsPayload] = yield all([
      call(myAccountService.getUserProfile),
      call(myAccountService.getUserSessions),
    ]);
    yield put({
      type: INITIAL_LOAD_SUCCESS,
      payload: {
        availableUserProfile: userProfilePayload,
        availableUserSessions: userSessionsPayload,
      },
    });
  } catch (err) {
    yield put({ type: INITIAL_LOAD_FAILURE, error: err.response.data.error });
  }
}

export function* editProfileFlow(action) {
  try {
    const editProfilePayload = yield call(myAccountService.editUserProfile, action.payload);
    yield put({
      type: EDIT_PROFILE_SUCCESS,
      payload: editProfilePayload,
    });
  } catch (err) {
    yield put({ type: EDIT_PROFILE_FAILURE, error: err.response.data.error });
  }
}

export default function* seriesSaga() {
  yield all([
    takeLatest(INITIAL_LOAD_INIT, initialLoadFlow),
    takeLatest(EDIT_PROFILE_INIT, editProfileFlow),
  ]);
}
