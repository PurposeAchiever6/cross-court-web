import { createSelector } from 'reselect';
import { GET_LEGAL_DOCS_INIT, GET_LEGAL_DOCS_SUCCESS, GET_LEGAL_DOCS_FAILURE } from './actionTypes';

const initialState = {
  error: '',
  pageLoading: false,
  cancelationPolicy: '',
  termsAndConditions: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LEGAL_DOCS_INIT:
      return {
        ...state,
        pageLoading: true,
        error: '',
      };
    case GET_LEGAL_DOCS_SUCCESS:
      return {
        ...state,
        pageLoading: false,
        cancelationPolicy: action.payload.cancelationPolicy,
        termsAndConditions: action.payload.termsAndConditions,
      };
    case GET_LEGAL_DOCS_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    default:
      return state;
  }
};

const getLegalDocsReducer = state => state.legalDocs;

export const getPageLoading = createSelector(
  getLegalDocsReducer,
  legalDocs => legalDocs.pageLoading
);

export const getError = createSelector(getLegalDocsReducer, legalDocs => legalDocs.error);

export const getTermsAndConditions = createSelector(
  getLegalDocsReducer,
  legalDocs => legalDocs.termsAndConditions
);

export const getCancelationPolicy = createSelector(
  getLegalDocsReducer,
  legalDocs => legalDocs.cancelationPolicy
);
