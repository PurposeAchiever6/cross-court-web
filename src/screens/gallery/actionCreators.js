import { GET_GALLERY_PHOTOS_INIT } from './actionTypes';

export const fetchGalleryPhotos = (page) => ({
  type: GET_GALLERY_PHOTOS_INIT,
  payload: {
    page,
  },
});
