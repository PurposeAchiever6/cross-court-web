import {
  GET_LOCATIONS_INIT,
  GET_SESSIONS_BY_LOCATION_INIT,
  GET_SESSIONS_BY_DATE_INIT,
  SET_SELECTED_DATE,
} from './actionTypes';

export const getLocations = () => ({
  type: GET_LOCATIONS_INIT,
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
