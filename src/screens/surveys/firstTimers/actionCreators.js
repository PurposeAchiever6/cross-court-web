import { CREATE_UPDATE_FIRST_TIMER_SURVEY } from './actionTypes';

export const createOrUpdateFirstTimerSurvey = (payload) => ({
  type: CREATE_UPDATE_FIRST_TIMER_SURVEY,
  payload,
});
