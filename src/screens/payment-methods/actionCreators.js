import {
  INITIAL_LOAD_INIT,
  ADD_CARD_INIT,
  DELETE_CARD_INIT,
  SET_SELECTED_CARD,
  CLAIM_FREE_SESSION,
  UPDATE_CARD_INIT,
} from './actionTypes';

export const initialLoadInit = () => ({
  type: INITIAL_LOAD_INIT,
});

export const addCard = (stripe, cardElement, redirectTo) => ({
  type: ADD_CARD_INIT,
  payload: {
    cardElement,
    stripe,
    redirectTo,
  },
});

export const updateCard = (paymentMethodId, paymentMethodAttrs) => ({
  type: UPDATE_CARD_INIT,
  payload: {
    paymentMethodId,
    paymentMethodAttrs,
  },
});

export const deleteCard = (cardId) => ({
  type: DELETE_CARD_INIT,
  payload: {
    cardId,
  },
});

export const setSelectedCard = (cardId) => ({
  type: SET_SELECTED_CARD,
  payload: {
    selectedCard: cardId,
  },
});

export const claimFreeSessionInit = () => ({
  type: CLAIM_FREE_SESSION,
});
