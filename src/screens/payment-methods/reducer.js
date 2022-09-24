/* eslint-disable default-param-last */
import { createSelector } from 'reselect';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  SET_SELECTED_CARD,
  ADD_CARD_INIT,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  DELETE_CARD_INIT,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  UPDATE_CARD_SUCCESS,
} from './actionTypes';

const initialState = {
  error: '',
  pageLoading: false,
  availableCards: [],
  selectedCard: null,
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
    case UPDATE_CARD_SUCCESS:
    case DELETE_CARD_SUCCESS:
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
