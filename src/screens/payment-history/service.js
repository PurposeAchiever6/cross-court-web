import api from 'shared/services';

export default {
  getPaymentHistory: async () => {
    const response = await api.get(`/payments`, {
      data: {},
    });
    return response.data.payments;
  },
};
