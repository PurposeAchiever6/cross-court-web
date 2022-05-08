import { createSelector } from 'reselect';
import { GET_QUESTIONS_INIT, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILURE } from './actionTypes';

const initialState = {
  error: '',
  questions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS_INIT:
      return {
        ...state,
        error: '',
      };
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: [...action.payload.questions],
      };
    case GET_QUESTIONS_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

const getSessionsSurveys = (state) => state.sessionsSurveys;

export const getQuestions = createSelector(getSessionsSurveys, (survey) => survey.questions);
