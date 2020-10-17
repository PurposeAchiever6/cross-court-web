// TODO: EDIT THIS
import { createSelector } from 'reselect';
import {
  GET_QUESTIONS_INIT,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILURE,
  SAVE_ANSWER_INIT,
  SAVE_ANSWER_SUCCESS,
  SAVE_ANSWER_FAILURE,
} from './actionTypes';

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
    case SAVE_ANSWER_INIT:
      return {
        ...state,
      };
    case SAVE_ANSWER_SUCCESS:
    case SAVE_ANSWER_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

const getSurvey = state => state.survey;

export const getError = createSelector(getSurvey, questions => questions.error);

export const getQuestions = createSelector(getSurvey, survey => survey.questions);
export const getQuestionsError = createSelector(getSurvey, survey => survey.error);
export const saveAnswer = createSelector(getSurvey, survey => survey.answer);

