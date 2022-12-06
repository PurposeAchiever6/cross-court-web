import { put, all, takeLatest, call } from 'redux-saga/effects';
import { GET_GOALS_INIT, GET_GOALS_SUCCESS, GET_GOALS_FAILURE } from './actionTypes';
import goalsService from './service';

export function* getGoalsFlow() {
  try {
    const goals = yield call(goalsService.getGoals);

    yield put({
      type: GET_GOALS_SUCCESS,
      payload: {
        goals,
      },
    });
  } catch (err) {
    yield put({ type: GET_GOALS_FAILURE, error: err.response.data.error });
  }
}

export default function* rootGoalsSaga() {
  yield all([takeLatest(GET_GOALS_INIT, getGoalsFlow)]);
}
