import { takeLatest, call, all } from 'redux-saga/effects';

import { CREATE_UPDATE_FIRST_TIMER_SURVEY } from './actionTypes';
import firstTimersSurveysService from './service';

export function* createOrUpdateFirstTimerSurveyFlow(action) {
  yield call(firstTimersSurveysService.createOrUpdate, action.payload);
}

export default function* surveySaga() {
  yield all([takeLatest(CREATE_UPDATE_FIRST_TIMER_SURVEY, createOrUpdateFirstTimerSurveyFlow)]);
}
