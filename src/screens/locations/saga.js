import { put, all, takeLatest, call, select } from 'redux-saga/effects';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  GET_SESSIONS_BY_LOCATION_INIT,
  GET_SESSIONS_BY_LOCATION_SUCCESS,
  GET_SESSIONS_BY_LOCATION_FAILURE,
  GET_SESSIONS_BY_DATE_INIT,
  GET_SESSIONS_BY_DATE_SUCCESS,
  GET_SESSIONS_BY_DATE_FAILURE,
} from './actionTypes';
import locationsService from './service';
import { getSelectedDate, getSelectedLocation } from './reducer';

export function* initialLoadFlow() {
  try {
    const selectedDate = yield select(getSelectedDate);
    const selectedLocation = yield select(getSelectedLocation);
    const [availableLocationsPayload, availableSessionsPayload] = yield all([
      call(locationsService.getLocations),
      call(locationsService.getSessions, selectedLocation, selectedDate),
    ]);
    yield put({
      type: INITIAL_LOAD_SUCCESS,
      payload: {
        availableLocations: availableLocationsPayload,
        availableSessions: availableSessionsPayload,
      },
    });
  } catch (err) {
    console.log(err);
    yield put({ type: INITIAL_LOAD_FAILURE, error: err.response.data.error });
  }
}

export function* getSessionsByLocationFlow({ payload }) {
  try {
    const selectedDate = yield select(getSelectedDate);
    const availableSessionsPayload = yield call(
      locationsService.getSessions,
      payload.locationId,
      selectedDate
    );
    yield put({
      type: GET_SESSIONS_BY_LOCATION_SUCCESS,
      payload: {
        availableSessions: availableSessionsPayload,
      },
    });
  } catch (err) {
    console.log(err);
    yield put({ type: GET_SESSIONS_BY_LOCATION_FAILURE, error: err.response.data.error });
  }
}

export function* getSessionsByDateFlow({ payload }) {
  try {
    const selectedLocation = yield select(getSelectedLocation);
    const availableSessionsPayload = yield call(
      locationsService.getSessions,
      selectedLocation,
      payload.date
    );
    yield put({
      type: GET_SESSIONS_BY_DATE_SUCCESS,
      payload: {
        availableSessions: availableSessionsPayload,
      },
    });
  } catch (err) {
    console.log(err);
    yield put({ type: GET_SESSIONS_BY_DATE_FAILURE, error: err.response.data.error });
  }
}

export default function* rootLocationsSaga() {
  yield all([
    takeLatest(INITIAL_LOAD_INIT, initialLoadFlow),
    takeLatest(GET_SESSIONS_BY_LOCATION_INIT, getSessionsByLocationFlow),
    takeLatest(GET_SESSIONS_BY_DATE_INIT, getSessionsByDateFlow),
  ]);
}
