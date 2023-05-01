import { put, takeLatest, call, all, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import toast from 'shared/utils/toast';

import { getUserEmail } from 'screens/auth/reducer';
import ROUTES from 'shared/constants/routes';

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
  UPDATE_SKILL_RATING_INIT,
  UPDATE_SKILL_RATING_SUCCESS,
  UPDATE_SKILL_RATING_FAILURE,
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
    const { redirectTo, disableSuccessToast } = action.options;
    const editProfilePayload = yield call(myAccountService.editUserProfile, action.payload);

    yield put({
      type: EDIT_PROFILE_SUCCESS,
      payload: editProfilePayload,
    });

    if (!disableSuccessToast) {
      yield call(toast.success, 'Changes were saved.');
    }

    if (redirectTo) {
      yield put(push(redirectTo));
    }
  } catch (err) {
    if (err.response.data.error) {
      yield put({ type: EDIT_PROFILE_FAILURE, error: err.response.data.error });
      yield call(toast.error, err.response.data.error);
    }

    if (err.response.data.errors) {
      yield put({ type: EDIT_PROFILE_FAILURE, error: err.response.data.errors });
      yield call(toast.error, err.response.data.errors.fullMessages);
    }
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
    yield call(toast.success, 'Membership handbook sent.');
  } catch (error) {
    yield call(toast.error, 'Unexpected error. Please try again later');
  }
}

export function* updateSkillRatingFlow({ payload }) {
  try {
    const { isEdit } = payload;
    let email = null;
    if (!isEdit) email = yield select(getUserEmail);

    yield call(myAccountService.updateSkillRating, { email, skillRating: payload.skillRating });
    yield put({ type: UPDATE_SKILL_RATING_SUCCESS });

    if (isEdit) {
      yield call(toast.success, 'Skill rating updated.');
    } else {
      yield put(push(ROUTES.ABOUT_YOURSELF, { from: ROUTES.RATING }));
    }
  } catch (err) {
    const errorMessage = err.response.data.error;
    yield call(toast.error, errorMessage);
    yield put({ type: UPDATE_SKILL_RATING_FAILURE, error: errorMessage });
  }
}

export default function* myAccountSaga() {
  yield all([
    takeLatest(INITIAL_LOAD_INIT, initialLoadFlow),
    takeLatest(EDIT_PROFILE_INIT, editProfileFlow),
    takeLatest(GET_PROFILE_INIT, getUserProfileFlow),
    takeLatest(SEND_MEMBERSHIP_HANDBOOK_INIT, sendMembershipHandbookFlow),
    takeLatest(UPDATE_SKILL_RATING_INIT, updateSkillRatingFlow),
  ]);
}
