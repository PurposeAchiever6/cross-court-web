import { GET_QUESTIONS_INIT, SAVE_ANSWER_INIT } from './actionTypes';

export const getQuestionsInit = () => ({
  type: GET_QUESTIONS_INIT,
});

export const saveAnswer = (sessionSurveyQuestionId, answer) => ({
  type: SAVE_ANSWER_INIT,
  payload: { sessionSurveyQuestionId, answer },
});
