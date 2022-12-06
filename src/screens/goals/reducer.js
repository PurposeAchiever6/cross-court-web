/* eslint-disable default-param-last */
import { createSelector } from 'reselect';
import { GET_GOALS_INIT, GET_GOALS_SUCCESS, GET_GOALS_FAILURE } from './actionTypes';

const initialState = {
  error: '',
  pageLoading: false,
  goals: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GOALS_INIT:
      return {
        ...state,
        pageLoading: true,
        error: '',
      };
    case GET_GOALS_SUCCESS:
      return {
        ...state,
        pageLoading: false,
        goals: [...action.payload.goals],
      };
    case GET_GOALS_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    default:
      return state;
  }
};

const getGoalsState = (state) => state.goals;

export const getPageLoading = createSelector(getGoalsState, (goals) => goals.pageLoading);

export const getError = createSelector(getGoalsState, (goals) => goals.error);

export const getGoals = createSelector(getGoalsState, (goals) => goals.goals);
