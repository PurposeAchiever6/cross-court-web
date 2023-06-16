import {
  GET_LOCATIONS_INIT,
  VALIDATE_RANGE_AND_SUBMIT_INIT,
  GET_SESSIONS_BY_LOCATION_INIT,
  GET_SESSIONS_BY_DATE_INIT,
  SET_SELECTED_DATE,
  CLOSE_OUTSIDE_RANGE_MODAL,
} from './actionTypes';

export const getLocations = () => ({
  type: GET_LOCATIONS_INIT,
});

export const validateRangeAndSubmit = (payload, options) => ({
  type: VALIDATE_RANGE_AND_SUBMIT_INIT,
  payload,
  options,
});

export const closeOutsideRangeModal = () => ({
  type: CLOSE_OUTSIDE_RANGE_MODAL,
});

export const getSessionsByLocation = (locationId) => ({
  type: GET_SESSIONS_BY_LOCATION_INIT,
  payload: {
    locationId,
  },
});

export const getSessionsByDate = (date) => ({
  type: GET_SESSIONS_BY_DATE_INIT,
  payload: {
    date,
  },
});

export const setSelectedDate = (date) => ({
  type: SET_SELECTED_DATE,
  payload: {
    date,
  },
});
