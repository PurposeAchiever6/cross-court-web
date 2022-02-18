import { createSelector } from 'reselect';
import {
  CREATE_FREE_SESSION_SUCCESS,
  CREATE_FREE_SESSION_FAILURE,
} from 'screens/checkout/actionTypes';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  SET_SELECTED_CARD,
  CLAIM_FREE_SESSION,
  ADD_CARD_INIT,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  DELETE_CARD_INIT,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
} from './actionTypes';

const initialState = {
  error: '',
  pageLoading: false,
  availableCards: [],
  selectedCard: null,
  claimFreeSession: false,
  addCardLoading: false,
  deleteCardLoading: false,
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
        availableCards: [...action.payload.availableCards],
      };
    case INITIAL_LOAD_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    case SET_SELECTED_CARD:
      return {
        ...state,
        selectedCard: { ...action.payload.selectedCard },
      };
    case CLAIM_FREE_SESSION:
      return {
        ...state,
        claimFreeSession: true,
      };
    case CREATE_FREE_SESSION_SUCCESS:
    case CREATE_FREE_SESSION_FAILURE:
      return {
        ...state,
        claimFreeSession: false,
      };
    case ADD_CARD_INIT:
      return {
        ...state,
        addCardLoading: true,
      };
    case ADD_CARD_SUCCESS:
    case ADD_CARD_FAILURE:
      return {
        ...state,
        addCardLoading: false,
      };
    case DELETE_CARD_INIT:
      return {
        ...state,
        deleteCardLoading: true,
      };
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        availableCards: state.availableCards.filter(
          (item) => item.id !== action.payload.paymentMethodId
        ),
        deleteCardLoading: false,
      };
    case DELETE_CARD_FAILURE:
      return {
        ...state,
        deleteCardLoading: false,
      };
    default:
      return state;
  }
};

const getPaymentMethods = (state) => state.paymentMethods;

export const getPageLoading = createSelector(
  getPaymentMethods,
  (paymentMethods) => paymentMethods.pageLoading
);

export const getError = createSelector(getPaymentMethods, (paymentMethods) => paymentMethods.error);

export const getAvailableCards = createSelector(
  getPaymentMethods,
  (paymentMethods) => paymentMethods.availableCards
);

export const getSelectedCard = createSelector(
  getPaymentMethods,
  (paymentMethods) => paymentMethods.selectedCard
);

export const getAddCardLoading = createSelector(
  getPaymentMethods,
  (paymentMethods) => paymentMethods.addCardLoading
);

export const getDeleteCardLoading = createSelector(
  getPaymentMethods,
  (paymentMethods) => paymentMethods.deleteCardLoading
);
