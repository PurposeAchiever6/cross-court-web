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

  createSubscription: async (productId, paymentMethod, promoCode) => {
    const response = await api.post('/subscriptions', {
      productId,
      paymentMethod,
      promoCode,
    });

    return response.data;
  },

  updateSubscription: async (subscriptionId, productId, paymentMethod, promoCode) => {
    const response = await api.put(`subscriptions/${subscriptionId}`, {
      productId,
      paymentMethod,
      promoCode,
    });

    return response.data;
  },

  createFreeSession: async (cardId) => {
    const response = await api.put(`/purchases/create_free_session_intent`, {
      paymentMethod: cardId,
    });

    return response.data;
  },

  checkPromoCode: async (promoCode, price) => {
    const response = await api.get(
      `/promo_code?promo_code=${encodeURI(promoCode)}&price=${Number(price)}`,
      {
        data: {},
      }
    );

    return response.data;
  },
};
