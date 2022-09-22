/* eslint-disable default-param-last */
import { createSelector } from 'reselect';
import {
  GET_GALLERY_PHOTOS_INIT,
  GET_GALLERY_PHOTOS_SUCCESS,
  GET_GALLERY_PHOTOS_FAILURE,
} from './actionTypes';

const initialState = {
  pageLoading: false,
  galleryPhotos: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GALLERY_PHOTOS_INIT:
      return {
        ...state,
        pageLoading: true,
      };
    case GET_GALLERY_PHOTOS_SUCCESS:
      return {
        pageLoading: false,
        galleryPhotos: action.payload.galleryPhotos,
        error: null,
      };
    case GET_GALLERY_PHOTOS_FAILURE:
      return {
        ...state,
        pageLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getGallery = (state) => state.gallery;

export const getPageLoading = createSelector(getGallery, (gallery) => gallery.pageLoading);

export const getError = createSelector(getGallery, (gallery) => gallery.error);

export const getGalleryPhotos = createSelector(getGallery, (gallery) => gallery.galleryPhotos);
