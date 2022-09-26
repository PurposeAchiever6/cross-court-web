import { put, all, takeLatest, call, select } from 'redux-saga/effects';
import {
  GET_LOCATIONS_INIT,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAILURE,
  GET_SESSIONS_BY_LOCATION_INIT,
  GET_SESSIONS_BY_LOCATION_SUCCESS,
  GET_SESSIONS_BY_LOCATION_FAILURE,
  GET_SESSIONS_BY_DATE_INIT,
  GET_SESSIONS_BY_DATE_SUCCESS,
  GET_SESSIONS_BY_DATE_FAILURE,
} from './actionTypes';
import locationsService from './service';
import { getSelectedDate, getSelectedLocation } from './reducer';

export function* getLocationsFlow() {
  try {
    const availableLocationsPayload = yield call(locationsService.getLocations);

    yield put({
      type: GET_LOCATIONS_SUCCESS,
      payload: {
        availableLocations: availableLocationsPayload,
      },
    });
  } catch (err) {
    yield put({ type: GET_LOCATIONS_FAILURE, error: err.response.data.error });
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
    yield put({ type: GET_SESSIONS_BY_DATE_FAILURE, error: err.response.data.error });
  }
}

export default function* rootLocationsSaga() {
  yield all([
    takeLatest(GET_LOCATIONS_INIT, getLocationsFlow),
    takeLatest(GET_SESSIONS_BY_LOCATION_INIT, getSessionsByLocationFlow),
    takeLatest(GET_SESSIONS_BY_DATE_INIT, getSessionsByDateFlow),
  ]);
}
