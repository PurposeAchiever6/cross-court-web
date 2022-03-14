import { put, takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  GET_QUESTIONS_INIT,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILURE,
  SAVE_ANSWER_INIT,
} from './actionTypes';

import surveyService from './service';

export function* getQuestionsFlow() {
  try {
    const questionsPayload = yield call(surveyService.getQuestions);
    yield put({
      type: GET_QUESTIONS_SUCCESS,
      payload: {
        questions: questionsPayload.surveyQuestions,
      },
    });
  } catch (err) {
    yield put({ type: GET_QUESTIONS_FAILURE, error: err.response.data.error });
  }
}

export function* saveAnswerFlow(action) {
  try {
    yield call(surveyService.saveAnswer, action.payload);
  } catch (err) {
    yield call(toast.error, err.message);
  }
}

export default function* surveySaga() {
  yield all([
    takeLatest(GET_QUESTIONS_INIT, getQuestionsFlow),
    takeLatest(SAVE_ANSWER_INIT, saveAnswerFlow),
  ]);
}
