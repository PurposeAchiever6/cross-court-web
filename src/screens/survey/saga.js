import { put, takeLatest, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import ROUTES from 'shared/constants/routes';
import {
  GET_QUESTIONS_INIT,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILURE,
  SAVE_ANSWER_INIT,
  SAVE_ANSWER_SUCCESS,
  SAVE_ANSWER_FAILURE,
} from './actionTypes';

import surveyService from './service';

export function* getQuestionsFlow() {
  try {
    const questionsPayload = yield call(surveyService.getQuestions);
    yield put({
      type: GET_QUESTIONS_SUCCESS,
      payload: {
        questions: questionsPayload,
      },
    });
  } catch (err) {
    yield put({ type: GET_QUESTIONS_FAILURE, error: err.response.data.error });
  }
}

export function* saveAnswerFlow(action) {
  try {
    const answerPayload = yield call(surveyService.saveAnswer);

    yield put({
      type: SAVE_ANSWER_SUCCESS,
      payload: {
        answer: answerPayload
      },
    });
  } catch (err) {
    yield call(toast.error, err.message);

    yield put({ type: SAVE_ANSWER_FAILURE, error: err });
  }
}

export default function* surveySaga() {
  yield all([
    takeLatest(GET_QUESTIONS_INIT, getQuestionsFlow),
    takeLatest(SAVE_ANSWER_INIT, saveAnswerFlow),
  ]);
}
