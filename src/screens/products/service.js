import api from 'shared/services';

export default {
  getAllProducts: async () => {
    const response = await api.get(`/products`, {
      data: {},
    });

    const freeSession = {
      name: 'Free Session',
      description: '1 session for free',
      price: '0',
    };

    return [...response.data.products, freeSession];
  },

  cancelSubscription: async (subscriptionId) => {
    const response = await api.delete(`/subscriptions/${subscriptionId}`, {
      data: {},
    });

    return response.data;
  },

  reactivateSubscription: async (subscriptionId) => {
    const response = await api.post(`/subscriptions/${subscriptionId}/reactivate`, {});

    return response.data;
  },

  updateSubscriptionPaymentMethod: async (subscriptionId, paymentMethodId) => {
    const response = await api.post(`/subscriptions/${subscriptionId}/payment_method`, {
      paymentMethodId,
    });

    return response.data;
  },
};
