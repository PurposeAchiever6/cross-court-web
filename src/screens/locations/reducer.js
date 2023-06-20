/* eslint-disable default-param-last */
import { createSelector } from 'reselect';

import { isSameDay } from 'shared/utils/date';
import {
  JOIN_SESSION_WAITLIST_SUCCESS,
  REMOVE_SESSION_WAITLIST_SUCCESS,
  VOTE_SESSION_SUCCESS,
  REMOVE_VOTE_SESSION_SUCCESS,
} from 'screens/sessions/actionTypes';
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
  SET_SELECTED_DATE,
  VALIDATE_RANGE_AND_SUBMIT_INIT,
  VALIDATE_RANGE_AND_SUBMIT_SUCCESS,
  VALIDATE_RANGE_AND_SUBMIT_FAILURE,
  SHOW_OUTSIDE_RANGE_MODAL,
  CLOSE_OUTSIDE_RANGE_MODAL,
} from './actionTypes';

const initialState = {
  error: '',
  pageLoading: false,
  sessionsLoading: false,
  availableLocations: [],
  showOutsideRangeModal: false,
  nearestLocation: null,
  outsideRangeValidationLoading: false,
  availableSessions: [],
  selectedLocation: null,
  selectedDate: new Date().toLocaleDateString('en-US'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS_INIT:
      return {
        ...state,
        pageLoading: true,
        error: '',
      };
    case GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        pageLoading: false,
        availableLocations: [...action.payload.availableLocations],
      };
    case GET_LOCATIONS_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    case SHOW_OUTSIDE_RANGE_MODAL:
      return {
        ...state,
        nearestLocation: action.payload.nearestLocation,
        showOutsideRangeModal: true,
      };
    case CLOSE_OUTSIDE_RANGE_MODAL:
      return {
        ...state,
        showOutsideRangeModal: false,
      };
    case VALIDATE_RANGE_AND_SUBMIT_INIT:
      return {
        ...state,
        outsideRangeValidationLoading: true,
        error: '',
      };
    case VALIDATE_RANGE_AND_SUBMIT_SUCCESS:
      return {
        ...state,
        outsideRangeValidationLoading: false,
      };
    case VALIDATE_RANGE_AND_SUBMIT_FAILURE:
      return {
        ...state,
        error: action.error,
        showOutsideRangeModal: false,
        outsideRangeValidationLoading: false,
      };
    case GET_SESSIONS_BY_LOCATION_INIT:
      return {
        ...state,
        selectedLocation: action.payload.locationId,
        selectedDate: new Date().toLocaleDateString('en-US'),
        sessionsLoading: true,
        error: '',
      };
    case GET_SESSIONS_BY_DATE_SUCCESS:
    case GET_SESSIONS_BY_LOCATION_SUCCESS:
      return {
        ...state,
        sessionsLoading: false,
        availableSessions: [...action.payload.availableSessions],
      };
    case GET_SESSIONS_BY_DATE_FAILURE:
    case GET_SESSIONS_BY_LOCATION_FAILURE:
      return { ...state, error: action.error, sessionsLoading: false };
    case GET_SESSIONS_BY_DATE_INIT:
      return { ...state, selectedDate: action.payload.date, sessionsLoading: true };
    case SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload.date };
    case JOIN_SESSION_WAITLIST_SUCCESS:
      return {
        ...state,
        availableSessions: state.availableSessions.map((session) =>
          session.id === action.payload.sessionId &&
          isSameDay(session.startTime, action.payload.sessionDate)
            ? { ...session, onWaitlist: true, waitlistPlacement: action.payload.waitlistPlacement }
            : session
        ),
      };
    case REMOVE_SESSION_WAITLIST_SUCCESS:
      return {
        ...state,
        availableSessions: state.availableSessions.map((session) =>
          session.id === action.payload.sessionId &&
          isSameDay(session.startTime, action.payload.sessionDate)
            ? { ...session, onWaitlist: false, waitlistPlacement: null }
            : session
        ),
      };
    case VOTE_SESSION_SUCCESS:
      return {
        ...state,
        availableSessions: state.availableSessions.map((session) =>
          session.id === action.payload.sessionId &&
          isSameDay(session.startTime, action.payload.sessionDate)
            ? { ...session, votes: session.votes + 1, voted: true }
            : session
        ),
      };
    case REMOVE_VOTE_SESSION_SUCCESS:
      return {
        ...state,
        availableSessions: state.availableSessions.map((session) =>
          session.id === action.payload.sessionId &&
          isSameDay(session.startTime, action.payload.sessionDate)
            ? { ...session, votes: session.votes - 1, voted: false }
            : session
        ),
      };
    default:
      return state;
  }
};

const getLocations = (state) => state.locations;

export const getPageLoading = createSelector(getLocations, (locations) => locations.pageLoading);

export const getError = createSelector(getLocations, (locations) => locations.error);

export const getAvailableLocations = createSelector(
  getLocations,
  (locations) => locations.availableLocations
);

export const getNearestLocation = createSelector(
  getLocations,
  (locations) => locations.nearestLocation
);

export const showOutsideRangeModalSelector = createSelector(
  getLocations,
  (locations) => locations.showOutsideRangeModal
);

export const outsideRangeValidationLoadingSelector = createSelector(
  getLocations,
  (locations) => locations.outsideRangeValidationLoading
);

export const getAvailableSessions = createSelector(
  getLocations,
  (locations) => locations.availableSessions
);

export const getSelectedLocation = createSelector(
  getLocations,
  (locations) => locations.selectedLocation
);

export const getSessionsLoading = createSelector(
  getLocations,
  (locations) => locations.sessionsLoading
);

export const getSelectedDate = createSelector(
  getLocations,
  (locations) => new Date(locations.selectedDate)
);
