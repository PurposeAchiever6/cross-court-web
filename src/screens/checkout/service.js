import api from 'shared/services';

export default {
  createPurchase: async (productId, cardId) => {
    const response = await api.post('/purchases', {
      productId,
      paymentMethod: cardId,
    });

    return response.data;
  },
  createFreeSession: async cardId => {
    const response = await api.put(`/purchases/claim_free_session`, {
      payment_method: cardId,
    });

    return response.data;
  },
};
