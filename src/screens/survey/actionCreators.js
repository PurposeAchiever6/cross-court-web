import {
    GET_QUESTIONS_INIT,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAILURE,
    SAVE_ANSWER_INIT,
    SAVE_ANSWER_SUCCESS,
    SAVE_ANSWER_FAILURE,
  } from './actionTypes';

  export const getQuestionsInit = () => ({
    type: GET_QUESTIONS_INIT,
  });

  export const getQuestions = () => ({
    type: GET_QUESTIONS_SUCCESS,
    payload: {
    },
  });
  
  export const saveAnswer = () => ({
    type: SAVE_ANSWER_SUCCESS,
    payload: {
    },
  });

  