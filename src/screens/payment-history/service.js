import api from 'shared/services';

export default {
  getPaymentHistory: async ({ page }) => {
    const response = await api.get(`/payments`, {
      data: {},
      params: {
        page,
      },
    });
    return response.data;
  },
};
