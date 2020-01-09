import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  CHECK_IN_INIT,
  CHECK_IN_SUCCESS,
  CHECK_IN_FAILURE,
} from './actionTypes';

const initialState = {
  error: '',
  pageLoading: true,
  sessionInfo: {},
  users: [],
  playersMissing: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_LOAD_INIT:
      return {
        ...state,
        pageLoading: true,
        error: '',
      };
    case INITIAL_LOAD_SUCCESS:
      return {
        ...state,
        pageLoading: false,
        sessionInfo: { ...action.payload.session },
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
        playersMissing: action.payload.playersMissing,
      };
    case CHECK_IN_FAILURE:
      return {
        ...state,
        pageLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getPageLoading = state => state.semSession.pageLoading;
export const getError = state => state.semSession.error;
export const getSessionInfo = state => state.semSession.sessionInfo;
export const getPlayers = state => state.semSession.users;
export const getPlayersMissing = state => state.semSession.playersMissing;
