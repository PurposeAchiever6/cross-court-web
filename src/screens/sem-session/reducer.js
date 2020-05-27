import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  CHECK_IN_INIT,
  CHECK_IN_SUCCESS,
  CHECK_IN_FAILURE,
  TIMER_START,
  TIMER_PAUSE,
  TIMER_RESUME,
  TIMER_RESET,
  ADD_WIN,
  CLEAR_STREAK,
} from './actionTypes';

const initialState = {
  error: '',
  pageLoading: true,
  users: [],
  timerOn: false,
  timerStart: undefined,
  streak: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_LOAD_INIT:
      return {
        ...state,
        pageLoading: true,
        users: [],
        error: '',
      };
    case INITIAL_LOAD_SUCCESS:
      return {
        ...state,
        pageLoading: false,
        users: action.payload.users,
      };
    case INITIAL_LOAD_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    case CHECK_IN_INIT:
      return {
        ...state,
        pageLoading: true,
        error: '',
      };
    case CHECK_IN_SUCCESS:
      return {
        ...state,
        pageLoading: false,
      };
    case CHECK_IN_FAILURE:
      return {
        ...state,
        pageLoading: false,
        error: action.error,
      };
    case TIMER_START:
      return {
        ...state,
        timerOn: true,
        timerStart: Date.now(),
      };
    case TIMER_PAUSE:
      return {
        ...state,
        timerOn: false,
      };
    case TIMER_RESUME:
      return {
        ...state,
        timerOn: true,
        timerStart: action.payload.startTime,
      };
    case TIMER_RESET:
      return {
        ...state,
        timerOn: false,
      };
    case ADD_WIN:
      return {
        ...state,
        streak: [action.payload.winner, ...state.streak],
      };
    case CLEAR_STREAK:
      return {
        ...state,
        timerOn: false,
        streak: [],
      };
    default:
      return state;
  }
};

export const getPageLoading = state => state.semSession.pageLoading;
export const getError = state => state.semSession.error;
export const getPlayers = state => state.semSession.users;
export const getTimerOn = state => state.semSession.timerOn;
export const getTimerStart = state => state.semSession.timerStart;
export const getStreak = state => state.semSession.streak;
