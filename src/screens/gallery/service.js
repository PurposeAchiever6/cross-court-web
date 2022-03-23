import api from 'shared/services';

export default {
  getGalleryPhotos: async () => {
    const response = await api.get(`/gallery_photos`, {
      data: {},
    });

    return response.data.galleryPhotos;
  },
};
