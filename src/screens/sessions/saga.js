import { put, all, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ROUTES from 'shared/constants/routes';
import { toast } from 'react-toastify';

import myAccountService from 'screens/my-account/service';
import { SAVE_SESSION_TO_STORAGE } from 'shared/actions/actionTypes';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  INITIAL_LOAD_AUTH_INIT,
  INITIAL_LOAD_AUTH_SUCCESS,
  INITIAL_LOAD_AUTH_FAILURE,
  RESERVE_SESSION_INIT,
  RESERVE_SESSION_SUCCESS,
  RESERVE_SESSION_FAILURE,
  CANCEL_SESSION_INIT,
  CANCEL_SESSION_SUCCESS,
  CANCEL_SESSION_FAILURE,
  CONFIRM_SESSION_INIT,
  CONFIRM_SESSION_SUCCESS,
  CONFIRM_SESSION_FAILURE,
  SIGNUP_BOOK_SESSION,
  BUY_CREDITS_AND_BOOK_SESSION,
  JOIN_SESSION_WAITLIST_INIT,
  JOIN_SESSION_WAITLIST_SUCCESS,
  JOIN_SESSION_WAITLIST_FAILURE,
} from './actionTypes';
import sessionService from './service';

export function* initialLoadFlow({ payload }) {
  try {
    const sessionInfoPayload = yield call(
      sessionService.getSessionInfo,
      payload.sessionId,
      payload.date
    );

    yield put({
      type: INITIAL_LOAD_SUCCESS,
      payload: {
        sessionInfo: sessionInfoPayload,
      },
    });
  } catch (err) {
    yield call(toast.error, err.response.data.error, { autoClose: false, closeButton: true });
    yield put(push(ROUTES.LOCATIONS));
    yield put({ type: INITIAL_LOAD_FAILURE, error: err.response.data.error });
  }
}

export function* initialLoadAuthFlow({ payload }) {
  try {
    const [sessionInfoPayload, userProfilePayload] = yield all([
      call(sessionService.getSessionInfo, payload.sessionId, payload.date),
      call(myAccountService.getUserProfile),
    ]);
    yield put({
      type: INITIAL_LOAD_AUTH_SUCCESS,
      payload: {
        sessionInfo: sessionInfoPayload,
        userProfile: userProfilePayload,
      },
    });
  } catch (err) {
    yield call(toast.error, err.response.data.error, { autoClose: false, closeButton: true });
    yield put(push(ROUTES.LOCATIONS));
    yield put({ type: INITIAL_LOAD_AUTH_FAILURE, error: err.response.data.error });
  }
}

export function* reserveSessionFlow({ payload }) {
  try {
    yield call(
      sessionService.reserveSession,
      payload.sessionId,
      payload.date,
      payload.referralCode
    );
    yield put({
      type: RESERVE_SESSION_SUCCESS,
    });
    yield put(push(ROUTES.SESSIONRESERVED));
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({ type: RESERVE_SESSION_FAILURE, error: err.response.data.error });
  }
}

export function* cancelSessionFlow({ payload }) {
  try {
    yield call(sessionService.cancelSession, payload.sessionId);

    yield put({
      type: CANCEL_SESSION_SUCCESS,
    });
    yield call(toast.success, 'Session successfully canceled!');
    yield put(push(ROUTES.MYACCOUNT));
  } catch (err) {
    yield put({ type: CANCEL_SESSION_FAILURE, error: err.response.data.error });
  }
}

export function* confirmSessionFlow({ payload }) {
  try {
    yield call(sessionService.confirmSession, payload.sessionId);
    yield put({
      type: CONFIRM_SESSION_SUCCESS,
    });
    yield put(push(ROUTES.SESSIONCONFIRMED));
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({ type: CONFIRM_SESSION_FAILURE, error: err.response.data.error });
  }
}

export function* joinSessionWaitlistFlow({ payload }) {
  try {
    const sessionWaitlist = yield call(
      sessionService.joinSessionWaitlist,
      payload.sessionId,
      payload.sessionDate
    );
    yield put({ type: JOIN_SESSION_WAITLIST_SUCCESS, payload: { sessionWaitlist } });
    yield put(push(ROUTES.SESSIONJOINWAITLIST));
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({ type: JOIN_SESSION_WAITLIST_FAILURE, error: err.response.data.error });
  }
}

export function* signupBookSessionFlow({ payload }) {
  try {
    yield put({ type: SAVE_SESSION_TO_STORAGE, payload });
    yield put(push(ROUTES.SIGNUP));
  } catch (err) {}
}

export function* buyCreditsAndBookSessionFlow({ payload }) {
  try {
    yield put({ type: SAVE_SESSION_TO_STORAGE, payload });
    yield put(push(ROUTES.MEMBERSHIPS));
  } catch (err) {}
}

export default function* rootSessionSaga() {
  yield all([
    takeLatest(INITIAL_LOAD_INIT, initialLoadFlow),
    takeLatest(INITIAL_LOAD_AUTH_INIT, initialLoadAuthFlow),
    takeLatest(RESERVE_SESSION_INIT, reserveSessionFlow),
    takeLatest(CANCEL_SESSION_INIT, cancelSessionFlow),
    takeLatest(CONFIRM_SESSION_INIT, confirmSessionFlow),
    takeLatest(JOIN_SESSION_WAITLIST_INIT, joinSessionWaitlistFlow),
    takeLatest(SIGNUP_BOOK_SESSION, signupBookSessionFlow),
    takeLatest(BUY_CREDITS_AND_BOOK_SESSION, buyCreditsAndBookSessionFlow),
  ]);
}
