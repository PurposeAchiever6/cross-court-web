import { put, takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  EDIT_PROFILE_INIT,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  GET_PROFILE_INIT,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  SEND_MEMBERSHIP_HANDBOOK_INIT,
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
    yield call(toast.success, 'Changes were successfully saved');
  } catch (err) {
    yield put({ type: EDIT_PROFILE_FAILURE, error: err.response.data.error });
  }
}

export function* getUserProfileFlow() {
  try {
    const userProfile = yield call(myAccountService.getUserProfile);

    yield put({
      type: GET_PROFILE_SUCCESS,
      payload: {
        userProfile,
      },
    });
  } catch (err) {
    yield put({ type: GET_PROFILE_FAILURE, error: err.response.data.error });
  }
}

export function* sendMembershipHandbookFlow(action) {
  try {
    yield call(myAccountService.sendMembershipHandbook, action.payload.email);
    yield call(toast.success, 'Membership handbook sent successfully');
  } catch (error) {
    yield call(toast.error, 'Unexpected error. Please try again later');
  }
}

export default function* myAccountSaga() {
  yield all([
    takeLatest(INITIAL_LOAD_INIT, initialLoadFlow),
    takeLatest(EDIT_PROFILE_INIT, editProfileFlow),
    takeLatest(GET_PROFILE_INIT, getUserProfileFlow),
    takeLatest(SEND_MEMBERSHIP_HANDBOOK_INIT, sendMembershipHandbookFlow),
  ]);
}
