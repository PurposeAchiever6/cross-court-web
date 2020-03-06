import api from 'shared/services';

export default {
  createPurchase: async (productId, cardId, promoCode) => {
    const response = await api.post('/purchases', {
      productId,
      paymentMethod: cardId,
      promoCode,
    });

    return response.data;
  },
  createFreeSession: async cardId => {
    const response = await api.put(`/purchases/claim_free_session`, {
      paymentMethod: cardId,
    });

    return response.data;
  },
  checkPromoCode: async (promoCode, price) => {
    const response = await api.get(`/promo_code?promo_code=${promoCode}&price=${Number(price)}`, {
      data: {},
    });

    return response.data;
  },
};
