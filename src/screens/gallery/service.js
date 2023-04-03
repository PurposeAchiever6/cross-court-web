import api from 'shared/services';

export default {
  getGalleryPhotos: async ({ page }) => {
    const response = await api.get(`/gallery_photos`, {
      data: {},
      params: {
        page,
      },
    });

    return response.data;
  },
};
