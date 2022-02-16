import api from 'shared/services';

export default {
  createPurchase: async (productId, cardId, promoCode) => {
    const response = await api.post('/purchases', {
      productId,
      paymentMethodId: cardId,
      promoCode,
    });

    return response.data;
  },

  createSubscription: async (productId, paymentMethodId, promoCode) => {
    const response = await api.post('/subscriptions', {
      productId,
      paymentMethodId,
      promoCode,
    });

    return response.data;
  },

  updateSubscription: async (subscriptionId, productId, paymentMethodId, promoCode) => {
    const response = await api.put(`subscriptions/${subscriptionId}`, {
      productId,
      paymentMethodId,
      promoCode,
    });

    return response.data;
  },

  createFreeSession: async (cardId) => {
    const response = await api.put(`/purchases/create_free_session_intent`, {
      paymentMethodId: cardId,
    });

    return response.data;
  },

  checkPromoCode: async (promoCode, productId) => {
    const response = await api.get(
      `/promo_code?promo_code=${encodeURI(promoCode)}&product_id=${productId}`,
      {
        data: {},
      }
    );

    return response.data;
  },
};
