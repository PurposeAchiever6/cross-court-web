import api from 'shared/services';

export default {
  getPurchaseHistory: async () => {
    const response = await api.get(`/purchases`, {
      data: {},
    });
    return response.data.purchases;
  },
};
