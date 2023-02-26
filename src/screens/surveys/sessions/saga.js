import { takeLatest, call, all } from 'redux-saga/effects';

import { CREATE_SESSION_SURVEY } from './actionTypes';
import sessionsSurveysService from './service';

export function* createSessionSurveyFlow(action) {
  yield call(sessionsSurveysService.create, action.payload);
}

export default function* surveySaga() {
  yield all([takeLatest(CREATE_SESSION_SURVEY, createSessionSurveyFlow)]);
}
